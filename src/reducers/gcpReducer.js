
export function gcpReducer(state={gcp:[]}, action){
    switch(action.type){
        
        case "INSERT_GCP":
            //console.log({...state, ent:[...state.ent, ...action.payload]});
            return {...state, gcp:[...state.gcp, ...action.payload]}
        break;
        case "UPDATE_GCP":
            // Create a copy of the current array of gcp
            const currentGcpToUpdate = [...state.gcp];
            // Determine at which index in gcp array is the record to be updated
            const indexToUpdate = currentGcpToUpdate.findIndex(
                function(gcp) {
                    return gcp._id === action.payload._id;
                }
            )
            // Create a new gcp object with the new values and with the same array index of the item to be replaced
            const newGcpToUpdate = {
                ...currentGcpToUpdate[indexToUpdate], 
                name: action.payload.name,
                code: action.payload.code,
                desc: action.payload.desc
            }
            // Use slice to remove the gcp at the specified index
            return {gcp: [...currentGcpToUpdate.slice(0, indexToUpdate), newGcpToUpdate,
            ...currentGcpToUpdate.slice(indexToUpdate + 1)]}
        break;
        case "GET_GCPS":
            return {...state, gcp: [...action.payload]}
        break;  
        case "DELETE_GCPS":
            // Create a copy of the current array of gcps
            var newState = {...state};
            var currentGcpToDelete
            var indexToDelete
            var holder

            // Iterate thru records selected on the grid
            action.payload.forEach(element => {

                currentGcpToDelete = newState.gcp.slice();
                // Determine at which index in gcps array is the ent to be deleted
                indexToDelete = currentGcpToDelete.findIndex(
                    function(gcp) {
                        return gcp._id == element;
                    }
                )
                
                holder = currentGcpToDelete.splice(indexToDelete,1);
                // Upgrade stated
                newState = {...state, gcp:currentGcpToDelete};
            });

            return newState;
        break;  
                   
    }
    return state;
}