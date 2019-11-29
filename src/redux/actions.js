import io from 'socket.io-client';
import fetch from 'cross-fetch';
const url = 'https://quickdropbeta.herokuapp.com'; 
const socket = io(url); 
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
export function getFileList(token){
    return dispatch => {
        socket.emit("request", {'requestType': 'listFiles', 'tokenKey': token}); 
    }
}
export function downloadFile(name, token){
    return dispatch => {
        socket.emit("request", {"requestType": 'downloadFile', 'tokenKey': token, 'filename': name});
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
        else if (json['originalRequest']['requestType'] == 'listFiles'){
            handleListFiles(json, dispatch); 
        }
        else if (json['originalRequest']['requestType'] == 'downloadFile'){
            handleDownloadFile(json, dispatch); 
        }
    }); 
}
function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }
 function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

function handleDownloadFile(json, dispatch){
    //var sampleArr = base64ToArrayBuffer(json['responseData']['fileData']);
    saveByteArray(json['originalRequest']['filename'], json['responseData']['fileData']);
}
function handleListFiles(json, dispatch){
    if (json['errorCode'] == 0){
        dispatch(onUpdateList(json['responseData']['filenames'])); 
    }
    else console.log('Handle List File ' + json['errorCode']); 
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
const onUpdateList = (items) => ({
    type: 'RECIEVEDLIST', 
    items, 
})
const onSignedIn = (token) => ({
    type: 'SIGNEDIN', 
    token
})
