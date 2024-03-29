// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import "../v3-core/UniswapV3Pool.sol";

contract CalHash {
    function getInitHash() public pure returns (bytes32) {
        bytes memory bytecode = type(UniswapV3Pool).creationCode;
        return keccak256(abi.encodePacked(bytecode));
    }
}
