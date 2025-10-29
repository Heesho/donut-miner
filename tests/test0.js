const convert = (amount, decimals) => ethers.utils.parseUnits(amount, decimals);
const divDec = (amount, decimals = 18) => amount / 10 ** decimals;
const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { execPath } = require("process");

const AddressZero = "0x0000000000000000000000000000000000000000";

let owner, multisig, treasury, user0, user1, user2, user3;
let miner, multicall;

describe("local: test0", function () {
  before("Initial set up", async function () {
    console.log("Begin Initialization");

    [owner, multisig, treasury, user0, user1, user2, user3] =
      await ethers.getSigners();

    const minerArtifact = await ethers.getContractFactory("Miner");
    miner = await minerArtifact.deploy(treasury.address);
    console.log("- Miner Initialized");

    const multicallArtifact = await ethers.getContractFactory("Multicall");
    multicall = await multicallArtifact.deploy(miner.address);
    console.log("- Multicall Initialized");

    console.log("Initialization Complete");
    console.log();
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("Forward time", async function () {
    console.log("******************************************************");
    await network.provider.send("evm_increaseTime", [604800]);
    await network.provider.send("evm_mine");
    console.log("- time forwarded");
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("Forward time", async function () {
    console.log("******************************************************");
    await network.provider.send("evm_increaseTime", [3000]);
    await network.provider.send("evm_mine");
    console.log("- time forwarded");
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("User1 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user1)
      .mine(
        user1.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user1.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("Forward time", async function () {
    console.log("******************************************************");
    await network.provider.send("evm_increaseTime", [3000]);
    await network.provider.send("evm_mine");
    console.log("- time forwarded");
  });

  it("User2 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user2)
      .mine(
        user2.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user2.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("Forward time", async function () {
    console.log("******************************************************");
    await network.provider.send("evm_increaseTime", [86400 * 30]);
    await network.provider.send("evm_mine");
    console.log("- time forwarded");
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user2.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });

  it("User0 mines", async function () {
    console.log("******************************************************");
    let res = await multicall.getMiner(AddressZero);
    await miner
      .connect(user0)
      .mine(
        user0.address,
        AddressZero,
        res.epochId,
        1861439882,
        res.price,
        "https://example.com",
        {
          value: res.price,
        }
      );
  });

  it("Miner state", async function () {
    console.log("******************************************************");
    const minerStateUser = await multicall.getMiner(user0.address);
    const minerStateTreasury = await multicall.getMiner(treasury.address);
    const { timestamp } = await ethers.provider.getBlock("latest");
    console.log("Day: ", (timestamp - (await miner.startTime())) / 86400);
    console.log("Price: ", divDec(minerStateUser.price));
    console.log("DPS: ", divDec(minerStateUser.nextDps));
    console.log("User DONUT balance: ", divDec(minerStateUser.donutBalance));
    console.log("User ETH balance: ", divDec(minerStateUser.ethBalance));
    console.log(
      "Treasury ETH balance: ",
      divDec(minerStateTreasury.ethBalance)
    );
  });
});
