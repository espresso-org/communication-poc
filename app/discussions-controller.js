import sign from './utils/sign'

export class DiscussionsController {
    constructor(opts = {}) {
        this._opts = opts
        this._transportProvider = opts.transportProvider
        this._app = opts.aragonApp

        this._initialize()
    }
    
    async _initialize() {
     
    }    

    messages(discussionId) {
        return this._transportProvider
            .messages()
            .map(this._decodeMessage)
            .filter(message => message.discussionId === discussionId)
    }

    async sendMessage(message) {
        const signedMessage = await this.signMessage(message)

        if (this._validatePreSend(signedMessage))
            this._transportProvider.post(this._encodeMessage(signedMessage))
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

    _decodeMessage = JSON.parse
    _encodeMessage = JSON.stringify

    _validatePreSend(message) {
        // TODO: Message validation
        return true
    }
}

const signatureTemplate = ({ author, content }) => `
Author: ${author}
Content: ${content}
`