import DiscussionAppContract from "../contracts/DiscussionApp.json"
import getWeb3 from './get-web3'


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



    async sendMessage(discussionId, messageContent) {
        const messageObj = await this._createContractMessage(discussionId)
        
        // TODO: Add contract address
        const signedMessage = await this._signMessage({ ...messageObj, content: messageContent })
        console.log('signed message: ', signedMessage)

        this._messagingProvider.post(JSON.stringify(signedMessage))
    }

    
    async _createContractMessage(discussionId) {
        await this._contract.methods.addMessage(discussionId).send({ from: this._accounts[0] })
        return this._getLastMessage(discussionId)
    }

    async _signMessage(message) {
        const signature = await this._web3.eth.personal.sign(JSON.stringify(message), this._accounts[0])
        
        console.log('sign: ', signature)
        return {
            signature,
            ...message
        }
    }

    async _getLastMessage(discussionId) {
        let messageId = (await this._contract.methods.getMessgesCount(0).call()) - 1

        while (messageId > 0) {
            const message = await this._contract.methods.getMessage(discussionId, messageId).call()
            
            // TODO: Add discussionId
            if (message.author === this._accounts[0]) {
                return { 
                    id: messageId,
                    author: message.author
                }
            }

            messageId--
        }
    }
 

}