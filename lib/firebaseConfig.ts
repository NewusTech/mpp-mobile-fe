// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_3TwQVI0BDa4yYU5lfRuQpwXKs1ybVl8",
  authDomain: "mpp-lampung.firebaseapp.com",
  projectId: "mpp-lampung",
  storageBucket: "mpp-lampung.appspot.com",
  messagingSenderId: "878031094049",
  appId: "1:878031094049:web:485bd323e0044ae73bbe60",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
