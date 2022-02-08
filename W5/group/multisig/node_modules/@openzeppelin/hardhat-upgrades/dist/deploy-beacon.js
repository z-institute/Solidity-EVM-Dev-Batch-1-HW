"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployBeacon = void 0;
const utils_1 = require("./utils");
function makeDeployBeacon(hre) {
    return async function deployBeacon(ImplFactory, opts = {}) {
        const { impl } = await (0, utils_1.deployBeaconImpl)(hre, ImplFactory, opts);
        const UpgradeableBeaconFactory = await (0, utils_1.getUpgradeableBeaconFactory)(hre, ImplFactory.signer);
        const beaconDeployment = await (0, utils_1.deploy)(UpgradeableBeaconFactory, impl);
        const beaconContract = UpgradeableBeaconFactory.attach(beaconDeployment.address);
        // @ts-ignore Won't be readonly because beaconContract was created through attach.
        beaconContract.deployTransaction = beaconDeployment.deployTransaction;
        return beaconContract;
    };
}
exports.makeDeployBeacon = makeDeployBeacon;
//# sourceMappingURL=deploy-beacon.js.map