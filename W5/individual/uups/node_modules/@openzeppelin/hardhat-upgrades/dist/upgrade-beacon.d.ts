import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { ContractAddressOrInstance, Options } from './utils';
export declare type UpgradeBeaconFunction = (beacon: ContractAddressOrInstance, ImplFactory: ContractFactory, opts?: Options) => Promise<Contract>;
export declare function makeUpgradeBeacon(hre: HardhatRuntimeEnvironment): UpgradeBeaconFunction;
//# sourceMappingURL=upgrade-beacon.d.ts.map