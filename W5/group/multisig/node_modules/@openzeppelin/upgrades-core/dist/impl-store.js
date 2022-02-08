"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrDeployAdmin = exports.fetchOrDeploy = void 0;
const debug_1 = __importDefault(require("./utils/debug"));
const manifest_1 = require("./manifest");
const provider_1 = require("./provider");
const deployment_1 = require("./deployment");
const assert_1 = __importDefault(require("assert"));
async function fetchOrDeployGeneric(lens, provider, deploy) {
    const manifest = await manifest_1.Manifest.forNetwork(provider);
    try {
        const deployment = await manifest.lockedRun(async () => {
            (0, debug_1.default)('fetching deployment of', lens.description);
            const data = await manifest.read();
            const deployment = lens(data);
            const stored = deployment.get();
            if (stored === undefined) {
                (0, debug_1.default)('deployment of', lens.description, 'not found');
            }
            const updated = await (0, deployment_1.resumeOrDeploy)(provider, stored, deploy);
            if (updated !== stored) {
                await checkForAddressClash(provider, data, updated);
                deployment.set(updated);
                await manifest.write(data);
            }
            return updated;
        });
        await (0, deployment_1.waitAndValidateDeployment)(provider, deployment);
        return deployment.address;
    }
    catch (e) {
        // If we run into a deployment error, we remove it from the manifest.
        if (e instanceof deployment_1.InvalidDeployment) {
            await manifest.lockedRun(async () => {
                (0, assert_1.default)(e instanceof deployment_1.InvalidDeployment); // Not sure why this is needed but otherwise doesn't type
                const data = await manifest.read();
                const deployment = lens(data);
                const stored = deployment.get();
                if ((stored === null || stored === void 0 ? void 0 : stored.txHash) === e.deployment.txHash) {
                    deployment.set(undefined);
                    await manifest.write(data);
                }
            });
            e.removed = true;
        }
        throw e;
    }
}
async function fetchOrDeploy(version, provider, deploy) {
    return fetchOrDeployGeneric(implLens(version.linkedWithoutMetadata), provider, deploy);
}
exports.fetchOrDeploy = fetchOrDeploy;
const implLens = (versionWithoutMetadata) => lens(`implementation ${versionWithoutMetadata}`, data => ({
    get: () => data.impls[versionWithoutMetadata],
    set: (value) => (data.impls[versionWithoutMetadata] = value),
}));
async function fetchOrDeployAdmin(provider, deploy) {
    return fetchOrDeployGeneric(adminLens, provider, deploy);
}
exports.fetchOrDeployAdmin = fetchOrDeployAdmin;
const adminLens = lens('proxy admin', data => ({
    get: () => data.admin,
    set: (value) => (data.admin = value),
}));
function lens(description, fn) {
    return Object.assign(fn, { description });
}
async function checkForAddressClash(provider, data, updated) {
    const clash = lookupDeployment(data, updated.address);
    if (clash !== undefined) {
        if (await (0, provider_1.isDevelopmentNetwork)(provider)) {
            (0, debug_1.default)('deleting a previous deployment at address', updated.address);
            clash.set(undefined);
        }
        else {
            throw new Error(`The following deployment clashes with an existing one at ${updated.address}\n\n` +
                JSON.stringify(updated, null, 2) +
                `\n\n`);
        }
    }
}
function lookupDeployment(data, address) {
    var _a, _b;
    if (((_a = data.admin) === null || _a === void 0 ? void 0 : _a.address) === address) {
        return adminLens(data);
    }
    for (const versionWithoutMetadata in data.impls) {
        if (((_b = data.impls[versionWithoutMetadata]) === null || _b === void 0 ? void 0 : _b.address) === address) {
            return implLens(versionWithoutMetadata)(data);
        }
    }
}
//# sourceMappingURL=impl-store.js.map