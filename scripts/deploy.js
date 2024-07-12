const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Library deployed to:", upload.address);

  // Save contract address to a JSON file
  const contractAddress = {
    address: upload.address,
  };

  const filePath = path.join(__dirname, '../client/src/contractAddress.json');
  fs.writeFileSync(filePath, JSON.stringify(contractAddress, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
