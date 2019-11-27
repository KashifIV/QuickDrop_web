import io from 'socket.io-client';
const socket = io('https://quickdropbeta.herokuapp.com/'); 
export function signUp(email, password) {
    socket.emit("request", {"requestType": "signUp", "account" : {"username": email, "password": password, "email": email}}); 
}
export function signIn(email, password){
    socket.emit("request", {"requestType": "signIn", "account" : {"username": email, "password": password}}); 
}
export function socketDispatcher(){
    console.log('socket dispatcher initialized');
    socket.on("response", (data) => {
        console.log(data); 
        const json = JSON.parse(data);
        if (json['originalRequest']['requestType'] === 'signIn'){
            handleSignIn(json); 
        }
        else if (json['originalRequest']['requestType'] === 'signUp'){
            handleSignUp(json); 
        }
    }); 
}
function handleSignUp(json){
    if (json['errorCode'] == 0){
        return dispatch => {
            dispatch(signIn(json['originalRequest']['account']['username'], json['originalRequest']['account']['password']));  
        }
    }
    else console.log(json['errorCode']); 
}
function handleSignIn(json){
    if (json['errorCode'] == 0){
        return dispatch => {
            dispatch(onSignedIn(json['responseData']['token']));  
        }
    }
    else console.log(json['errorCode']); 
}
const onSignedIn = (token) => ({
    type: 'SIGNEDIN', 
    token
})
