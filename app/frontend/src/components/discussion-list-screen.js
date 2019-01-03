import React from 'react'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import { DiscussionCard } from './discussion-card'
import {
    AragonApp,
    AppBar,
    Button,
    Text,
    Card
  
  } from '@aragon/ui'


export const DiscussionListScreen = ({ isVisible, mainStore }) => 
    <Screen position={1} animate>
        {isVisible && (
            <span>
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
                            <DiscussionCard 
                                discussion={discussion} 
                                onOpenClick={() => mainStore.openDiscussion(discussion.id)}
                            />
                        )}
                    </AppLayout.Content>
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>     