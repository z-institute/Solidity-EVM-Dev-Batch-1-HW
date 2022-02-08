import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { UpgradeProxyOptions, ContractAddressOrInstance } from './utils';
export declare type UpgradeFunction = (proxy: ContractAddressOrInstance, ImplFactory: ContractFactory, opts?: UpgradeProxyOptions) => Promise<Contract>;
export declare function makeUpgradeProxy(hre: HardhatRuntimeEnvironment): UpgradeFunction;
//# sourceMappingURL=upgrade-proxy.d.ts.map