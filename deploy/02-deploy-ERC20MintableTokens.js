const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Local network detected! Deploying ERC20MintableToken USDC...")
    await deploy("USDCContract", {
        from: deployer,
        contract: "ERC20Mintable",
        log: true,
        args: ["USDC", "USDC"],
    })
    log("Local network detected! Deploying ERC20MintableToken ETH...")
    await deploy("ETHContract", {
        from: deployer,
        contract: "ERC20Mintable",
        log: true,
        args: ["Ether", "ETH"],
    })
    log("ERC20Mintable Tokens Deployed!")
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "ERC20MintableTokens"]
