import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Aragon, { providers } from '@aragon/client'
import { Provider } from 'mobx-react'

import config from './config'
import { MainStore } from './stores/main-store'
import { DiscussionStore } from './stores/discussion-store'
import { EthDiscussions } from './utils/eth-discussions'
import { WhisperProvider } from './transport-provider/whisper'
import App from './App'


class ConnectedApp extends React.Component {

  componentDidMount() {

    window.addEventListener('message', this.handleWrapperMessage)

    // If using Parcel, reload instead of using HMR.
    // HMR makes the app disconnect from the wrapper and the state is empty until a reload
    // See: https://github.com/parcel-bundler/parcel/issues/289
    if (module.hot) {
      module.hot.dispose(() => {
        window.location.reload();
      })
    }
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleWrapperMessage)
  }

  render() {
    return (
      <Provider {...getInjectedObjects()}>
        <App />
      </Provider>
    )
  }
}
ReactDOM.render(
  <ConnectedApp />,
  document.getElementById('root')
)



function getInjectedObjects() {
  const aragonApp = new Aragon(new providers.WindowMessage(window.parent))

  const transportProvider = new WhisperProvider({ 
      host: config.whisperHost
  })

  const discussionsController = new EthDiscussions({ transportProvider, aragonApp })  

  const discussionStore = new DiscussionStore(discussionsController)
  const mainStore = new MainStore(aragonApp, discussionsController, discussionStore)

  return { aragonApp, mainStore, discussionStore }
}