const ganache = require('ganache');

const options = {};
const server = ganache.server(options);
const provider = server.provider;
const PORT = 8545;
server.listen(PORT, (err) => {
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
})