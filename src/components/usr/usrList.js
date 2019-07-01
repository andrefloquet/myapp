// Libraries
import React from 'react';
import {connect} from 'react-redux';
// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'

class UsrList extends React.Component {

    render() {

        const usrList = this.props.usr.map(function(usrArr) {

            return (
                    <tr key={usrArr._id}>
                        <td><Form.Check id={usrArr._id} /></td>
                        <td>{usrArr.login}</td>
                        <td>{usrArr.passw}</td>
                        <td>{usrArr.ientt}</td>
                        <td>{usrArr.ient}</td>
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
                            <th>Login</th>
                            <th>Password</th>
                            <th>Entity Type</th>
                            <th>Entity Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usrList}
                    </tbody>
                </Table> 
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        usr: state.usr.usr
    }
}

export default connect(mapStateToProps) (UsrList);