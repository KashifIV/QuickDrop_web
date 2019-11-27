const auth = (state = "", action) => {
    switch (action.type){
        case 'SIGNEDIN': 
            return action.token
        default: return state; 
    }
}
export default auth; 