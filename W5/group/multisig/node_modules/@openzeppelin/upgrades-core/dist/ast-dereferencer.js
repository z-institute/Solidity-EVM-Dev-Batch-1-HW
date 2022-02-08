"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astDereferencer = void 0;
const utils_1 = require("solidity-ast/utils");
const curry_1 = require("./utils/curry");
function astDereferencer(solcOutput) {
    const asts = Array.from(Object.values(solcOutput.sources), s => s.ast);
    const cache = new Map();
    function deref(nodeTypes, id) {
        const cached = cache.get(id);
        if (cached) {
            if (nodeTypes.includes(cached.nodeType)) {
                return cached;
            }
        }
        for (const ast of asts) {
            for (const node of (0, utils_1.findAll)(nodeTypes, ast)) {
                if (node.id === id) {
                    cache.set(id, node);
                    return node;
                }
            }
        }
        throw new Error(`No node with id ${id} of type ${nodeTypes}`);
    }
    return (0, curry_1.curry2)(deref);
}
exports.astDereferencer = astDereferencer;
//# sourceMappingURL=ast-dereferencer.js.map