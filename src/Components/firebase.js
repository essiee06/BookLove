// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCytD8w0ecyFxe5qs7ziTRqEBDVxij1UIQ",
  // authDomain: "booklove-a156a.firebaseapp.com",
  // databaseURL: "https://booklove-a156a-default-rtdb.firebaseio.com",
  // projectId: "booklove-a156a",
  // storageBucket: "booklove-a156a.appspot.com",
  // messagingSenderId: "470356124810",
  // appId: "1:470356124810:web:d8f1898ec4e03aad617973",
  // measurementId: "G-165JXM2004",
  // apiKey: "AIzaSyCXns-AkSM4FYi-7Q15e77mZMF0TueAUPs",
  // authDomain: "love-book-7b56d.firebaseapp.com",
  // projectId: "love-book-7b56d",
  // storageBucket: "love-book-7b56d.appspot.com",
  // messagingSenderId: "309761965893",
  // appId: "1:309761965893:web:a854a884ef9fd8b742c82c",
  // measurementId: "G-5VCJE5B8HP",
  // // auth
  // apiKey: "AIzaSyDLSGTz7S9dswIfKGupAFNUrR6hH0Jf--g",
  // authDomain: "auth-ce617.firebaseapp.com",
  // projectId: "auth-ce617",
  // storageBucket: "auth-ce617.appspot.com",
  // messagingSenderId: "432357889058",
  // appId: "1:432357889058:web:5ec9643f2ad944bc46e67b",
  //RYCHBOOKLOVEconfig
  // apiKey: "AIzaSyCjJtMMLzQ99A49deje8poRq9UuGbfORZ4",
  // authDomain: "rychbooklove.firebaseapp.com",
  // projectId: "rychbooklove",
  // storageBucket: "rychbooklove.appspot.com",
  // messagingSenderId: "943687986219",
  // appId: "1:943687986219:web:d5c63f620ff3fe3f354e6e",
  // measurementId: "G-QYL42661MB",
  // //book loving
  // apiKey: "AIzaSyBsviHgWni_Jki8re4jfuIzQgCczFlcMuE",
  // authDomain: "book-loving.firebaseapp.com",
  // projectId: "book-loving",
  // storageBucket: "book-loving.appspot.com",
  // messagingSenderId: "1072204997938",
  // appId: "1:1072204997938:web:693901862077f899de232b",
  // measurementId: "G-0K3GZ5C91R",

  apiKey: "AIzaSyAvYl_q5Rt_IOZPXUUe0Qqfx8Na-4jM_kw",
  authDomain: "authentication-70c4a.firebaseapp.com",
  projectId: "authentication-70c4a",
  storageBucket: "authentication-70c4a.appspot.com",
  messagingSenderId: "990648557500",
  appId: "1:990648557500:web:ed93279f50133c728c15b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
