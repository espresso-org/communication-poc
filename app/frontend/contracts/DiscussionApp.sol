pragma solidity ^0.4.24;

//import "openzeppelin-solidity/contracts/math/Math.sol";


contract DiscussionApp {

  struct Discussion {
    address author;
    uint64 startTime;

    Message[] messages;

    bool isClosed;

  }

  struct Message {
    address author;
  }

  constructor() public {

  }
 


}
