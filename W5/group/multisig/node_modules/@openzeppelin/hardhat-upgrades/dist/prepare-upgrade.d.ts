import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory } from 'ethers';
import { Options, ContractAddressOrInstance } from './utils';
export declare type PrepareUpgradeFunction = (proxyOrBeaconAddress: ContractAddressOrInstance, ImplFactory: ContractFactory, opts?: Options) => Promise<string>;
export declare function makePrepareUpgrade(hre: HardhatRuntimeEnvironment): PrepareUpgradeFunction;
//# sourceMappingURL=prepare-upgrade.d.ts.map