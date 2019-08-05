
//TODO: change to standart action's name

export function entReducer(state={ent:[]}, action){
    switch(action.type){
        case "POST_ENT":
            //console.log({...state, ent:[...state.ent, ...action.payload]});
            return {...state, ent:[...state.ent, ...action.payload]}
        break;
        case "UPDATE_ENT":
            // Create a copy of the current array of entities
            const currentEntToUpdate = [...state.ent];
            // Determine at which index in entities array is the entity to be updated
            const indexToUpdate = currentEntToUpdate.findIndex(
                function(ent) {
                    return ent._id === action.payload._id;
                }
            )
            // Create a new Entity object with the new values and with the same array index of the item to be replaced. 
            const newEntToUpdate = {
                ...currentEntToUpdate[indexToUpdate], 
                ientt: action.payload.ientt,
                ient: action.payload.ient,
                name: action.payload.name,
                unitnum: action.payload.unitnum,
                streetnum: action.payload.streetnum,
                street: action.payload.street,
                suburb: action.payload.suburb,
                postcode: action.payload.postcode                               
            }
            // Use slice to remove the entity at the specified index
            return {ent: [...currentEntToUpdate.slice(0, indexToUpdate), newEntToUpdate,
            ...currentEntToUpdate.slice(indexToUpdate + 1)]}
        break;
        case "GET_ENTS":
            return {...state, ent: [...action.payload]}
        break;  
        case "DELETE_ENTS":
            // Create a copy of the current array of ents
            var newState = {...state};
            var currentEntToDelete
            var indexToDelete
            var holder

            // Iterate records selected on the grid
            action.payload.forEach(element => {
                
                currentEntToDelete = newState.ent.slice();
                // Determine at which index in ents array is the ent to be deleted
                indexToDelete = currentEntToDelete.findIndex(
                    function(ent) {
                        //console.log(ent._id + " " + ent.ientt + " " + ent.ient)
                        return ent._id == element;
                    }
                )
                //console.log(indexToDelete)
                holder = currentEntToDelete.splice(indexToDelete,1);
                //console.log(holder);
                //console.log(currentEntToDelete);
                // Upgrade stated
                newState = {...state, ent:currentEntToDelete};
                //console.log(newState);
            });

            return newState;
        break;  
                    
    }
    return state;
}