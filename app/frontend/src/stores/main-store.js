import { observable, action } from 'mobx'
import { fromPromise } from 'mobx-utils'

export const ScreenType = {
    DiscussionList: 'DiscussionList',
    Discussion: 'Discussion'
}

export class MainStore {

    @observable currentScreen = ScreenType.DiscussionList

    @observable discussions = [{
        title: 'Test title',
        description: 'Should we upgrade the voting app to v2?',
        commentsCount: 2,
        stakedTokens: 34,
        date: new Date('2018-12-31')
    }]

    
    @observable currentDiscussionId

    @computed get currentDiscussion() {
        return fromPromise(new Promise(res => res(this.discussions[this.currentDiscussionId])))
    }


    @action openDiscussion(discussionId) {
        this.currentScreen = ScreenType.Discussion
    }
}