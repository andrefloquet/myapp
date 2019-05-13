import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Route, Switch, Link, NavLink} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import Ent from './ent';
import Pso from './pso';

class Main extends React.Component {
/*
    handleSelect(e){
        e.preventDefault();
    }
*/
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavDropdown title="System Admin" id="basic-nav-dropdown">
                                        <LinkContainer to="/ent"><NavDropdown.Item>Entity</NavDropdown.Item></LinkContainer>
                                        <LinkContainer to="/pso"><NavDropdown.Item>Products / Services / Others</NavDropdown.Item></LinkContainer>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Card.Header>
                    <Card.Body>
                    <div>
                        <Route path="/ent" component={Ent} />
                        <Route path="/pso" component={Pso} />
                    </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Main;