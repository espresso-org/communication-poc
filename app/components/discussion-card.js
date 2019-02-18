import React from 'react'
import styled from 'styled-components'
import { Card, Countdown, CircleGraph, ProgressBar, Text, theme, Button } from '@aragon/ui'

export const DiscussionCard = ({ discussion, onOpenClick }) => 
    <Main>
        <TopBar>
            <DateContainer>{printDate(discussion.date)}</DateContainer>                   
        </TopBar>
        
        <Title>{discussion.title}</Title>
        <StatsContainer>
            <Countdown end={endDate} />               
        </StatsContainer>
        <Description>{discussion.description}</Description>

        <ForwardingConditions>
            <Condition>
                <Text>Participants</Text>
                <div><CircleGraph value={1/3} /></div>
            </Condition>
            
            <Condition>
                <Text>Token total</Text>
                <div><CircleGraph value={3/8} /></div>
            </Condition>
        </ForwardingConditions>

        <BottomBar>
            <Button onClick={onOpenClick} mode="strong">See Discussion</Button>
        </BottomBar>
    </Main>


const DAY_IN_MS = 1000 * 60 * 60 * 24
const endDate = new Date(Date.now() + 5 * DAY_IN_MS)

function printDate(date) {
    const diff = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    return `${diff.toFixed(0)} days ago`
}

const Main = styled(Card)`
    padding: 6px 12px 16px 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;    
    margin: 0 8px;
`
const Title = styled(Text)
    .attrs({ size: 'xlarge' })`
    margin-top: 16px;
`
const Description = styled(Text)`
    margin-top: 10px;
    text-align: justify;
    -moz-text-align-last: center;
    text-align-last: center;
`
const BottomBar = styled.div`
    margin-top: 20px;
`
const TopBar = styled.div`
    display: flex;
    color: #666;
    font-size: 12px;    
    justify-content: end;
    width: 100%;
`
const CommentsCount = styled.div`
    display: flex;
    font-size: 12px;
    color: #666;    
`
const DateContainer = styled.div`
    text-align: left;
    font-size: 12px;
    color: #666;
    width: 100%;
`
const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ForwardingConditions = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
`
const Condition = styled.div`
    margin-right: 20px;
    margin-left:20px;
`