// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-B8CfIxkNbdnoJlVs1hBPkSHPT6tIThg",
    authDomain: "all-firebase-1b2cf.firebaseapp.com",
    databaseURL: "https://all-firebase-1b2cf.firebaseio.com",
    projectId: "all-firebase-1b2cf",
    storageBucket: "all-firebase-1b2cf.appspot.com",
    messagingSenderId: "623537337484",
    appId: "1:623537337484:web:8177f9070c6bf6bb"
};
// Initialize Firebase
let babayaga = firebase.initializeApp(firebaseConfig);
console.log('babayaga', babayaga, firebase);

//Global firebase user
let fireBaseUser = null;


function getCurrentUser(){
    var user = firebase.auth().currentUser;
    console.log('current-user',user)
    return user;
}

function userIdPath(){
    let user = getCurrentUser();
    if(user){
        return user.uid;
    }else{
        return 'anonymous';
    }
}

function firebaseAuthLogout(){
    firebase.auth().signOut().then(function () {
        console.log('logout')
    }).catch(function (error) {
        console.log('logout-error', error)
    });
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    fireBaseUser={...user};
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log('state_changed',user)

    showButtonsOnLogin();
    // ...
} else {
    // User is signed out.
    // ...
    console.log('state_changed user signout')
    showButtonsOnLogout();
}
});