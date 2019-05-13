import axios from 'axios';

// POST a book
export function postEnt(ent) {
    //console.log(ent);
    return function(dispatch){
        //console.log(ent);
        axios.post("/ent", ent)
            .then(function(response){
                //console.log(response.data);
                dispatch({type:"POST_ENT", payload:[response.data]})
            })
            .catch(function(err){
                dispatch({type:"POST_ENT_REJECTED", payload:"There was an error while posting a new Entity."})
            }) 
    }
}

// Update Ent
export function entUpdate(ent) {
    //console.log("action");
    return function(dispatch){
        //console.log(ent);
        axios.put("/ent", ent)
            .then(function(response){
                console.log(response.data);
                dispatch({type:"UPDATE_ENT", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"UPDATE_ENT_REJECTED", payload:"There was an error while posting a new Entity."})
            }) 
    }
}

// GET  Ents
export function getEnts(query) {
    return function(dispatch){
        axios.post("/ents", query)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"GET_ENTS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"GET_ENTS_REJECTED", payload:err})
            })
    }
}

// DELETE Ents
export function deleteEnts(ids) {
    return function(dispatch){
        axios.post("/entdelete", ids)
            .then(function(response){
                //console.log(response.data + " . data");
                dispatch({type:"DELETE_ENTS", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"DELETE_ENTS_REJECTED", payload:err})
            })
    }
    
}