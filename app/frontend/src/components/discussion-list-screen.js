import React from 'react'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import { DiscussionCard } from './discussion-card'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import {
    AragonApp,
    AppBar,
    Button,
    Text,
    Card
  
  } from '@aragon/ui'


export const DiscussionListScreen = observer(['mainStore'], ({ position, isVisible, mainStore }) => 
    <Screen position={position} animate>
        {isVisible && (
            <span>
                <AppBar
                title="Discussions"
                endContent={
                    <div>
                    <Button 
                        mode="strong" 
                        onClick={() => mainStore.showNewDiscussionSidePanel()}
                    >
                        New Discussion
                    </Button>
                    </div>
                }
                />      
                <AppLayout.ScrollWrapper>
                    <AppLayout.Content>           
                        <Text size="xlarge">Open Discussions</Text>
                        <br />
                        <Discussions>
                        {mainStore.discussions.map(discussion => 
                            <DiscussionCard 
                                discussion={discussion} 
                                onOpenClick={() => mainStore.openDiscussion(discussion.id)}
                            />
                        )}
                        </Discussions>
                    </AppLayout.Content>
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>     
)


const Discussions = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: -8px;
`