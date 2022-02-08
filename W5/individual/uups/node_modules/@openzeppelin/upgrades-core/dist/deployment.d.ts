import { EthereumProvider } from './provider';
export interface Deployment {
    address: string;
    txHash?: string;
}
export declare function resumeOrDeploy<T extends Deployment>(provider: EthereumProvider, cached: T | undefined, deploy: () => Promise<T>): Promise<T>;
export declare function waitAndValidateDeployment(provider: EthereumProvider, deployment: Deployment): Promise<void>;
export declare class TransactionMinedTimeout extends Error {
    readonly deployment: Deployment;
    constructor(deployment: Deployment);
}
export declare class InvalidDeployment extends Error {
    readonly deployment: Deployment;
    removed: boolean;
    constructor(deployment: Deployment);
    get message(): string;
}
//# sourceMappingURL=deployment.d.ts.map