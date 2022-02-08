import { EthereumProvider, UpgradesError } from '.';
export declare class BeaconProxyUnsupportedError extends UpgradesError {
    constructor();
}
export declare class DeployBeaconProxyKindError extends UpgradesError {
    constructor(kind: string);
}
export declare class DeployBeaconProxyUnsupportedError extends UpgradesError {
    constructor(beaconAddress: string);
}
export declare class DeployBeaconProxyImplUnknownError extends UpgradesError {
    constructor(implAddress: string);
}
export declare class LoadProxyUnsupportedError extends UpgradesError {
    constructor(proxyAddress: string);
}
export declare class PrepareUpgradeUnsupportedError extends UpgradesError {
    constructor(proxyOrBeaconAddress: string);
}
export declare function assertNotProxy(provider: EthereumProvider, address: string): Promise<void>;
//# sourceMappingURL=usage-error.d.ts.map