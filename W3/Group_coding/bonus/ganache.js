const ganache = require('ganache');
const server = ganache.server({
  fork: {
    url: 'https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545',
  },
  chain: {
    chainId: 1
  }
});
const provider = server.provider;
const PORT = 8545;
server.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err;

  console.log(`ganache listening on port ${PORT}...`);
  provider
    .request({ method: "personal_listAccounts", params:[] })
    .then((accounts) => {
      console.log(accounts);
    });
});

provider.on('message' , msg => {
  console.log(msg);
});