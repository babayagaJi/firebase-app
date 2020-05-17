
function generateMessaginToken() {
    // Retrieve Firebase Messaging object.
    const messaging = firebase.messaging();

    // Add the public key generated from the console here.
    messaging.usePublicVapidKey("BOrK_vm0DE3n-qkS0YNCK7xRqi7-21NYs8JOySIunwgc1292ScdB5EFFoCuOFhr40U0Gt9ArsJrn-lfoVME12m8");

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.requestPermission().then(() => {
        console.log('permission')
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                console.log('currentToken', currentToken)
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');

            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
    }).then((token) => {
        console.log('token', token)
    }).catch((err) => {
        console.log('error', err)
    })

    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
    });

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
        messaging.getToken().then((refreshedToken) => {
            console.log('Token refreshed', refreshedToken);
        }).catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
        });
    });
}









