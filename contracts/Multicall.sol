// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IWETH {
    function deposit() external payable;
}

interface IMiner {
    struct Slot0 {
        uint8 locked;
        uint16 epochId;
        uint192 initPrice;
        uint40 startTime;
        uint256 dps;
        address miner;
        string uri;
    }

    function donut() external view returns (address);
    function quote() external view returns (address);
    function getPrice() external view returns (uint256);
    function getDps() external view returns (uint256);
    function getSlot0() external view returns (Slot0 memory);
    function mine(
        address miner,
        address provider,
        uint256 epochId,
        uint256 deadline,
        uint256 maxPrice,
        string memory uri
    ) external returns (uint256 price);
}

contract Multicall is Ownable {
    using SafeERC20 for IERC20;

    address public immutable miner;
    address public immutable donut;
    address public immutable quote;

    struct MinerState {
        uint16 epochId;
        uint192 initPrice;
        uint40 startTime;
        uint256 glazed;
        uint256 price;
        uint256 dps;
        uint256 nextDps;
        address miner;
        string uri;
        uint256 ethBalance;
        uint256 wethBalance;
        uint256 donutBalance;
    }

    constructor(address _miner) {
        miner = _miner;
        donut = IMiner(miner).donut();
        quote = IMiner(miner).quote();
    }

    function mine(address provider, uint256 epochId, uint256 deadline, uint256 maxPrice, string memory uri)
        external
        payable
    {
        IWETH(quote).deposit{value: msg.value}();
        IERC20(quote).safeApprove(miner, 0);
        IERC20(quote).safeApprove(miner, msg.value);
        IMiner(miner).mine(msg.sender, provider, epochId, deadline, maxPrice, uri);
    }

    function withdraw(address to) external onlyOwner {
        (bool success,) = to.call{value: address(this).balance}("");
        require(success, "Multicall: Withdraw failed");
    }

    function getMiner(address account) external view returns (MinerState memory state) {
        IMiner.Slot0 memory slot0 = IMiner(miner).getSlot0();
        state.epochId = slot0.epochId;
        state.initPrice = slot0.initPrice;
        state.startTime = slot0.startTime;
        state.glazed = slot0.dps * (block.timestamp - slot0.startTime);
        state.price = IMiner(miner).getPrice();
        state.dps = slot0.dps;
        state.nextDps = IMiner(miner).getDps();
        state.miner = slot0.miner;
        state.uri = slot0.uri;
        state.ethBalance = account == address(0) ? 0 : account.balance;
        state.wethBalance = account == address(0) ? 0 : IERC20(quote).balanceOf(account);
        state.donutBalance = account == address(0) ? 0 : IERC20(donut).balanceOf(account);
        return state;
    }
}
