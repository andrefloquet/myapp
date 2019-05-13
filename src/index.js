import React from 'react';
import {render} from 'react-dom';
//import {Provider} from 'react-redux';

//import {applyMiddleware, createStore} from 'redux';

class Test extends React.Component {
    render(){
        return (
            <div>
                <h1> My Personal Project - Andre Floquet </h1>
            </div>
        );
    }
}

render(
    <Test />, document.getElementById('app')
)
