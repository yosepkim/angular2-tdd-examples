import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { AppState } from './app.model';
import {FormModel} from "./form-model";

export const FORM_ACTIONS = {
    SAVE_OWNER: 'SAVE_OWNER',
    SAVE_FORM: 'SAVE_FORM'
};

@Injectable()
export class FormActions {

    constructor(private ngRedux: NgRedux<AppState>) {}

    saveOwnerName(name: string) {
        this.ngRedux.dispatch(this.saveOwner(name));
    }

    saveForm(formData: FormModel){
        this.ngRedux.dispatch({
          type: FORM_ACTIONS.SAVE_FORM,
          payload: formData});
    }

    private saveOwner(name: string) {
        return {
            type: FORM_ACTIONS.SAVE_OWNER,
            payload: name
        };
    }
}
