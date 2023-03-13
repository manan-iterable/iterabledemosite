// ==UserScript==
// @name         IterableWebIn-AppDemo-CREXi
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Demo Iterable In-App Web
// @author       Manan Mehta
// @match        https://www.crexi.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require https://unpkg.com/@iterable/web-sdk/index.js
// @require https://code.jquery.com/jquery-3.6.1.min.js
// @run-at document-end
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
  'use strict';
// Your code here...
const loadNpsStyle = () => {
  console.log('NPS CSS Loading...');
  const npsStyle = '<style>.container{font-family:"Helvetica Neue",Helvetica,sans-serif;/*margin:80px auto;*/width:80%}.container .widget span{color:#000;font-size:18px}.container .widget button{font-size:16px;white-space:nowrap;vertical-align:middle;display:inline-block;background:0;border:0;box-shadow:none;cursor:pointer;text-align:center;font-weight:500;border-radius:100%;margin:0;outline:0;margin-left:-1px;width:40px;height:40px;border:3px solid #eee;transform:scale(1);transition:background .2s ease-in,color .2s ease-in,border-color .2s ease-in,transform .2s cubic-bezier(0.5,2,0.5,0.75)}.container .widget button.detractor-hover{background:#f44336;color:white;border-color:#f55a4e;transform:scale(1.05)}.container .widget button.passive-hover{background:#f57c00;color:white;border-color:#ff8910;transform:scale(1.05)}.container .widget button.promoter-hover{background:#4caf50;color:white;border-color:#5cb860;transform:scale(1.05)}.container .widget.widget-sm{width:500px;background:#b7daec;border:4px solid #000;padding:25px;box-sizing:border-box;position:relative;padding-bottom:40px}.container .widget.widget-sm .positive-text,.container .widget.widget-sm .negative-text{position:absolute}.container .widget.widget-sm .positive-text{right:20px;bottom:10px;text-align:right}.container .widget.widget-sm .negative-text{left:20px;bottom:10px;text-align:left}.container .widget.widget-sm button{border:0;margin-left:10px;width:27px;height:27px;font-size:18px;font-weight:normal;transform:scale(1) !important;border-radius:none;text-align:center;display:inline-block}</style>';
  $(npsStyle).appendTo("head");
}

const loadNpsHtml = () => {
  console.log('NPS HTML Loading...');
  const npsHtml = "<div class=\"container\">\r\n   <div class=\"widget widget-sm\">\r\n      <span class=\"welcomeText\"><\/span><br><br>\r\n      <span class=\"message\"><\/span><br>\r\n   <\/br>\r\n      <div class=\"button-container\">\r\n         <span class=\"negative-text\">Unlikely<\/span>\r\n         <button class=\"detractor\" value=\"1\">1<\/button>\r\n         <button class=\"detractor\" value=\"2\">2<\/button>\r\n         <button class=\"detractor\" value=\"3\">3<\/button>\r\n         <button class=\"detractor\" value=\"4\">4<\/button>\r\n         <button class=\"detractor\" value=\"5\">5<\/button>\r\n         <button class=\"passive\" value=\"6\">6<\/button>\r\n         <button class=\"passive\" value=\"7\">7<\/button>\r\n         <button class=\"passive\" value=\"8\">8<\/button>\r\n         <button class=\"promoter\" value=\"9\">9<\/button>\r\n         <button class=\"promoter\" value=\"10\">10<\/button>\r\n         <span class=\"positive-text\">Likely<\/span>\r\n        <\/div>\r\n   <\/div>\r\n<\/div>"
  // $(".hero-wrapper").after(npsHtml);
  $( npsHtml ).insertAfter( $( ".hero-wrapper" ) );

  // hero-h2 is page class
}

console.log("Tempermonkey loaded");
const jwtapikey = '0c29175314ab4a84bf9307e6a28a3ad5';
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI0ODE4NDEsImlhdCI6MTY3MzYyNDI0MSwiZW1haWwiOiJtYW5hbi5tZWh0YUBpdGVyYWJsZS5jb20ifQ.DzZGxz83CaVLZzg9-2tn1d6cylHb7vTMZ5YgdLIQo0Y'
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
	window['@iterable/web-sdk'].track({eventName: 'surveyRatingSubmmited'})
  .then((response) => {
    console.log("surveyRatingSubmmited event tracked");
    $('.container').css("display", "none");
  })
  .catch((err) =>{
    console.log("error: surveyRatingSubmmited event tracked");
  })
  
  // send user update to Iterable
	window['@iterable/web-sdk'].updateUser({dataFields: {"surveyRating": ratingValue}})

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

const displayNps = (inapp, payload) => {
 
    loadNpsHtml();
    loadNpsStyle();

  
  // logJsonPayload("info", payload);

  $('.welcomeText').text(payload.heading);
  $('.message').text(payload.message);
  $('.container').css("display", "block");
  $('.container').css("position", "relative");
  $('button').hover(function() {
      var $this = $(this);
      var $prevAll = $(this).prevAll();

      var className = $this.attr("class") + "-hover";

      $this.addClass(className);
      $prevAll.addClass(className);
  }, function() {
      var $this = $(this);
      var $prevAll = $(this).prevAll();

      $('.heading').text("Welcome");
      // $('.widget-sm').css('background','#000000');
      $this.removeClass("detractor-hover passive-hover promoter-hover");
      $prevAll.removeClass("detractor-hover passive-hover promoter-hover");
  });
  $("button").click(function() {
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

                            if(payload.showNps != undefined ){
                              setTimeout(() => {
                                console.log("Delayed for 2 second.");
                                displayNps(inapp, payload)
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
