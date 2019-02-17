import React from 'react'
import styled from 'styled-components'
import { Screen } from './screen'
import { AppLayout } from './app-layout'
import { ScreenType } from '../stores/main-store'
import {
    AragonApp,
    AppBar,
    Button,
    Card,
    Text,
    TextInput
  
  } from '@aragon/ui'
import { BackButton } from './back-button'
import { observer } from 'mobx-react'
import { SideBar } from './side-bar'
import { Message } from './message'
import main from 'react-blockies';


export const DiscussionScreen = observer(({ position, isVisible, currentDiscussion, mainStore }) => 
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
                    {currentDiscussion.state === 'pending' &&
                        <AppLayout.Content>           
                        Loading...   
                        </AppLayout.Content>
                    }                        
                    { currentDiscussion.value && 
                        <Content> 
                            <TwoPanels>
                                <MainContent>
                                    <Title size="xlarge">{currentDiscussion.value.title}</Title>
                                    <Discussions>
                                        {   mainStore.currentDiscussionMessages.value.map(message =>
                                                <Message message={message} />
                                            )
                                        }                                        
                                    </Discussions>
                                    <MainTextInput 
                                        placeholder="Enter your message..."
                                        value={mainStore.currentMessageText} 
                                        onChange={e => mainStore.currentMessageText = e.currentTarget.value} 
                                        onKeyPress={onEnterKeyPress(() => mainStore.sendMessage())}
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
)   

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