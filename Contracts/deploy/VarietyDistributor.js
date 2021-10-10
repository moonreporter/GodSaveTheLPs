// const { WNATIVE } = require("@sushiswap/sdk");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy } = deployments;
  
    const { deployer, dev } = await getNamedAccounts();

    const VarietyAddress = (await deployments.get("VarietyToken")).address;
  
    await deploy("VarietyDistributor", {
      from: deployer,
      args: [VarietyAddress, "60000000000000000000"],
      log: true,
      deterministicDeployment: false,
    });
  };
  
  module.exports.tags = ["VarietyDistributor", "Farming"];
  module.exports.dependencies = ["VarietyToken"];