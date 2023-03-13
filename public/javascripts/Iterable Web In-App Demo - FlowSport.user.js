// ==UserScript==
// @name         IterableWebIn-AppDemo-FloSports
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Manan Mehta
// @match        https://www.flowrestling.org/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flowrestling.org
// @grant        none
// @require https://unpkg.com/@iterable/web-sdk/index.js
// @require https://code.jquery.com/jquery-3.6.1.min.js
// @run-at document-end
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';

    // Your code here...
    console.log("Tempermonkey loaded");
    const jwtapikey = '0c29175314ab4a84bf9307e6a28a3ad5';
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI0ODE4NDEsImlhdCI6MTY3MzYyNDI0MSwiZW1haWwiOiJtYW5hbi5tZWh0YUBpdGVyYWJsZS5jb20ifQ.DzZGxz83CaVLZzg9-2tn1d6cylHb7vTMZ5YgdLIQo0Y'
    const email = 'manan.mehta@iterable.com'
    console.log(`Browser In-app web sdk init...`);
    var inappData = null;

    const logJsonPayload = (type, payload) => {
        console.log("This is the "+type+" form JSON only message")
        Object.keys(payload).forEach((key, idx) => {
            console.log(`${key}: ${payload[key]}`);
        })
    }

const onInAppSubmit = (msgId, setTime, customEvent) => {
    //track event
        window['@iterable/web-sdk'].track({eventName: customEvent},{dataFields:{"setReminderTime": setTIme}})
    .then((response) => {
        console.log("testCustomEvent event tracked");
        
    })
    .catch((err) =>{
        console.log("error: testCustomEvent event tracked");
    })
    
    // send user update to Iterable
    //window['@iterable/web-sdk'].updateUser({dataFields: {"surveyRating": ratingValue}})
    
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

const clickSetReminder = (inapp)=>{
    //yyyy-MM-dd HH:mm:ss
   var setTime = "2023/03/09 8:00:00" // 8 am on march 9th
   var customEvent = "testCustomEvent";
//    var msgId = inapp.inapp.messageId;
   onInAppSubmit(inapp.messageId, setTime, customEvent);
}
  $("#setReminderbtn").click(function() {
    console.log("set reminder button clicked");
    clickSetReminder(inappData)
});

//load iterable api
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
                            inappData = inapp;
                            // clickSetReminder(inapp)    
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