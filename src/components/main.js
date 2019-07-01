// Libraries
import React from 'react';
import {Route} from 'react-router-dom';
// Bootstrap components
import Card from 'react-bootstrap/Card'
// System's Module 
import Menu from './menu';
import Ent from './ent/ent';
import Gcp from './gcp/gcp';
import Usr from './usr/usr';

// TODO: Implement footer

class Main extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Menu />
                    </Card.Header>
                    <Card.Body>
                    <div>
                        <Route path="/ent" component={Ent} />
                        <Route path="/gcp" component={Gcp} />
                        <Route path="/usr" component={Usr} />
                    </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Main;