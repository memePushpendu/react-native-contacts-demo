import { combineReducers } from 'redux';
import * as action from './../action_types';

export function contacts(state = [], current_action) {
    switch (current_action.type) {
        case action.get_contacts:
            return current_action.contacts;
        default:
            return state
    }
}

export function search(state = '', current_action) {
    switch (current_action.type) {
        case action.search_contacts:
            let searchTerm = current_action.searchKey.toLowerCase();
            return searchTerm;
        default:
            return state
    }
}


// function searchState(currentState, term) {
//     return currentState.map((item) => {
//         let name = item.name.toLowerCase();
//         let number = item.number;
//         if (name.includes(term) || number.includes(term)) {
//             item.match = true;
//         } else {
//             item.match = false;
//         }
//         return item;
//     });
// }
