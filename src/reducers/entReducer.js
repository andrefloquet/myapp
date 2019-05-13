
export function entReducer(state={ent:[]}, action){
    switch(action.type){
        case "POST_ENT":
            //console.log({...state, ent:[...state.ent, ...action.payload]});
            return {...state, ent:[...state.ent, ...action.payload]}
        break;
        case "UPDATE_ENT":
            // Create a copy of the current array of books
            const currentEntToUpdate = [...state.ent];
            // Determine at which index in books array is the book to be updated
            const indexToUpdate = currentEntToUpdate.findIndex(
                function(ent) {
                    return ent._id === action.payload._id;
                }
            )
            // Create a new book object with the new values and with the same array index of the item we want to replace. 
            // To achieve this we will use ...spread but we could use concat method too
            const newEntToUpdate = {
                ...currentEntToUpdate[indexToUpdate], 
                ientt: action.payload.ientt,
                ient: action.payload.ient
            }
            // This Log has the purpose to show you how newBookToUpdate looks like
            //console.log("what is it newBookToUpdate", newBooktoUpdate);
            // Use slice to remove the book at the specified index
            return {ent: [...currentEntToUpdate.slice(0, indexToUpdate), newEntToUpdate,
            ...currentEntToUpdate.slice(indexToUpdate + 1)]}
        break;
        case "GET_ENTS":
            return {...state, ent: [...action.payload]}
        break;  
       
        case "DELETE_ENTS":
 
            var newState = {...state};
            var currentEntToDelete
            var indexToDelete

            var holder

            //console.log(state.ent)
            //var count = 0

            action.payload.forEach(element => {
                //console.log(count)

                // Create a copy of the current array of ents
                currentEntToDelete = newState.ent.slice();
                // Determine at which index in ents array is the ent to be deleted
                indexToDelete = currentEntToDelete.findIndex(
                    function(ent) {
                        //console.log(ent._id + " " + ent.ientt + " " + ent.ient)
                        return ent._id == element;
                    }
                )
                console.log(indexToDelete)
                holder = currentEntToDelete.splice(indexToDelete,1);
                console.log(holder);
                console.log(currentEntToDelete);
                // Use slice to remove the ent at the specified index
                newState = {...state, ent:currentEntToDelete};
                //console.log(newState);
            });

            return newState;

        break;  
                    
    }
    return state;
}