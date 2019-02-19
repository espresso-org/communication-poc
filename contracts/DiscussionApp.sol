pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";
import "@aragon/os/contracts/common/IForwarder.sol";
import "@aragon/apps-shared-minime/contracts/MiniMeToken.sol";

contract DiscussionApp is IForwarder, AragonApp {
    using SafeMath for uint256;

    enum DiscussionType { 
        UniqueParticipants, 
        TokenSum, 
        UniqueParticipantsAndTokenSum, 
        UniqueParticipantsOrTokenSum 
    }

    DiscussionType discussionType;
    MiniMeToken token;
    uint64 discussionDuration;
    uint256 minOwnedTokens;
    uint16 minParticipants;
    uint256 minTokenSum;
    bool lockedDuration;
    mapping ( address => bool ) blackList;

    Discussion[] discussions;

    struct Discussion {
        uint64 createdDate;
        address creator;
        uint64 snapshotBlock;
        bytes executionScript;
        uint256 participationCount;
        mapping ( address => bool ) participants;
        mapping ( address => bool ) moderators;

        uint64 duration;
        uint256 minOwnedTokens;
        bool isActionForwarded;
    }

    function initialize() onlyInit external {
        initialized();
    }  

    function isForwarder() public pure returns (bool) {
        return true;
    }

    /**
    * @notice Creates a Discussion to execute the desired action, and casts a support vote if possible
    * @dev IForwarder interface conformance
    * @param _evmScript Start vote with script
    */
    function forward(bytes _evmScript) public {
        require(canForward(msg.sender, _evmScript), "Can not forward");
        // Create discussion
    }

    function canForward(address _sender, bytes) public view returns (bool) {
		// Validation
        return true;
    }

    function createDiscussion(uint64 _duration, uint256 _minOwnedTokens) external {

    }

    function participate(uint256 _discussionId) external {

    }

    function addModerator(uint256 _discussionId, address _moderator) external {

    }

    function removeModerator(uint256 _discussionId, address _moderator) external {

    }

    function forwardAction(uint256 _discussionId) external {

    }

    function addBlacklistedEntity(address _entity) external {

    }

    function removeBlacklistedEntity(address _entity) external {

    }
}