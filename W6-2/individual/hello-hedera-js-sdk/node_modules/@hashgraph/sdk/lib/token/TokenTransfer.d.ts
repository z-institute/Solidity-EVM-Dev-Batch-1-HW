/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITokenTransferList} proto.ITokenTransferList
 * @typedef {import("@hashgraph/proto").IAccountAmount} proto.IAccountAmount
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 */
/**
 * @typedef {import("bignumber.js").default} BigNumber
 */
/**
 * An account, and the amount that it sends or receives during a cryptocurrency tokentransfer.
 */
export default class TokenTransfer {
    /**
     * @internal
     * @param {proto.ITokenTransferList[]} tokenTransfers
     * @returns {TokenTransfer[]}
     */
    static _fromProtobuf(tokenTransfers: proto.ITokenTransferList[]): TokenTransfer[];
    /**
     * @internal
     * @param {object} props
     * @param {TokenId | string} props.tokenId
     * @param {AccountId | string} props.accountId
     * @param {number | null} props.expectedDecimals
     * @param {Long | number} props.amount
     * @param {boolean} props.isApproved
     */
    constructor(props: {
        tokenId: TokenId | string;
        accountId: AccountId | string;
        expectedDecimals: number | null;
        amount: Long | number;
        isApproved: boolean;
    });
    /**
     * The Token ID that sends or receives cryptocurrency.
     *
     * @readonly
     */
    readonly tokenId: TokenId;
    /**
     * The Account ID that sends or receives cryptocurrency.
     *
     * @readonly
     */
    readonly accountId: AccountId;
    expectedDecimals: number | null;
    amount: Long.Long;
    isApproved: boolean;
    /**
     * @internal
     * @returns {proto.IAccountAmount}
     */
    _toProtobuf(): proto.IAccountAmount;
}
export namespace proto {
    type ITokenTransferList = import("@hashgraph/proto").ITokenTransferList;
    type IAccountAmount = import("@hashgraph/proto").IAccountAmount;
    type IAccountID = import("@hashgraph/proto").IAccountID;
    type ITokenID = import("@hashgraph/proto").ITokenID;
}
export type BigNumber = import("bignumber.js").default;
import TokenId from "./TokenId.js";
import AccountId from "../account/AccountId.js";
import Long from "long";
