import React from 'react'
import styled from 'styled-components'
import { theme } from '@aragon/ui'

export const SideBar =
    ({ file, mainStore }) =>
      <Main>
        <Tabs>Details</Tabs>
      </Main>

const Main = styled.aside`
  flex-shrink: 0;
  flex-grow: 0;
  width: 300px;
  margin-left: 30px;
  min-height: 100%;
`
const Tabs = styled.div`
  border-bottom: 1px solid ${theme.contentBorder};
  padding-bottom: 8px;
`