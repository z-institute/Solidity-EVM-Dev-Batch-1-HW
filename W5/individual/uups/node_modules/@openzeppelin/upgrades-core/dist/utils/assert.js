"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.assertUnreachable = void 0;
function assertUnreachable(_) {
    assert(false);
}
exports.assertUnreachable = assertUnreachable;
function assert(p) {
    if (!p) {
        throw new Error('An unexpected condition occurred. Please report this at https://zpl.in/upgrades/report');
    }
}
exports.assert = assert;
//# sourceMappingURL=assert.js.map