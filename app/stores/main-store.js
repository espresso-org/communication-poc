import { observable, action, computed } from 'mobx'
import { fromPromise } from 'mobx-utils'
import config from '../config'
import { WhisperProvider } from '../messaging-provider/whisper'
import { EthDiscussions } from '../utils/eth-discussions'

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

    constructor(aragonApp) {
        this._app = aragonApp

        this._messaging = new WhisperProvider({ 
            host: config.whisperHost,
            accountPassword: config.whisperAccountPass
        })

        this._ethDiscussion = new EthDiscussions({ messagingProvider: this._messaging, aragonApp })
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

    @observable messages = {
        0: [{
            author: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
            content: 'This is my first message',
            date: new Date('2019-01-02')
        }
        ]
    }

    @observable currentMessageText = ''

    
    @observable currentDiscussionId

    @computed get currentDiscussion() {
        return fromPromise(new Promise(res => res(this.discussions[this.currentDiscussionId])))
    }

    @computed get currentDiscussionMessages() {
        return fromPromise(new Promise(res => res(this.messages[this.currentDiscussionId])))
    }

    @action setCurrentScreen(screenType) {
        this.currentScreen = screenType
    }

    @action openDiscussion(discussionId) {
        this.currentDiscussionId = discussionId
        this.currentScreen = ScreenType.Discussion
    }

    @action sendMessage() {

        if (!this.messages[this.currentDiscussionId])
            this.messages[this.currentDiscussionId] = []
        /*
        this.messages[this.currentDiscussionId].push({
            author: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
            content: message.content,
            date: new Date('2019-01-02')
        })*/

        this._ethDiscussion.sendMessage({ 
            discussionId: this.currentDiscussionId,
            content: this.currentMessageText 
        })

        this.currentMessageText = ''
    }
}