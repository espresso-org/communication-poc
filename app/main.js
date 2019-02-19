import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import injectDependencies from './dependencies'
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
      <Provider {...injectDependencies()}>
        <App />
      </Provider>
    )
  }
}
ReactDOM.render(
  <ConnectedApp />,
  document.getElementById('root')
)