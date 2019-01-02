import React from 'react'
import styled from 'styled-components'
import { Card } from '@aragon/ui'

export const DiscussionCard = ({ discussion }) => 
    <Main>
        <DateContainer>{printDate(discussion.date)}</DateContainer>
        {discussion.title}

    </Main>



function printDate(date) {
    const diff = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    return `${diff.toFixed(0)} days ago`
}

const Main = styled(Card)`
    margin-top: 20px;
`

const DateContainer = styled.div`

`