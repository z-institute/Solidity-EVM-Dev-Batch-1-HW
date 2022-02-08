"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFullSolcOutput = void 0;
function isFullSolcOutput(output) {
    var _a;
    if ((output === null || output === void 0 ? void 0 : output.contracts) == undefined || (output === null || output === void 0 ? void 0 : output.sources) == undefined) {
        return false;
    }
    for (const file of Object.values(output.contracts)) {
        if (file == undefined) {
            return false;
        }
        for (const contract of Object.values(file)) {
            if (((_a = contract === null || contract === void 0 ? void 0 : contract.evm) === null || _a === void 0 ? void 0 : _a.bytecode) == undefined) {
                return false;
            }
        }
    }
    for (const file of Object.values(output.sources)) {
        if ((file === null || file === void 0 ? void 0 : file.ast) == undefined || (file === null || file === void 0 ? void 0 : file.id) == undefined) {
            return false;
        }
    }
    return true;
}
exports.isFullSolcOutput = isFullSolcOutput;
//# sourceMappingURL=is-full-solc-output.js.map