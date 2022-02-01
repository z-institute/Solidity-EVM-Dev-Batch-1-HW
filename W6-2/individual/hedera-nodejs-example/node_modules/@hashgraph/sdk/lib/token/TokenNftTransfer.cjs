"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _long = _interopRequireDefault(require("long"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _TokenId = _interopRequireDefault(require("./TokenId.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITokenTransferList} proto.ITokenTransferList
 * @typedef {import("@hashgraph/proto").IAccountAmount} proto.IAccountAmount
 * @typedef {import("@hashgraph/proto").INftTransfer} proto.INftTransfer
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 */

/**
 * @typedef {import("bignumber.js").default} BigNumber
 */

/**
 * An account, and the amount that it sends or receives during a cryptocurrency tokentransfer.
 */
class TokenNftTransfer {
  /**
   * @internal
   * @param {object} props
   * @param {TokenId | string} props.tokenId
   * @param {AccountId | string} props.senderAccountId
   * @param {AccountId | string} props.receiverAccountId
   * @param {Long | number} props.serialNumber
   * @param {boolean} props.isApproved
   */
  constructor(props) {
    /**
     * The Token ID that sends or receives cryptocurrency.
     */
    this.tokenId = props.tokenId instanceof _TokenId.default ? props.tokenId : _TokenId.default.fromString(props.tokenId);
    /**
     * The Account ID that sends or receives cryptocurrency.
     */

    this.senderAccountId = props.senderAccountId instanceof _AccountId.default ? props.senderAccountId : _AccountId.default.fromString(props.senderAccountId);
    /**
     * The Account ID that sends or receives cryptocurrency.
     */

    this.receiverAccountId = props.receiverAccountId instanceof _AccountId.default ? props.receiverAccountId : _AccountId.default.fromString(props.receiverAccountId);
    this.serialNumber = _long.default.fromValue(props.serialNumber);
    this.isApproved = props.isApproved;
  }
  /**
   * @internal
   * @param {proto.ITokenTransferList[]} tokenTransfers
   * @returns {TokenNftTransfer[]}
   */


  static _fromProtobuf(tokenTransfers) {
    const transfers = [];

    for (const tokenTransfer of tokenTransfers) {
      const tokenId = _TokenId.default._fromProtobuf(
      /** @type {proto.ITokenID} */
      tokenTransfer.token);

      for (const transfer of tokenTransfer.nftTransfers != null ? tokenTransfer.nftTransfers : []) {
        transfers.push(new TokenNftTransfer({
          tokenId,
          senderAccountId: _AccountId.default._fromProtobuf(
          /** @type {proto.IAccountID} */
          transfer.senderAccountID),
          receiverAccountId: _AccountId.default._fromProtobuf(
          /** @type {proto.IAccountID} */
          transfer.receiverAccountID),
          serialNumber: transfer.serialNumber != null ? transfer.serialNumber : _long.default.ZERO,
          isApproved: transfer.isApproval == true
        }));
      }
    }

    return transfers;
  }
  /**
   * @internal
   * @returns {proto.INftTransfer}
   */


  _toProtobuf() {
    return {
      senderAccountID: this.senderAccountId._toProtobuf(),
      receiverAccountID: this.receiverAccountId._toProtobuf(),
      serialNumber: this.serialNumber,
      isApproval: this.isApproved
    };
  }

}

exports.default = TokenNftTransfer;