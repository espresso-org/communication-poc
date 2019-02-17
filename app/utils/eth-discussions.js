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
                .take(1)
                .pluck('result')
                .toPromise()
        }
    }


 

}

const signatureTemplate = ({ author, content }) => `
Author: ${author}
Content: ${content}
`