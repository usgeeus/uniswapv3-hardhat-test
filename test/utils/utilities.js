const { ethers } = require("hardhat")
const bn = require("bignumber.js")
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })
// returns the sqrt price as a 64x96
function encodePriceSqrt(reserve0, reserve1) {
    return ethers.BigNumber.from(
        new bn(reserve1.toString())
            .div(reserve0.toString())
            .sqrt()
            .multipliedBy(new bn(2).pow(96))
            .integerValue(3) //ROUND_FLOOR
            .toString()
    )
}
module.exports = { encodePriceSqrt }
