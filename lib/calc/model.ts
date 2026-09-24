// Greencrest savings model — pure port of design/README.md §2 "Model (reproduce exactly)".
// No I/O, no DOM. Negative savings values mean money saved (matches the source workbook).

export const HOURS = 8760;
export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const DEMAND_PEAK_MONTHS = [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1];
export const RTE = 0.75;
export const CYCLES = 5;
export const TOU_DAYS = 260;

export interface ProfileRecord { sqft?: number; peak: number; sum?: number; b64: string; systemKw?: number }
export interface ProfilesFile { hours: number; types: Record<string, ProfileRecord>; pv: ProfileRecord & { systemKw: number } }

export interface ModelInputs {
  base: ArrayLike<number>;      // 8760 hourly kW for the reference building
  refSqft: number;              // reference building sq ft
  pv: ArrayLike<number>;        // 8760 hourly kW for a 1000 kW array
  pvSystemKw?: number;          // defaults to 1000
  sqft: number;
  energyPeak: number; energyOff: number;   // $/kWh
  demandPeak: number; demandOff: number;   // $/kW-month
  blended: number;                         // $/kWh
  carbon: number;                          // kg/kWh
  solarPct: number; battPct: number;       // 0..100
  solarCost: number; battCost: number;     // $/kW, $/kWh
}

export interface MonthResult { maxBefore: number; maxAfter: number; finalDemand: number; net: number }

export interface ModelResult {
  load: Float64Array; solar: Float64Array; afterSolar: Float64Array; months: MonthResult[];
  annualEnergy: number; peakLoad: number; avgHourly: number; solarConsumed: number;
  solarMax: number; battMax: number; solarKw: number; battKwh: number;
  demandSavings: number; touSavings: number; solarSavings: number; annualSavings: number;
  utilityCost: number; newBill: number; backupHours: number; co2: number;
  capex: number; payback: number | null;
}

/** value[h] = byte[h] / 255 * peak */
export function decodeProfile(rec: ProfileRecord): Float64Array {
  const bytes = typeof Buffer !== 'undefined'
    ? Buffer.from(rec.b64, 'base64')
    : Uint8Array.from(atob(rec.b64), c => c.charCodeAt(0));
  const out = new Float64Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = (bytes[i] / 255) * rec.peak;
  return out;
}

function monthIndex(): Int8Array {
  const m = new Int8Array(HOURS);
  let h = 0;
  for (let mo = 0; mo < 12; mo++) for (let k = 0; k < MONTH_DAYS[mo] * 24 && h < HOURS; k++) m[h++] = mo;
  while (h < HOURS) m[h++] = 11;
  return m;
}
const MONTH_OF = monthIndex();

export function runModel(i: ModelInputs): ModelResult {
  const sqft = i.sqft || i.refSqft;
  const scale = sqft / i.refSqft;
  const pvKw = i.pvSystemKw ?? 1000;

  const load = new Float64Array(HOURS);
  let annualEnergy = 0, peakLoad = 0;
  for (let h = 0; h < HOURS; h++) {
    const v = i.base[h] * scale;
    load[h] = v; annualEnergy += v;
    if (v > peakLoad) peakLoad = v;
  }
  const avgHourly = annualEnergy / HOURS;
  const avgDaily = annualEnergy / 365;

  const solarMax = Math.round(Math.min(sqft / 100, peakLoad));
  const battMax = Math.ceil(Math.min(avgDaily, 16000));
  const solarKw = Math.round((i.solarPct / 100) * solarMax);
  const battKwh = Math.round((i.battPct / 100) * battMax);

  const solar = new Float64Array(HOURS);
  const afterSolar = new Float64Array(HOURS);
  let finalEnergy = 0;
  for (let h = 0; h < HOURS; h++) {
    solar[h] = i.pv[h] * solarKw / pvKw;
    const g = Math.max(load[h] - solar[h], 0);
    afterSolar[h] = g; finalEnergy += g;
  }
  const solarConsumed = Math.round(annualEnergy - finalEnergy);

  let excess = 0;
  for (let d = 0; d < 365; d++) {
    let day = 0;
    for (let k = 0; k < 24; k++) { const h = d * 24 + k; day += Math.max(solar[h] - load[h], 0); }
    excess += Math.min(day, battKwh);
  }
  const solarExcessBattery = excess * RTE;

  const peakShave = battKwh / 4;
  const months: MonthResult[] = [];
  let demandNet = 0;
  for (let mo = 0; mo < 12; mo++) {
    let maxBefore = 0, maxAfter = 0, sum = 0, cnt = 0;
    for (let h = 0; h < HOURS; h++) {
      if (MONTH_OF[h] !== mo) continue;
      if (load[h] > maxBefore) maxBefore = load[h];
      if (afterSolar[h] > maxAfter) maxAfter = afterSolar[h];
      sum += afterSolar[h]; cnt++;
    }
    const avg = cnt ? sum / cnt : 0;
    const incremental = Math.max(avg - maxAfter, -peakShave);
    const finalDemand = maxAfter + incremental;
    const rate = DEMAND_PEAK_MONTHS[mo] ? i.demandPeak : i.demandOff;
    const savings = rate * (finalDemand - maxBefore);
    const charging = (rate > 0 ? CYCLES : 0) * i.energyOff * (-incremental * 4);
    const net = savings + charging;
    demandNet += net;
    months.push({ maxBefore, maxAfter, finalDemand, net });
  }
  const demandSavings = Math.min(demandNet, 0);

  const touSavings = i.energyPeak !== i.energyOff
    ? -Math.round(Math.abs(i.energyPeak * battKwh * TOU_DAYS * RTE - i.energyOff * battKwh * TOU_DAYS) / 1000) * 1000
    : 0;
  const solarSavings = -Math.round(((solarConsumed + solarExcessBattery) * i.blended) / 1000) * 1000;
  const annualSavings = demandSavings + solarSavings + touSavings;
  const utilityCost = Math.round((i.blended * annualEnergy) / 1000) * 1000;
  const newBill = Math.max(utilityCost + annualSavings, 0);
  const capex = solarKw * i.solarCost + battKwh * i.battCost;
  const save = -annualSavings;

  return {
    load, solar, afterSolar, months,
    annualEnergy, peakLoad, avgHourly, solarConsumed, solarMax, battMax, solarKw, battKwh,
    demandSavings, touSavings, solarSavings, annualSavings, utilityCost, newBill,
    backupHours: avgHourly > 0 ? Math.round((battKwh / avgHourly) * 10) / 10 : 0,
    co2: Math.round(i.carbon * solarConsumed / 1000),
    capex, payback: save > 0 ? capex / save : null,
  };
}
