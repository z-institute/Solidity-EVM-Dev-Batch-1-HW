"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrepareUpgrade = void 0;
const utils_1 = require("./utils");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
function makePrepareUpgrade(hre) {
    return async function prepareUpgrade(proxyOrBeacon, ImplFactory, opts = {}) {
        const proxyOrBeaconAddress = (0, utils_1.getContractAddress)(proxyOrBeacon);
        const { provider } = hre.network;
        let deployedImpl;
        if (await (0, upgrades_core_1.isTransparentOrUUPSProxy)(provider, proxyOrBeaconAddress)) {
            deployedImpl = await (0, utils_1.deployProxyImpl)(hre, ImplFactory, opts, proxyOrBeaconAddress);
        }
        else if (await (0, upgrades_core_1.isBeaconProxy)(provider, proxyOrBeaconAddress)) {
            const beaconAddress = await (0, upgrades_core_1.getBeaconAddress)(provider, proxyOrBeaconAddress);
            deployedImpl = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts, beaconAddress);
        }
        else if (await (0, upgrades_core_1.isBeacon)(provider, proxyOrBeaconAddress)) {
            deployedImpl = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts, proxyOrBeaconAddress);
        }
        else {
            throw new upgrades_core_1.PrepareUpgradeUnsupportedError(proxyOrBeaconAddress);
        }
        return deployedImpl.impl;
    };
}
exports.makePrepareUpgrade = makePrepareUpgrade;
//# sourceMappingURL=prepare-upgrade.js.map