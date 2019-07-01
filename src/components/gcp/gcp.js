// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
// Bootstrap components
import ButtonGroup  from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
// Pages components
import GcpCriteria from './gcpCriteria';
import GcpList from './gcpList';
//import EntForm from './EntForm'; //TODO: Split component form - INSERT/UPDATE FORM
// Import actions
import {getGcps, gcpInsert, gcpUpdate, gcpDelete} from '../../actions/gcpActions';
// Input for the grid. TODO: Put component in a separate file
const InputHidden = React.forwardRef((props, ref) => (
    <input type="hidden" ref={ref} />
));

class Gcp extends React.Component {

    constructor(...args) {
        super(...args);
        
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);   
        this.handleEntered = this.handleEntered.bind(this);     
        this.handleDelete = this.handleDelete.bind(this);        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);        

        this._id = React.createRef();
        this.name = React.createRef();
        this.code = React.createRef();       
        this.desc = React.createRef();  
        
        this.state = {
            show: false,
            action: ""
        };        
    }   

    handleInsert(){

        console.log(this.desc.current.value);

        const gcp = {
            name: this.name.current.value,
            code: this.code.current.value,
            desc: this.desc.current.value
        }

        this.props.gcpInsert(gcp);

        this.setState({ show: false });
    }

    handleUpdate() {

        const gcp = {
            _id: this._id.current.value,
            name: this.name.current.value,
            code: this.code.current.value,
            desc: this.desc.current.value
        }

        this.props.gcpUpdate(gcp);
        
        this.setState({ show: false });
    }

    handleDelete(event) {

        var ids = [];

        var form = document.getElementById("formList");
        
        for (var i = 0; i < form.elements.length; i++) {
            if(form.elements[i].type == "checkbox") {
                if(form.elements[i].checked) {
                    ids.push(form.elements[i].id);
                }
            }
        }

        this.props.gcpDelete(ids);
    }   
    
    handleEntered(){

        if(this.state.action === "Update") {

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

            axios.post("/gcps", query)
            .then(response => {

                //console.log("resposta");
                this._id.current.value = response.data[0]._id
                this.name.current.value = response.data[0].name
                this.code.current.value = response.data[0].code
                this.desc.current.value = response.data[0].desc

            })
            .catch(function(err){
                //dispatch({type:"POST_ENT_REJECTED", payload:"there was an error while posting a new book."})
            })
        }
    }   
    
    handleShow(a) {
        this.setState({ show: true, action: a});
    }    

    handleClose() {
        this.setState({ show: false });
    }    

    render(){

        return (
            <div>
                <GcpCriteria />
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
                            <GcpList />               
                        </Card.Body>
                        </Card>                            
                        </Col>
                    </Row>
                </Container>
                <div>
                    {/* TODO: put form in a separate file */}
                <Form>
                    <Modal show={this.state.show} onHide={this.handleClose} onEntered={this.handleEntered}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.action} Code/Parameter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Form.Row>
                                    <InputHidden ref={this._id} />
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                            ref={this.name} 
                                            type="text"
                                        />
                                    </Form.Group>
                                </Form.Row>                                
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="code">
                                            <Form.Label>Code</Form.Label>
                                            <Form.Control 
                                                ref={this.code} 
                                                type="text"
                                            />
                                        </Form.Group>                    
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="desc">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control 
                                                ref={this.desc} 
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
        gcp: state.gcp.gcp
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getGcps,
        gcpInsert,
        gcpUpdate,
        gcpDelete
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Gcp);
