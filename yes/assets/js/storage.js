var storage = firebase.storage();
// Create a storage reference from our storage service
var storageRef = storage.ref();


var filterst = {type:'other',pageToken:0};

function createImageRef() {

}

function getFileType(file) {

    if (file.type.match('image.*'))
        return 'image';

    if (file.type.match('video.*'))
        return 'video';

    if (file.type.match('audio.*'))
        return 'audio';

    if (file.type.match('zip.*') || file.type.match('rar.*'))
        return 'zip';


    return 'other';
}
function uploadAnyFiles(t) {
    let userPath = userIdPath();
    let file = t.files[0];
    let type = getFileType(file);
    let path = userPath + '/' + type + '/' + file.name;
    uploadFiles(path, file, type);
}



function uploadFiles(path, file, type = '') {
    var uploadTask = storageRef.child(path).put(file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        console.log('snapshot', snapshot)
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = parseFloat(((snapshot.bytesTransferred / snapshot.totalBytes) * 100)).toFixed(2);
        console.log('Upload is ' + progress + '% done');

        let el = document.getElementById("uploader_progress");
        el.parentElement.style = "display:block"
        el.style.width = progress + "%";
        el.setAttribute("aria-valuenow", progress);
        el.innerHTML = progress + "%";

        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
        console.log('error', error)
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            alert('File-uploded!')
            setUrlView(downloadURL, type);
        });
    });
}


function downloadImage() {
    storageRef.child('image/wick.jpg').getDownloadURL().then(function (url) {
        setUrlView(downloadURL, image);
    }).catch(function (error) {
        // Handle any errors
    });
}

function setUrlView(url, type) {
    ElementCreate(url, type);
}

function listAllFiles(listRef = '') {
    if (!listRef) {
        listRef = storageRef;
    }
    // Find all the prefixes and items.
    listRef.listAll().then(function (res) {
        listPrefixesItems(res);
    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log('error', error)
    });
}

function listPrefixesItems(res) {
    res.prefixes.forEach(function (folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        listAllFiles(folderRef)
    });
    res.items.forEach(function (itemRef) {
        // All the items under listRef.
        itemRef.getDownloadURL().then(function (url) {
            console.log(url)
            setUrlView(url, itemRef.parent.name)
        }).catch(function (error) {
            // Handle any errors
        });
    });
}


function ElementCreate(url, type) {
    switch (type) {
        case 'image':
            var img = document.createElement('img');
            img.src = url;
            document.querySelector('#view_files .image').prepend(img);
            break;
        case 'video':
            var videlem = document.createElement("video");
            videlem.setAttribute('controls',null)
            var source = document.createElement("source");
            source.type = "video/mp4";
            source.src = url;
            videlem.appendChild(source);
            document.querySelector('#view_files .video').prepend(videlem);
            break;
        case 'zip':
            var div = document.createElement("div");
            div.setAttribute('class','single')
            var a = document.createElement("a");
            a.setAttribute('href',url)
            a.setAttribute('class','btn btn-primary btn-lg btn-block')
            a.setAttribute('target','_blank')
            a.text="url"
            div.appendChild(a);
            document.querySelector('#view_files .zip').prepend(div);
            break;
        default:
            var div = document.createElement("div");
            div.setAttribute('class','single')
            var a = document.createElement("a");
            a.setAttribute('href',url)
            a.setAttribute('class','btn btn-primary btn-lg btn-block')
            a.setAttribute('target','_blank')
            a.text="url"
            div.appendChild(a);
            document.querySelector('#view_files .zip').prepend(div);
            break;
    }

}



async function pageTokenExample(type='other',pageToken = 0, maxResults = 100) {
    let userPath = userIdPath();
    let path = userPath + '/' + type;
    var listRef = storageRef.child(path);
    if (!pageToken) {
        var firstPage = await listRef.list({ maxResults: maxResults });
        // Use the result.
        // processItems(firstPage.items)
        // processPrefixes(firstPage.prefixes)
        // Fetch the second page if there are more elements.
        listPrefixesItems(firstPage);
        pageToken = firstPage.nextPageToken
    } else {
        var secondPage = await listRef.list({ maxResults: maxResults, pageToken: pageToken });
        listPrefixesItems(secondPage);
        pageToken = secondPage.nextPageToken
    }
    filterst = {...filterst,type:type,pageToken:pageToken}
}



