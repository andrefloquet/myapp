// Libraries
import React from 'react';
import {connect} from 'react-redux';
// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

class GcpList extends React.Component {

    render() {

        const gcpList = this.props.gcp.map(function(gcpArr){
            return (
                
                    <tr key={gcpArr._id}>
                        <td><Form.Check id={gcpArr._id} /></td>
                        <td>{gcpArr.name}</td>
                        <td>{gcpArr.code}</td>
                        <td>{gcpArr.desc}</td>
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
                            <th>Name</th>
                            <th>Code</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gcpList}
                    </tbody>
                </Table> 
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gcp: state.gcp.gcp
    }
}

export default connect(mapStateToProps) (GcpList);