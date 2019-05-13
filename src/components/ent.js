
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
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';

//import InputHidden from './inputhidden';

import {postEnt, entUpdate, getEnts, deleteEnts} from '../actions/entActions';

const InputHidden = React.forwardRef((props, ref) => (
    <input type="hidden" ref={ref} />
));

class Ent extends React.Component {

    constructor(...args) {
        super(...args);
    
        this.handleCriteria = this.handleCriteria.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);   
        this.handleEntered = this.handleEntered.bind(this);     
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this._id = React.createRef();
        this.ientt = React.createRef();
        this.ient = React.createRef();

        this.state = {
            show: false,
            action: ""
        };        
    }   

    handleCriteria(event){
        event.preventDefault();

        var query = {}

        const ientt = event.target.ientt.value;
        const ient  = event.target.ient.value;

        if(ientt) {query.ientt = ientt}
        if(ient)  {query.ient  = ient}

        //console.log(event.target.ientt.value);
        //console.log(query);
        //console.log("chegou");

        this.props.getEnts(query);

    }

    handleInsert(){

        const ent = {
            ientt: this.ientt.current.value,
            ient: this.ient.current.value            
        }

        this.props.postEnt(ent);

        this.setState({ show: false });
    }

    handleUpdate() {

        const ent = {
            _id: this._id.current.value,
            ientt: this.ientt.current.value,
            ient: this.ient.current.value            
        }

        this.props.entUpdate(ent);
        
        this.setState({ show: false });
        //this.props.updateEnt(id);
    }

    handleEntered(){

        var id;

        var form = document.getElementById("formList");
        for (var i = 0; i < form.elements.length; i++) {
            //console.log(form.elements[i].type)
            if(form.elements[i].type == "checkbox") {
                if(form.elements[i].checked) {
                    id = form.elements[i].id;
                    break
                }
            }
        }

        var query = {}
        query._id = id

        axios.post("/ents", query)
        .then(response => {

            //console.log("resposta");
            this._id.current.value = response.data[0]._id
            this.ientt.current.value = response.data[0].ientt
            this.ient.current.value = response.data[0].ient
            //this.setState({ent})
            //console.log("resposta 2");

        })
        .catch(function(err){
            //dispatch({type:"POST_ENT_REJECTED", payload:"there was an error while posting a new book."})
        })
    }

    handleDelete(event) {

        var ids = [];

        var form = document.getElementById("formList");
        
        for (var i = 0; i < form.elements.length; i++) {
            if(form.elements[i].type == "checkbox") {
                if(form.elements[i].checked) {
                    ids.push(form.elements[i].id);
                    //console.log(form.elements[i].id)
                }
            }
        }

        this.props.deleteEnts(ids);
    }     

    handleShow(a) {
        //console.log(a);
        this.setState({ show: true, action: a});
    }
    
    handleClose() {
        this.setState({ show: false });
    }

    render(){
        const inputHidden = <input type="hidden" id="_id" value={this._id} ref="_id" />

        const entList = this.props.ent.map(function(entArr){
            return (
                
                    <tr key={entArr._id}>
                        <td><Form.Check id={entArr._id} /></td>
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
                                <Card.Header>Entity Criteria</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.handleCriteria} method="post">
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
                                        <Button variant="primary" type="submit">Search</Button>
                                    </Form.Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br />
                <Container>
                    <Row>
                        <Col>
                        <Card>
                        <Card.Header>
                        <ButtonGroup aria-label="1"><Button id="insert" variant="primary" onClick={() => this.handleShow("Insert")}>Insert</Button></ButtonGroup>
                        <ButtonGroup aria-label="2"><Button id="update" variant="primary" onClick={() => this.handleShow("Update")}>Update</Button></ButtonGroup>
                        <ButtonGroup aria-label="3"><Button variant="primary" onClick={this.handleDelete}>Delete</Button></ButtonGroup>
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
                <div>
                    <Form>
                        <Modal show={this.state.show} onHide={this.handleClose} onEntered={this.handleEntered}>
                            <Modal.Header closeButton>
                                <Modal.Title>Insert Entity</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form.Row>
                                        <InputHidden ref={this._id} />
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="ientt">
                                                <Form.Label>Entity Type </Form.Label>
                                                <Form.Control 
                                                    ref={this.ientt} 
                                                    type="text"
                                                />
                                            </Form.Group>                    
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="ient">
                                                <Form.Label>Code </Form.Label>
                                                <Form.Control 
                                                    ref={this.ient} 
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={eval("this.handle"+this.state.action)}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                </div>
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
        entUpdate,
        getEnts,
        deleteEnts
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Ent);

//export default Ent;