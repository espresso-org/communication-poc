import Web3 from "web3"

const getWeb3 = (host) =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
        const web3 = new Web3(host)
        resolve(web3)
      })
  })

export default getWeb3