"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrors = void 0;
const error_1 = require("../error");
const report_1 = require("./report");
class ValidationErrors extends error_1.UpgradesError {
    constructor(contractName, errors) {
        super(`Contract \`${contractName}\` is not upgrade safe`, () => new report_1.UpgradeableContractErrorReport(errors).explain());
        this.errors = errors;
    }
}
exports.ValidationErrors = ValidationErrors;
//# sourceMappingURL=error.js.map