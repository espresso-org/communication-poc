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


    async sendMessage(message) {
        const signedMessage = await this.signMessage(message)

        if (this._validatePreSend(signedMessage))
            this._messagingProvider.post(JSON.stringify(signedMessage))
    }



    async signMessage(message) {

        return this._app
            .accounts()
            .map(accounts => ({ ...message, author: accounts[0] }))
            .map(message => ({ ...message, signature: signatureTemplate(message) }))
            .map(async message => ({
                ...message,
                signature: await sign(message.signature, message.author, this._app)
            }))
            .take(1)
            .toPromise()
        
    }


    _validatePreSend(message) {
        // TODO: Message talidation
        return true
    }

}

const signatureTemplate = ({ author, content }) => `
Author: ${author}
Content: ${content}
`