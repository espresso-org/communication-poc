import { observable, action, computed } from 'mobx'

export class DiscussionStore {

    constructor(discussionsController) {
        this._ctl = discussionsController
    }    

    @observable currentDiscussionId
    @observable messages = []
    
    @computed get currentDiscussion() {
        return fromPromise(new Promise(res => res(this.discussions[this.currentDiscussionId])))
    }

    @action setCurrentDiscussion(discussionId) {
        this.currentDiscussionId = discussionId
        this.messages = []

        this._ctl
            .messages(discussionId)
            .takeWhile(() => this.currentDiscussionId === discussionId)
            .subscribe(this._onNewMessage)
    }


    _onNewMessage = msg => {
        this.messages.push(msg)
    }


}


const discussions = [{
    id: 0,
    title: 'Test title',
    description: 'Should we upgrade the voting app to v2?',
    commentsCount: 2,
    stakedTokens: 34,
    date: new Date('2018-12-31')
},
{
    id: 1,
    title: 'Test title2',
    description: 'Should we upgrade the voting app to v2?',
    commentsCount: 2,
    stakedTokens: 34,
    date: new Date('2018-12-31')
}]