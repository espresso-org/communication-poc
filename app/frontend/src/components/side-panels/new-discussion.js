import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { SidePanel } from '@aragon/ui'

@observer class NewDiscussionSidePanel extends Component { 

    render() {
        const { mainStore } = this.props
        return (
            <SidePanel 
                title="New Discussion"
                opened={mainStore.sidePanels.newDiscussion}
                onClose={() => mainStore.hideNewDiscussionSidePanel()}>
            </SidePanel>
        ) 
    }

} 

export { NewDiscussionSidePanel }