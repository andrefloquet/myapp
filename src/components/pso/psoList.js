// Libraries
import React from 'react';
import {connect} from 'react-redux';
// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

class PsoList extends React.Component {

    render() {

        const psoList = this.props.pso.map(function(psoArr){
            return (
                
                    <tr key={psoArr._id}>
                        <td><Form.Check id={psoArr._id} /></td>
                        <td>{psoArr.code}</td>
                        <td>{psoArr.desc}</td>
                    </tr>   
            )
        })

        return (
            <div>
                <Form id="formList">
                <Table striped bordered hover >  
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {psoList}
                    </tbody>
                </Table> 
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pso: state.pso.pso
    }
}

export default connect(mapStateToProps) (PsoList);