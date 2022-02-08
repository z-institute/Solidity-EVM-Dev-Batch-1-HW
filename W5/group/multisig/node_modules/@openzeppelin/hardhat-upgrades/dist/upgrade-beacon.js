"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpgradeBeacon = void 0;
const utils_1 = require("./utils");
function makeUpgradeBeacon(hre) {
    return async function upgradeBeacon(beacon, ImplFactory, opts = {}) {
        const beaconAddress = (0, utils_1.getContractAddress)(beacon);
        const { impl: nextImpl } = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts, beaconAddress);
        const UpgradeableBeaconFactory = await (0, utils_1.getUpgradeableBeaconFactory)(hre, ImplFactory.signer);
        const beaconContract = UpgradeableBeaconFactory.attach(beaconAddress);
        const upgradeTx = await beaconContract.upgradeTo(nextImpl);
        // @ts-ignore Won't be readonly because beaconContract was created through attach.
        beaconContract.deployTransaction = upgradeTx;
        return beaconContract;
    };
}
exports.makeUpgradeBeacon = makeUpgradeBeacon;
//# sourceMappingURL=upgrade-beacon.js.map