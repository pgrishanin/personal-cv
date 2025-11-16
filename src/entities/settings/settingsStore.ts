import { LanguagesEnum } from '@shared/i18n';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class SettingsStore {
    language: LanguagesEnum = LanguagesEnum.EN;

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'SettingsStore',
            properties: ['language'],
            storage: window.localStorage,
        });
    }

    public changeLanguage(value: LanguagesEnum): void {
        this.language = value;
    }

    public get appLanguage(): LanguagesEnum {
        return this.language;
    }
}

export const settingsStore = new SettingsStore();
