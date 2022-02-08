"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indent = void 0;
function indent(text, amount, amount0 = amount) {
    return text.replace(/^/gm, (_, i) => ' '.repeat(i === 0 ? amount0 : amount));
}
exports.indent = indent;
//# sourceMappingURL=indent.js.map