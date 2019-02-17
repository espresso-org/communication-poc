import sign from './sign'


export class EthDiscussions {

    constructor(opts = {}) {
        this._opts = opts
        this._messagingProvider = opts.messagingProvider
        this._app = opts.aragonApp

        this._initialize()
    }
    
    async _initialize() {
     
    }    


    async sendMessage(discussionId, messageContent) {
        const messageObj = { discussionId, content: messageContent }
        console.log('signing ', messageObj)
        const signedMessage = await this._signMessage(messageObj)
        console.log('signed message: ', signedMessage)

        this._messagingProvider.post(JSON.stringify(signedMessage))
    }



    async _signMessage(message) {

        //const signature = await sign(message, this._app)

        //const signature = await this._web3.eth.personal.sign(JSON.stringify(message), this._accounts[0])
        
        //console.log('sign: ', signature)
        return {
            ...message,
            signature: await this._app
                .accounts()
                .map(accounts => ({
                    ...message,
                    author: accounts[0]
                }))
                .map(message => ({
                    ...message,
                    signature: signatureTemplate(message)
                }))
                .mergeMap(message => this._app.rpc.sendAndObserveResponses('sign', [message.signature, message.author]))
                .toPromise()
        }
    }


 

}

const signatureTemplate = ({ author, content }) => `
${author}
${content}
`