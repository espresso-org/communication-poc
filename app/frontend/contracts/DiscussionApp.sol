pragma solidity ^0.4.24;

//import "@aragon/os/contracts/apps/AragonApp.sol";
//import "openzeppelin-solidity/contracts/math/Math.sol";


contract DiscussionApp /*is AragonApp*/ {

  bytes32 constant public DISCUSSION_MANAGER_ROLE = keccak256(abi.encodePacked("DISCUSSION_MANAGER_ROLE"));

  struct Discussion {
    address author;
    uint64 startTime;
    string title;

    //Message[] messages;

    bool isClosed;

  }

  struct Message {
    address author;
  }


  Discussion[] private discussions;


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
      isClosed: false
    }));
  }
  
  function getDiscussionsCount() public view returns (uint256) {
    return discussions.length;
  }


  function getDiscussion(uint256 index) public view returns (uint256 startTime, address author, string title, bool isClosed) {
    Discussion memory disc = discussions[index];

    startTime = disc.startTime;
    author = disc.author;
    title = disc.title;
    isClosed = disc.isClosed;

  }

}
