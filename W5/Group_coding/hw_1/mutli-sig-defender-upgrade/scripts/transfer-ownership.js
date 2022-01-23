// scripts/transfer-ownership.js
async function main () {
    //
    const gnosisSafe = '0x9b57D25CeBa529DC42Fff78a243c8B93A236f8c7';

    console.log('Transferring ownership of ProxyAdmin...');
    // The owner of the ProxyAdmin can upgrade our contracts
    await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);
    console.log('Transferred ownership of ProxyAdmin to:', gnosisSafe);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });