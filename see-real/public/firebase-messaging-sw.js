// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDVTe68PNDIXVnFHozWi6mzUu0l5FRPZ6w",
    authDomain: "rss2024-6bba2.firebaseapp.com",
    projectId: "rss2024-6bba2",
    storageBucket: "rss2024-6bba2.appspot.com",
    messagingSenderId: "256846983417",
    appId: "1:256846983417:web:f2a40f4caca0737cb23228",
    measurementId: "G-JG2NV7LHYC"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('push', function (event) {

  console.log("event:push")
  let messageTitle = "MESSAGETITLE"
  let messageBody = "MESSAGEBODY"
  let messageTag = "MESSAGETAG"

  const notificationPromise = self.registration.showNotification(
    messageTitle,
    {
      body: messageBody,
      tag: messageTag
    });

  event.waitUntil(notificationPromise);

}, false)

messaging.setBackgroundMessageHandler(function (payload) {

  console.log("backgroundMessage")

  let messageTitle = "MESSAGETITLE"
  let messageBody = "MESSAGEBODY"

  return self.registration.showNotification(
    messageTitle,
    {
      body: messageBody,
      tag: messageTag
    });
});