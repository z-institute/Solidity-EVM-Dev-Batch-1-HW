"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReceiptSuccessful = exports.isDevelopmentNetwork = exports.networkNames = exports.getTransactionReceipt = exports.getTransactionByHash = exports.hasCode = exports.call = exports.getCode = exports.getStorageAt = exports.getClientVersion = exports.getChainId = exports.getNetworkId = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
async function getNetworkId(provider) {
    return provider.send('net_version', []);
}
exports.getNetworkId = getNetworkId;
async function getChainId(provider) {
    const id = await provider.send('eth_chainId', []);
    return new bn_js_1.default(id.replace(/^0x/, ''), 'hex').toNumber();
}
exports.getChainId = getChainId;
async function getClientVersion(provider) {
    return provider.send('web3_clientVersion', []);
}
exports.getClientVersion = getClientVersion;
async function getStorageAt(provider, address, position, block = 'latest') {
    const storage = await provider.send('eth_getStorageAt', [address, position, block]);
    const padded = storage.replace(/^0x/, '').padStart(64, '0');
    return '0x' + padded;
}
exports.getStorageAt = getStorageAt;
async function getCode(provider, address, block = 'latest') {
    return provider.send('eth_getCode', [address, block]);
}
exports.getCode = getCode;
async function call(provider, address, data, block = 'latest') {
    return provider.send('eth_call', [
        {
            to: address,
            data: data,
        },
        block,
    ]);
}
exports.call = call;
async function hasCode(provider, address, block) {
    const code = await getCode(provider, address, block);
    return code !== '0x';
}
exports.hasCode = hasCode;
async function getTransactionByHash(provider, txHash) {
    return provider.send('eth_getTransactionByHash', [txHash]);
}
exports.getTransactionByHash = getTransactionByHash;
async function getTransactionReceipt(provider, txHash) {
    const receipt = await provider.send('eth_getTransactionReceipt', [txHash]);
    if (receipt === null || receipt === void 0 ? void 0 : receipt.status) {
        receipt.status = receipt.status.match(/^0x0+$/) ? '0x0' : receipt.status.replace(/^0x0+/, '0x');
    }
    return receipt;
}
exports.getTransactionReceipt = getTransactionReceipt;
exports.networkNames = Object.freeze({
    1: 'mainnet',
    2: 'morden',
    3: 'ropsten',
    4: 'rinkeby',
    5: 'goerli',
    42: 'kovan',
});
async function isDevelopmentNetwork(provider) {
    const chainId = await getChainId(provider);
    //  1337 => ganache and geth --dev
    // 31337 => hardhat network
    if (chainId === 1337 || chainId === 31337) {
        return true;
    }
    else {
        const clientVersion = await getClientVersion(provider);
        const [name] = clientVersion.split('/', 1);
        return name === 'HardhatNetwork' || name === 'EthereumJS TestRPC';
    }
}
exports.isDevelopmentNetwork = isDevelopmentNetwork;
function isReceiptSuccessful(receipt) {
    return receipt.status === '0x1';
}
exports.isReceiptSuccessful = isReceiptSuccessful;
//# sourceMappingURL=provider.js.map