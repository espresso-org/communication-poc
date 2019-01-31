import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { SidePanel, Field  } from '@aragon/ui'
import { LargeTextInput, SaveButton } from '../large-inputs'

@observer class NewDiscussionSidePanel extends Component { 

    state = {
        title: '',
        description: ''
    }

    createDiscussion = () => {
        this.props.mainStore.createDiscussion({
            title: this.state.title,
            description: this.state.description
        })
    }

    render() {
        const { mainStore } = this.props
        return (
            <SidePanel 
                title="New Discussion"
                opened={mainStore.sidePanels.newDiscussion}
                onClose={() => mainStore.hideNewDiscussionSidePanel()}>
                    <Field label="Discussion Title:">
                        <LargeTextInput 
                            value={this.state.title} 
                            onChange={e => this.setState({ title: e.target.value })} 
                            required 
                        />
                    </Field>

                    <Field label="Description:">
                        <LargeTextInput 
                            value={this.state.description} 
                            onChange={e => this.setState({ description: e.target.value })} 
                            required 
                        />
                    </Field>    

                    {/* Date selector */}

                    {/* Number of staked tokens */}

                    <SaveButton
                        onClick={this.createDiscussion} 
                    >
                        Create Discussion
                    </SaveButton>                
            </SidePanel>
        ) 
    }

} 

export { NewDiscussionSidePanel }