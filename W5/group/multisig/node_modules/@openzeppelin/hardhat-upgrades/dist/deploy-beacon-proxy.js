"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployBeaconProxy = void 0;
const ethers_1 = require("ethers");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
function makeDeployBeaconProxy(hre) {
    return async function deployBeaconProxy(beacon, attachTo, args = [], opts = {}) {
        if (!(attachTo instanceof ethers_1.ContractFactory)) {
            throw new upgrades_core_1.UpgradesError(`attachTo must specify a contract factory`, () => `Include the contract factory for the beacon's current implementation in the attachTo parameter`);
        }
        if (!Array.isArray(args)) {
            opts = args;
            args = [];
        }
        const { provider } = hre.network;
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        if (opts.kind !== undefined && opts.kind !== 'beacon') {
            throw new upgrades_core_1.DeployBeaconProxyKindError(opts.kind);
        }
        opts.kind = 'beacon';
        const beaconAddress = (0, utils_1.getContractAddress)(beacon);
        if (!(await (0, upgrades_core_1.isBeacon)(provider, beaconAddress))) {
            throw new upgrades_core_1.DeployBeaconProxyUnsupportedError(beaconAddress);
        }
        const data = (0, utils_1.getInitializerData)(attachTo.interface, args, opts.initializer);
        if (await manifest.getAdmin()) {
            (0, upgrades_core_1.logWarning)(`A proxy admin was previously deployed on this network`, [
                `This is not natively used with the current kind of proxy ('beacon').`,
                `Changes to the admin will have no effect on this new proxy.`,
            ]);
        }
        const BeaconProxyFactory = await (0, utils_1.getBeaconProxyFactory)(hre, attachTo.signer);
        const proxyDeployment = Object.assign({ kind: opts.kind }, await (0, utils_1.deploy)(BeaconProxyFactory, beaconAddress, data));
        await manifest.addProxy(proxyDeployment);
        const inst = attachTo.attach(proxyDeployment.address);
        // @ts-ignore Won't be readonly because inst was created through attach.
        inst.deployTransaction = proxyDeployment.deployTransaction;
        return inst;
    };
}
exports.makeDeployBeaconProxy = makeDeployBeaconProxy;
//# sourceMappingURL=deploy-beacon-proxy.js.map