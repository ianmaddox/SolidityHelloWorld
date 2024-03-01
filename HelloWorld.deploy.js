const fs = require('fs');
require("colors");

const CONTRACT_NAME = 'HelloWorld';
const GAS_LIMIT = "4000000";

module.exports = async function (hre) {
  const { deployments, getNamedAccounts, ethers, tenderly } = hre;
  const { deploy } = deployments;
  const namedAccounts = await getNamedAccounts();

  const NETWORK = hre.network.name;
  console.log(`Running v4 style deploy of ${CONTRACT_NAME.blue.bold} on ${NETWORK.red.bold}`.magenta.bold);

  const args = {
  };

  const deployParams = {
    from: namedAccounts.deployer,
    gasLimit: GAS_LIMIT,
    log: true,
    args: Object.values(args)
  }

  console.log("Deploying with the following options:".yellow.bold);
  console.log(deployParams);

  console.log("Deploying...".yellow.bold);
  const deployedContract = await deploy(CONTRACT_NAME, deployParams);

  const receipt = deployedContract.receipt;
  const swapContractAddress = receipt.contractAddress;

  let successMessage = `Contract ${CONTRACT_NAME} deployed to ${swapContractAddress}`;
  console.log("▬".repeat(successMessage.length).rainbow.bold);
  console.log(successMessage.yellow.bold);
  console.log("▬".repeat(successMessage.length).rainbow.bold);

  const gasUsed = Number(receipt.gasUsed.toString());
  console.log(`Gas used: ${gasUsed}`);

  // Tenderly verification is automaic, but if we want to run it manually we can use this:
  try {
    if(NETWORK == "tenderly") {
      console.log("Attempting tenderly verification...");
      await tenderly.verify({
        name: CONTRACT_NAME,
        address: swapContractAddress,
      });
    }
  } catch(e) {
    console.log("Tenderly fail",e);
  }
};

// Required for hardhat-deploy
module.exports.tags = ['HelloWorld'];

