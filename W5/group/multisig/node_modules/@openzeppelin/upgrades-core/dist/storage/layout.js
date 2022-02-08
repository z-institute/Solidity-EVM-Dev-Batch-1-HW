"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStructMembers = exports.isEnumMembers = exports.getDetailedLayout = void 0;
const parse_type_id_1 = require("../utils/parse-type-id");
function getDetailedLayout(layout) {
    const cache = {};
    return layout.storage.map(parseWithDetails);
    function parseWithDetails(item) {
        const parsed = (0, parse_type_id_1.parseTypeId)(item.type);
        const withDetails = addDetailsToParsedType(parsed);
        return { ...item, type: withDetails };
    }
    function addDetailsToParsedType(parsed) {
        var _a, _b;
        if (parsed.id in cache) {
            return cache[parsed.id];
        }
        const item = layout.types[parsed.id];
        const detailed = {
            ...parsed,
            args: undefined,
            rets: undefined,
            item: {
                ...item,
                members: undefined,
            },
        };
        // store in cache before recursion below
        cache[parsed.id] = detailed;
        detailed.args = (_a = parsed.args) === null || _a === void 0 ? void 0 : _a.map(addDetailsToParsedType);
        detailed.rets = (_b = parsed.args) === null || _b === void 0 ? void 0 : _b.map(addDetailsToParsedType);
        detailed.item.members =
            (item === null || item === void 0 ? void 0 : item.members) && (isStructMembers(item === null || item === void 0 ? void 0 : item.members) ? item.members.map(parseWithDetails) : item === null || item === void 0 ? void 0 : item.members);
        return detailed;
    }
}
exports.getDetailedLayout = getDetailedLayout;
function isEnumMembers(members) {
    return members.length === 0 || typeof members[0] === 'string';
}
exports.isEnumMembers = isEnumMembers;
function isStructMembers(members) {
    return members.length === 0 || typeof members[0] === 'object';
}
exports.isStructMembers = isStructMembers;
//# sourceMappingURL=layout.js.map