const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const verify = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const factory = await deploy("ProjectFactory", {
    from: deployer,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(
    "Gas cost: ",
    factory.receipt.gasUsed * factory.receipt.effectiveGasPrice
  );
  console.log("Factory Transaction Address:", factory.address);

};

module.exports.tags = ["all", "fundme"];
