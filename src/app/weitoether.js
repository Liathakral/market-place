import { ethers } from "ethers";

export default function convertWeiToEther(weiAmount, decimals = 18) {
    const etherAmount = ethers.utils.formatUnits(weiAmount, decimals);
    return etherAmount;
  }
