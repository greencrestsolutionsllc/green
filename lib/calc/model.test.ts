import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decodeProfile, runModel, type ProfilesFile } from './model.ts';

const data: ProfilesFile = JSON.parse(readFileSync(new URL('../../data/profiles.json', import.meta.url), 'utf8'));
const t = data.types['Industrial Services'];

const r = runModel({
  base: decodeProfile(t), refSqft: t.sqft!, pv: decodeProfile(data.pv), pvSystemKw: data.pv.systemKw,
  sqft: 250000, energyPeak: 0.0679, energyOff: 0.0679, demandPeak: 1.5, demandOff: 1.5,
  blended: 0.1744, carbon: 0.3192, solarPct: 25, battPct: 2, solarCost: 1800, battCost: 400,
});

// Spec value 21,579 MWh comes from full-precision data (sum 3,828,952.6 kWh × 250,000/44,359.79 = 21,579.05 MWh).
// profiles.json is 8-bit quantized and yields 21,580.3, so allow ±0.05%. Tighten to exact once full-precision arrays land.
const FULL_PRECISION_MWH = t.sum! * (250000 / t.sqft!) / 1000;
test('reference sum reproduces spec 21,579 MWh', () => assert.equal(Math.round(FULL_PRECISION_MWH), 21579));
test('acceptance: annual energy ≈ 21,579 MWh (±0.05%)', () => assert.ok(Math.abs(r.annualEnergy / 1000 - 21579) / 21579 < 0.0005));
test('acceptance: current bill $3.76M', () => assert.equal(Math.round(r.utilityCost / 1e4) / 100, 3.76));
test('acceptance: annual savings ≈ $158K', () => assert.equal(Math.round(-r.annualSavings / 1000), 158));
test('decode yields 8760 hours', () => assert.equal(decodeProfile(t).length, 8760));

console.log(JSON.stringify({ annualEnergyMWh: r.annualEnergy / 1000, utilityCost: r.utilityCost, annualSavings: r.annualSavings,
  solarKw: r.solarKw, battKwh: r.battKwh, demandSavings: r.demandSavings, solarSavings: r.solarSavings, touSavings: r.touSavings,
  backupHours: r.backupHours, co2: r.co2, capex: r.capex, payback: r.payback }, null, 1));
