"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const util_1 = require("util");
const deployment_1 = require("./deployment");
const stub_provider_1 = require("./stub-provider");
const sleep = (0, util_1.promisify)(setTimeout);
(0, ava_1.default)('deploys new contract', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    t.true(provider.isContract(deployment.address));
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('resumes existing deployment with txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const first = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deployPending);
    const second = await (0, deployment_1.resumeOrDeploy)(provider, first, provider.deployPending);
    t.is(first, second);
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('resumes existing deployment without txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const first = await provider.deploy();
    delete first.txHash;
    const second = await (0, deployment_1.resumeOrDeploy)(provider, first, provider.deployPending);
    t.is(first, second);
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('errors if tx is not found', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
    };
    await t.throwsAsync((0, deployment_1.resumeOrDeploy)(provider, fakeDeployment, provider.deploy));
});
(0, ava_1.default)('redeploys if tx is not found on dev network', async (t) => {
    // 31337 = Hardhat Network chainId
    const provider = (0, stub_provider_1.stubProvider)(31337, 'HardhatNetwork/2.2.1/@ethereumjs/vm/5.3.2');
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
    };
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, fakeDeployment, provider.deploy);
    t.true(provider.isContract(deployment.address));
    t.is(provider.deployCount, 1);
});
(0, ava_1.default)('validates a mined deployment with txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
    t.is(provider.getMethodCount('eth_getTransactionReceipt'), 1);
    t.is(provider.getMethodCount('eth_getCode'), 1);
});
(0, ava_1.default)('validates a mined deployment without txHash', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    delete deployment.txHash;
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
    t.is(provider.getMethodCount('eth_getTransactionReceipt'), 0);
    t.is(provider.getMethodCount('eth_getCode'), 1);
});
(0, ava_1.default)('waits for a deployment to mine', async (t) => {
    const timeout = Symbol('timeout');
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deployPending);
    const result = await Promise.race([(0, deployment_1.waitAndValidateDeployment)(provider, deployment), sleep(100).then(() => timeout)]);
    t.is(result, timeout);
    provider.mine();
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
});
(0, ava_1.default)('fails deployment fast if tx reverts', async (t) => {
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider.failTx(deployment.txHash);
    await t.throwsAsync((0, deployment_1.waitAndValidateDeployment)(provider, deployment));
});
(0, ava_1.default)('waits for a deployment to return contract code', async (t) => {
    const timeout = Symbol('timeout');
    const provider = (0, stub_provider_1.stubProvider)();
    const deployment = await (0, deployment_1.resumeOrDeploy)(provider, undefined, provider.deploy);
    provider.removeContract(deployment.address);
    const result = await Promise.race([(0, deployment_1.waitAndValidateDeployment)(provider, deployment), sleep(100).then(() => timeout)]);
    t.is(result, timeout);
    provider.addContract(deployment.address);
    await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
});
//# sourceMappingURL=deployment.test.js.map