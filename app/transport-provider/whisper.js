import getWeb3 from '../utils/get-web3'
import { Observable } from 'rxjs'
import config from '../config'

const TTL = 60 * 60 // TTL of messages in seconds (1 hour)
const POW_TARGET = 0.2
const POW_TIME = 60
const DEFAULT_TOPIC = '0x00000001'

export class WhisperProvider {
    constructor(opts) {
        this._initialize(opts)
    }

    async _initialize(opts) {
        this._web3 = await getWeb3(opts.host)
    }

    async post(message) {
        this._web3.shh.post({
            symKeyID: config.symKeyId,
            ttl: TTL,
            topic: DEFAULT_TOPIC,
            topics: [DEFAULT_TOPIC],
            powTarget: POW_TARGET,
            powTime: POW_TIME,
            payload: this._web3.utils.fromUtf8(message)
        })  
    }

    messages() {
        return Observable.create(observer => {
            this._web3.shh.subscribe('messages', {
                    symKeyID: config.symKeyId,
                    topics: [DEFAULT_TOPIC]
                }, 
                (err, res) => { 
                    if (err)
                        return observer.error(err)

                    observer.next(this._web3.utils.toUtf8(res.payload))
                }            
            )
        })
    }     

}