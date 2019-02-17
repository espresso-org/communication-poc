import React from 'react'
import styled from 'styled-components'


export const BackButton = props =>
    <Main {...props}>
        <svg width="24" height="19" viewBox="0 0 24 19">
            <path
            d="M21 10H4l6-6-6 6 6 6"
            stroke="hsl(179, 76%, 48%)"
            strokeWidth="1.5"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
    </Main>


const Main = styled.span`
  display: flex;
  align-items: center;
  height: 63px;
  margin: 0 30px;
  margin-left: -30px;
  cursor: pointer;
  svg path {
    stroke: hsl(179, 76%, 48%);
  }
  :active svg path {
    stroke: hsl(179, 76%, 63%);
  }
`