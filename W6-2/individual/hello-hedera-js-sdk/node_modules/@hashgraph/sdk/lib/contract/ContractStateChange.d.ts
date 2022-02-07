export default class ContractStateChange {
    /**
     * @internal
     * @param {proto.IContractStateChange} change
     * @returns {ContractStateChange}
     */
    static _fromProtobuf(change: proto.IContractStateChange): ContractStateChange;
    /**
     * @param {Uint8Array} bytes
     * @returns {ContractStateChange}
     */
    static fromBytes(bytes: Uint8Array): ContractStateChange;
    /**
     * @private
     * @param {object} props
     * @param {ContractId} props.contractId
     * @param {StorageChange[]} props.storageChanges
     */
    private constructor();
    contractId: ContractId;
    storageChanges: StorageChange[];
    /**
     * @internal
     * @returns {proto.IContractStateChange} change
     */
    _toProtobuf(): proto.IContractStateChange;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
}
import ContractId from "./ContractId.js";
import StorageChange from "./StorageChange.js";
import * as proto from "@hashgraph/proto";
