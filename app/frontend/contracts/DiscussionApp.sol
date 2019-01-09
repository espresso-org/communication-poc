pragma solidity ^0.4.24;

//import "@aragon/os/contracts/apps/AragonApp.sol";
//import "openzeppelin-solidity/contracts/math/Math.sol";


contract DiscussionApp /*is AragonApp*/ {

  bytes32 constant public DISCUSSION_MANAGER_ROLE = keccak256(abi.encodePacked("DISCUSSION_MANAGER_ROLE"));

  struct Discussion {
    address author;
    uint64 startTime;
    string title;

    bool isOpened;

  }

  struct Message {
    address author;
    uint64 timestamp;
  }


  Discussion[] private discussions;
  mapping ( uint256 => Message[] ) messages; // discussionId => Message


  constructor() public {

  }
 
  function createDiscussion(string _title) 
    public 
    //auth(DISCUSSION_MANAGER_ROLE)
  {
    discussions.push(Discussion({
      startTime: uint64(now),
      author: msg.sender,
      title: _title,
      isOpened: true
    }));

  }
  
  function getDiscussionsCount() public view returns (uint256) {
    return discussions.length;
  }


  function getDiscussion(uint256 index) public view returns (uint256 startTime, address author, string title, bool isOpened) {
    Discussion memory disc = discussions[index];

    startTime = disc.startTime;
    author = disc.author;
    title = disc.title;
    isOpened = disc.isOpened;

  }



  /**
   * Messages
   */

  function addMessage(uint256 _discussionId) 
    public
  {
    require(discussions[_discussionId].isOpened);

    messages[_discussionId].push(Message({
      author: msg.sender,
      timestamp: uint64(now)
    }));
  }   


  function getMessgesCount(uint256 _discussionId) public view returns (uint256) {
    return messages[_discussionId].length;
  }


  function getMessage(uint256 _discussionId, uint256 _messageId) 
    public 
    view 
    returns ( address author, uint256 timestamp) 
  {

    Message memory message = messages[_discussionId][_messageId];

    author = message.author;
    timestamp = message.timestamp;

  }


}
