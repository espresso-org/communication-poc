import React from 'react'
import styled from 'styled-components'
import { Card } from '@aragon/ui'
import Blockies from 'react-blockies'
import { EthAddress } from './eth-address'

export const Message = ({ message }) => 
    <Main>
        <TopContent>
            <AuthorIcon title={message.author} size={46}>
                <Blockies
                    seed={message.author}
                    size={26}
                    scale={4}
                    color='#dfe'
                    bgColor='#ffe'
                    spotColor='#abc'
                />
            </AuthorIcon>  
            <div>
                <MessageInfo>
                    <Author><EthAddress ethAddress={message.author} /></Author>
                    <MessageDate>5:32pm</MessageDate>
                </MessageInfo>
                <MessageContent>{message.content}</MessageContent>
            </div>      
        </TopContent>
        <BottomBar></BottomBar>
    </Main>

const Main =styled(Card)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;  
    margin-top: 16px;
    &:first-of-type {
        margin-top: 0;
    }
`
const TopContent = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 90px;
    padding: 16px;
`
const BottomBar = styled.div`
    height: 34px;
    padding: 0 16px;
    /*border-top: 1px solid #E6E6E6;*/
`
const MessageInfo = styled.div`
    display: flex;
    align-items: center;
`
const MessageDate = styled.div`
    margin-left: 8px;
    color: #ccc;
`
const Author = styled.div`
    font-weight: 600;
`
const MessageContent = styled.div`
    margin-top: 4px;
`
const AuthorIcon = styled.div(({ size=32 }) => `
    display: inline-block;
    width: ${size}px;
    min-width: ${size}px;
    max-width: ${size}px;    
    height: ${size}px;
    border-radius: 50%;
    overflow: hidden;
    background: white;    
    margin-right: 16px;
`)