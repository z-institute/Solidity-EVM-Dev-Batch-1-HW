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
export default class TokenNftTransfer {
    /**
     * @internal
     * @param {proto.ITokenTransferList[]} tokenTransfers
     * @returns {TokenNftTransfer[]}
     */
    static _fromProtobuf(tokenTransfers: proto.ITokenTransferList[]): TokenNftTransfer[];
    /**
     * @internal
     * @param {object} props
     * @param {TokenId | string} props.tokenId
     * @param {AccountId | string} props.senderAccountId
     * @param {AccountId | string} props.receiverAccountId
     * @param {Long | number} props.serialNumber
     * @param {boolean} props.isApproved
     */
    constructor(props: {
        tokenId: TokenId | string;
        senderAccountId: AccountId | string;
        receiverAccountId: AccountId | string;
        serialNumber: Long | number;
        isApproved: boolean;
    });
    /**
     * The Token ID that sends or receives cryptocurrency.
     */
    tokenId: TokenId;
    /**
     * The Account ID that sends or receives cryptocurrency.
     */
    senderAccountId: AccountId;
    /**
     * The Account ID that sends or receives cryptocurrency.
     */
    receiverAccountId: AccountId;
    serialNumber: Long.Long;
    isApproved: boolean;
    /**
     * @internal
     * @returns {proto.INftTransfer}
     */
    _toProtobuf(): proto.INftTransfer;
}
export namespace proto {
    type ITokenTransferList = import("@hashgraph/proto").ITokenTransferList;
    type IAccountAmount = import("@hashgraph/proto").IAccountAmount;
    type INftTransfer = import("@hashgraph/proto").INftTransfer;
    type IAccountID = import("@hashgraph/proto").IAccountID;
    type ITokenID = import("@hashgraph/proto").ITokenID;
}
export type BigNumber = import("bignumber.js").default;
import TokenId from "./TokenId.js";
import AccountId from "../account/AccountId.js";
import Long from "long";
