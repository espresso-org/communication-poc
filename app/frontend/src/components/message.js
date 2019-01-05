import React from 'react'
import styled from 'styled-components'
import { Card } from '@aragon/ui'


export const Message = ({ message }) => 
    <Main>
        {message.content}
    </Main>



const Main =styled(Card)`
    width: 100%;
    padding: 16px;
    min-height: 100px;
    height: auto;    
`