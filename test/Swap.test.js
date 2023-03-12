const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

describe("Swap Unit Tests", function () {
    let eth, usdc, factory, extra, poolAddressTest, calHash
    before(async () => {
        const abi = ethers.utils.defaultAbiCoder
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["all"])
        eth = (await ethers.getContract("ETHContract")).connect(deployer)
        usdc = (await ethers.getContract("USDCContract")).connect(deployer)
        factory = (await ethers.getContract("UniswapV3Factory")).connect(deployer)
        poolAddressTest = (await ethers.getContract("PoolAddressTest")).connect(deployer)
        calHash = await ethers.getContract("CalHash")
        extra = abi.encode(
            ["address", "address", "address"],
            [eth.address, usdc.address, deployer.address]
        )
    })
    describe("create pool", function () {
        let pool
        it("mint correctly", async () => {
            let balances = [ethers.utils.parseEther("3"), ethers.utils.parseEther("15000")]
            await eth.mint(deployer.address, balances[0])
            await usdc.mint(deployer.address, balances[1])
            assert((await eth.balanceOf(deployer.address)).eq(balances[0]))
            assert((await usdc.balanceOf(deployer.address)).eq(balances[1]))
        })
        it("deploy pool correctly", async () => {
            const createPoolTx = await factory.createPool(eth.address, usdc.address, 3000)
            const txReceipt = await createPoolTx.wait(1)
            pool = (
                await ethers.getContractAt("UniswapV3Pool", txReceipt.events[0].args.pool)
            ).connect(deployer)
            console.log(await calHash.getInitHash())
            assert.equal(
                pool.address,
                await poolAddressTest.computeAddress(
                    factory.address,
                    eth.address,
                    usdc.address,
                    3000
                )
            )
        })
    })
})
