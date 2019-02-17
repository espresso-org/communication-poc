import React from 'react'
import styled from 'styled-components'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import { ScreenType } from '../stores/main-store'
import { AppBar, Text, TextInput } from '@aragon/ui'
import { BackButton } from './back-button'
import { observer, inject } from 'mobx-react'
import { SideBar } from './side-bar'
import { Message } from './message'


export const DiscussionScreen = 
inject('mainStore', 'discussionStore')(
observer(({ position, isVisible, mainStore, discussionStore }) => 
    <Screen position={position} animate>
        {isVisible && (
            <Main>
                <AppBar> 
                   <BackButton 
                     onClick={() => mainStore.setCurrentScreen(ScreenType.DiscussionList)} 
                   />
                   <Text size="xxlarge">Discussion Details</Text>
                </AppBar>
                
                
                <Wrapper>
                    {discussionStore.currentDiscussion.state === 'pending' &&
                        <AppLayout.Content>           
                        Loading...   
                        </AppLayout.Content>
                    }                        
                    {discussionStore.currentDiscussion.value && 
                        <Content> 
                            <TwoPanels>
                                <MainContent>
                                    <Title size="xlarge">{discussionStore.currentDiscussion.value.title}</Title>
                                    <Discussions>
                                        {   discussionStore.messages.map(message =>
                                                <Message message={message} />
                                            )
                                        }                                        
                                    </Discussions>
                                    <MainTextInput 
                                        placeholder="Enter your message..."
                                        value={discussionStore.currentMessageText} 
                                        onChange={e => discussionStore.currentMessageText = e.currentTarget.value} 
                                        onKeyPress={onEnterKeyPress(() => discussionStore.sendMessage())}
                                    />
                                </MainContent>
                                <SideBar />
                            </TwoPanels>          
                        
                        </Content>
                    }
                </Wrapper>
            </Main>
        )}
    </Screen>  
))


function onEnterKeyPress(cb) {
    return e => e.key === 'Enter' && cb()
}


const Main = styled.div`
    height: 100%;
    flex-grow: 1;
`

const TwoPanels = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
  height: 100%;
`

const MainContent = styled.aside`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: end;
    height: 100%;
    
    width: 100%;

`

const Title = styled(Text).attrs({ size: 'xlarge' })`
    margin-bottom: 20px;
`



const Discussions = styled.div`
`

const Content = styled(AppLayout.Content)`
    height: 100%;
`

const Wrapper = styled(AppLayout.ScrollWrapper)`
    height: calc(100% - 64px);
`

const MainTextInput = styled(TextInput)`
    width: 100%;
    margin-top: auto;
`