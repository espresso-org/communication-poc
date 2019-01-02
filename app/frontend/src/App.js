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
import { DiscussionCard } from './components/discussion-card'
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

        <Screen position={1} animate>
          {mainStore.currentScreen === ScreenType.Discussion && (
              <span>
          <AppBar
            title="Discussion"
            endContent={
              <div>
                <Button mode="strong">fawefewf</Button>
              </div>
            }
          />      
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>           
              <Text size="xlarge">Discussions</Text>

            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
          </span>
          )}
        </Screen>                 
      </AragonApp>
    );
  }
}

export default App;
