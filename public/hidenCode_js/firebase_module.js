  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { getDatabase, get, ref, set, child, push, onValue, remove, update, onChildChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAFfbzaIpMIzbazEAEIfP9uNCoQFR-T4R0",
    authDomain: "hidden-code-90a43.firebaseapp.com",
    databaseURL: "https://hidden-code-90a43-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hidden-code-90a43",
    storageBucket: "hidden-code-90a43.appspot.com",
    messagingSenderId: "23573772287",
    appId: "1:23573772287:web:61345934ff4d9ddead99ca",
    measurementId: "G-XBT2TY7JK6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase()

  export {db, get, set, ref, child, getDatabase, push, onValue, remove, update, onChildChanged }