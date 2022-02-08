import type { Deployment } from '@openzeppelin/upgrades-core';
import type { ethers, ContractFactory } from 'ethers';
export interface DeployTransaction {
    deployTransaction: ethers.providers.TransactionResponse;
}
export declare function deploy(factory: ContractFactory, ...args: unknown[]): Promise<Required<Deployment & DeployTransaction>>;
//# sourceMappingURL=deploy.d.ts.map