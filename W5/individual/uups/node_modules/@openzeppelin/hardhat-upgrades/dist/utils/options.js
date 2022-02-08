"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefaults = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
function withDefaults(opts = {}) {
    var _a;
    return {
        constructorArgs: (_a = opts.constructorArgs) !== null && _a !== void 0 ? _a : [],
        ...(0, upgrades_core_1.withValidationDefaults)(opts),
    };
}
exports.withDefaults = withDefaults;
//# sourceMappingURL=options.js.map