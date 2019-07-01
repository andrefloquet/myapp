// React components
import React from 'react';
// Bootstrap components
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends React.Component {
    render(){
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Base" id="basic-nav-dropdown">
                            <LinkContainer to="/ent"><NavDropdown.Item>Entities</NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/pso"><NavDropdown.Item>Products / Services / Others</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="System Admin" id="basic-nav-dropdown">
                            <LinkContainer to="/usr"><NavDropdown.Item>Users</NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/gcp"><NavDropdown.Item>General Codes and Parameters</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu;
