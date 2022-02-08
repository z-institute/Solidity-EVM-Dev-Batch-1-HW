"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const utils_1 = require("solidity-ast/utils");
const ast_dereferencer_1 = require("../ast-dereferencer");
const is_nullish_1 = require("../utils/is-nullish");
const function_1 = require("../utils/function");
const version_1 = require("../version");
const link_refs_1 = require("../link-refs");
const extract_1 = require("../storage/extract");
const errorKinds = [
    'state-variable-assignment',
    'state-variable-immutable',
    'external-library-linking',
    'struct-definition',
    'enum-definition',
    'constructor',
    'delegatecall',
    'selfdestruct',
    'missing-public-upgradeto',
];
function* execall(re, text) {
    re = new RegExp(re, re.flags + (re.sticky ? '' : 'y'));
    while (true) {
        const match = re.exec(text);
        if (match && match[0] !== '') {
            yield match;
        }
        else {
            break;
        }
    }
}
function getAllowed(node) {
    var _a, _b;
    if ('documentation' in node) {
        const doc = typeof node.documentation === 'string' ? node.documentation : (_b = (_a = node.documentation) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : '';
        const result = [];
        for (const { groups } of execall(/^\s*(?:@(?<title>\w+)(?::(?<tag>[a-z][a-z-]*))? )?(?<args>(?:(?!^\s@\w+)[^])*)/m, doc)) {
            if (groups && groups.title === 'custom' && groups.tag === 'oz-upgrades-unsafe-allow') {
                result.push(...groups.args.split(/\s+/));
            }
        }
        result.forEach(arg => {
            if (!errorKinds.includes(arg)) {
                throw new Error(`NatSpec: oz-upgrades-unsafe-allow argument not recognized: ${arg}`);
            }
        });
        return result;
    }
    else {
        return [];
    }
}
function skipCheck(error, node) {
    return getAllowed(node).includes(error);
}
function validate(solcOutput, decodeSrc) {
    var _a;
    const validation = {};
    const fromId = {};
    const inheritIds = {};
    const libraryIds = {};
    const deref = (0, ast_dereferencer_1.astDereferencer)(solcOutput);
    for (const source in solcOutput.contracts) {
        for (const contractName in solcOutput.contracts[source]) {
            const bytecode = solcOutput.contracts[source][contractName].evm.bytecode;
            const version = bytecode.object === '' ? undefined : (0, version_1.getVersion)(bytecode.object);
            const linkReferences = (0, link_refs_1.extractLinkReferences)(bytecode);
            validation[contractName] = {
                src: contractName,
                version,
                inherit: [],
                libraries: [],
                methods: [],
                linkReferences,
                errors: [],
                layout: {
                    storage: [],
                    types: {},
                },
            };
        }
        for (const contractDef of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources[source].ast)) {
            fromId[contractDef.id] = contractDef.name;
            // May be undefined in case of duplicate contract names in Truffle
            const bytecode = (_a = solcOutput.contracts[source][contractDef.name]) === null || _a === void 0 ? void 0 : _a.evm.bytecode;
            if (contractDef.name in validation && bytecode !== undefined) {
                inheritIds[contractDef.name] = contractDef.linearizedBaseContracts.slice(1);
                libraryIds[contractDef.name] = getReferencedLibraryIds(contractDef);
                validation[contractDef.name].src = decodeSrc(contractDef);
                validation[contractDef.name].errors = [
                    ...getConstructorErrors(contractDef, decodeSrc),
                    ...getOpcodeErrors(contractDef, decodeSrc),
                    ...getStateVariableErrors(contractDef, decodeSrc),
                    // TODO: add linked libraries support
                    // https://github.com/OpenZeppelin/openzeppelin-upgrades/issues/52
                    ...getLinkingErrors(contractDef, bytecode),
                ];
                validation[contractDef.name].layout = (0, extract_1.extractStorageLayout)(contractDef, decodeSrc, deref);
                validation[contractDef.name].methods = [...(0, utils_1.findAll)('FunctionDefinition', contractDef)]
                    .filter(fnDef => ['external', 'public'].includes(fnDef.visibility))
                    .map(fnDef => (0, function_1.getFunctionSignature)(fnDef, deref));
            }
        }
    }
    for (const contractName in inheritIds) {
        validation[contractName].inherit = inheritIds[contractName].map(id => fromId[id]);
    }
    for (const contractName in libraryIds) {
        validation[contractName].libraries = libraryIds[contractName].map(id => fromId[id]);
    }
    return validation;
}
exports.validate = validate;
function* getConstructorErrors(contractDef, decodeSrc) {
    var _a, _b, _c;
    for (const fnDef of (0, utils_1.findAll)('FunctionDefinition', contractDef, node => skipCheck('constructor', node))) {
        if (fnDef.kind === 'constructor' && (((_c = (_b = (_a = fnDef.body) === null || _a === void 0 ? void 0 : _a.statements) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0 || fnDef.modifiers.length > 0)) {
            yield {
                kind: 'constructor',
                contract: contractDef.name,
                src: decodeSrc(fnDef),
            };
        }
    }
}
function* getOpcodeErrors(contractDef, decodeSrc) {
    var _a, _b;
    for (const fnCall of (0, utils_1.findAll)('FunctionCall', contractDef, node => skipCheck('delegatecall', node))) {
        const fn = fnCall.expression;
        if ((_a = fn.typeDescriptions.typeIdentifier) === null || _a === void 0 ? void 0 : _a.match(/^t_function_baredelegatecall_/)) {
            yield {
                kind: 'delegatecall',
                src: decodeSrc(fnCall),
            };
        }
    }
    for (const fnCall of (0, utils_1.findAll)('FunctionCall', contractDef, node => skipCheck('selfdestruct', node))) {
        const fn = fnCall.expression;
        if ((_b = fn.typeDescriptions.typeIdentifier) === null || _b === void 0 ? void 0 : _b.match(/^t_function_selfdestruct_/)) {
            yield {
                kind: 'selfdestruct',
                src: decodeSrc(fnCall),
            };
        }
    }
}
function* getStateVariableErrors(contractDef, decodeSrc) {
    for (const varDecl of contractDef.nodes) {
        if ((0, utils_1.isNodeType)('VariableDeclaration', varDecl)) {
            if (!varDecl.constant && !(0, is_nullish_1.isNullish)(varDecl.value)) {
                if (!skipCheck('state-variable-assignment', contractDef) && !skipCheck('state-variable-assignment', varDecl)) {
                    yield {
                        kind: 'state-variable-assignment',
                        name: varDecl.name,
                        src: decodeSrc(varDecl),
                    };
                }
            }
            if (varDecl.mutability === 'immutable') {
                if (!skipCheck('state-variable-immutable', contractDef) && !skipCheck('state-variable-immutable', varDecl)) {
                    yield {
                        kind: 'state-variable-immutable',
                        name: varDecl.name,
                        src: decodeSrc(varDecl),
                    };
                }
            }
        }
    }
}
function getReferencedLibraryIds(contractDef) {
    const implicitUsage = [...(0, utils_1.findAll)('UsingForDirective', contractDef)].map(usingForDirective => usingForDirective.libraryName.referencedDeclaration);
    const explicitUsage = [...(0, utils_1.findAll)('Identifier', contractDef)]
        .filter(identifier => { var _a; return (_a = identifier.typeDescriptions.typeString) === null || _a === void 0 ? void 0 : _a.match(/^type\(library/); })
        .map(identifier => {
        if ((0, is_nullish_1.isNullish)(identifier.referencedDeclaration)) {
            throw new Error('Broken invariant: Identifier.referencedDeclaration should not be null');
        }
        return identifier.referencedDeclaration;
    });
    return [...new Set(implicitUsage.concat(explicitUsage))];
}
function* getLinkingErrors(contractDef, bytecode) {
    const { linkReferences } = bytecode;
    for (const source of Object.keys(linkReferences)) {
        for (const libName of Object.keys(linkReferences[source])) {
            if (!skipCheck('external-library-linking', contractDef)) {
                yield {
                    kind: 'external-library-linking',
                    name: libName,
                    src: source,
                };
            }
        }
    }
}
//# sourceMappingURL=run.js.map