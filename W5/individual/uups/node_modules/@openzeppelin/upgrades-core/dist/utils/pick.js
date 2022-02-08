"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
function pick(obj, keys) {
    const res = {};
    for (const k of keys) {
        res[k] = obj[k];
    }
    return res;
}
exports.pick = pick;
//# sourceMappingURL=pick.js.map