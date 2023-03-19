const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Local network detected! Deploying TickMathTest...")
    await deploy("TickMathTest", {
        from: deployer,
        log: true,
        args: [],
    })

    log("TickMathTest Deployed!")
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "TickMathTest"]
