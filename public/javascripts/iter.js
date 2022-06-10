var _iaq = _iaq || [];
var click = 0;
var email = localStorage.getItem("email") || null;
var apikey = 'ff288e91e5f9442cb6ce6ea238886298'

var renderEmailInput = '<hr><label for="email"><b>Email</b></label><input type="text" name="email" id="email" required><button class="btn btn-primary" type="button" id="email" onclick="addemail()">Add email</button><hr>';
var renderExistingEmail = `<hr><label for="email"><b>Logged in as:{$email}</b>`

if(email == null){
    document.getElementById("add_after_me").insertAdjacentHTML("afterend",renderEmailInput);
}else{
    document.getElementById("add_after_me").insertAdjacentHTML("afterend",renderExistingEmail);

}
function addemail() {
    console.log("add email");
    localStorage.setItem('email', document.getElementById('email').value);
    email = localStorage.getItem("email");
}

// Identify the user and set some fields on their Iterable profile 
function identifyUser() {
    console.log('identifyUser');
    _iaq.push(['identify', email, {
        "firstName,": "Testing",
        "isWebUser,": true,
        "SA_WebUser_Test_Key": "completed"
    }]);
}

// Track a click event, passing a click count (from the current session)
// that will be stored in the event's dataFields property
function trackEvent() {
    _iaq.push(['track', 'MyButtonClickedEvent', {
        "clickNumber": ++click
    }]);
}

function sendCustomEvent() {
    console.log("send custom event");
    _iaq.push(['track', 'webSATestEvent', {
        "platform": "web",
        "isTestEvent": true,
        "url": "https://iterable.com/sa-test/manan",
        "secret_code_key": "Code_2022"
    }]);
    runGetMessage();
}

// Replace <API key> with an Iterable API key (of type JavaScriptSDK)
_iaq.push(['account', apikey]);

(function() {
    var b = document.createElement('script');
    b.type = 'text/javascript';
    b.async = true;
    b.src = 'https://js.iterable.com/analytics.js';
    var a = document.getElementsByTagName('script')[0];
    a.parentNode.insertBefore(b, a);
})();

var getMessageUrl = `https://api.iterable.com/api/inApp/getMessages?email=${email}&count=1&platform=Web&SDKVersion=None`


function getmessage() {
    axios.get(getMessageUrl, {
            headers: {'api-key':apikey}
        })
        .then((response) => {
            // On Success
            console.log('Got Response');
            console.log(response.data.inAppMessages[0].content.html);
            document.write(response.data.inAppMessages[0].content.html);

        })
        .catch((err) => {
            console.log('Error Getting Response');
            console.log(err);
        })
}