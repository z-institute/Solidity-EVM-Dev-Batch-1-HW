"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentNotFound = exports.migrateManifest = exports.Manifest = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const provider_1 = require("./provider");
const proper_lockfile_1 = __importDefault(require("proper-lockfile"));
const compare_versions_1 = require("compare-versions");
const pick_1 = require("./utils/pick");
const map_values_1 = require("./utils/map-values");
const currentManifestVersion = '3.2';
function defaultManifest() {
    return {
        manifestVersion: currentManifestVersion,
        impls: {},
        proxies: [],
    };
}
const manifestDir = '.openzeppelin';
class Manifest {
    constructor(chainId) {
        var _a;
        this.chainId = chainId;
        this.locked = false;
        const name = (_a = provider_1.networkNames[chainId]) !== null && _a !== void 0 ? _a : `unknown-${chainId}`;
        this.file = path_1.default.join(manifestDir, `${name}.json`);
    }
    static async forNetwork(provider) {
        return new Manifest(await (0, provider_1.getChainId)(provider));
    }
    async getAdmin() {
        return (await this.read()).admin;
    }
    async getDeploymentFromAddress(address) {
        const data = await this.read();
        const deployment = Object.values(data.impls).find(d => (d === null || d === void 0 ? void 0 : d.address) === address);
        if (deployment === undefined) {
            throw new DeploymentNotFound(`Deployment at address ${address} is not registered`);
        }
        return deployment;
    }
    async getProxyFromAddress(address) {
        const data = await this.read();
        const deployment = data.proxies.find(d => (d === null || d === void 0 ? void 0 : d.address) === address);
        if (deployment === undefined) {
            throw new DeploymentNotFound(`Proxy at address ${address} is not registered`);
        }
        return deployment;
    }
    async addProxy(proxy) {
        await this.lockedRun(async () => {
            const data = await this.read();
            const existing = data.proxies.findIndex(p => p.address === proxy.address);
            if (existing >= 0) {
                data.proxies.splice(existing, 1);
            }
            data.proxies.push(proxy);
            await this.write(data);
        });
    }
    async read() {
        const release = this.locked ? undefined : await this.lock();
        try {
            const data = JSON.parse(await fs_1.promises.readFile(this.file, 'utf8'));
            return validateOrUpdateManifestVersion(data);
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return defaultManifest();
            }
            else {
                throw e;
            }
        }
        finally {
            await (release === null || release === void 0 ? void 0 : release());
        }
    }
    async write(data) {
        if (!this.locked) {
            throw new Error('Manifest must be locked');
        }
        const normalized = normalizeManifestData(data);
        await fs_1.promises.writeFile(this.file, JSON.stringify(normalized, null, 2) + '\n');
    }
    async lockedRun(cb) {
        if (this.locked) {
            throw new Error('Manifest is already locked');
        }
        const release = await this.lock();
        try {
            return await cb();
        }
        finally {
            await release();
        }
    }
    async lock() {
        await fs_1.promises.mkdir(path_1.default.dirname(this.file), { recursive: true });
        const release = await proper_lockfile_1.default.lock(this.file, { retries: 3, realpath: false });
        this.locked = true;
        return async () => {
            await release();
            this.locked = false;
        };
    }
}
exports.Manifest = Manifest;
function validateOrUpdateManifestVersion(data) {
    if (typeof data.manifestVersion !== 'string') {
        throw new Error('Manifest version is missing');
    }
    else if ((0, compare_versions_1.compare)(data.manifestVersion, '3.0', '<')) {
        throw new Error('Found a manifest file for OpenZeppelin CLI. An automated migration is not yet available.');
    }
    else if ((0, compare_versions_1.compare)(data.manifestVersion, currentManifestVersion, '<')) {
        return migrateManifest(data);
    }
    else if (data.manifestVersion === currentManifestVersion) {
        return data;
    }
    else {
        throw new Error(`Unknown value for manifest version (${data.manifestVersion})`);
    }
}
function migrateManifest(data) {
    switch (data.manifestVersion) {
        case '3.0':
        case '3.1':
            data.manifestVersion = currentManifestVersion;
            data.proxies = [];
            return data;
        default:
            throw new Error('Manifest migration not available');
    }
}
exports.migrateManifest = migrateManifest;
class DeploymentNotFound extends Error {
}
exports.DeploymentNotFound = DeploymentNotFound;
function normalizeManifestData(input) {
    return {
        ...(0, pick_1.pick)(input, ['manifestVersion', 'admin']),
        proxies: input.proxies.map(p => normalizeDeployment(p, ['kind'])),
        impls: (0, map_values_1.mapValues)(input.impls, i => i && normalizeDeployment(i, ['layout'])),
    };
}
function normalizeDeployment(input, include = []) {
    return (0, pick_1.pick)(input, ['address', 'txHash', ...include]);
}
//# sourceMappingURL=manifest.js.map