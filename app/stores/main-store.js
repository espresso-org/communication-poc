import { observable, action, computed } from 'mobx'

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
},
{
    id: 1,
    title: 'Test title2',
    description: 'Should we upgrade the voting app to v2?',
    commentsCount: 2,
    stakedTokens: 34,
    date: new Date('2018-12-31')
}]



export class MainStore {

    constructor(aragonApp, discussionsController, discussionStore) {
        this._app = aragonApp

        this._ethDiscussion = discussionsController
        this._discussionStore = discussionStore

        window.mainStore = this
    }

    @observable currentScreen = ScreenType.DiscussionList

    @observable sidePanels = {
        newDiscussion: false
    }

    @action showNewDiscussionSidePanel() { this.sidePanels.newDiscussion = true }
    @action hideNewDiscussionSidePanel() { this.sidePanels.newDiscussion = false }

    @action createDiscussion(opts = {}) {
        console.log('new discussion')
        this.discussions.push({
            id: this.discussions.length,
            title: opts.title,
            description: opts.description,
            commentsCount: 2,
            stakedTokens: 34,
            date: new Date()
        })
    }

    @observable discussions = discussions
   
    @action setCurrentScreen(screenType) {
        this.currentScreen = screenType
    }

    @action openDiscussion(discussionId) {
        this._discussionStore.setCurrentDiscussion(discussionId)
        this.setCurrentScreen(ScreenType.Discussion)
    }
    
}