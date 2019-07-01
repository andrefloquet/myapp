
import {combineReducers} from 'redux';

import {entReducer} from './entReducer';
import {gcpReducer} from './gcpReducer';
import {usrReducer} from './usrReducer';

export default combineReducers({
    ent: entReducer,
    gcp: gcpReducer,
    usr: usrReducer
})