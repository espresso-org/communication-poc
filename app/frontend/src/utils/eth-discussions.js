import DiscussionAppContract from "../contracts/DiscussionApp.json"

const Web3 = window.Web3
const web3 = window.web3

export class EthDiscussions {

    constructor(opts = {}) {
        this._opts = opts
        window.ethDiscussions = this

        this._initialize()
    }

    async _initialize() {
        this._web3 = new Web3(web3.currentProvider)
        
        const accounts = await this._web3.eth.getAccounts()

        // Get the contract instance.
        //const networkId = await this._web3.eth.net.getId()
        const networkId = await this._web3.version.getNetwork()
        const deployedNetwork = DiscussionAppContract.networks[networkId]
        this._contract = new this._web3.eth.contract(
            DiscussionAppContract.abi,
          deployedNetwork && deployedNetwork.address,
        )        
    }    

    async sendMessage(message) {
        
    }

    async _signMessage(message) {
        return new Promise((res, rej) => {
            this._web3.personal.sign(message, 
                this._web3.eth.accounts[0], 
                (err, result) => { 
                    if (err)
                        return rej(err)
                    
                    return res(result)
                }
            )
        })
    }    

}