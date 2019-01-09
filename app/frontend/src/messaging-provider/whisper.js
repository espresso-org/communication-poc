//import Web3 from 'web3'

const Web3 = window.Web3
const TTL = 60 * 60 // TTL of messages in seconds (1 hour)
const POW_TARGET = 0.2
const POW_TIME = 60


export class WhisperProvider {

    constructor(opts = {}) {
        this._opts = opts

        this._initialize()
    }

    async _initialize() {
        this._shhWeb3 = new Web3(new Web3.providers.HttpProvider(this._opts.host))
        await this._shhWeb3.personal.unlockAccount(this._shhWeb3.eth.accounts[0], this._opts.accountPassword)
    }


    async post(message, topic = '0x00000000') {
        this._shhWeb3.shh.post({
            pubKey: this._opts.pubKey,
            ttl: TTL,
            topic,
            powTarget: POW_TARGET,
            powTime: POW_TIME,
            payload: this._shhWeb3.fromUtf8(message)
        })  
    }

    subscribe(topic, cb) {
        this._shhWeb3.shh.newMessageFilter({
            privateKeyID: this._opts.privKey
        }, (err, res) => { 


            cb({
                ...res,
                message: this._shhWeb3.toUtf8(res.payload)
            })
        }
        
        )
    }



}


