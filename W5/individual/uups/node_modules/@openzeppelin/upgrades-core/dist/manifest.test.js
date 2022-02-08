"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const manifest_1 = require("./manifest");
(0, ava_1.default)('manifest name for a known network', t => {
    const manifest = new manifest_1.Manifest(1);
    t.is(manifest.file, '.openzeppelin/mainnet.json');
});
(0, ava_1.default)('manifest name for an unknown network', t => {
    const id = 55555;
    const manifest = new manifest_1.Manifest(id);
    t.is(manifest.file, `.openzeppelin/unknown-${id}.json`);
});
//# sourceMappingURL=manifest.test.js.map