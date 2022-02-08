import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { Options } from './utils';
export interface DeployBeaconFunction {
    (ImplFactory: ContractFactory, opts?: Options): Promise<Contract>;
}
export declare function makeDeployBeacon(hre: HardhatRuntimeEnvironment): DeployBeaconFunction;
//# sourceMappingURL=deploy-beacon.d.ts.map