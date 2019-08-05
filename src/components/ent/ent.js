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
import EntCriteria from './entCriteria';
import EntList from './EntList';
//import EntForm from './EntForm'; //TODO: Split component form - INSERT/UPDATE FORM
// Import actions
import {postEnt, entUpdate, getEnts, deleteEnts} from '../../actions/entActions';
// Input for the grid. TODO: Put component in a separate file
const InputHidden = React.forwardRef((props, ref) => (
    <input type="hidden" ref={ref} />
));

class Ent extends React.Component {

    constructor(...args) {
        super(...args);
    
        //this.handleCriteria = this.handleCriteria.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);   
        this.handleEntered = this.handleEntered.bind(this);     
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        // Refs
        this._id = React.createRef();
        this.ientt = React.createRef();
        this.ient = React.createRef();
        this.name = React.createRef();
        this.unitnum = React.createRef();
        this.streetnum = React.createRef();
        this.street = React.createRef();
        this.suburb = React.createRef();        
        this.postcode = React.createRef(); 

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

    //TODO: change to standart action's name
    handleInsert(){

        //console.log("chegou insert")

        const ent = {
            ientt: this.ientt.current.value,
            ient: this.ient.current.value,
            name: this.name.current.value,
            unitnum: this.unitnum.current.value,
            streetnum: this.streetnum.current.value,
            street: this.street.current.value,
            suburb: this.suburb.current.value,
            postcode: this.postcode.current.value          
        }

        console.log(ent)

        this.props.postEnt(ent);

        this.setState({ show: false });
    }

    handleUpdate() {

        const ent = {
            _id: this._id.current.value,
            ientt: this.ientt.current.value,
            ient: this.ient.current.value,
            name: this.name.current.value,
            unitnum: this.unitnum.current.value,
            streetnum: this.streetnum.current.value,
            street: this.street.current.value,
            suburb: this.suburb.current.value,
            postcode: this.postcode.current.value            
        }

        this.props.entUpdate(ent);
        
        this.setState({ show: false });
        //this.props.updateEnt(id);
    }

    //TODO: change to standart action's name
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
    
    handleEntered(){

        if(this.state.action === "Update") {

            console.log('reach')
            
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
                this.name.current.value = response.data[0].name
                this.unitnum.current.value = response.data[0].unitnum
                this.streetnum.current.value = response.data[0].streetnum
                this.street.current.value = response.data[0].street
                this.suburb.current.value = response.data[0].suburb 
                this.postcode.current.value = response.data[0].postcode 

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
                <EntCriteria entityTypeList={entityTypeList} />
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
                            <EntList />               
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
                            <Modal.Title>{this.state.action} Entity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Form.Row>
                                    <InputHidden ref={this._id} />
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="ientt">
                                            <Form.Label>Type</Form.Label>
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
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control 
                                                ref={this.name} 
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row> 
                                <div>&nbsp;</div> 
                                <Form.Row>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue="ADDRESS" />
                                    </Col>
                                </Form.Row>
                                <div>&nbsp;</div>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="unitnum">
                                            <Form.Label>Unit Number</Form.Label>
                                            <Form.Control 
                                                ref={this.unitnum} 
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="streetnum">
                                            <Form.Label>Street Number</Form.Label>
                                            <Form.Control 
                                                ref={this.streetnum} 
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>                                    
                                </Form.Row> 
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="street">
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control 
                                                ref={this.street} 
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>                                   
                                </Form.Row> 
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="suburb">
                                            <Form.Label>Suburb</Form.Label>
                                            <Form.Control 
                                                ref={this.suburb} 
                                                type="text"
                                            />
                                        </Form.Group>
                                    </Col>    
                                    <Col>
                                        <Form.Group controlId="postcode">
                                            <Form.Label>PostCode</Form.Label>
                                            <Form.Control 
                                                ref={this.postcode} 
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