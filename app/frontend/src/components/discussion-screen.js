import React from 'react'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import { ScreenType } from '../stores/main-store'
import {
    AragonApp,
    AppBar,
    Button,
    Text,
    Card
  
  } from '@aragon/ui'
  import { BackButton } from './back-button'


export const DiscussionScreen = ({ position, isVisible, mainStore }) => 
    <Screen position={position} animate>
        {isVisible && (
            <span>
                <AppBar> 
                   <BackButton 
                     onClick={() => mainStore.setCurrentScreen(ScreenType.DiscussionList)} 
                   />
                   <Text size="xxlarge">Discussion Details</Text>
                </AppBar>
                <AppLayout.ScrollWrapper>
                    <AppLayout.Content>           
                            faefaewf
                    </AppLayout.Content>
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>     