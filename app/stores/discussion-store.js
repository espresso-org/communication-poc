import { observable, action, computed } from 'mobx'
import { fromPromise } from 'mobx-utils'

export class DiscussionStore {
    constructor(discussionsController) {
        this._ctl = discussionsController
    }    

    @observable currentDiscussionId
    @observable messages = []
    @observable currentMessageText = ''
    
    @computed get currentDiscussion() {
        return fromPromise(new Promise(res => 
            res(this.discussions[this.currentDiscussionId])
        ))
    }

    @action setCurrentDiscussion(discussionId) {
        this.currentDiscussionId = discussionId
        this.messages = []

        this._ctl
            .messages(discussionId)
            .takeWhile(() => this.currentDiscussionId === discussionId)
            .subscribe(msg => this._onNewMessage(msg))
    }

    @action sendMessage() {
        this._ctl.sendMessage({ 
            discussionId: this.currentDiscussionId,
            content: this.currentMessageText 
        })

        this.currentMessageText = ''
    }    

    _onNewMessage(msg) {
        this.messages.push(msg)
    }
}