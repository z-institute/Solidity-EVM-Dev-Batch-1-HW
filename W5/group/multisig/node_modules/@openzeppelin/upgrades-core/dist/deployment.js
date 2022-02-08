"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDeployment = exports.TransactionMinedTimeout = exports.waitAndValidateDeployment = exports.resumeOrDeploy = void 0;
const util_1 = require("util");
const debug_1 = __importDefault(require("./utils/debug"));
const make_non_enumerable_1 = require("./utils/make-non-enumerable");
const provider_1 = require("./provider");
const sleep = (0, util_1.promisify)(setTimeout);
async function resumeOrDeploy(provider, cached, deploy) {
    if (cached !== undefined) {
        const { txHash } = cached;
        if (txHash === undefined) {
            // Nothing to do here without a txHash.
            // This is the case for deployments migrated from OpenZeppelin CLI.
            return cached;
        }
        // If there is a deployment with txHash stored, we look its transaction up. If the
        // transaction is found, the deployment is reused.
        (0, debug_1.default)('found previous deployment', txHash);
        const tx = await (0, provider_1.getTransactionByHash)(provider, txHash);
        if (tx !== null) {
            (0, debug_1.default)('resuming previous deployment', txHash);
            return cached;
        }
        else if (!(await (0, provider_1.isDevelopmentNetwork)(provider))) {
            // If the transaction is not found we throw an error, except if we're in
            // a development network then we simply silently redeploy.
            throw new InvalidDeployment(cached);
        }
        else {
            (0, debug_1.default)('ignoring invalid deployment in development network', txHash);
        }
    }
    const deployment = await deploy();
    (0, debug_1.default)('initiated deployment', deployment.txHash);
    return deployment;
}
exports.resumeOrDeploy = resumeOrDeploy;
async function waitAndValidateDeployment(provider, deployment) {
    const { txHash, address } = deployment;
    // Poll for 60 seconds with a 5 second poll interval.
    // TODO: Make these parameters configurable.
    const pollTimeout = 60e3;
    const pollInterval = 5e3;
    if (txHash !== undefined) {
        const startTime = Date.now();
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= pollTimeout) {
                // A timeout is NOT an InvalidDeployment
                throw new TransactionMinedTimeout(deployment);
            }
            (0, debug_1.default)('verifying deployment tx mined', txHash);
            const receipt = await (0, provider_1.getTransactionReceipt)(provider, txHash);
            if (receipt && (0, provider_1.isReceiptSuccessful)(receipt)) {
                (0, debug_1.default)('succeeded verifying deployment tx mined', txHash);
                break;
            }
            else if (receipt) {
                (0, debug_1.default)('tx was reverted', txHash);
                throw new InvalidDeployment(deployment);
            }
            else {
                (0, debug_1.default)('waiting for deployment tx mined', txHash);
                await sleep(pollInterval);
            }
        }
    }
    (0, debug_1.default)('verifying code in target address', address);
    const startTime = Date.now();
    while (!(await (0, provider_1.hasCode)(provider, address))) {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= pollTimeout || txHash === undefined) {
            throw new InvalidDeployment(deployment);
        }
        await sleep(pollInterval);
    }
    (0, debug_1.default)('code in target address found', address);
}
exports.waitAndValidateDeployment = waitAndValidateDeployment;
class TransactionMinedTimeout extends Error {
    constructor(deployment) {
        super(`Timed out waiting for transaction ${deployment.txHash}`);
        this.deployment = deployment;
    }
}
exports.TransactionMinedTimeout = TransactionMinedTimeout;
class InvalidDeployment extends Error {
    constructor(deployment) {
        super();
        this.deployment = deployment;
        this.removed = false;
        // This hides the properties from the error when it's printed.
        (0, make_non_enumerable_1.makeNonEnumerable)(this, 'removed');
        (0, make_non_enumerable_1.makeNonEnumerable)(this, 'deployment');
    }
    get message() {
        let msg = `No contract at address ${this.deployment.address}`;
        if (this.removed) {
            msg += ' (Removed from manifest)';
        }
        return msg;
    }
}
exports.InvalidDeployment = InvalidDeployment;
//# sourceMappingURL=deployment.js.map