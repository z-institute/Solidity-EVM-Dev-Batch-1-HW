"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class StorageChange {
  /**
   * @private
   * @param {object} props
   * @param {Uint8Array} props.slot
   * @param {Uint8Array} props.valueRead
   * @param {Uint8Array?} props.valueWritten
   */
  constructor(props) {
    this.slot = props.slot;
    this.valueRead = props.valueRead;
    this.valueWritten = props.valueWritten;
  }
  /**
   * @internal
   * @param {proto.IStorageChange} change
   * @returns {StorageChange}
   */


  static _fromProtobuf(change) {
    return new StorageChange({
      slot:
      /** @type {Uint8Array} */
      change.slot,
      valueRead:
      /** @type {Uint8Array} */
      change.valueRead,
      valueWritten: change.valueWritten != null && change.valueWritten.value != null ? change.valueWritten.value : null
    });
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {StorageChange}
   */


  static fromBytes(bytes) {
    return StorageChange._fromProtobuf(proto.StorageChange.decode(bytes));
  }
  /**
   * @internal
   * @returns {proto.IStorageChange}
   */


  _toProtobuf() {
    return {
      slot: this.slot,
      valueRead: this.valueRead,
      valueWritten: this.valueWritten != null ? {
        value: this.valueWritten
      } : null
    };
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.StorageChange.encode(this._toProtobuf()).finish();
  }

}

exports.default = StorageChange;