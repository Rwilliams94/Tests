
const initialState = {
    hidden: [],
    companyId: null,
}

function rootReducer(state = initialState, action) {

    switch(action.type) {
        case 'SET' : 
             return {
            ...state,
            hidden: action.payload
        }
        case 'HIDE' : 
            return {
                ...state,
                hidden: [...state.hidden, action.payload]
            }
        case 'RESET' : 
            return {
                ...state,
                hidden: []
            }

        case 'UNDO' :
            return {
                ...state,
                hidden: state.hidden.slice(0,-1)
            }
        case 'COMPANYCHANGE' :
            return {
                ...state,
                companyId: action.payload
            }
        default : 
        
            return state;
        }    
}



export default rootReducer