// Get a reference to the database service
var database = firebase.database();


function writeUsers(){
    firebase.database().ref('users/').set({
        "ada": {
            "first": "Ada",
            "last": "Lovelace"
        },
        "alan": {
            "first": "Alan",
            "last": "Turing"
        }
    });
}


function writeUserData(userId, first, last) {
    firebase.database().ref('users/'+userId).set({
        "first": last,
        "last": last
    });
    console.log('user wrriten to database')
}


function readUserId(userId) {
    // Loop through users in order with the forEach() method. The callback
    // provided to forEach() will be called synchronously with a DataSnapshot
    // for each child:
    var query = firebase.database().ref("users").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                console.log(childData)
            });
        });
}

function DBonChildAdded(){
    var ref = firebase.database().ref("users");
    ref.on("child_added", function(snapshot) {
        console.log('child_added',snapshot.key,snapshot.val());
    });
}

function DBonChildChanged(){
    var ref = firebase.database().ref("users");
    ref.on("child_changed", function(snapshot) {
        console.log('child_changed',snapshot.key,snapshot.val());
    });
}