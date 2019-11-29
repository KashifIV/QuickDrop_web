const fileNames = (state= [] , action) =>{
    switch (action.type){
        case 'RECIEVEDLIST':
            return action.items; 
        default: return state; 

    }
}
export default fileNames; 