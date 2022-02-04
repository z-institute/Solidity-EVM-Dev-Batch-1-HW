const { Client, AccountId, PrivateKey, AccountBalanceQuery, TokenCreateTransaction, TokenAssociateTransaction, TransferTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null ||
        myPrivateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    // Create a new HTS token
    const createTokenTx = await new TokenCreateTransaction()
        .setTokenName("example 1")
        .setTokenSymbol("ex1")
        .setDecimals(0)
        .setInitialSupply(100)
        .setTreasuryAccountId(myAccountId)
        .execute(client);

    const createReceipt = await createTokenTx.getReceipt(client);
    const newTokenId = createReceipt.tokenId;

    console.log(`new token id: ${newTokenId}`);
    // Grab 2nd account form our .env
    const account2Id = AccountId.fromString(process.env.MY_ACCOUNT_ID_2);
    const account2Key = PrivateKey.fromString(process.env.MY_PRIVATE_KEY_2);

    // Associate new account with the new token
    const associateTx = await new TokenAssociateTransaction()
        .setAccountId(account2Id)
        .setTokenIds([newTokenId])
        .freezeWith(client)
        .sign(account2Key);

    const submitAssociateTx = await associateTx.execute(client);
    const associateReceipt = await submitAssociateTx.getReceipt(client);

    console.log(`associate tx receipt: `, associateReceipt);

    // Transfer token form "treasury" into our 2nd account
    const transferTx = await new TransferTransaction()
        .addTokenTransfer(newTokenId, myAccountId, -10) // deduct 10 tokens from treasury
        .addTokenTransfer(newTokenId, account2Id, 10) // increase their balance by 10
        .execute(client);

    const transferReceipt = await transferTx.getReceipt(client);

    console.log(`transfer tx receipt: `, transferReceipt)

    // Check the balance of our accounts
    const account1Balance = await new AccountBalanceQuery()
        .setAccountId(myAccountId)
        .execute(client);

    console.log(`account 1 balance: ${account1Balance.tokens.toString()}`)

    const account2Balance = await new AccountBalanceQuery()
        .setAccountId(account2Id)
        .execute(client);

    console.log(`account 2 balance: ${account2Balance.tokens.toString()}`)
}
main();