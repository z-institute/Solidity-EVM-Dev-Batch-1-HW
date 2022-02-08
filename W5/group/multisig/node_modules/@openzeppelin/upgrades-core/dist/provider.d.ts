export interface EthereumProvider {
    send(method: 'web3_clientVersion', params: []): Promise<string>;
    send(method: 'net_version', params: []): Promise<string>;
    send(method: 'eth_chainId', params: []): Promise<string>;
    send(method: 'eth_getCode', params: [string, string]): Promise<string>;
    send(method: 'eth_call', params: unknown[]): Promise<string>;
    send(method: 'eth_getStorageAt', params: [string, string, string]): Promise<string>;
    send(method: 'eth_getTransactionByHash', params: [string]): Promise<null | EthereumTransaction>;
    send(method: 'eth_getTransactionReceipt', params: [string]): Promise<null | EthereumTransactionReceipt>;
    send(method: string, params: unknown[]): Promise<unknown>;
}
interface EthereumTransaction {
    blockHash: string | null;
}
interface EthereumTransactionReceipt {
    status: string;
    to: string | null;
    from: string;
    blockHash: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
}
export declare function getNetworkId(provider: EthereumProvider): Promise<string>;
export declare function getChainId(provider: EthereumProvider): Promise<number>;
export declare function getClientVersion(provider: EthereumProvider): Promise<string>;
export declare function getStorageAt(provider: EthereumProvider, address: string, position: string, block?: string): Promise<string>;
export declare function getCode(provider: EthereumProvider, address: string, block?: string): Promise<string>;
export declare function call(provider: EthereumProvider, address: string, data: string, block?: string): Promise<string>;
export declare function hasCode(provider: EthereumProvider, address: string, block?: string): Promise<boolean>;
export declare function getTransactionByHash(provider: EthereumProvider, txHash: string): Promise<EthereumTransaction | null>;
export declare function getTransactionReceipt(provider: EthereumProvider, txHash: string): Promise<EthereumTransactionReceipt | null>;
export declare const networkNames: {
    [chainId in number]?: string;
};
export declare function isDevelopmentNetwork(provider: EthereumProvider): Promise<boolean>;
export declare function isReceiptSuccessful(receipt: Pick<EthereumTransactionReceipt, 'status'>): boolean;
export {};
//# sourceMappingURL=provider.d.ts.map