import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { AppLayout } from './components/app-layout'
import {
  AragonApp,
  AppBar,
  Button,
  Text,
  Card

} from '@aragon/ui'
import { DiscussionListScreen } from './components/discussion-list-screen'
import { DiscussionScreen } from './components/discussion-screen'
import { Screen } from './components/screen'


import { MainStore, ScreenType } from './stores/main-store'

const mainStore = new MainStore()

window.mainStore = mainStore

@observer
class App extends Component {
  render() {
    return (
      <AragonApp publicUrl="./aragon-ui/">
        <DiscussionListScreen 
          isVisible={mainStore.currentScreen === ScreenType.DiscussionList} 
          mainStore={mainStore} 
        />     

        <DiscussionScreen 
          isVisible={mainStore.currentScreen === ScreenType.Discussion} 
          mainStore={mainStore} 
        />                 
      </AragonApp>
    )
  }
}

export default App
