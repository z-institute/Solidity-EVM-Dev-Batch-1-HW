require("dotenv").config('');

const {Client, AccountId, PrivateKey, TokenCreateTransaction, TokenAssociateTransaction, TransferTransaction, AccountBalanceQuery} = require("@hashgraph/sdk");

async function main() {
  // Configure our Client
  const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY)
  const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID)

  let client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  var createTokenTx = await new TokenCreateTransaction()
    .setTokenName("example 1")
    .setTokenSymbol("ex1")
    .setDecimals(0)
    .setInitialSupply(100)
    .setTreasuryAccountId(operatorId)
    .execute(client);

  var createReceipt = await createTokenTx.getReceipt(client);
  var newTokenId = createReceipt.tokenId;

  console.log("new token id: ", newTokenId.toString());

  // Grab 2nd account from our environment file
  const account2Id = AccountId.fromString(process.env.MY_ACCOUNT_ID_2)
  const account2Key = PrivateKey.fromString(process.env.MY_PRIVATE_KEY_2)
  
  // Associate new account with new token
  var associateTx = await new TokenAssociateTransaction()
    .setAccountId(account2Id)
    .setTokenIds([newTokenId])
    .freezeWith(client)
    .sign(account2Key)

  var submitAssocaiteTx = await associateTx.execute(client);
  var associateReceipt = await submitAssocaiteTx.getReceipt(client);

  console.log('assocaite tx receipt: ', associateReceipt);

  // Transfer tokens from "treasury" into our 2nd account
  var transferTx = await new TransferTransaction()
    .addTokenTransfer(newTokenId, operatorId, -10)  // deduct 10 tokens from treasury
    .addTokenTransfer(newTokenId, account2Id, 10)  // increase their balance by 10
    .execute(client);

  var transferReceipt = await transferTx.getReceipt(client);

  console.log('transfer tx receipt: ', transferReceipt);

  // Check the balance of our accounts
  var account1Balance = await new AccountBalanceQuery().setAccountId(operatorId).execute(client);
  console.log('account 1 balance: ', account1Balance.tokens.toString());

  var account2Balance = await new AccountBalanceQuery().setAccountId(account2Id).execute(client);
  console.log('account 2 balance: ', account2Balance.tokens.toString());
}

main();