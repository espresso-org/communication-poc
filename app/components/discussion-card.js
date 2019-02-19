import React from 'react'
import styled from 'styled-components'
import { Card, CircleGraph, Text, Button } from '@aragon/ui'

export const DiscussionCard = ({ discussion, onOpenClick }) => 
    <Main>
        <Title>{discussion.title}</Title>
        <Description>{discussion.description}</Description>
        <ForwardingConditions>
            <Condition>
                <Text>Participants</Text>
                <div style={{marginTop: '10px'}}><CircleGraph value={1/3} /></div>
            </Condition>
            
            <Condition>
                <Text>Token total</Text>
                <div style={{marginTop: '10px'}}><CircleGraph value={3/8} /></div>
            </Condition>
        </ForwardingConditions>

        <BottomBar>
            <Button onClick={onOpenClick} mode="strong">See Discussion</Button>
        </BottomBar>
    </Main>

const Main = styled(Card)`
    padding: 6px 12px 16px 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;    
    margin-top: 5px;
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
    margin-top: 30px;
`
const ForwardingConditions = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
`
const Condition = styled.div`
    margin-right: 20px;
    margin-left:20px;
    margin-top: 10px;
`