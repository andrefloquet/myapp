
import {combineReducers} from 'redux';

import {entReducer} from './entReducer';

export default combineReducers({
    ent: entReducer
})