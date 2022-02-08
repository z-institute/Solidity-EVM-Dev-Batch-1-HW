"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStorageLayout = exports.isCurrentLayoutVersion = void 0;
const assert_1 = __importDefault(require("assert"));
const utils_1 = require("solidity-ast/utils");
const type_id_1 = require("../utils/type-id");
const currentLayoutVersion = '1.1';
function isCurrentLayoutVersion(layout) {
    return (layout === null || layout === void 0 ? void 0 : layout.layoutVersion) === currentLayoutVersion;
}
exports.isCurrentLayoutVersion = isCurrentLayoutVersion;
function extractStorageLayout(contractDef, decodeSrc, deref) {
    const layout = { storage: [], types: {}, layoutVersion: currentLayoutVersion };
    // Note: A UserDefinedTypeName can also refer to a ContractDefinition but we won't care about those.
    const derefUserDefinedType = deref(['StructDefinition', 'EnumDefinition']);
    for (const varDecl of contractDef.nodes) {
        if ((0, utils_1.isNodeType)('VariableDeclaration', varDecl)) {
            if (!varDecl.constant && varDecl.mutability !== 'immutable') {
                const type = (0, type_id_1.normalizeTypeIdentifier)(typeDescriptions(varDecl).typeIdentifier);
                layout.storage.push({
                    contract: contractDef.name,
                    label: varDecl.name,
                    type,
                    src: decodeSrc(varDecl),
                });
                (0, assert_1.default)(varDecl.typeName != null);
                // We will recursively look for all types involved in this variable declaration in order to store their type
                // information. We iterate over a Map that is indexed by typeIdentifier to ensure we visit each type only once.
                // Note that there can be recursive types.
                const typeNames = new Map([...findTypeNames(varDecl.typeName)].map(n => [typeDescriptions(n).typeIdentifier, n]));
                for (const typeName of typeNames.values()) {
                    const { typeIdentifier, typeString: label } = typeDescriptions(typeName);
                    const type = (0, type_id_1.normalizeTypeIdentifier)(typeIdentifier);
                    if (type in layout.types) {
                        continue;
                    }
                    let members;
                    if ('referencedDeclaration' in typeName && !/^t_contract\b/.test(type)) {
                        const typeDef = derefUserDefinedType(typeName.referencedDeclaration);
                        members = getTypeMembers(typeDef);
                        // Recursively look for the types referenced in this definition and add them to the queue.
                        for (const typeName of findTypeNames(typeDef)) {
                            const { typeIdentifier } = typeDescriptions(typeName);
                            if (!typeNames.has(typeIdentifier)) {
                                typeNames.set(typeIdentifier, typeName);
                            }
                        }
                    }
                    layout.types[type] = { label, members };
                }
            }
        }
    }
    return layout;
}
exports.extractStorageLayout = extractStorageLayout;
const findTypeNames = (0, utils_1.findAll)([
    'ArrayTypeName',
    'ElementaryTypeName',
    'FunctionTypeName',
    'Mapping',
    'UserDefinedTypeName',
]);
function typeDescriptions(x) {
    (0, assert_1.default)(typeof x.typeDescriptions.typeIdentifier === 'string');
    (0, assert_1.default)(typeof x.typeDescriptions.typeString === 'string');
    return x.typeDescriptions;
}
function getTypeMembers(typeDef) {
    if (typeDef.nodeType === 'StructDefinition') {
        return typeDef.members.map(m => {
            (0, assert_1.default)(typeof m.typeDescriptions.typeIdentifier === 'string');
            return {
                label: m.name,
                type: (0, type_id_1.normalizeTypeIdentifier)(m.typeDescriptions.typeIdentifier),
            };
        });
    }
    else {
        return typeDef.members.map(m => m.name);
    }
}
//# sourceMappingURL=extract.js.map