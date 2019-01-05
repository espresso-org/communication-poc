import React from 'react'
import styled from 'styled-components'
import { Card } from '@aragon/ui'
import Blockies from 'react-blockies'


export const Message = ({ message }) => 
    <Main>
        <Author title={message.author} size={46}>
            <Blockies
                seed={message.author}
                size={26}
                scale={4}
                color='#dfe'
                bgColor='#ffe'
                spotColor='#abc'
            />
        </Author>        
        {message.content}
    </Main>



const Main =styled(Card)`
    width: 100%;
    padding: 16px;
    min-height: 100px;
    height: auto;    
`

const Author = styled.div(({ size=32 }) => `
    display: inline-block;
    width: ${size}px;
    min-width: ${size}px;
    max-width: ${size}px;    
    height: ${size}px;
    border-radius: 50%;
    overflow: hidden;
    background: white;    
    margin-right: 6px;
`)