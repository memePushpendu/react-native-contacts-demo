import { combineReducers } from 'redux';
import * as action from './../action_types';

export function loading(state = false, current_action) {
    switch (current_action.type) {
        case action.show_loader:
            return true;
        case action.hide_loader:
            return false;
        default:
            return state
    }
}
