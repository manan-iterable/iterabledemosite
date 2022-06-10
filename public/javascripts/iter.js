var _iaq = _iaq || [];
var click = 0;
var email = localStorage.getItem("email") || null;
var apikey = 'ff288e91e5f9442cb6ce6ea238886298';


var renderEmailInput = '<hr><label for="email"><b>Email</b></label>\n<input type="text" name="email" id="email" pattern=".+@globex\.com" required>\n<button class="btn btn-primary" type="button" id="email" onclick="addemail()">Add email</button><hr>';
var renderExistingEmail = `Alreday logged in as: ${email}`;

var registerd = `Great! you've registerd successfully`;

var identifybutton = '<button class="btn btn-primary" type="button" onclick="identifyUser()">Identify User</button>'

var trackcustomevents = '<button class="btn btn-primary" type="button" id="customevent" onclick="sendCustomEvent()">Send Custom Event</button>'

var getinappMessages = '<button class="btn btn-primary" type="button" onclick="getmessage()">getmessage </button>'

if(email == null){
    document.querySelector(".emailbox").innerHTML = renderEmailInput   
}else{
    console.log(renderExistingEmail);
    document.querySelector(".emailbox").innerHTML = renderExistingEmail

    setTimeout(getmessage(), 5000);    
    
}
function addemail() {
    console.log("add email");
    localStorage.setItem('email', document.getElementById('email').value);
    email = localStorage.getItem("email");

    setTimeout(identifyUser(), 2000);    

       
}

// Identify the user and set some fields on their Iterable profile 
function identifyUser() {
    console.log('identifyUser');
    _iaq.push(['identify', email, {
        "firstName,": "Testing",
        "isWebUser,": true,
        "SA_WebUser_Test_Key": "completed"
    }]);

    setTimeout(sendCustomEvent(), 2000);    

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
    setTimeout(getmessage(), 2000);;
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


function getmessage() {
    let url = `https://api.iterable.com/api/inApp/getMessages?email=${email}&count=1&platform=Web&SDKVersion=None`;
    console.log("get Message");
    axios.get(url, {
            headers: {'api-key':apikey}
        })
        .then((response) => {
            // On Success
            console.log('Got Response');
            // console.log(response.data.inAppMessages[0].content.html);
            document.write(response.data.inAppMessages[0].content.html);

        })
        .catch((err) => {
            console.log('Error Getting Response');
            console.log(err);
            localStorage.clear();
            setTimeout(location.reload(),2000);

        })
}