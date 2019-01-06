const Web3 = window.Web3

export class WhisperProvider {

    constructor(opts = {}) {
        this._opts = opts

        this._initialize()
    }

    async _initialize() {
        console.log('host: ', this._opts.host)
        this._web3 = new Web3(new Web3.providers.HttpProvider(this._opts.host))
        await this._web3.personal.unlockAccount(this._web3.eth.accounts[0], this._opts.accountPassword)
    }


    async post(message, topic) {
        this._web3.shh.post({
            pubKey: this._opts.pubKey,
            ttl: 7,
            topic: '0x07678231',
            powTarget: 2.01,
            powTime: 2,
            payload: this._web3.fromUtf8(message)
        })  
    }

    subscribe(topic, cb) {
        this._web3.shh.newMessageFilter({
            privateKeyID: this._opts.privKey
        }, (err, res) => cb({
            ...res,
            message: this._web3.toUtf8(res.payload)
        }))
    }
}