
export function usrReducer(state={usr:[]}, action){
    switch(action.type){
        
        case "INSERT_USR":
            return {...state, usr:[...state.usr, ...action.payload]}
        break;
        case "UPDATE_USR":
            // Create a copy of the current array of usrs
            const currentUsrToUpdate = [...state.usr];
            // Determine at which index in usr array is the usr to be updated
            const indexToUpdate = currentUsrToUpdate.findIndex(
                function(usr) {
                    return usr._id === action.payload._id;
                }
            )
            // Create a new usr object with the new values and with the same array index of the item to be replaced
            const newUsrToUpdate = {
                ...currentUsrToUpdate[indexToUpdate], 
                login: action.payload.login,
                passw: action.payload.passw,
                ientt: action.payload.ientt,
                ient:  action.payload.ient,
            }
            // Use slice to remove the usr at the specified index
            return {usr: [...currentUsrToUpdate.slice(0, indexToUpdate), newUsrToUpdate,
            ...currentUsrToUpdate.slice(indexToUpdate + 1)]}
        break;
        case "GET_USRS":
            return {...state, usr: [...action.payload]}
        break;  
        case "DELETE_USRS":
            // Create a copy of the current array of usrs
            var newState = {...state};
            var currentUsrToDelete
            var indexToDelete
            var holder

            action.payload.forEach(element => {

                currentUsrToDelete = newState.usr.slice();
                // Determine at which index in usrs array is the ent to be deleted
                indexToDelete = currentUsrToDelete.findIndex(
                    function(usr) {
                        //console.log(ent._id + " " + ent.ientt + " " + ent.ient)
                        return usr._id == element;
                    }
                )
                holder = currentUsrToDelete.splice(indexToDelete,1);
                // Use slice to remove the usr at the specified index
                newState = {...state, usr:currentUsrToDelete};
            });

            return newState;

        break;  
                   
    }
    return state;
}