const Web3 = window.Web3
const web3 = window.web3
const TTL = 60 * 60 * 24 // TTL of messages in seconds: 1 day 

export class WhisperProvider {

    constructor(opts = {}) {
        this._opts = opts

        this._initialize()
    }

    async _initialize() {
        this._shhWeb3 = new Web3(new Web3.providers.HttpProvider(this._opts.host))
        this._web3 = new Web3(web3.currentProvider)
        await this._shhWeb3.personal.unlockAccount(this._shhWeb3.eth.accounts[0], this._opts.accountPassword)
    }


    async signMessage(message) {
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


    async post(message, signature, topic = '0x00000000') {
        this._shhWeb3.shh.post({
            pubKey: this._opts.pubKey,
            ttl: TTL,
            topic,
            powTarget: 2.01,
            powTime: 2,
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


