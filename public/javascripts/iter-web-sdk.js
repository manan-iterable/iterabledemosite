
var email = localStorage.getItem("email") || null;
var jwt = localStorage.getItem("jwtToken") || null;
var apikey = localStorage.getItem("apikey") || null;
// var apikey = '';
var jwtapikey= '';
var jwtsec = ''

$(document).ready(function() {
    if(localStorage.getItem("jwtToken") == null){
        $('.jwtclass').css("display", "none");
    }else{
        $('.jwtclass').css("display", "block");
    }
    if(email != null && (jwt != null || apikey != null)){
        console.log("email and jwt token exist");
        // $("#emailexist").css("display", "block")
        $("#emailexist").text(`You Logged in as ${email} & JWT exist`);
        $("#emailexist").append(`&nbsp;&nbsp;<button class="btn-primary btn-sm" type="button" id="email" onclick="logout()">Logout</button>`)
        // document.getElementById("emailexist").innerHTML = email;
    }else{
        console.log("email & jwt does not exist");
        $("noemailexist").css("display", "block")
        //$('#noemailexist').html(`<hr><label for="email"><b>Email: </b></label><input class="input-sm" type="text" name="email" id="emailtext" pattern=".+@globex\.com" required> <button class="btn btn-success btn-sm" type="button" id="email" onclick="login()">Login</button>`);
        
    }
});

function login() {
    console.log("add email");
    console.log("Login....");
    localStorage.setItem('email', document.getElementById('emailtext').value);
    localStorage.setItem('apikey', document.getElementById('apikey').value);
    localStorage.setItem('jwtToken', document.getElementById('jwtToken').value);
    email = localStorage.getItem("email");
    $("#emailexist").text(`You Logged in as ${email}`);
    $("#emailexist").append(`&nbsp;&nbsp;<button class="btn-primary btn-sm" type="button" id="email" onclick="logout()">Logout</button>`)
    $( "#noemailexist" ).remove();

    // store api key
    // localStorage.setItem('apikey', apikey);
    // localStorage.setItem('jwtapikey', jwtapikey);
    // localStorage.setItem('jwtsec', jwtsec);
    // init iterable sdk
    // init();      
}

function init() {
    console.log(`init...`);
    const {setEmail} = window['@iterable/web-sdk'].initialize(
        jwtapikey,
        ({email}) => {
            window.axios
                .post(
                    'https://jwt-generator.stg-itbl.co/generate', {
                        exp_minutes: 600,
                        email,
                        jwt_secret: jwtsec
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response) => {
                    console.log(`JWT Response ${JSON.stringify(response)}`);
                    localStorage.setItem('jwtToken', response.data.token);
                    return response.data.token
                });
        }
    );
    setEmail(email)
        .then(() => {})
        .catch(() => {})
}

function getEmail() {
    return new Promise((resolve, reject) => {
        if(localStorage.getItem("email") != '') {
           resolve({'email':email})
        } else {
           reject({"error":`no email`});
        }
     });
}

function getJwt(){
    console.log(`get jwt`)
    //expires 12/13/23
    const tempJwt = "";
    localStorage.setItem('jwtToken', tempJwt);
    $('.jwtclass').css("display", "block");
    /*
    window.axios
        .post(
            'https://jwt-generator.stg-itbl.co/generate', {
                exp_minutes: 600,
                email,
                jwt_secret: jwtsec
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((response) => {
            console.log(`JWT Response ${JSON.stringify(response)}`);
            localStorage.setItem('jwtToken', response.data.token);
            // return response.data.token
        });
        */
}

function logout(){
    console.log("Logout....");
    localStorage.clear();
    // localStorage.removeItem('email');
    // localStorage.removeItem('jwtToken');
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
    .then((response)=>{

    })
    .catch((error)=>{
        
    })

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
    .then((response)=>{

    })
    .catch((error)=>{
        
    })
}

function webSdkBroswerInAppMessaging(){
    console.log(`Browser In-app web sdk init...`);
        const { setEmail, logout } = window['@iterable/web-sdk'].initialize(
          jwtapikey, () => Promise.resolve(localStorage.getItem('jwtToken'))
        );
      
        const { request, pauseMessageStream, resumeMessageStream } = window['@iterable/web-sdk'].getInAppMessages(
          {
            count: 5,
            packageName: 'mydemosite',
            handleLinks: 'open-all-same-tab',
          },
            { display: 'immediate' }
        );
    
        setEmail(localStorage.getItem('email'))
          .then(() => {
            console.log(`Email set ${localStorage.getItem('email')}`);
            request()
                .then((response) =>{
                    console.log(`called inapp request function`);
                    // const messageIframe = response.data.inAppMessages[0].content.html;
                    // console.log(typeof messageIframe)
                    // document.getElementById('inappwebcontent').insertAdjacentHTML("afterend", messageIframe);
                })
                .catch((e) =>{
                    console.log(`error calling in app reqeust function`);
                    console.log(e)
                })
          })
          .catch((e) => {
            console.log(`Unable to get In app message ${e}`)
          })
         
}

