import { ImplDeployment } from './manifest';
import { EthereumProvider } from './provider';
import { Deployment } from './deployment';
import type { Version } from './version';
export declare function fetchOrDeploy(version: Version, provider: EthereumProvider, deploy: () => Promise<ImplDeployment>): Promise<string>;
export declare function fetchOrDeployAdmin(provider: EthereumProvider, deploy: () => Promise<Deployment>): Promise<string>;
//# sourceMappingURL=impl-store.d.ts.map