import DiscussionAppContract from "../contracts/DiscussionApp.json"
import getWeb3 from './get-web3'

//const Web3 = window.Web3
//const web3 = window.web3

export class EthDiscussions {

    constructor(opts = {}) {
        this._opts = opts
        this._messagingProvider = opts.messagingProvider
        this._initialize()
    }

    async _initialize() {
        this._web3 = await getWeb3()
        
        this._accounts = await this._web3.eth.getAccounts()

        // Get the contract instance.
        const networkId = await this._web3.eth.net.getId()
        const deployedNetwork = DiscussionAppContract.networks[networkId]
        this._contract = new this._web3.eth.Contract(
            DiscussionAppContract.abi,
          deployedNetwork && deployedNetwork.address,
        )        
    }    



    async sendMessage(message) {
        
    }

    async _createContractMessage(discussionId, message) {
        await this._contract.methods.addMessage(discussionId).send({ from: this._accounts[0] })
        const messageObj = await this._getLastMessage(discussionId)
        console.log('Last message ', messageObj)
    }

    async _getLastMessage(discussionId) {
        let messageId = (await this._contract.methods.getMessgesCount(0).call()) - 1

        while (messageId > 0) {
            const message = await this._contract.methods.getMessage(discussionId, messageId).call()
            
            //console.log('message: ', message)

            if (message.author === this._accounts[0]) {
                return { 
                    id: messageId,
                    author: message.author
                }
            }

            messageId--
        }
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