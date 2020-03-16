import axios from 'axios';

//TODO: change to .get() and .delete() for read and delete operations, respectively

// POST a book
export function psoInsert(pso) {
    return function(dispatch){
        axios.post("/pso", pso)
            .then(function(response){
                //console.log(response.data);
                dispatch({type:"INSERT_PSO", payload:[response.data]})
            })
            .catch(function(err){
                dispatch({type:"INSERT_PSO_REJECTED", payload:"There was an error while posting a new Code/Parameter."})
            }) 
    }
}

// Update Gcp
export function psoUpdate(pso) {
    console.log("action");
    return function(dispatch){
        axios.put("/pso", pso)
            .then(function(response){
                console.log(response.data);
                dispatch({type:"UPDATE_PSO", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"UPDATE_PSO_REJECTED", payload:"There was an error while posting a new Code/Parameter."})
            }) 
    }
}


// GET  Ents
export function getPsos(query) {
    return function(dispatch){
        axios.post("/psos", query)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"GET_PSOS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"GET_PSOS_REJECTED", payload:err})
            })
    }
}


// DELETE Ents
export function psoDelete(ids) {
    return function(dispatch){
        axios.post("/psodelete", ids)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"DELETE_PSOS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"DELETE_PSOS_REJECTED", payload:err})
            })
    }
    
}
