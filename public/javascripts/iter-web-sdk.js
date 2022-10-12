console.log("loading iter-web-sdk.js");
var email = localStorage.getItem("email") || null;
var apikey = 'ff288e91e5f9442cb6ce6ea238886298';

$(document).ready(function() {
    if(email != null){
        console.log("email exist");
        $("#emailexist").text(`You Logged in as ${email}`);
        $("#emailexist").append(`&nbsp;&nbsp;<button class="btn btn-success btn-sm" type="button" id="email" onclick="logout()">Logout</button>`)
        // document.getElementById("emailexist").innerHTML = email;
    }else{
        console.log("email does not exist");
        $('#noemailexist').html(`<hr><label for="email"><b>Email: </b></label><input class="input-sm" type="text" name="email" id="emailtext" pattern=".+@globex\.com" required><button class="btn btn-success btn-sm" type="button" id="email" onclick="login()">Login</button>`);
        
    }
});

function login() {
    console.log("add email");
    console.log("Login....");
    localStorage.setItem('email', document.getElementById('emailtext').value);
    email = localStorage.getItem("email");
    $("#emailexist").text(`You Logged in as ${email}`);
    $( "#noemailexist" ).remove();
    // init iterable sdk
    // init();      
}
function logout(){
    console.log("Logout....");
    localStorage.removeItem('email');
    location.reload();
}



function f (x, y, ...a) {
    // ...a spread operator
    return (x + y) * a.length
}
// a = ["hello", true, 7] an array
f(1, 2, "hello", true, 7) === 9