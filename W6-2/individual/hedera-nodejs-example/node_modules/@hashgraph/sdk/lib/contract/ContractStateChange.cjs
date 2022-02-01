"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _ContractId = _interopRequireDefault(require("./ContractId.cjs"));

var _StorageChange = _interopRequireDefault(require("./StorageChange.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ContractStateChange {
  /**
   * @private
   * @param {object} props
   * @param {ContractId} props.contractId
   * @param {StorageChange[]} props.storageChanges
   */
  constructor(props) {
    this.contractId = props.contractId;
    this.storageChanges = props.storageChanges;
    Object.freeze(this);
  }
  /**
   * @internal
   * @param {proto.IContractStateChange} change
   * @returns {ContractStateChange}
   */


  static _fromProtobuf(change) {
    return new ContractStateChange({
      contractId: _ContractId.default._fromProtobuf(
      /** @type {proto.IContractID} */
      change.contractID),
      storageChanges: (change.storageChanges != null ? change.storageChanges : []).map(change => _StorageChange.default._fromProtobuf(change))
    });
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {ContractStateChange}
   */


  static fromBytes(bytes) {
    return ContractStateChange._fromProtobuf(proto.ContractStateChange.decode(bytes));
  }
  /**
   * @internal
   * @returns {proto.IContractStateChange} change
   */


  _toProtobuf() {
    const storageChanges = this.storageChanges.map(storageChange => storageChange._toProtobuf());
    return {
      contractID: this.contractId._toProtobuf(),
      storageChanges
    };
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.ContractStateChange.encode(this._toProtobuf()).finish();
  }

}

exports.default = ContractStateChange;