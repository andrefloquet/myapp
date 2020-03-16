// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {getPsos} from '../../actions/psoActions';

class PsoCriteria extends React.Component {

    constructor(...args) {
        super(...args);
    
        this.handleCriteria = this.handleCriteria.bind(this);      
    }    

    handleCriteria(event){
        event.preventDefault();

        var query = {}

        const name = event.target.name.value;
        const code  = event.target.code.value;
        const desc  = event.target.desc.value;

        if(name) {query.name = name}
        if(code) {query.code  = code}
        if(desc) {query.desc  = desc}

        this.props.getPsos(query);

    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Product / Service / Others Criteria</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.handleCriteria} method="post">
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="code">
                                                <Form.Label>Code</Form.Label>
                                                <Form.Control 
                                                    _ref="code" 
                                                    type="text"
                                                />
                                            </Form.Group>                    
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="desc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control 
                                                    _ref="desc" 
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
        pso: state.pso.pso
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getPsos
    }, dispatch)
}

export default  connect(mapStateToProps, mapDispatchToProps) (PsoCriteria);