function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log('token', token)
        // The signed-in user info.
        var user = result.user;
        console.log('user', user)
        // ...
    }).catch(function (error) {
        console.log('error', error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
  
}

function googleLogout() {
    firebase.auth().signOut().then(function () {
        console.log('logout-google')
    }).catch(function (error) {
        console.log('logout-google-error', error)
    });
}