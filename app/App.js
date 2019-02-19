import React from 'react'
import { observer, inject } from 'mobx-react'
import { AragonApp } from '@aragon/ui'
import { DiscussionListScreen } from './components/discussion-list-screen'
import { DiscussionScreen } from './components/discussion-screen'
import { NewDiscussionSidePanel } from './components/side-panels/new-discussion'
import Aragon, { providers } from '@aragon/client'
import { ScreenType } from './stores/main-store'
import styled from 'styled-components'

const AppContainer = styled(AragonApp)`
  display: flex;
  align-items: center;
  justify-content: center;
`

@inject(['mainStore'])
@observer
export default class App extends React.Component {
  render () {
    const { mainStore } = this.props
    return (
      <AppContainer>
        
        <DiscussionListScreen 
          position={0}
          isVisible={mainStore.currentScreen === ScreenType.DiscussionList} 
          mainStore={mainStore} 
        />  

        <DiscussionScreen 
          position={1}
          isVisible={mainStore.currentScreen === ScreenType.Discussion} 
        />            
        <NewDiscussionSidePanel mainStore={ mainStore } /> 
      </AppContainer>
    )
  }
}