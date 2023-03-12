const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Local network detected! Deploying PoolAddressTest...")
    await deploy("PoolAddressTest", {
        from: deployer,
        log: true,
        args: [],
    })
    await deploy("CalHash", {
        from: deployer,
        log: true,
        args: [],
    })

    log("PoolAddressTest Deployed!")
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "PoolAddressTest"]
