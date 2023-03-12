const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Local network detected! Deploying UniswapV3Factory...")
    await deploy("UniswapV3Factory", {
        from: deployer,
        log: true,
        args: [],
    })

    log("UniswapV3Factory Deployed!")
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "uniswapV3Factory"]
