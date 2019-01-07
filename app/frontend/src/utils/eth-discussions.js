const Web3 = window.Web3
const web3 = window.web3

export class EthDiscussions {

    constructor(opts = {}) {
        this._opts = opts

        this._initialize()
    }

    async _initialize() {
        this._web3 = new Web3(web3.currentProvider)
    }    

    async sendMessage(message) {
        
    }

    async _signMessage(message) {
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

}