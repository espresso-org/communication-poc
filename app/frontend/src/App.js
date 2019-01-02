import React, { Component } from 'react'
import { AppLayout } from './components/app-layout'
import {
  AragonApp,
  AppBar,
  Button,
  Text,
  Card

} from '@aragon/ui'
import { DiscussionCard } from './components/discussion-card'

import { MainStore } from './stores/main-store'

const mainStore = new MainStore()

class App extends Component {
  render() {
    return (
      <AragonApp publicUrl="./aragon-ui/">
          <AppBar
            title="Discussions"
            endContent={
              <div>
                <Button mode="strong">New Discussion</Button>
              </div>
            }
          />      
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              <Text size="xlarge">Open Discussions</Text>
              <br />
              {mainStore.discussions.map(discussion => 
                <DiscussionCard discussion={discussion} />
              )}
              <Card>
                allo
              </Card>
              test
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
      </AragonApp>
    );
  }
}

export default App;
