import React from 'react'
import styled from 'styled-components'
import { Card, Text, Button, BadgeNumber } from '@aragon/ui'

export const DiscussionCard = ({ discussion }) => 
    <Main>
        <DateContainer>{printDate(discussion.date)}</DateContainer>
        <Title>{discussion.title}</Title>
        <StatsContainer>
            <BadgeNumber number={2} background="rgb(220, 234, 239)" foreground="rgb(109, 128, 136)" /> comments
        </StatsContainer>
        <Description>{discussion.description}</Description>

        <BottomBar>
            <Button mode="strong">See Discussion</Button>
        </BottomBar>
    </Main>



function printDate(date) {
    const diff = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    return `${diff.toFixed(0)} days ago`
}

const Main = styled(Card)`
    padding: 6px 16px 16px 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;    
`

const Title = styled(Text)
    .attrs({ size: 'xlarge' })`
    margin-top: 10px;

`

const StatsContainer = styled.div`
    display: flex;
`

const Description = styled(Text)`
    margin-top: 10px;

`

const BottomBar = styled.div`
    margin-top: auto;

`

const DateContainer = styled.div`
    text-align: right;
    font-size: 12px;
    color: #666;
    width: 100%;
`