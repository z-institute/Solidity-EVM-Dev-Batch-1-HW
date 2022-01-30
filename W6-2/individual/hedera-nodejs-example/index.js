require("dotenv").config();

const {Client, AccountId, PrivateKey} = require("@hashgraph/sdk");

async function main() {
  // Configure our Client
  const Key = PrivateKey.fromString(process.env.PRIVATE_KEY)
  const Id = AccountId.fromString(process.env.ACCOUNT_ID)

  let client = Client.forTest();
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
}
