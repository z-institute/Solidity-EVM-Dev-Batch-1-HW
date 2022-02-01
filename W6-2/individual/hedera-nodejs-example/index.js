require("dotenv").config();

const {Client, AccountId, PrivateKey, TokenCreateTransaction} = require("@hashgraph/sdk");

async function main() {
  // Configure our Client
  const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
  const operatorId = AccountId.fromString(process.env.ACCOUNT_ID)

  let client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  var createTokenTx = await new TokenCreateTransaction()
    .setTokenName("example 1")
    .setTokenSymbol("ex1")
    .setDecimal(0)
    .setInitialSupply(100)
    .setTreasuryAccountId(operatorId)
    .execute(client);

  var createReceipt = await createTokenTx.getReceipt(client);
  var newTokenId = createReceipt.tokenId;

  console.log("new token id: ", newTokenId.toString());

  // grab 2nd account from our environment file
  const account2Id = AccountId.fromString(process.env.Account_ID_2)
  const account2Key = AccountId.fromString(process.env.PRIVATE_KEY_2)

  var associateTx = await new TokenAssociateTransaction()
    .SetAccountId(account2Id)
    .setTokenIds(newTokenId)
    .freeze(client)
    .sign(account2Key)

  var submitAssocaiteTx = await associateTx.execute(client);
  var associateReceipt = await submitAssocaiteTx.getREceipt(client);

  console.log('assocaite tx receipt: ', associateReceipt);
}

main();
