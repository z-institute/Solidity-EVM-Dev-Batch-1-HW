const Web3 = require('web3');
const web3 = new Web3("http://152.70.103.239:8545");

const ethan = "0x6635f83421bf059cd8111f180f0727128685bae4";
const vitalik = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
const eth1k = Web3.utils.toWei('1000', 'ether');

(async () => {
    await  web3.eth.sendTransaction({from: vitalik, to: ethan, value: eth1k});
    console.log('Vitalik send 1k ether to Ethan')
    const ethanBalance = await  web3.eth.getBalance(ethan);
    const vitalikBalance = await web3.eth.getBalance(vitalik);

    console.log(`Ethan Balance: ${Web3.utils.fromWei(ethanBalance, 'ether')} ETH`);
    console.log(`Vitalik Balance: ${Web3.utils.fromWei(vitalikBalance, 'ether')} ETH`);
})()
