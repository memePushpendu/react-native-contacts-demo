import * as action from './../action_types';

function loading(param) {
    return {
        type: (param) ? action.show_loader : action.hide_loader,
        param
    }
}

export function showLoader() {
    return function (dispatch) {
        dispatch(loading(true))
    }
}

export function hideLoader() {
    return function (dispatch) {
        dispatch(loading(false))
    }
}