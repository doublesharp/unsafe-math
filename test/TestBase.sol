// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Vm {
    function getCode(string calldata artifactPath) external view returns (bytes memory);
}

abstract contract TestBase {
    Vm internal constant vm = Vm(address(uint160(uint256(keccak256('hevm cheat code')))));

    function deploy(string memory artifact) internal returns (address deployed) {
        bytes memory code = vm.getCode(artifact);
        assembly {
            deployed := create(0, add(code, 32), mload(code))
        }
        require(deployed != address(0), 'fixture deployment failed');
    }

    function eq(uint256 a, uint256 b) internal pure {
        require(a == b, 'uint256 mismatch');
    }

    function eq(int256 a, int256 b) internal pure {
        require(a == b, 'int256 mismatch');
    }

    function eq(bool a, bool b) internal pure {
        require(a == b, 'bool mismatch');
    }

    // A different implementation from the library's unchecked Solidity operators.
    function wrappedAdd(uint256 a, uint256 b) internal pure returns (uint256 value) {
        assembly { value := add(a, b) }
    }

    function wrappedSub(uint256 a, uint256 b) internal pure returns (uint256 value) {
        assembly { value := sub(a, b) }
    }

    function wrappedMul(uint256 a, uint256 b) internal pure returns (uint256 value) {
        assembly { value := mul(a, b) }
    }

    function magnitude(int256 a) internal pure returns (uint256) {
        unchecked {
            return a < 0 ? uint256(-(a + 1)) + 1 : uint256(a);
        }
    }

    function signedDiv(int256 a, int256 b) internal pure returns (int256) {
        if (b == 0) return 0;
        uint256 quotient = magnitude(a) / magnitude(b);
        return (a < 0) != (b < 0) ? int256(wrappedSub(0, quotient)) : int256(quotient);
    }

    function signedMod(int256 a, int256 b) internal pure returns (int256) {
        if (b == 0) return 0;
        uint256 remainder = magnitude(a) % magnitude(b);
        return a < 0 ? int256(wrappedSub(0, remainder)) : int256(remainder);
    }

    function pow(uint256 base, uint256 exponent) internal pure returns (uint256 value) {
        value = 1;
        while (exponent != 0) {
            if ((exponent & 1) != 0) value = wrappedMul(value, base);
            exponent >>= 1;
            base = wrappedMul(base, base);
        }
    }
}
