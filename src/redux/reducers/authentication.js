const auth = (state = "", action) => {
    switch (action.type){
        case 'SIGNEDIN': 
            return action.token;
        case 'SIGNOUT': 
            return ''; 
        default: return state; 
    }
}
export default auth; 