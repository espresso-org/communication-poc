import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Aragon, { providers } from '@aragon/client'
import { Provider } from 'mobx-react'
import { MainStore } from './stores/main-store'
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

  const mainStore = new MainStore(aragonApp)

  return { aragonApp, mainStore }
}