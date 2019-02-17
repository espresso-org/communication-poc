import getWeb3 from '../utils/get-web3-custom'
import config from '../config'

const TTL = 60 * 60 // TTL of messages in seconds (1 hour)
const POW_TARGET = 0.2
const POW_TIME = 60
const DEFAULT_TOPIC = '0x00000001'


export class WhisperProvider {

    constructor(opts = {}) {
        this._opts = opts

        this._initialize()
    }

    async _initialize() {
        this._shhWeb3 = await getWeb3(this._opts.host)
        this._accounts = await this._shhWeb3.eth.getAccounts()
        await this._shhWeb3.eth.personal.unlockAccount(this._accounts[0], this._opts.accountPassword, 3600)
    }



    async post(message, topic = DEFAULT_TOPIC) {
        this._shhWeb3.shh.post({
            symKeyID: config.symKeyId,
            ttl: TTL,
            topic: topic,
            topics: [topic],
            powTarget: POW_TARGET,
            powTime: POW_TIME,
            payload: this._shhWeb3.utils.fromUtf8(message)
        })  
    }

    subscribe(topic = DEFAULT_TOPIC, cb) {
        this._filterId = this._shhWeb3.shh.subscribe('messages', {
            symKeyID: config.symKeyId,
            topics: [topic]
        }, (err, res, g) => { 
            if (err)
                console.log('err: ', err)
            
            console.log('g: ', res)
            
            cb({
                ...res,
                message: this._shhWeb3.utils.toUtf8(res.payload)
            })
        }
        
        )
    }    

    /*
    newMessageFilter(topic, cb) {
        this._filterId = this._shhWeb3.shh.newMessageFilter({
            symKeyID: "ef2f34bf51b2d9b28caeac4a774ca9682136ab79d709c8a738700909a7d1799b",
            topics: ['0x00000001']
        }, (err, res, g) => { 
            if (err)
                console.log('err: ', err)
            
            console.log('g: ', res)
            
            cb({
                ...res,
                //message: this._shhWeb3.utils.toUtf8(res.payload)
            })
        }
        
        )
    }*/


/*
    async post(message, topic = '0x00000000') {
        this._shhWeb3.shh.post({
            pubKey: this._opts.pubKey,
            ttl: TTL,
            topic,
            powTarget: POW_TARGET,
            powTime: POW_TIME,
            payload: this._shhWeb3.utils.fromUtf8(message)
        })  
    }

    subscribe(topic, cb) {
        this._filterId = this._shhWeb3.shh.newMessageFilter({
            privateKeyID: this._opts.privKey
        }, (err, res, g) => { 
            if (err)
                console.log('err: ', err)
            
            console.log('g: ', res)
            
            cb({
                ...res,
                //message: this._shhWeb3.utils.toUtf8(res.payload)
            })
        }
        
        )
    }
*/


}


