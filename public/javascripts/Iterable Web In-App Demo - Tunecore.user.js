// ==UserScript==
// @name         IterableWebIn-AppDemo-Tunecore
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Demo Iterable In-App Web
// @author       Manan Mehta
// @match        https://manan.iterabledemo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require https://unpkg.com/@iterable/web-sdk/index.js
// @require https://code.jquery.com/jquery-3.6.1.min.js
// @run-at document-end
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
  'use strict';
  // codepen: https://codepen.io/mehta-iterable/pen/abPpqjO
// Your code here...
const loadNpsStyle = () => {
  console.log('Message CSS Loading...');
  const npsStyle = '<style>.container{font-family:Arial,Helvetica,sans-serif;margin:80px auto;width:80%;font-size:20px}.container .widget .btn{background-color:#0f0f0e;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;border-radius:25px}.container .widget.widget-sm{width:500px;background:#f04358;border:2px solid #000;padding:25px 25px 40px;box-sizing:border-box;position:relative;border-radius:25px}.container .widget.widget-sm *{color:#fff;font-weight:700}</style>';
  $(npsStyle).appendTo("head");
}

const loadNpsHtml = () => {
  console.log('Message HTML Loading...');
  const npsHtml = "<div class=\"container\">\r\n   <div class=\"widget widget-sm\">\r\n      <div class=\"welcomeText\"><\/div><br><br>\r\n      <div class=\"message\"><\/div><br><br>\r\n      <button class=\"btn\" type=\"button\">Click to Singup<\/button>\r\n   <\/div>\r\n<\/div>"
  // $(".hero-wrapper").after(npsHtml);
  $( npsHtml ).insertAfter( $( "p" ) );

  // hero-h2 is page class
}

console.log("Tempermonkey loaded");
const jwtapikey = 'eb60f4fd2c0c48379851e82c649a2119';
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFuLm1laHRhQGl0ZXJhYmxlLmNvbSIsImlhdCI6MTY5NDQ1Mzg5NiwiZXhwIjoxNjk1MDU4Njk2fQ.WPROgVvaay-S_34QhOPDiSyQn5qEvbONSXBPec5SknQ'
const email = 'manan.mehta@iterable.com'
console.log(`Browser In-app web sdk init...`);

const logJsonPayload = (type, payload) => {
	console.log("This is the "+type+" form JSON only message")
    Object.keys(payload).forEach((key, idx) => {
        console.log(`${key}: ${payload[key]}`);
    })
}
const onInAppSubmit = (msgId, ratingValue) => {
  //track event
	window['@iterable/web-sdk'].track({eventName: 'trialStarted'})
  .then((response) => {
    console.log("trialStarted event tracked");
    $('.container').css("display", "none");
  })
  .catch((err) =>{
    console.log("error: trialStarted event tracked");
  })
  
  // send user update to Iterable
	//window['@iterable/web-sdk'].updateUser({dataFields: {"trialStarted": ratingValue}})

	// remove in-app from queue
    window['@iterable/web-sdk'].trackInAppConsume({
            messageId: msgId,
            deviceInfo: { appPackageName: 'mydemosite' }
        })
        .then((response) => {
          console.log("messaged removed from queue");
        })
        .catch((err) =>{
          console.log("error: messaged removed from queue");
        })
}

const displayInAppMsg = (inapp, payload) => {
    console.log("displayInAppMsg......")
    loadNpsHtml();
    loadNpsStyle();

  
  // logJsonPayload("info", payload);

  $(".welcomeText").text(payload.heading);
  $(".message").text(payload.message);
  $(".container").css("display", "block");
  $(".container").css("position", "relative");
  if(payload.backgroundColor){
    $(".container .widget.widget-sm").css({"background":payload.backgroundColor});
  }
  $(".btn").click(function () {
    alert("Signup button clicked....");
    //fire custom event here
  });
  console.log("Div value appended.......")
    $(".btn").click(function() {
        var fired_button = $(this).val();
        console.log("button clicked: ",fired_button);
        onInAppSubmit(inapp.messageId, fired_button);
    });
}

$( document ).ready(function() {
  console.log( "ready!" );
  console.log("All resources finished loading!");

  // loadNpsHtml();
  // loadNpsStyle();
  (() => {
      console.log(jwtToken);
      const {setEmail, logout} = window['@iterable/web-sdk'].initialize(
          jwtapikey, () => Promise.resolve(jwtToken)
      );

      const {request, pauseMessageStream,resumeMessageStream} = window['@iterable/web-sdk'].getInAppMessages({
          count: 5,
          packageName: 'mydemosite',
          handleLinks: 'open-all-same-tab',
      }, {
          display: 'immediate'
      });

      setEmail(email)
          .then(() => {
              console.log(`Email set ${email}`);
              request();
                  window['@iterable/web-sdk'].getInAppMessages(
                    {count: 5,
                    packageName: 'mydemosite',
                    handleLinks: 'open-all-same-tab',
                    display: 'immediate'}
                )
                  .then((response) => {
                      console.log(`called inapp request function`);
                      console.log(response)
                      const inappmessage = response.data.inAppMessages;
                      console.log(inappmessage);
                      inappmessage.forEach(inapp => {
                            const html = inapp.content.html
                            const payload = inapp.content.payload

                            if(payload.showMsg != undefined ){
                              setTimeout(() => {
                                console.log("Delayed for 2 second.");
                                displayInAppMsg(inapp, payload)
                              }, "2000")
                            }
                          });

                      // const messageIframe = response.data.inAppMessages[0].content.html;
                      // console.log(typeof messageIframe)
                      // document.getElementById('inappwebcontent').insertAdjacentHTML("afterend", messageIframe);
                  })
                  .catch((e) => {
                      console.log(`error calling in app reqeust function`);
                      console.log(e)
                  })
          })
          .catch((e) => {
              console.log(`Enable to get In app message ${e}`)
          })
  })();

});

})();
