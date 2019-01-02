import React, { Component } from 'react'
import { AppLayout } from './components/app-layout'
import {
  AragonApp,
  AppBar,
  Button,
  Text,
  Card

} from '@aragon/ui'

import { MainStore } from './stores/main-store'

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
