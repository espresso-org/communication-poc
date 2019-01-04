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
import { observer } from 'mobx-react'


export const DiscussionScreen = observer(({ position, isVisible, currentDiscussion, mainStore }) => 
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
                    {currentDiscussion.state === 'pending' &&
                        <AppLayout.Content>           
                        Loading...   
                        </AppLayout.Content>
                    }                        
                    { currentDiscussion.value && 
                        <AppLayout.Content>           
                        {currentDiscussion.value.title}       
                        </AppLayout.Content>
                    }
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>  
)   