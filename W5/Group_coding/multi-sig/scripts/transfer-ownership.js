// scripts/transfer-ownership.js
async function main () {
  const gnosisSafe = '0x36383AC9171b5854503262B5B53Df562626302f9';
  
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