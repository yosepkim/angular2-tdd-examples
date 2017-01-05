import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { AppState } from './app.model';

export const FORM_ACTIONS = {
    SAVE_OWNER: 'SAVE_OWNER'
};

@Injectable()
export class FormActions {
    constructor(private ngRedux: NgRedux<AppState>) {}

    saveOwnerName(name: string) {
        this.ngRedux.dispatch(this.saveOwner(name));
    }

    private saveOwner(name: string) {
        return {
            type: FORM_ACTIONS.SAVE_OWNER,
            payload: name
        };
    }
}
