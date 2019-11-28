import io from 'socket.io-client';
const socket = io('https://quickdropbeta.herokuapp.com/'); 
export function signUp(email, password) {
    return dispatch => {    
        socket.emit("request", {"requestType": "createAccount", "account" : {"username": email, "password": password, "email": email}}); 
    }
}
export function signIn(email, password){
    return dispatch => {
        socket.emit("request", {"requestType": "signIn", "account" : {"username": email, "password": password}}); 
    }
}
export function socketDispatcher(){
    console.log('socket dispatcher initialized');
    return dispatch => socket.on("response", (data) => {
        console.log(data); 
        const json = data
        if (json['originalRequest']['requestType'] === 'signIn'){
            handleSignIn(json, dispatch); 
        }
        else if (json['originalRequest']['requestType'] == 'createAccount'){
            handleSignUp(json, dispatch); 
        }
    }); 
}
function handleSignUp(json, dispatch){
    if (json['errorCode'] == 0){
        const email = json['originalRequest']['account']['username'];
        const password =  json['originalRequest']['account']['password'];     
        socket.emit("request", {"requestType": "signIn", "account" : {"username": email, "password": password}});    
    }
    else console.log(json['errorCode']); 
}
function handleSignIn(json, dispatch){
    if (json['errorCode'] == 0){
        console.log(json['responseData']['tokenKey']);
        dispatch(onSignedIn(json['responseData']['tokenKey']));  
        
    }
    else console.log(json['errorCode']); 
}
const onSignedIn = (token) => ({
    type: 'SIGNEDIN', 
    token
})
