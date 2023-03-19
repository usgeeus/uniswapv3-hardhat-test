const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { encodePriceSqrt } = require("./utils/utilities.js")

describe("#Swap Unit Tests", function () {
    let eth, usdc, factory, extra, poolAddressTest, calHash, tickMath
    before(async () => {
        const abi = ethers.utils.defaultAbiCoder
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["all"])
        eth = (await ethers.getContract("ETHContract")).connect(deployer)
        usdc = (await ethers.getContract("USDCContract")).connect(deployer)
        factory = (await ethers.getContract("UniswapV3Factory")).connect(deployer)
        poolAddressTest = (await ethers.getContract("PoolAddressTest")).connect(deployer)
        tickMath = await ethers.getContract("TickMathTest")
        calHash = await ethers.getContract("CalHash")
        extra = abi.encode(
            ["address", "address", "address"],
            [eth.address, usdc.address, deployer.address]
        )
    })
    describe("#create pool", function () {
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
            //console.log("newly computed CREATE2 address : ", await calHash.getInitHash())
            assert.equal(
                pool.address,
                await poolAddressTest.computeAddress(
                    factory.address,
                    eth.address,
                    usdc.address,
                    3000
                )
            )
            assert.equal(await pool.factory(), factory.address)
            assert.equal(await pool.token0(), eth.address)
            assert.equal(await pool.token1(), usdc.address)
            assert.equal(await pool.fee(), 3000)
            assert.equal(await pool.tickSpacing(), 60)
            const parameters = await factory.parameters()
            //console.log("after deploy, factory parameters set to 0 : ", parameters)
        })
        it("initializes pool correctly", async () => {
            const price = encodePriceSqrt(1, 5000)
            await pool.initialize(price)
            const {
                sqrtPriceX96,
                tick,
                observationIndex,
                unlocked,
                observationCardinality,
                observationCardinalityNext,
                unlock,
            } = await pool.slot0()
            assert.equal(unlocked, true)
            assert.equal(tick, await tickMath.getTickAtSqrtRatio(price))
            console.log(
                tick,
                sqrtPriceX96,
                observationIndex,
                observationCardinality,
                observationCardinalityNext
            )
        })
    })
})
