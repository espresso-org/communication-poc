import { observable } from 'mobx'

export class MainStore {

    @observable discussions = [{
        title: 'Test title',
        date: new Date('2018-12-31')
    }]
}