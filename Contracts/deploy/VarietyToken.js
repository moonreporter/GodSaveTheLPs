// const { WNATIVE } = require("@sushiswap/sdk");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();
  
    await deploy("VarietyToken", {
      from: deployer,
      args: ['0x262A73Ae4376a4D142A897c5E8148fd5F537EEb2'],
      log: true,
      deterministicDeployment: false,
    });
  };
  
  module.exports.tags = ["VarietyToken", "ERC20"];