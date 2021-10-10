// const { WNATIVE } = require("@sushiswap/sdk");
const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();  
    const VarietyForwarder = await deploy("Forwarder", {
      from: deployer,
      args: [],
      log: true,
      deterministicDeployment: false,
    });
    console.log("VarietyForwarder:", VarietyForwarder.address);
  };
  
  module.exports.tags = ["Forwarder"];