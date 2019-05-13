
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Form from 'react-bootstrap/Form';
import ButtonGroup  from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'


import {postEnt, getEnts} from '../actions/entActions';

class Pso extends React.Component {

    componentDidMount() {
        // Dispatch an action
        this.props.getEnts();
    }    

    constructor(...args) {
        super(...args);
    
        this.gotEmail = this.gotEmail.bind(this);
    }   

    gotEmail(event){
        event.preventDefault();

        const ent = {
            ientt: event.target.ientt.value,
            ient: event.target.ient.value            
        }

        //console.log(event.target.ientt.value);
        //console.log(ent);

        this.props.postEnt(ent);

    }

    hangleInsert(event) {
        //event.preventDefault();

        var form = document.getElementById("form");
        form.submit();

        //console.log(event.target.ientt.value);
        console.log("chegou");

        //this.props.postEnt(ent);

    }    

    hangleUpdate(event) {
        //event.preventDefault();

        var form = document.getElementById("formList");
        
        for (var i = 0; i < form.elements.length; i++) {
            if(form.elements[i].type == "checkbox") {
                if(form.elements[i].checked) {
                    console.log(form.elements[i].id)
                }
            }
        }

        console.log("chegou");

        this.props.postEnt(ent);

    }    

    render(){
        const entList = this.props.ent.map(function(entArr){
            return (
                
                    <tr key={entArr._id}>
                        <td><Form.Check id={entArr._id} ref="" /></td>
                        <td>{entArr.ientt}</td>
                        <td>{entArr.ient}</td>
                    </tr>   
            )
        })
        
        return (
            
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Insert Products / Services / Others</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.gotEmail} method="post">
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="ientt">
                                                <Form.Label>Entity Type </Form.Label>
                                                <Form.Control 
                                                    _ref="ientt" 
                                                    type="text"
                                                />
                                            </Form.Group>                    
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="ient">
                                                <Form.Label>Code </Form.Label>
                                                <Form.Control 
                                                    _ref="ient" 
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Button variant="primary" type="submit">Submit</Button>
                                    </Form.Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                        <Card>
                        <Card.Header>
                        <ButtonGroup aria-label="1"><Button variant="primary" onClick={this.hangleInsert}>Insert</Button></ButtonGroup>
                        <ButtonGroup aria-label="2"><Button variant="primary" onClick={this.hangleUpdate}>Update</Button></ButtonGroup>
                        <ButtonGroup aria-label="3"><Button variant="primary">Delete</Button></ButtonGroup>
                        </Card.Header>
                        <Card.Body>  
                            <Form id="formList">
                            <Table striped bordered hover >  
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entList}
                            </tbody>
                        </Table> 
                        </Form>                                                
                        </Card.Body>
                        </Card>                            
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ent: state.ent.ent
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postEnt,
        getEnts
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Pso);

//export default Ent;