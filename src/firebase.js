import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD7Kd8FC_88QpHUTHTulnOuwMGPzh1pcmk",
  authDomain: "test-notifications-9c2fb.firebaseapp.com",
  projectId: "test-notifications-9c2fb",
  storageBucket: "test-notifications-9c2fb.appspot.com",
  messagingSenderId: "884220183080",
  appId: "1:884220183080:web:b7359a06cbe1a879ad6b1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export const gtToken = (setToken) => {
  return getToken(messaging, {
    vapidKey:
      "BAZGX8GmcgyMeil4QmK4q9RnwXppDDnO0zFtok9XkZCxdzcW_XqNAOh8UswMtl8v-2jMCX9UmYUM-3YV7ZhchkA",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setToken(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setToken("");
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
