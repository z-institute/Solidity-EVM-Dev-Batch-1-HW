"use strict";
// itemize returns a markdown-like list of the items
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemizeWith = exports.itemize = void 0;
// itemize['a\nb', 'c'] =
// - a
//   b
// - c
const indent_1 = require("./indent");
function itemize(...items) {
    return itemizeWith('-', ...items);
}
exports.itemize = itemize;
function itemizeWith(bullet, ...items) {
    return items.map(item => bullet + (0, indent_1.indent)(item, 2, 1)).join('\n');
}
exports.itemizeWith = itemizeWith;
//# sourceMappingURL=itemize.js.map