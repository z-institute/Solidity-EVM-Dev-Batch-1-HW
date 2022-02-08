"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProxyKind = exports.setProxyKind = void 0;
const validate_1 = require("./validate");
const manifest_1 = require("./manifest");
const eip_1967_type_1 = require("./eip-1967-type");
const usage_error_1 = require("./usage-error");
async function setProxyKind(provider, proxyAddress, opts) {
    var _a;
    const manifest = await manifest_1.Manifest.forNetwork(provider);
    const manifestDeployment = await manifest.getProxyFromAddress(proxyAddress).catch(e => {
        if (e instanceof manifest_1.DeploymentNotFound) {
            return undefined;
        }
        else {
            throw e;
        }
    });
    if (opts.kind === undefined) {
        opts.kind = (_a = manifestDeployment === null || manifestDeployment === void 0 ? void 0 : manifestDeployment.kind) !== null && _a !== void 0 ? _a : 'transparent';
    }
    else if (manifestDeployment && opts.kind !== manifestDeployment.kind) {
        throw new Error(`Requested an upgrade of kind ${opts.kind} but proxy is ${manifestDeployment.kind}`);
    }
    return opts.kind;
}
exports.setProxyKind = setProxyKind;
/**
 * Processes opts.kind when deploying the implementation for a UUPS or Transparent proxy.
 *
 * @throws {BeaconProxyUnsupportedError} If this function is called for a Beacon proxy.
 */
async function processProxyKind(provider, proxyAddress, opts, data, version) {
    if (opts.kind === undefined) {
        if (proxyAddress !== undefined && (await (0, eip_1967_type_1.isBeaconProxy)(provider, proxyAddress))) {
            opts.kind = 'beacon';
        }
        else {
            opts.kind = (0, validate_1.inferProxyKind)(data, version);
        }
    }
    if (proxyAddress !== undefined) {
        await setProxyKind(provider, proxyAddress, opts);
    }
    if (opts.kind === 'beacon') {
        throw new usage_error_1.BeaconProxyUnsupportedError();
    }
}
exports.processProxyKind = processProxyKind;
//# sourceMappingURL=proxy-kind.js.map