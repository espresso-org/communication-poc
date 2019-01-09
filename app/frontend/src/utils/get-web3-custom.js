import Web3 from "web3"

const getWeb3 = (host) =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {

        const provider = new Web3.providers.HttpProvider(
          host
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      })
  });

export default getWeb3
