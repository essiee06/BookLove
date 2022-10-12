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
  // apiKey: "AIzaSyDvoplRhmFW-_ohrVevSAuwSoNhS1mBcuU",
  // authDomain: "booklove-d1c2e.firebaseapp.com",
  // projectId: "booklove-d1c2e",
  // storageBucket: "booklove-d1c2e.appspot.com",
  // messagingSenderId: "1069352222841",
  // appId: "1:1069352222841:web:bd6af8d7f2d306c22254a8",
  // measurementId: "G-FBS7FBX74V",
  // //booking love
  // apiKey: "AIzaSyAB86h-1BMxM-jL7iW0lhe0c6-Uw-g-YVQ",
  // authDomain: "booking-love.firebaseapp.com",
  // projectId: "booking-love",
  // storageBucket: "booking-love.appspot.com",
  // messagingSenderId: "826528597830",
  // appId: "1:826528597830:web:de4927d40337836b034747",
  // measurementId: "G-0D89698W0H",
  // apiKey: "AIzaSyDvoplRhmFW-_ohrVevSAuwSoNhS1mBcuU",
  // authDomain: "booklove-d1c2e.firebaseapp.com",
  // projectId: "booklove-d1c2e",
  // storageBucket: "booklove-d1c2e.appspot.com",
  // messagingSenderId: "1069352222841",
  // appId: "1:1069352222841:web:bd6af8d7f2d306c22254a8",
  // measurementId: "G-FBS7FBX74V",
  // // Rych Book Love 1
  // apiKey: "AIzaSyAUPIS3dbmqRD4-_KykFknfGzNBtW0bhhs",
  // authDomain: "rych-book-love-1.firebaseapp.com",
  // projectId: "rych-book-love-1",
  // storageBucket: "rych-book-love-1.appspot.com",
  // messagingSenderId: "72634015154",
  // appId: "1:72634015154:web:0fea91377cf57cb8be98ab",
  // measurementId: "G-VKPX2K6MSC"

  // apiKey: "AIzaSyDorKAZ411_oIZ09rN_ROxpyn_n5a9_UE8",
  // authDomain: "book-love-72231.firebaseapp.com",
  // projectId: "book-love-72231",
  // storageBucket: "book-love-72231.appspot.com",
  // messagingSenderId: "888809292695",
  // appId: "1:888809292695:web:1482e889b151a65a1fbad2",
  // measurementId: "G-9SV1EWYLDZ",

  // apiKey: "AIzaSyC3y-tuL7UWp_PTbWKdejPgK0yGRLN69Oc",
  // authDomain: "book-love-4.firebaseapp.com",
  // projectId: "book-love-4",
  // storageBucket: "book-love-4.appspot.com",
  // messagingSenderId: "607272697525",
  // appId: "1:607272697525:web:f8d2b936819e4b333948fc",
  // measurementId: "G-BQJFVCZ7M6",
  // apiKey: "AIzaSyBu-agaZoZOCvC0mcSLlhjPNiwqELzw88Q",
  // authDomain: "booklovedatabase.firebaseapp.com",
  // projectId: "booklovedatabase",
  // storageBucket: "booklovedatabase.appspot.com",
  // messagingSenderId: "167047547438",
  // appId: "1:167047547438:web:e144cc6dbba6fabeec2dbf",
  // apiKey: "AIzaSyCEPwYMBVfw6Mr4hTM1kMKiWU-eCAtoKUM",
  // authDomain: "booklovee-c3b6c.firebaseapp.com",
  // projectId: "booklovee-c3b6c",
  // storageBucket: "booklovee-c3b6c.appspot.com",
  // messagingSenderId: "423061261252",
  // appId: "1:423061261252:web:6bc4a718ea337c767cf291",
  // measurementId: "G-9DCWPEHJN3",

  apiKey: "AIzaSyCYiu2QgXMdp9rDlJ52OG4wCp69ry0IX7w",
  authDomain: "book-love-6.firebaseapp.com",
  projectId: "book-love-6",
  storageBucket: "book-love-6.appspot.com",
  messagingSenderId: "844239257715",
  appId: "1:844239257715:web:f0be13e2d8e8eb26b2aa06",
  measurementId: "G-B89HZHQJ7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
