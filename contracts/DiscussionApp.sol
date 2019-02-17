pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract DiscussionApp is AragonApp {
    using SafeMath for uint256;

    bytes32 constant public CREATE_DISCUSSION_ROLE = keccak256("CREATE_DISCUSSION_ROLE");

    function initialize() onlyInit public {
        initialized();
    }


}
