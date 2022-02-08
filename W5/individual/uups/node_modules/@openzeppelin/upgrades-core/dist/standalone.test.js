"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const standalone_1 = require("./standalone");
const test = ava_1.default;
test.before(async (t) => {
    const buildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/Standalone.sol:StandaloneV1');
    if (buildInfo === undefined) {
        throw new Error('Build info not found');
    }
    t.context.solcInput = buildInfo.input;
    t.context.solcOutput = buildInfo.output;
});
test('reports unsafe operation', t => {
    const impl = new standalone_1.UpgradeableContract('StandaloneV1', t.context.solcInput, t.context.solcOutput);
    const report = impl.getErrorReport();
    t.false(report.ok);
    t.true(report.errors[0].kind === 'delegatecall');
});
test('reports storage upgrade errors', t => {
    const v1 = new standalone_1.UpgradeableContract('StandaloneV1', t.context.solcInput, t.context.solcOutput);
    const v2Good = new standalone_1.UpgradeableContract('StandaloneV2Good', t.context.solcInput, t.context.solcOutput);
    const goodReport = v1.getStorageUpgradeReport(v2Good);
    t.true(goodReport.ok);
    const v2Bad = new standalone_1.UpgradeableContract('StandaloneV2Bad', t.context.solcInput, t.context.solcOutput);
    const badReport = v1.getStorageUpgradeReport(v2Bad);
    t.false(badReport.ok);
});
//# sourceMappingURL=standalone.test.js.map