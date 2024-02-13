// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  console.log("Working 1");
  const VerifierContract = await hre.ethers.getContractFactory("UltraVerifier");
  const verifierContract = await VerifierContract.deploy();
  await verifierContract.waitForDeployment();

  console.log("Working 2");
  console.log(`Verifier: Contract deployed to ${verifierContract.target}`);

  const FactoryContract = await hre.ethers.getContractFactory("Factory");
  const factoryContract = await FactoryContract.deploy(verifierContract.target);
  await factoryContract.waitForDeployment();

  console.log(`Factory: Contract deployed to ${factoryContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
