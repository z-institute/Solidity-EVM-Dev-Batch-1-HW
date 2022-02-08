"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValues = void 0;
function mapValues(obj, fn) {
    const res = {};
    for (const k in obj) {
        res[k] = fn(obj[k]);
    }
    return res;
}
exports.mapValues = mapValues;
//# sourceMappingURL=map-values.js.map