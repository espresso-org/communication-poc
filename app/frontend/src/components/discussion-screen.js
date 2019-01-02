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


export const DiscussionScreen = ({ isVisible, mainStore }) => 
    <Screen position={1} animate>
        {isVisible && (
            <span>
                <AppBar
                title="Discussion"
                endContent={
                    <div>
                    </div>
                }
                />      
                <AppLayout.ScrollWrapper>
                    <AppLayout.Content>           

                    </AppLayout.Content>
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>     