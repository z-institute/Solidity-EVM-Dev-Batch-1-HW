import { EthereumProvider } from './provider';
import type { Deployment } from './deployment';
import type { StorageLayout } from './storage';
export interface ManifestData {
    manifestVersion: string;
    impls: {
        [version in string]?: ImplDeployment;
    };
    proxies: ProxyDeployment[];
    admin?: Deployment;
}
export interface ImplDeployment extends Deployment {
    layout: StorageLayout;
}
export interface ProxyDeployment extends Deployment {
    kind: 'uups' | 'transparent' | 'beacon';
}
export declare class Manifest {
    readonly chainId: number;
    readonly file: string;
    private locked;
    static forNetwork(provider: EthereumProvider): Promise<Manifest>;
    constructor(chainId: number);
    getAdmin(): Promise<Deployment | undefined>;
    getDeploymentFromAddress(address: string): Promise<ImplDeployment>;
    getProxyFromAddress(address: string): Promise<ProxyDeployment>;
    addProxy(proxy: ProxyDeployment): Promise<void>;
    read(): Promise<ManifestData>;
    write(data: ManifestData): Promise<void>;
    lockedRun<T>(cb: () => Promise<T>): Promise<T>;
    private lock;
}
export declare function migrateManifest(data: ManifestData): ManifestData;
export declare class DeploymentNotFound extends Error {
}
//# sourceMappingURL=manifest.d.ts.map