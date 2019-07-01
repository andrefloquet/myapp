import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {BrowserRouter} from 'react-router-dom';
import reducers from './reducers/index';
import Main from './components/main';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

render(
    <Provider store={store}>   
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>, document.getElementById('app')
)
