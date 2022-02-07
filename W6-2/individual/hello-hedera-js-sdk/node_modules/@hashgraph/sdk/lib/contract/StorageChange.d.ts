export default class StorageChange {
    /**
     * @internal
     * @param {proto.IStorageChange} change
     * @returns {StorageChange}
     */
    static _fromProtobuf(change: proto.IStorageChange): StorageChange;
    /**
     * @param {Uint8Array} bytes
     * @returns {StorageChange}
     */
    static fromBytes(bytes: Uint8Array): StorageChange;
    /**
     * @private
     * @param {object} props
     * @param {Uint8Array} props.slot
     * @param {Uint8Array} props.valueRead
     * @param {Uint8Array?} props.valueWritten
     */
    private constructor();
    slot: Uint8Array;
    valueRead: Uint8Array;
    valueWritten: Uint8Array | null;
    /**
     * @internal
     * @returns {proto.IStorageChange}
     */
    _toProtobuf(): proto.IStorageChange;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
}
import * as proto from "@hashgraph/proto";
