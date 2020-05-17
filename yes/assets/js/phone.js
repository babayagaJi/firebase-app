function phonenoLogin() {
    firebase.auth().useDeviceLanguage();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    var phoneNumber = prompt("Enter mobile no with country code", "");
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            console.log('confirmationResult', confirmationResult)
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;

            var code = prompt("Enter code", "");
            confirmationResult.confirm(code).then(function (result) {
                // User signed in successfully.
                var user = result.user;
                console.log('user',user)
                // ...
            }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log('error',error)
            });
        }).catch(function (error) {
            // Error; SMS not sent
            // ...
            console.log('error', error)
        });
}