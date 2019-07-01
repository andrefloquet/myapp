import axios from 'axios';

//TODO: change to .get() and .delete() for read and delete operations, respectively

// POST a book
export function gcpInsert(gcp) {
    return function(dispatch){
        axios.post("/gcp", gcp)
            .then(function(response){
                //console.log(response.data);
                dispatch({type:"INSERT_GCP", payload:[response.data]})
            })
            .catch(function(err){
                dispatch({type:"INSERT_GCP_REJECTED", payload:"There was an error while posting a new Code/Parameter."})
            }) 
    }
}

// Update Gcp
export function gcpUpdate(gcp) {
    //console.log("action");
    return function(dispatch){
        axios.put("/gcp", gcp)
            .then(function(response){
                console.log(response.data);
                dispatch({type:"UPDATE_GCP", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"UPDATE_GCP_REJECTED", payload:"There was an error while posting a new Code/Parameter."})
            }) 
    }
}


// GET  Ents
export function getGcps(query) {
    return function(dispatch){
        axios.post("/gcps", query)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"GET_GCPS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"GET_GCPS_REJECTED", payload:err})
            })
    }
}


// DELETE Ents
export function gcpDelete(ids) {
    return function(dispatch){
        axios.post("/gcpdelete", ids)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"DELETE_GCPS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"DELETE_GCPS_REJECTED", payload:err})
            })
    }
    
}