function triggerWebInApp(){
    //window['@iterable/web-sdk'].track
    
    let apiConfig = {
        reqUrl: `https://api.iterable.com/api/inApp/web/getMessages?email=${email}&count=5`,
        reqMethod: 'GET'
    }
    
    executeAxios(apiConfig.reqUrl, apiConfig.reqMethod)
    .then((response) =>{
        console.log('triggerWebInApp Promise resolved');
        const messageIframe = response.data.inAppMessages[0].content.html;
        console.log(typeof messageIframe)
        document.getElementById('inappwebcontent').insertAdjacentHTML("afterend", messageIframe);
    })
    .catch((error)=>{
        console.log(error)
        console.log('triggerWebInApp Promise rejects');
        
    })
}

function webSdkTrackPurchase(){
        var purchaseData = {
            "id": "a22432d438e",
            "user": {
            "email": "manan.mehta+warbyparkertest@iterable.com"
            },
            "items": [
            {
                "id": "ecb542",
                "sku": "59422",
                "name": "The Black Tee",
                "description": "The Black Tee",
                "price": 21.99,
                "quantity": 1
            },
            {
                "id": "bf5de1",
                "sku": "59446",
                "name": "Twill Cap",
                "description": "Black Twill Cap",
                "price": 11.99,
                "quantity": 1
            }
            ],
            "campaignId": parseInt(Cookies.get('iterableEmailCampaignId')),
            "templateId": parseInt(Cookies.get('iterableTemplateId')),
            "total": 33.98
    };
    var config = {
        method: 'post',
        url: 'https://api.iterable.com/api/commerce/trackPurchase',
        headers: {
            'Content-Type': 'application/json',
            'Api-key': localStorage.getItem('apikey')
        },
        data: JSON.stringify(purchaseData)
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            alert("Success sending purchase event")
        })
        .catch((error) => {
            console.log(error);
            alert("Error sending purchase event")
        });
}

function trackEvents(){
    let apiConfig = {
        reqUrl: 'https://api.iterable.com/api/events/track',
        reqMethod: 'post'
    }
    var reqData = JSON.stringify({
        "eventName": "TestSMS",
        "email": "manan.mehta@iterable.com"
      });
    executeAxios(apiConfig.reqUrl, apiConfig.reqMethod, reqData)
    .then((response)=>{
        console.log('Promise resolved');
    })
    .catch((error)=>{
        console.log('Promise rejects');
        
    })
}

function updateUser(jwtInfo){
    console.log(`Update user web sdk init...`);
    console.log(`apikey=${jwtInfo.jwtapikey}, jwttoken=${jwtInfo.id_token}`)

        const { setEmail, logout } = window['@iterable/web-sdk'].initialize(
            jwtInfo.jwtapikey, () => Promise.resolve(jwtInfo.id_token)
        );
        
        // window['@iterable/web-sdk'].updateUser({ dataFields: { "isVerified": true}})
        //         .then((response)=>{
        //             console.log(`update user: ${response}`);
        //         })
        //         .catch((e)=>{
        //             console.log(`update user error: ${e}`)
        //         });
        
    
                const { request, pauseMessageStream, resumeMessageStream } = window['@iterable/web-sdk'].getInAppMessages(
                    {
                      count: 5,
                      packageName: 'mydemosite',
                      handleLinks: 'open-all-same-tab',
                    },
                      { display: 'immediate' }
                  );
              
                  setEmail(localStorage.getItem('email'))
                    .then(() => {
                      console.log(`Email set ${localStorage.getItem('email')}`);
                      request()
                          .then((response) =>{
                              console.log(`called inapp request function`);
                              // const messageIframe = response.data.inAppMessages[0].content.html;
                              // console.log(typeof messageIframe)
                              // document.getElementById('inappwebcontent').insertAdjacentHTML("afterend", messageIframe);
                          })
                          .catch((e) =>{
                              console.log(`error calling in app reqeust function`);
                              console.log(e)
                          })
                    })
                    .catch((e) => {
                      console.log(`Unable to get In app message ${e}`)
                    })
         
}

function executeAxios(url,method,data){
    return new Promise((resolve, reject) => {
        let config = {
            method: method,
            url: url,
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': '*/*', 
                'Api-Key': localStorage.getItem('apikey')
            },
            data : data
        }
        console.log(`api req data: ${data}`);
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resolve(response);
        })
        .catch(function (error) {
            console.log(error);
            reject(error)
        });
    });

}

function generateJWTAndVerify(){
    let config = {
        method: 'get',
        url: `http://localhost:3000/api/generateJWT?email=${email}`,
      };
      
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        updateUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      
}

function f (x, y, ...a) {
    // ...a spread operator
    return (x + y) * a.length
}
//https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
// a = ["hello", true, 7] an array
f(1, 2, "hello", true, 7) === 9

