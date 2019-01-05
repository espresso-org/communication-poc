import { observable, action, computed } from 'mobx'
import { fromPromise } from 'mobx-utils'

export const ScreenType = {
    DiscussionList: 'DiscussionList',
    Discussion: 'Discussion'
}

const discussions = [{
    id: 0,
    title: 'Test title',
    description: 'Should we upgrade the voting app to v2?',
    commentsCount: 2,
    stakedTokens: 34,
    date: new Date('2018-12-31')
}]

// Messages for every Disussions
const messages = {
    0: [{
        content: 'This is my first message',
        date: new Date('2019-01-02')
    }
    ]
}

export class MainStore {

    @observable currentScreen = ScreenType.DiscussionList

    @observable discussions = discussions

    @observable currentMessageText = ''

    
    @observable currentDiscussionId

    @computed get currentDiscussion() {
        return fromPromise(new Promise(res => res(this.discussions[this.currentDiscussionId])))
    }

    @computed get currentDiscussionMessages() {
        return fromPromise(new Promise(res => res(messages[this.currentDiscussionId])))
    }

    @action setCurrentScreen(screenType) {
        this.currentScreen = screenType
    }

    @action openDiscussion(discussionId) {
        this.currentDiscussionId = discussionId
        this.currentScreen = ScreenType.Discussion
    }
}