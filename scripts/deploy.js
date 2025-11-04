const { ethers } = require("hardhat");
const { utils, BigNumber } = require("ethers");
const hre = require("hardhat");
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const convert = (amount, decimals) => ethers.utils.parseUnits(amount, decimals);
const AddressZero = "0x0000000000000000000000000000000000000000";

/*===================================================================*/
/*===========================  SETTINGS  ============================*/

const TREASURY_ADDRESS = "0x7a8C895E7826F66e1094532cB435Da725dc3868f"; // Treasury Address
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006"; // WETH Address
const LP_ADDRESS = "0xc3B9bd6F7d4bFcc22696a7bC1CC83948a33d7FAb"; // LP Address
const ADDRESS_DEAD = "0x000000000000000000000000000000000000dEaD";
const AUCTION_PERIOD = 86400; // 1 day
const PRICE_MULTIPLIER = convert("1.2", 18); // 120%
const MIN_INIT_PRICE = convert("1", 18); // 1 LP

/*===========================  END SETTINGS  ========================*/
/*===================================================================*/

// Contract Variables
let donut, miner, auction, multicall;

/*===================================================================*/
/*===========================  CONTRACT DATA  =======================*/

async function getContracts() {
  miner = await ethers.getContractAt(
    "contracts/Miner.sol:Miner",
    "0x9Bea9c75063095ba8C6bF60F6B50858B140bF869"
  );
  donut = await ethers.getContractAt(
    "contracts/Miner.sol:Donut",
    await miner.donut()
  );
  multicall = await ethers.getContractAt(
    "contracts/Multicall.sol:Multicall",
    "0xe03a89eb8b75d73Caf762a81dA260106fD42F18A"
  );
  auction = await ethers.getContractAt(
    "contracts/Auction.sol:Auction",
    "0xA0Da470d4612B1B90E96Ad43611b4C1534c7a884"
  );
  console.log("Contracts Retrieved");
}

/*===========================  END CONTRACT DATA  ===================*/
/*===================================================================*/

async function deployMiner() {
  console.log("Starting Miner Deployment");
  const minerArtifact = await ethers.getContractFactory("Miner");
  const minerContract = await minerArtifact.deploy(
    WETH_ADDRESS,
    TREASURY_ADDRESS,
    {
      gasPrice: ethers.gasPrice,
    }
  );
  miner = await minerContract.deployed();
  await sleep(5000);
  console.log("Miner Deployed at:", miner.address);
}

async function verifyDonut() {
  console.log("Starting Donut Verification");
  await hre.run("verify:verify", {
    address: donut.address,
    contract: "contracts/Miner.sol:Donut",
  });
  console.log("Donut Verified");
}

async function verifyMiner() {
  console.log("Starting Miner Verification");
  await hre.run("verify:verify", {
    address: miner.address,
    contract: "contracts/Miner.sol:Miner",
    constructorArguments: [WETH_ADDRESS, TREASURY_ADDRESS],
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

async function deployAuction() {
  console.log("Starting Auction Deployment");
  const auctionArtifact = await ethers.getContractFactory("Auction");
  const auctionContract = await auctionArtifact.deploy(
    MIN_INIT_PRICE,
    LP_ADDRESS,
    ADDRESS_DEAD,
    AUCTION_PERIOD,
    PRICE_MULTIPLIER,
    MIN_INIT_PRICE,
    {
      gasPrice: ethers.gasPrice,
    }
  );
  auction = await auctionContract.deployed();
  await sleep(5000);
  console.log("Auction Deployed at:", auction.address);
}

async function verifyAuction() {
  console.log("Starting Auction Verification");
  await hre.run("verify:verify", {
    address: auction.address,
    contract: "contracts/Auction.sol:Auction",
    constructorArguments: [
      MIN_INIT_PRICE,
      LP_ADDRESS,
      ADDRESS_DEAD,
      AUCTION_PERIOD,
      PRICE_MULTIPLIER,
      MIN_INIT_PRICE,
    ],
  });
  console.log("Auction Verified");
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
  // await deployAuction();
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
  // await verifyAuction();
  // await sleep(5000);

  //===================================================================
  // Transactions
  //===================================================================

  // set auction on multicall
  // await multicall.setAuction(auction.address);
  // console.log("Auction set on Multicall");

  // set treasury on miner to auction
  // await miner.setTreasury(auction.address);
  // console.log("Treasury set on Miner to Auction");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
