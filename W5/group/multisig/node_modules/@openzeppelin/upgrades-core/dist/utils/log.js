"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.silenceWarnings = exports.logWarning = exports.logNote = void 0;
const chalk_1 = __importDefault(require("chalk"));
const indent_1 = require("./indent");
let silenced = false;
function log(prefix, title, lines) {
    if (silenced) {
        return;
    }
    const parts = [chalk_1.default.yellow.bold(prefix + ':') + ' ' + title + '\n'];
    if (lines.length > 0) {
        parts.push(lines.map(l => (0, indent_1.indent)(l, 4) + '\n').join(''));
    }
    console.error(parts.join('\n'));
}
function logNote(title, lines = []) {
    log('Note', title, lines);
}
exports.logNote = logNote;
function logWarning(title, lines = []) {
    log('Warning', title, lines);
}
exports.logWarning = logWarning;
function silenceWarnings() {
    logWarning(`All subsequent Upgrades warnings will be silenced.`, [
        `Make sure you have manually checked all uses of unsafe flags.`,
    ]);
    silenced = true;
}
exports.silenceWarnings = silenceWarnings;
//# sourceMappingURL=log.js.map