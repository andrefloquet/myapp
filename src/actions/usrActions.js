import axios from 'axios';

//TODO: change to .get() and .delete() for read and delete operations, respectively

// INSERT USER
export function usrInsert(usr) {
    return function(dispatch){
        axios.post("/usr", usr)
            .then(function(response){
                //console.log(response.data);
                dispatch({type:"INSERT_USR", payload:[response.data]})
            })
            .catch(function(err){
                dispatch({type:"INSERT_USR_REJECTED", payload:"There was an error while posting a new Code/Parameter."})
            }) 
    }
}

// Update USER
export function usrUpdate(usr) {
    //console.log("action");
    return function(dispatch){
        axios.put("/usr", usr)
            .then(function(response){
                console.log(response.data);
                dispatch({type:"UPDATE_USR", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"UPDATE_USR_REJECTED", payload:"There was an error while posting a new Code/Parameter."})
            }) 
    }
}

// GET USERs
export function getUsrs(query) {
    return function(dispatch){
        axios.post("/usrs", query)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"GET_USRS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"GET_USRS_REJECTED", payload:err})
            })
    }
}

// DELETE USERs
export function usrDelete(ids) {
    return function(dispatch){
        axios.post("/usrdelete", ids)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"DELETE_USRS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"DELETE_USRS_REJECTED", payload:err})
            })
    }
}
