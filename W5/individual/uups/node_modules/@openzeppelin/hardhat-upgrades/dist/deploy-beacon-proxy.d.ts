import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Contract, ContractFactory } from 'ethers';
import { DeployProxyOptions, ContractAddressOrInstance } from './utils';
export interface DeployBeaconProxyFunction {
    (beacon: ContractAddressOrInstance, attachTo: ContractFactory, args?: unknown[], opts?: DeployProxyOptions): Promise<Contract>;
    (beacon: ContractAddressOrInstance, attachTo: ContractFactory, opts?: DeployProxyOptions): Promise<Contract>;
}
export declare function makeDeployBeaconProxy(hre: HardhatRuntimeEnvironment): DeployBeaconProxyFunction;
//# sourceMappingURL=deploy-beacon-proxy.d.ts.map