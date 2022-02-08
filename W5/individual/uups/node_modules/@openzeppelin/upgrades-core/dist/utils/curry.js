"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry2 = void 0;
function curry2(fn) {
    function curried(a, ...b) {
        if (b.length === 0) {
            return b => fn(a, b);
        }
        else {
            return fn(a, ...b);
        }
    }
    return curried;
}
exports.curry2 = curry2;
//# sourceMappingURL=curry.js.map