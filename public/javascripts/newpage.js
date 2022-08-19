var app = new Vue({ 
    el: '#app',
    data: {
        message: 'Hello Vue!',
        pageheader: "Welcome to Iterable Demo",
        
        emailbox: '<hr><label for="email"><b>Email</b></label>\n<input type="text" name="email" id="email" pattern=".+@globex\.com" required>\n',

        email_btn: '<button class="btn btn-success" type="button" id="email" v-on:click="addemail">Add email</button></br><small>Please enter your email.</small></div><hr>'

    },
    // define methods under the `methods` object
    methods: {
      addemail: function () {
        console.log("add email");
        localStorage.setItem('email', document.getElementById('email').value);
        email = localStorage.getItem("email");
        // setTimeout(app.identifyUser(), 2000);  
      },
      greet: function () {
        console.log("greet");
      },
      identifyUser() {
        console.log('identifyUser');
        _iaq.push(['identify', localStorage.getItem("email"), {
            "firstName,": "Testing",
            "isWebUser,": true,
            "SA_WebUser_Test_Key": "completed"
        }]);
    
        // setTimeout(app.sendCustomEvent(), 2000);    
        },
        sendCustomEvent() {
            console.log("send custom event");
            _iaq.push(['track', 'webSATestEvent', {
                "platform": "web",
                "isTestEvent": true,
                "url": "https://iterable.com/sa-test/manan",
                "secret_code_key": "Code_2022"
            }]);
            // setTimeout(app.getmessage(), 2000);
        },
        getmessage() {
            let getemail = localStorage.getItem("email");
            let url = `https://api.iterable.com/api/inApp/getMessages?email=${getemail}&count=1&platform=Web&SDKVersion=None`;
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
                    // setTimeout(location.reload(),2000);
        
                })
        }
    }
});
