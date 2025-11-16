import { makeAutoObservable } from 'mobx';

class PageStore {
    loaded: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public changePageLoaded(value: boolean): void {
        this.loaded = value;
    }

    public get pageLoaded(): boolean {
        return this.loaded;
    }
}

export const pageStore = new PageStore();
