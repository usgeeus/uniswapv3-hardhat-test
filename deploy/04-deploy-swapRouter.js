const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const factoryAddress = (await ethers.getContract("UniswapV3Factory")).address
    const ethAddress = (await ethers.getContract("ETHContract")).address
    const args = [factoryAddress, ethAddress]
    log("Local network detected! Deploying SwapRouter...")
    await deploy("SwapRouter", {
        from: deployer,
        log: true,
        args: args,
    })

    log("SwapRouter Deployed!")
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "SwapRouter"]
