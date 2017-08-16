import {AppState} from './app.model';
import { FORM_ACTIONS} from './form-actions';

const INITIAL_STATE = {
    name: '',
};

export function rootReducer(state: AppState = INITIAL_STATE,
                              action): AppState {
    switch (action.type) {
      case FORM_ACTIONS.SAVE_OWNER:
        return Object.assign({}, {name: action.payload}, state);
      case FORM_ACTIONS.SAVE_FORM:
        return Object.assign({}, {formData: action.payload}, state);
      default:
            return state;
    };
}
