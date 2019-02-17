import config from './config'

import Aragon, { providers } from '@aragon/client'
import { MainStore } from './stores/main-store'
import { DiscussionStore } from './stores/discussion-store'
import { EthDiscussions } from './utils/eth-discussions'
import { WhisperProvider } from './transport-provider/whisper'


export default function() {
    const aragonApp = new Aragon(new providers.WindowMessage(window.parent))
  
    const transportProvider = new WhisperProvider({ 
        host: config.whisperHost
    })
  
    const discussionsController = new EthDiscussions({ transportProvider, aragonApp })  
  
    const discussionStore = new DiscussionStore(discussionsController)
    const mainStore = new MainStore(aragonApp, discussionsController, discussionStore)
  
    return { aragonApp, mainStore, discussionStore }
}