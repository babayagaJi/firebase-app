
document.querySelector("#googleLogin").addEventListener('click',(e)=>{
    googleLogin();
})

document.querySelector("#multiLogin").addEventListener('click',(e)=>{
    //loaderShow();
    emailLogin();
})

document.querySelector("#facebookLogin").addEventListener('click',(e)=>{
    facebookLogin();
})

document.querySelector("#phoneLogin").addEventListener('click',(e)=>{
    phonenoLogin();
})

document.querySelector("#generateToken").addEventListener('click',(e)=>{
    generateMessaginToken();
})

document.querySelector("#getUser").addEventListener('click',(e)=>{
    getCurrentUser();
})

document.querySelector("#userLogout").addEventListener('click',(e)=>{
    firebaseAuthLogout();
})



function searchFileType(t){
    let value = t.value;
    if(value){
        pageTokenExample(t.value)
    }
}

function loaderRemove(){
    document.querySelector('#loader').style.display = 'none';
}

function loaderShow(){
    document.querySelector('#loader').style.display = 'block';
}

loaderRemove();



function showButtonsOnLogin(){
    document.querySelector("#googleLogin").style.display = 'none';
    document.querySelector("#multiLogin").style.display = 'none';
    document.querySelector("#facebookLogin").style.display = 'none';
    document.querySelector("#phoneLogin").style.display = 'none';
    document.querySelector("#recaptcha-container").style.display = 'none';
    document.querySelector("#getUser").style.display = 'block';
    document.querySelector("#generateToken").style.display = 'block';
    document.querySelector("#userLogout").style.display = 'block';
    document.querySelector("#haiLogin").style.display = 'block';
}

function showButtonsOnLogout(){
    document.querySelector("#googleLogin").style.display = 'block';
    document.querySelector("#multiLogin").style.display = 'block';
    document.querySelector("#facebookLogin").style.display = 'block';
    document.querySelector("#phoneLogin").style.display = 'block';
    document.querySelector("#recaptcha-container").style.display = 'block';
    document.querySelector("#getUser").style.display = 'none';
    document.querySelector("#generateToken").style.display = 'none';
    document.querySelector("#userLogout").style.display = 'none';
    document.querySelector("#haiLogin").style.display = 'none';
}
