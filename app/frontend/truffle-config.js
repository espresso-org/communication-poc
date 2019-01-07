const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),

  "networks": {
    rpc: {
      host: "localhost",
      port: 8545,
      network_id: 2, 
      gas: 0xfffffffffff, 
      gasPrice: 0x01       
    },  
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"   
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 10000
    }
  }
};
