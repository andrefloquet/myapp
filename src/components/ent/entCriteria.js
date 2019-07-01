// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {getEnts} from '../../actions/entActions';

class EntCriteria extends React.Component {

    constructor(...args) {
        super(...args);
    
        this.handleCriteria = this.handleCriteria.bind(this);   
         
    }    

    handleCriteria(event){
        event.preventDefault();

        var query = {}

        const ientt = event.target.ientt.value;
        const ient  = event.target.ient.value;

        if(ientt) {query.ientt = ientt}
        if(ient)  {query.ient  = ient}

        this.props.getEnts(query);
    }

    render() {

        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Entities Criteria</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.handleCriteria} method="post">
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="ientt">
                                                <Form.Label>Entity Type</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    _ref="ientt"
                                                >
                                                    <option value=""></option>
                                                    {this.props.entityTypeList}
                                                </Form.Control>
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
                                        <Button variant="primary" type="submit">Search</Button>
                                    </Form.Row>
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
        getEnts
    }, dispatch)
}

export default  connect(mapStateToProps, mapDispatchToProps) (EntCriteria);