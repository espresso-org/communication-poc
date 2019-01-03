import React from 'react'
import styled from 'styled-components'
import { Card, Text, Button, BadgeNumber } from '@aragon/ui'

export const DiscussionCard = ({ discussion, onOpenClick }) => 
    <Main>
        <TopBar>

            <DateContainer>{printDate(discussion.date)}</DateContainer>

            <ClosingInfo>
                Closing in <strong>3</strong> days
            </ClosingInfo>                   
        </TopBar>
        
        <Title>{discussion.title}</Title>
        <StatsContainer>
            <CommentsCount>
                <BadgeNumber 
                    number={discussion.commentsCount} 
                    background="rgb(220, 234, 239)" 
                    foreground="rgb(109, 128, 136)" 
                /> &nbsp;comments
            </CommentsCount>                 
            <TokenStaked>
                <strong>{discussion.stakedTokens}</strong> token staked
            </TokenStaked>            

        </StatsContainer>
        <Description>{discussion.description}</Description>

        <BottomBar>
            <Button onClick={onOpenClick} mode="strong">See Discussion</Button>
        </BottomBar>
    </Main>



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
`

const Title = styled(Text)
    .attrs({ size: 'xlarge' })`
    margin-top: 16px;

`

const Description = styled(Text)`
    margin-top: 10px;

`

const BottomBar = styled.div`
    margin-top: auto;

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

const TokenStaked = styled.div`
    font-size: 12px;
    color: #666;
`

const ClosingInfo = styled.div`
    width: 140px;
    font-size: 12px;
    color: #666;
    display: none;
`