"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationsCacheOutdated = exports.ValidationsCacheNotFound = exports.readValidations = exports.writeValidations = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
async function writeValidations(hre, newRunData) {
    let storedData;
    try {
        storedData = await readValidations(hre);
    }
    catch (e) {
        // If there is no previous data to append to, we ignore the error and write
        // the file from scratch.
        if (!(e instanceof ValidationsCacheNotFound)) {
            throw e;
        }
    }
    const validations = (0, upgrades_core_1.concatRunData)(newRunData, storedData);
    await fs_1.promises.mkdir(hre.config.paths.cache, { recursive: true });
    await fs_1.promises.writeFile(getValidationsCachePath(hre), JSON.stringify(validations, null, 2));
}
exports.writeValidations = writeValidations;
async function readValidations(hre) {
    const cachePath = getValidationsCachePath(hre);
    try {
        const data = JSON.parse(await fs_1.promises.readFile(cachePath, 'utf8'));
        if (!(0, upgrades_core_1.isCurrentValidationData)(data)) {
            await fs_1.promises.unlink(cachePath);
            throw new ValidationsCacheOutdated();
        }
        return data;
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            throw new ValidationsCacheNotFound();
        }
        else {
            throw e;
        }
    }
}
exports.readValidations = readValidations;
class ValidationsCacheNotFound extends Error {
    constructor() {
        super('Validations cache not found. Recompile with `hardhat compile --force`');
    }
}
exports.ValidationsCacheNotFound = ValidationsCacheNotFound;
class ValidationsCacheOutdated extends Error {
    constructor() {
        super('Validations cache is outdated. Recompile with `hardhat compile --force`');
    }
}
exports.ValidationsCacheOutdated = ValidationsCacheOutdated;
function getValidationsCachePath(hre) {
    return path_1.default.join(hre.config.paths.cache, 'validations.json');
}
//# sourceMappingURL=validations.js.map