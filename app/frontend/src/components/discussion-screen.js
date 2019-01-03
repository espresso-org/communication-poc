import React from 'react'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import {
    AragonApp,
    AppBar,
    Button,
    Text,
    Card
  
  } from '@aragon/ui'
  import { BackButton } from './back-button'


export const DiscussionScreen = ({ isVisible, mainStore }) => 
    <Screen position={0} animate>
        {isVisible && (
            <span>
                <AppBar> 
                   <BackButton />
                   <Text size="xxlarge">faewfea</Text>
                </AppBar>
                <AppLayout.ScrollWrapper>
                    <AppLayout.Content>           
                            faefaewf
                    </AppLayout.Content>
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>     