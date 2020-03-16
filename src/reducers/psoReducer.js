
export function psoReducer(state={pso:[]}, action){
    switch(action.type){
        
        case "INSERT_PSO":
            //console.log({...state, ent:[...state.ent, ...action.payload]});
            return {...state, pso:[...state.pso, ...action.payload]}
        break;
        case "UPDATE_PSO":
            // Create a copy of the current array of pso
            const currentPsoToUpdate = [...state.pso];
            // Determine at which index in pso array is the record to be updated
            const indexToUpdate = currentPsoToUpdate.findIndex(
                function(pso) {
                    return pso._id === action.payload._id;
                }
            )
            // Create a new pso object with the new values and with the same array index of the item to be replaced
            const newPsoToUpdate = {
                ...currentPsoToUpdate[indexToUpdate], 
                name: action.payload.name,
                code: action.payload.code,
                desc: action.payload.desc
            }
            // Use slice to remove the pso at the specified index
            return {pso: [...currentPsoToUpdate.slice(0, indexToUpdate), newPsoToUpdate,
            ...currentPsoToUpdate.slice(indexToUpdate + 1)]}
        break;
        case "GET_PSOS":
            return {...state, pso: [...action.payload]}
        break;  
        case "DELETE_PSOS":
            // Create a copy of the current array of psos
            var newState = {...state};
            var currentPsoToDelete
            var indexToDelete
            var holder

            // Iterate thru records selected on the grid
            action.payload.forEach(element => {

                currentPsoToDelete = newState.pso.slice();
                // Determine at which index in psos array is the pso to be deleted
                indexToDelete = currentPsoToDelete.findIndex(
                    function(pso) {
                        return pso._id == element;
                    }
                )
                
                holder = currentPsoToDelete.splice(indexToDelete,1);
                // Upgrade stated
                newState = {...state, pso:currentPsoToDelete};
            });

            return newState;
        break;  
                   
    }
    return state;
}