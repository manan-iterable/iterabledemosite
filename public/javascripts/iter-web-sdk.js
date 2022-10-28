console.log("loading iter-web-sdk.js");
var email = localStorage.getItem("email") || null;
var apikey = 'f8d693597232460fab38bdd104c785d5';
var jwtapikey= '0c29175314ab4a84bf9307e6a28a3ad5';
var jwtsec = '7005e322b1e6ed3979b901527fa4ce414face64133b2f603b002121d4cc2174f3335f5be51f326aaa866682515139a6560214b376556de942891ccfc4d4a33c4'

$(document).ready(function() {
    if(email != null){
        console.log("email exist");
        // $("#emailexist").css("display", "block")
        $("#emailexist").text(`You Logged in as ${email}`);
        $("#emailexist").append(`&nbsp;&nbsp;<button class="btn-primary btn-sm" type="button" id="email" onclick="logout()">Logout</button>`)
        // document.getElementById("emailexist").innerHTML = email;
    }else{
        console.log("email does not exist");
        $("noemailexist").css("display", "block")
        //$('#noemailexist').html(`<hr><label for="email"><b>Email: </b></label><input class="input-sm" type="text" name="email" id="emailtext" pattern=".+@globex\.com" required> <button class="btn btn-success btn-sm" type="button" id="email" onclick="login()">Login</button>`);
        
    }
});

function login() {
    console.log("add email");
    console.log("Login....");
    localStorage.setItem('email', document.getElementById('emailtext').value);
    email = localStorage.getItem("email");
    $("#emailexist").text(`You Logged in as ${email}`);
    $("#emailexist").append(`&nbsp;&nbsp;<button class="btn-primary btn-sm" type="button" id="email" onclick="logout()">Logout</button>`)
    $( "#noemailexist" ).remove();
    // init iterable sdk
    // init();      
}
function logout(){
    console.log("Logout....");
    localStorage.removeItem('email');
    location.reload();
}

function triggerSmsWorkflow(){
    let apiConfig = {
        reqUrl: 'https://api.iterable.com/api/workflows/triggerWorkflow',
        reqMethod: 'post'
    }
    var reqData = JSON.stringify({
    "workflowId": 289104,
    "email": "manan.mehta@iterable.com",
    "dataFields": {
        "appt_name": "eye exam",
        "appt_city": "alpharetta",
        "appt_data": 1666708623
    }
    });
    executeAxios(apiConfig.reqUrl, apiConfig.reqMethod, reqData)

}

function triggerWebPush(){
    let apiConfig = {
        reqUrl: 'https://api.iterable.com/api/campaigns/trigger',
        reqMethod: 'post'
    }
    var reqData = JSON.stringify({
        "campaignId": 4962891,
        "listIds": [
          1862291
        ]
      });
    executeAxios(apiConfig.reqUrl, apiConfig.reqMethod, reqData)
}

function trackEvents(){
    window['@iterable/web-sdk'].track
    track({ eventName: 'my-event' }).then().catch()

}

function triggerWebInApp(){
    window['@iterable/web-sdk'].track
}


function executeAxios(url,method,data){
    let config = {
        method: method,
        url: url,
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': '*/*', 
            'Api-Key': apikey
        },
        data : data
    }
    console.log(`api req data: ${data}`);
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

}

function f (x, y, ...a) {
    // ...a spread operator
    return (x + y) * a.length
}
// a = ["hello", true, 7] an array
f(1, 2, "hello", true, 7) === 9