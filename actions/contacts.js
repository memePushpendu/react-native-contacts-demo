import * as action from './../action_types';
import apiService from './../services';
import { showLoader, hideLoader } from "./loader";

function dispatchContacts(contacts) {
    return {
        type: action.get_contacts,
        contacts
    }
}


function dispatchContactsSearch(searchKey) {
    return {
        type: action.search_contacts,
        searchKey
    }
}

// load contacts from phone contacts list
export function loadContacts() {
    return function (dispatch) {
        dispatch(showLoader());
        return apiService.fetchContacts()
            .then(function (success) {
                dispatch(dispatchContacts(success));
            });
    }
}

export function searchContacts(searchTerm) {
    return function (dispatch) {
        dispatch(dispatchContactsSearch(searchTerm))
    }
}