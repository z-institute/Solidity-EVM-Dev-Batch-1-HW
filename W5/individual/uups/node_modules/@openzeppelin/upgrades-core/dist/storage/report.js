"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutCompatibilityReport = void 0;
const chalk_1 = __importDefault(require("chalk"));
const itemize_1 = require("../utils/itemize");
const indent_1 = require("../utils/indent");
const assert_1 = require("../utils/assert");
class LayoutCompatibilityReport {
    constructor(ops) {
        this.ops = ops;
    }
    get ok() {
        return this.pass;
    }
    get pass() {
        return this.ops.length === 0;
    }
    explain(color = true) {
        const chalk = new chalk_1.default.Instance({ level: color && chalk_1.default.supportsColor ? chalk_1.default.supportsColor.level : 0 });
        const res = [];
        for (const op of this.ops) {
            const src = 'updated' in op ? op.updated.src : op.original.contract;
            res.push(chalk.bold(src) + ':' + (0, indent_1.indent)(explainStorageOperation(op, { kind: 'layout', allowAppend: true }), 2, 1));
        }
        return res.join('\n\n');
    }
}
exports.LayoutCompatibilityReport = LayoutCompatibilityReport;
function explainStorageOperation(op, ctx) {
    switch (op.kind) {
        case 'typechange': {
            const basic = explainTypeChange(op.change);
            const details = ctx.kind === 'layout' // explain details for layout only
                ? new Set(getAllTypeChanges(op.change)
                    .map(explainTypeChangeDetails)
                    .filter((d) => d !== undefined))
                : [];
            return `Upgraded ${label(op.updated)} to an incompatible type\n` + (0, itemize_1.itemize)(basic, ...details);
        }
        case 'rename':
            return `Renamed ${label(op.original)} to ${label(op.updated)}`;
        case 'replace':
            return `Replaced ${label(op.original)} with ${label(op.updated)} of incompatible type`;
        default: {
            const title = explainBasicOperation(op, t => t.label);
            const hints = [];
            switch (op.kind) {
                case 'insert': {
                    if (ctx.kind === 'struct') {
                        if (ctx.allowAppend) {
                            hints.push('New struct members should be placed after existing ones');
                        }
                        else {
                            hints.push('New struct members are not allowed here. Define a new struct');
                        }
                    }
                    else {
                        hints.push('New variables should be placed after all existing inherited variables');
                    }
                    break;
                }
                case 'delete': {
                    hints.push('Keep the variable even if unused');
                    break;
                }
            }
            return title + '\n' + (0, itemize_1.itemizeWith)('>', ...hints);
        }
    }
}
function explainTypeChange(ch) {
    switch (ch.kind) {
        case 'obvious mismatch':
        case 'struct members':
        case 'enum members':
            return `Bad upgrade ${describeTransition(ch.original, ch.updated)}`;
        case 'enum resize':
            return `Bad upgrade ${describeTransition(ch.original, ch.updated)}\nDifferent representation sizes`;
        case 'mapping key':
            return `In key of ${ch.updated.item.label}\n` + (0, itemize_1.itemize)(explainTypeChange(ch.inner));
        case 'mapping value':
        case 'array value':
            return `In ${ch.updated.item.label}\n` + (0, itemize_1.itemize)(explainTypeChange(ch.inner));
        case 'array shrink':
        case 'array grow': {
            (0, assert_1.assert)(ch.original.tail && ch.updated.tail);
            const originalSize = parseInt(ch.original.tail, 10);
            const updatedSize = parseInt(ch.updated.tail, 10);
            const note = ch.kind === 'array shrink' ? 'Size cannot decrease' : 'Size cannot increase here';
            return `Bad array resize from ${originalSize} to ${updatedSize}\n${note}`;
        }
        case 'array dynamic': {
            (0, assert_1.assert)(ch.original.tail && ch.updated.tail);
            const [originalSize, updatedSize] = ch.original.tail === 'dyn' ? ['dynamic', 'fixed'] : ['fixed', 'dynamic'];
            return `Bad upgrade from ${originalSize} to ${updatedSize} size array`;
        }
        case 'missing members': {
            const type = ch.updated.head.replace(/^t_/, ''); // t_struct, t_enum -> struct, enum
            return `Insufficient data to compare ${type}s\nManually assess compatibility, then use option \`unsafeAllowCustomTypes: true\``;
        }
        case 'unknown':
            return `Unknown type ${ch.updated.item.label}`;
    }
}
function getAllTypeChanges(root) {
    const list = [root];
    for (const ch of list) {
        switch (ch.kind) {
            case 'mapping value':
            case 'array value':
                list.push(ch.inner);
                break;
            case 'struct members': {
                for (const op of ch.ops) {
                    if (op.kind === 'typechange') {
                        list.push(op.change);
                    }
                }
                break;
            }
            // We mention all other kinds explicitly to review any future new kinds
            case 'obvious mismatch':
            case 'enum members':
            case 'enum resize':
            case 'mapping key':
            case 'array shrink':
            case 'array grow':
            case 'array dynamic':
            case 'missing members':
            case 'unknown':
                break;
        }
    }
    return list;
}
function explainTypeChangeDetails(ch) {
    switch (ch.kind) {
        case 'struct members': {
            const { allowAppend } = ch;
            return (`In ${ch.updated.item.label}\n` +
                (0, itemize_1.itemize)(...ch.ops.map(op => explainStorageOperation(op, { kind: 'struct', allowAppend }))));
        }
        case 'enum members':
            return `In ${ch.updated.item.label}\n` + (0, itemize_1.itemize)(...ch.ops.map(explainEnumOperation));
    }
}
function explainEnumOperation(op) {
    switch (op.kind) {
        case 'replace':
            return `Replaced \`${op.original}\` with \`${op.updated}\``;
        default:
            return explainBasicOperation(op, t => t);
    }
}
function explainBasicOperation(op, getName) {
    switch (op.kind) {
        case 'delete':
            return `Deleted \`${getName(op.original)}\``;
        case 'insert':
            return `Inserted \`${getName(op.updated)}\``;
        case 'append':
            return `Added \`${getName(op.updated)}\``;
    }
}
function describeTransition(original, updated) {
    const originalLabel = original.item.label;
    const updatedLabel = updated.item.label;
    if (originalLabel === updatedLabel) {
        return `to ${updatedLabel}`;
    }
    else {
        return `from ${originalLabel} to ${updatedLabel}`;
    }
}
function label(variable) {
    return '`' + variable.label + '`';
}
//# sourceMappingURL=report.js.map