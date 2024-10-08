// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
/**importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();
**/
/** 
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
*/
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object

 const firebaseConfig = {
  apiKey: "AIzaSyA2nvp2zzHIN6oxfqEEbckWDIvlver5op8",
  authDomain: "manan-test-project-d70b8.firebaseapp.com",
  projectId: "manan-test-project-d70b8",
  storageBucket: "manan-test-project-d70b8.appspot.com",
  messagingSenderId: "456066279840",
  appId: "1:456066279840:web:75cf9f63a3bed0bbd81cc5",
  measurementId: "G-516GR1FZD3"
};
 firebase.initializeApp(firebaseConfig);
 

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
//  const messaging = firebase.messaging();
 


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options

// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '../utils/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

// Create a new custom push class
class CustomPushEvent extends Event {
  constructor(data) {
    super('push');
    Object.assign(this, data);
    this.custom = true;
  }
 }

 // This event listener obtains the notification with payload from API and converts it to a Data Message so that it can be used with onBackgroundMessage and prevent duplication
 self.addEventListener('push', (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;
  // Kep old event data to override
  const oldData = e.data;
  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });
  // Stop event propagation
  e.stopImmediatePropagation();
  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
 });
 


// display background push message
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload); // debug info
  //console.log(payload)
  if (payload.data.body && payload.notification == undefined){
    const { title, body, icon, ...restPayload } = payload.data;
    const notificationOptions = {
      body,
      icon: icon || '/icons/firebase-logo.png', // path to your "fallback" firebase notification logo
      data: restPayload,
    };
    return self.registration.showNotification(title, notificationOptions);
  }
 });

/* messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  if(payload.data.body){
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon || '../utils/firebase-logo.png',
      click_action: payload.data.click_action
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  }
});*/

 self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] notificationclick ', event); // debug info
  console.log(event);
 // must close the notification
 event.notification.close();
  let url = "https://carfax.com" //"http://localhost:3000" // set defaul root domain of website

  // check to see if event payload contains click_action URL for redirect
  if (event.notification.data && event.notification.data.click_action) {
    url = event.notification.data.click_action
  }
  console.log(url)
 
  // create a URL object to access root domain of click_action URL
  let destinationUrl = new URL(url)
  // build root domain so that the format matches what is pulled from the browser
  let originalUrl = destinationUrl.origin + destinationUrl.pathname
  console.log("originalUrl ", originalUrl)

  // Filter through the browser tabs and identify the URL where the Push originated and bring it back into focus, instead of opening a new tab
  event.waitUntil(
    clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url == originalUrl) {
          return client.focus().then(function (client) {
            //Service Workers do not have access to DOM Elements, so we must send a Post Message.  There must be a corresponding listener in the App code to retrieve this message
            client.postMessage({
              action: 'redirect-from-notificationclick',
              url: url,
            });
          })
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }
    }));
})