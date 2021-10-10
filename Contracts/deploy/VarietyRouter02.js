module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let wethAddress = "0x9c3c9283d3e44854697cd22d3faa240cfb032889"; // Actually.. Wrapped Matic https://mumbai.polygonscan.com/token/0x9c3c9283d3e44854697cd22d3faa240cfb032889?a=0x20c9560d42566d6ead1da3dc84137e84838fa696

  const factoryAddress = (await deployments.get("VarietyFactory")).address;

  await deploy("VarietyRouter02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["VarietyRouter02", "AMM"];
module.exports.dependencies = ["VarietyFactory"];

