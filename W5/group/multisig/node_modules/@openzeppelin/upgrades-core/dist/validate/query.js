"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferProxyKind = exports.isUpgradeSafe = exports.getErrors = exports.getUnlinkedBytecode = exports.findVersionWithoutMetadataMatches = exports.unfoldStorageLayout = exports.getStorageLayout = exports.getContractNameAndRunValidation = exports.getContractVersion = exports.assertUpgradeSafe = void 0;
const version_1 = require("../version");
const link_refs_1 = require("../link-refs");
const overrides_1 = require("./overrides");
const error_1 = require("./error");
const data_1 = require("./data");
const upgradeToSignature = 'upgradeTo(address)';
function assertUpgradeSafe(data, version, opts) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [contractName] = getContractNameAndRunValidation(dataV3, version);
    const errors = getErrors(dataV3, version, opts);
    if (errors.length > 0) {
        throw new error_1.ValidationErrors(contractName, errors);
    }
}
exports.assertUpgradeSafe = assertUpgradeSafe;
function getContractVersion(runData, contractName) {
    const { version } = runData[contractName];
    if (version === undefined) {
        throw new Error(`Contract ${contractName} is abstract`);
    }
    return version;
}
exports.getContractVersion = getContractVersion;
function getContractNameAndRunValidation(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    let runValidation;
    let contractName;
    for (const validation of dataV3.log) {
        contractName = Object.keys(validation).find(name => { var _a; return ((_a = validation[name].version) === null || _a === void 0 ? void 0 : _a.withMetadata) === version.withMetadata; });
        if (contractName !== undefined) {
            runValidation = validation;
            break;
        }
    }
    if (contractName === undefined || runValidation === undefined) {
        throw new Error('The requested contract was not found. Make sure the source code is available for compilation');
    }
    return [contractName, runValidation];
}
exports.getContractNameAndRunValidation = getContractNameAndRunValidation;
function getStorageLayout(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [contractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    return unfoldStorageLayout(runValidation, contractName);
}
exports.getStorageLayout = getStorageLayout;
function unfoldStorageLayout(runData, contractName) {
    const c = runData[contractName];
    const layout = { storage: [], types: {} };
    for (const name of [contractName].concat(c.inherit)) {
        layout.storage.unshift(...runData[name].layout.storage);
        Object.assign(layout.types, runData[name].layout.types);
    }
    return layout;
}
exports.unfoldStorageLayout = unfoldStorageLayout;
function* findVersionWithoutMetadataMatches(data, versionWithoutMetadata) {
    var _a;
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    for (const validation of dataV3.log) {
        for (const contractName in validation) {
            if (((_a = validation[contractName].version) === null || _a === void 0 ? void 0 : _a.withoutMetadata) === versionWithoutMetadata) {
                yield [contractName, validation];
            }
        }
    }
}
exports.findVersionWithoutMetadataMatches = findVersionWithoutMetadataMatches;
function getUnlinkedBytecode(data, bytecode) {
    var _a;
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    for (const validation of dataV3.log) {
        const linkableContracts = Object.keys(validation).filter(name => validation[name].linkReferences.length > 0);
        for (const name of linkableContracts) {
            const { linkReferences } = validation[name];
            const unlinkedBytecode = (0, link_refs_1.unlinkBytecode)(bytecode, linkReferences);
            const version = (0, version_1.getVersion)(unlinkedBytecode);
            if (((_a = validation[name].version) === null || _a === void 0 ? void 0 : _a.withMetadata) === version.withMetadata) {
                return unlinkedBytecode;
            }
        }
    }
    return bytecode;
}
exports.getUnlinkedBytecode = getUnlinkedBytecode;
function getErrors(data, version, opts = {}) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [contractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    const c = runValidation[contractName];
    const errors = getUsedContractsAndLibraries(contractName, runValidation).flatMap(name => runValidation[name].errors);
    const selfAndInheritedMethods = getAllMethods(runValidation, contractName);
    if (!selfAndInheritedMethods.includes(upgradeToSignature)) {
        errors.push({
            src: c.src,
            kind: 'missing-public-upgradeto',
        });
    }
    return (0, overrides_1.processExceptions)(contractName, errors, opts);
}
exports.getErrors = getErrors;
function getAllMethods(runValidation, contractName) {
    const c = runValidation[contractName];
    return c.methods.concat(...c.inherit.map(name => runValidation[name].methods));
}
function getUsedContractsAndLibraries(contractName, runValidation) {
    const c = runValidation[contractName];
    // Add current contract and all of its parents
    const res = new Set([contractName, ...c.inherit]);
    // Add used libraries transitively until no more are found
    for (const c1 of res) {
        for (const c2 of runValidation[c1].libraries) {
            res.add(c2);
        }
    }
    return Array.from(res);
}
function isUpgradeSafe(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    return getErrors(dataV3, version).length == 0;
}
exports.isUpgradeSafe = isUpgradeSafe;
function inferProxyKind(data, version) {
    const dataV3 = (0, data_1.normalizeValidationData)(data);
    const [contractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    const methods = getAllMethods(runValidation, contractName);
    if (methods.includes(upgradeToSignature)) {
        return 'uups';
    }
    else {
        return 'transparent';
    }
}
exports.inferProxyKind = inferProxyKind;
//# sourceMappingURL=query.js.map