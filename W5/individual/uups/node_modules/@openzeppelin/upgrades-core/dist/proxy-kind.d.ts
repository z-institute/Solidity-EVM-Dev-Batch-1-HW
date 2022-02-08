import { EthereumProvider } from './provider';
import { ValidationData, ValidationOptions } from './validate';
import { ProxyDeployment } from './manifest';
import { Version } from './version';
export declare function setProxyKind(provider: EthereumProvider, proxyAddress: string, opts: ValidationOptions): Promise<ProxyDeployment['kind']>;
/**
 * Processes opts.kind when deploying the implementation for a UUPS or Transparent proxy.
 *
 * @throws {BeaconProxyUnsupportedError} If this function is called for a Beacon proxy.
 */
export declare function processProxyKind(provider: EthereumProvider, proxyAddress: string | undefined, opts: ValidationOptions, data: ValidationData, version: Version): Promise<void>;
//# sourceMappingURL=proxy-kind.d.ts.map