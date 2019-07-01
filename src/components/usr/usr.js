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
import UsrCriteria from './usrCriteria';
import UsrList from './usrList';
//import UsrForm from './usrForm'; //TODO: Split component form - INSERT/UPDATE FORM
// Import actions
import {usrInsert, usrUpdate, getUsrs, usrDelete} from '../../actions/usrActions';
// Input for the grid. TODO: Put component in a separate file
const InputHidden = React.forwardRef((props, ref) => (
    <input type="hidden" ref={ref} />
));

// encrypt password. TODO: check best method
const md5 = require("md5");

class Usr extends React.Component {

    constructor(...args) {
        super(...args);
    
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);   
        this.handleEntered = this.handleEntered.bind(this);     
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this._id   = React.createRef();
        this.login = React.createRef();
        this.passw = React.createRef();
        this.ientt = React.createRef();
        this.ient  = React.createRef();

        this.state = {
            show: false,
            action: "",
            entityType: [{}]
        };        
    }  
    
    componentDidMount() {
        // Dispatch an action
        axios.post("/getEntityTypes")
        .then(function(response){
            this.setState({entityType: response.data})
        }.bind(this))
        .catch(function(err){
            this.setState({entityType:'Error loading entity types from the server.'})
        })
    }    

    handleInsert(){

        const usr = {
            login: this.login.current.value,
            passw: md5(this.passw.current.value),            
            ientt: this.ientt.current.value,
            ient: this.ient.current.value            
        }

        this.props.usrInsert(usr);

        this.setState({ show: false });
    }

    handleUpdate() {

        const usr = {
            _id: this._id.current.value,
            login: this.login.current.value,
            passw: md5(this.passw.current.value),
            ientt: this.ientt.current.value,
            ient: this.ient.current.value            
        }

        this.props.usrUpdate(usr);
        
        this.setState({ show: false });

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

        this.props.usrDelete(ids);
    }   
    
    handleEntered(){

        if(this.state.action === "Update") {
            
            var id;

            var form = document.getElementById("formList");
            for (var i = 0; i < form.elements.length; i++) {
                if(form.elements[i].type == "checkbox") {
                    if(form.elements[i].checked) {
                        id = form.elements[i].id;
                        break
                    }
                }
            }
    
            var query = {}
            query._id = id
    
            axios.post("/usrs", query)
            .then(response => {
    
                this._id.current.value = response.data[0]._id
                this.login.current.value = response.data[0].login
                this.passw.current.value = response.data[0].passw                
                this.ientt.current.value = response.data[0].ientt
                this.ient.current.value = response.data[0].ient
            })
            .catch(function(err){
                //dispatch({type:"POST_ENT_REJECTED", payload:"there was an error while posting a new book."})
            })
        }
    }   
    
    handleShow(a) {
        this.setState({ show: true, action: a});
        console.log(this.state.show);
    }    

    handleClose() {
        this.setState({ show: false });
    }    

    render(){

        const entityTypeList = this.state.entityType.map(function(entityTypeArr) {
            return (
                <option value={entityTypeArr.code} key={entityTypeArr._id}>{entityTypeArr.code} - {entityTypeArr.desc}</option>
            )
        })

        return (
            <div>
                <UsrCriteria entityTypeList={entityTypeList} />
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
                            <UsrList />
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
                            <Modal.Title>{this.state.action} User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Form.Row>
                                    <InputHidden ref={this._id} />
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="login">
                                            <Form.Label>Login</Form.Label>
                                            <Form.Control 
                                                ref={this.login} 
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="passw">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                ref={this.passw} 
                                                type="password"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>                                
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="ientt">
                                            <Form.Label>Entity Type</Form.Label>
                                            <Form.Control 
                                                as="select"
                                                ref={this.ientt}
                                            >
                                                <option value=""></option>
                                                {entityTypeList}
                                            </Form.Control>
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
        usr: state.usr.usr
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        usrInsert,
        usrUpdate,
        getUsrs,
        usrDelete
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Usr);
