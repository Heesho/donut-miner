const { ethers } = require("hardhat");
const { utils, BigNumber } = require("ethers");
const hre = require("hardhat");
const AddressZero = "0x0000000000000000000000000000000000000000";

/*===================================================================*/
/*===========================  SETTINGS  ============================*/

const TREASURY_ADDRESS = "0x7a8C895E7826F66e1094532cB435Da725dc3868f"; // Treasury Address

/*===========================  END SETTINGS  ========================*/
/*===================================================================*/

// Constants
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const convert = (amount, decimals) => ethers.utils.parseUnits(amount, decimals);

// Contract Variables
let donut, miner, multicall;

/*===================================================================*/
/*===========================  CONTRACT DATA  =======================*/

async function getContracts() {
  miner = await ethers.getContractAt(
    "contracts/Miner.sol:Miner",
    "0x3EE441030984ACfeCf17FDa6953bea00a8c53Fa7"
  );
  donut = await ethers.getContractAt(
    "contracts/Miner.sol:Donut",
    await miner.donut()
  );
  multicall = await ethers.getContractAt(
    "contracts/Multicall.sol:Multicall",
    "0x88e52940E62E150619cAa54b1bc51b1103a2EA9F"
  );

  console.log("Contracts Retrieved");
}

/*===========================  END CONTRACT DATA  ===================*/
/*===================================================================*/

async function deployMiner() {
  console.log("Starting Miner Deployment");
  const minerArtifact = await ethers.getContractFactory("Miner");
  const minerContract = await minerArtifact.deploy(TREASURY_ADDRESS, {
    gasPrice: ethers.gasPrice,
  });
  miner = await minerContract.deployed();
  await sleep(5000);
  console.log("Miner Deployed at:", miner.address);
}

async function verifyMiner() {
  console.log("Starting Miner Verification");
  await hre.run("verify:verify", {
    address: miner.address,
    contract: "contracts/Miner.sol:Miner",
    constructorArguments: [TREASURY_ADDRESS],
  });
  console.log("Miner Verified");
}

async function deployMulticall() {
  console.log("Starting Multicall Deployment");
  const multicallArtifact = await ethers.getContractFactory("Multicall");
  const multicallContract = await multicallArtifact.deploy(miner.address, {
    gasPrice: ethers.gasPrice,
  });
  multicall = await multicallContract.deployed();
  await sleep(5000);
  console.log("Multicall Deployed at:", multicall.address);
}

async function verifyMulticall() {
  console.log("Starting Multicall Verification");
  await hre.run("verify:verify", {
    address: multicall.address,
    contract: "contracts/Multicall.sol:Multicall",
    constructorArguments: [miner.address],
  });
  console.log("Multicall Verified");
}

async function verifyDonut() {
  console.log("Starting Donut Verification");
  await hre.run("verify:verify", {
    address: donut.address,
    contract: "contracts/Miner.sol:Donut",
  });
  console.log("Donut Verified");
}

async function printDeployment() {
  console.log("**************************************************************");
  console.log("Donut: ", donut.address);
  console.log("Miner: ", miner.address);
  console.log("Multicall: ", multicall.address);
  console.log("**************************************************************");
}

async function main() {
  const [wallet] = await ethers.getSigners();
  console.log("Using wallet: ", wallet.address);

  await getContracts();

  //===================================================================
  // Deploy System
  //===================================================================

  // console.log("Starting System Deployment");
  // await deployMiner();
  // await deployMulticall();
  // await printDeployment();

  /*********** UPDATE getContracts() with new addresses *************/

  //===================================================================
  // Verify System
  //===================================================================

  // console.log("Starting System Verification");
  // await verifyDonut();
  // await sleep(5000);
  // await verifyMiner();
  // await sleep(5000);
  // await verifyMulticall();
  // await sleep(5000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
