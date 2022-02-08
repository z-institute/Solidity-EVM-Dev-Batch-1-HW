"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdatedStorageLayout = exports.getStorageLayoutForAddress = void 0;
const extract_1 = require("./storage/extract");
const layout_1 = require("./storage/layout");
const query_1 = require("./validate/query");
const type_id_1 = require("./utils/type-id");
const deep_array_1 = require("./utils/deep-array");
async function getStorageLayoutForAddress(manifest, validations, implAddress) {
    const data = await manifest.read();
    const versionWithoutMetadata = Object.keys(data.impls).find(v => { var _a; return ((_a = data.impls[v]) === null || _a === void 0 ? void 0 : _a.address) === implAddress; });
    if (versionWithoutMetadata === undefined) {
        throw new Error(`Deployment at address ${implAddress} is not registered`);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { layout } = data.impls[versionWithoutMetadata];
    if ((0, extract_1.isCurrentLayoutVersion)(layout)) {
        return layout;
    }
    else {
        const updatedLayout = getUpdatedStorageLayout(validations, versionWithoutMetadata, layout);
        if (updatedLayout === undefined) {
            return layout;
        }
        else {
            await manifest.lockedRun(async () => {
                const data = await manifest.read();
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                data.impls[versionWithoutMetadata].layout = updatedLayout;
                await manifest.write(data);
            });
            return updatedLayout;
        }
    }
}
exports.getStorageLayoutForAddress = getStorageLayoutForAddress;
// This function is used to retrieve the updated storage layout for an impl
// contract from the Manifest file, for which we only have the version hash
// without metadata and a storage layout. The storage layout is updated in the
// sense that it is updated to include newer information that hadn't been
// extracted when the impl contract was deployed, such as struct members.
function getUpdatedStorageLayout(data, versionWithoutMetadata, layout) {
    // In this map we store the candidate storage layouts, based on having the
    // same versionWithoutMetadata and a sufficiently similar layout. The keys of
    // the map are the versionWithMetadata of each contract, to avoid storing the
    // same contract multiple times.
    const sameLayout = new Map();
    outer: for (const [contractName, validationRun] of (0, query_1.findVersionWithoutMetadataMatches)(data, versionWithoutMetadata)) {
        const updatedLayout = (0, query_1.unfoldStorageLayout)(validationRun, contractName);
        // Check that the layout roughly matches the one we already have.
        if (updatedLayout.storage.length !== layout.storage.length) {
            continue;
        }
        for (const [i, item] of layout.storage.entries()) {
            const updatedItem = updatedLayout.storage[i];
            if (item.label !== updatedItem.label) {
                continue outer;
            }
            if ((0, type_id_1.stabilizeTypeIdentifier)(item.type) !== (0, type_id_1.stabilizeTypeIdentifier)(updatedItem.type)) {
                continue outer;
            }
        }
        const { version } = validationRun[contractName];
        if (version && !sameLayout.has(version.withMetadata)) {
            sameLayout.set(version.withMetadata, updatedLayout);
        }
    }
    if (sameLayout.size > 1) {
        // Reject multiple matches unless they all have exactly the same layout.
        const typeMembers = new Map();
        for (const { types } of sameLayout.values()) {
            for (const [typeId, item] of Object.entries(types)) {
                if (item.members === undefined) {
                    continue;
                }
                const members = (0, layout_1.isStructMembers)(item.members)
                    ? item.members.map(m => [(0, type_id_1.stabilizeTypeIdentifier)(m.type), m.label])
                    : item.members;
                const stableId = (0, type_id_1.stabilizeTypeIdentifier)(typeId);
                if (!typeMembers.has(stableId)) {
                    typeMembers.set(stableId, members);
                }
                else if (!(0, deep_array_1.deepEqual)(members, typeMembers.get(stableId))) {
                    return undefined;
                }
            }
        }
    }
    if (sameLayout.size > 0) {
        const [updatedLayout] = sameLayout.values();
        return updatedLayout;
    }
}
exports.getUpdatedStorageLayout = getUpdatedStorageLayout;
//# sourceMappingURL=manifest-storage-layout.js.map