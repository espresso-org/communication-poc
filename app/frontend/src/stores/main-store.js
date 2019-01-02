import { observable } from 'mobx'

export class MainStore {

    @observable discussions = [{
        title: 'Test title',
        description: 'Should we upgrade the voting app to v2?',
        date: new Date('2018-12-31')
    }]
}