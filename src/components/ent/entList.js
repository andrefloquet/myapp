// Libraries
import React from 'react';
import {connect} from 'react-redux';
// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

class EntList extends React.Component {
    render() {

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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ent: state.ent.ent
    }
}

export default  connect(mapStateToProps) (EntList);