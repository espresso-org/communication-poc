import React from 'react'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import { DiscussionCard } from './discussion-card'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import {
    AppBar,
    Button,
    Countdown,
    Text  
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
                                <Card>
                                    <Countdown end={endDate} />
                                    <DiscussionCard 
                                        discussion={discussion} 
                                        onOpenClick={() => mainStore.openDiscussion(discussion.id)}
                                    />
                                </Card>
                            )}
                        </Discussions>
                    </AppLayout.Content>
                </AppLayout.ScrollWrapper>
            </span>
        )}
    </Screen>     
)

const DAY_IN_MS = 1000 * 60 * 60 * 24
const endDate = new Date(Date.now() + 5 * DAY_IN_MS)

const Discussions = styled.div`
    display: flex;
    flex-direction: row;
`
const Card = styled.div`
    margin-right: 18px;
`