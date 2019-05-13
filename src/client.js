import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {BrowserRouter} from 'react-router-dom';
//var ReduxThunk = require('redux-thunk').default

import reducers from './reducers/index';

//import {postEnt, getEnts} from './actions/entActions';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

//store.subscribe(console.log(store.getState()));

// IMPORT PAGES
//import Home from './components/home';
//import Ent from './components/ent';
import Main from './components/main';

render(
    <Provider store={store}>   
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>, document.getElementById('app')
)
