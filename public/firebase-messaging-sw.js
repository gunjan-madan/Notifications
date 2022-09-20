// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyD7Kd8FC_88QpHUTHTulnOuwMGPzh1pcmk",
  authDomain: "test-notifications-9c2fb.firebaseapp.com",
  projectId: "test-notifications-9c2fb",
  storageBucket: "test-notifications-9c2fb.appspot.com",
  messagingSenderId: "884220183080",
  appId: "1:884220183080:web:b7359a06cbe1a879ad6b1d",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
