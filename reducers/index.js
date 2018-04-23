//root reducer

import { combineReducers } from 'redux';
import { contacts } from './contacts';
import { loading } from './loader';
import { search } from './contacts';


const rootReducer = combineReducers({
    // short hand property names
    contacts,
    loading,
    search
})

export default rootReducer;  