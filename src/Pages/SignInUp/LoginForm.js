import React, {Component, Profiler, useEffect, useState} from "react";
import "./LoginForm.css";
import { dividerClasses, FormControlLabel, modalClasses, Radio, RadioGroup } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../Components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "@material-design-icons/font";
import Splash from "../../Components/Splash/Splash";


//for password eye icon

const eye = <span class="material-symbols-outlined">
visibility
</span>




function LoginForm(setIsAuth) {
  //navigation
  let navigate = useNavigate();
  //authentication

  //navigates the user to the home page if logged in
  if(auth.currentUser && auth.currentUser.emailVerified){
    navigate("/home");
  }

  //setting email and password, name, confirm password
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [registerEmail, setregisterEmail] = useState("");
  const [registerPassword, setregisterPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  //splash
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [regName, setRegName] = useState("");
  const [loginName] = useState("");
  const [compass, setComPass] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");

  //for sign up

  const current = new Date().toISOString().split("T")[0];

  function validatebday(dob) {
    // Store value of date of birth field
    let bday = new Date(dob);
    let todayDate = new Date();
    let timeDiff = Math.abs(todayDate.getTime() - bday.getTime());
    let diffyears = Math.ceil(timeDiff / (1000 * 3600 * 24) / 365);
    console.log(diffyears);
    return diffyears;
  }

  const signUp = async (e) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword || !compass || !birthday || !sex) {
      window.alert("Please fill in all the required fields.");
    } else if (registerPassword != compass) {
      window.alert("Passwords do not match. Please try again.");
    } else if (registerPassword.length < 6 || registerPassword.length > 12) {
      window.alert(
        "Please enter a password with a minimum of 6 and maximum of 12 characters."
      );
    } else if (validatebday(birthday) < 18) {
      window.alert("You must be at least 18 to join.");
    } else {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((cred) => {
          console.log("auth.currentuser");
          const user = auth.currentUser;
          sendEmailVerification(user);
          updateProfile(user, {
            displayName: regName
          })
          add_user();
        })
    }
  };

  //for sign in

  const signIn = async (e) => {
    e.preventDefault();
    var user = auth.currentUser;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword, loginName)
      .then((cred) => {
        if (auth.currentUser.emailVerified == true) {
          window.alert("Login Sucessful");
          navigate("/home");
        } else if (auth.currentUser.emailVerified == false) {
          window.alert(
            "You must be a verified user to login. Refresh the page once you have verified the account."
          );
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(user);
        window.alert("Email or password is incorrect.");
        console.log(error.message);
      });
  };

  //pushing user details to firestore
  var add_user = () => {
    console.log("sending request");

    var requestData = {
      Display_Name: regName,
      Birthday: birthday,
      Sex: sex,
      Email: registerEmail,
    };
    push_to_firebase_join(requestData);
  };

  var push_to_firebase_join = function (data) {
    var userUid = auth.currentUser.uid;

    console.log(userUid);
    setDoc(doc(db, "Users_Information", userUid), {
      Display_Name: data["Display_Name"],
      Birthday: data["Birthday"],
      Email: data["Email"],
      Sex: data["Sex"],
    })
    .then((cred) => {
      window.alert(
        "Account created successfully, please activate your account through an activation link sent to your email."
      );
      //pwede ichange ang sign-in-up to another page
      navigate("/");
      console.log("auth.currentuser");
    })
    .then((cred) => {
      window.location.reload(false);
    })
    .catch((e) => {
      window.alert("Please input a valid email address.");
    })
  };

  return (
    <div>
       {loading ? (
        <Splash loading="loading" />
      ) : (
      <div>
    <div className="body">
      <div class="container">
        <input type="checkbox" id="toggle" />
        <div class="signin">
          <div className="logo"></div>
          <h1 class="Welcome_Message">Welcome to Book Love!</h1>
          <form>
            <p class="PleaseText">Please enter your login details</p>
            <h2 class="Email_login">Email</h2>
            <input
              class="loginEmail"
              type="email"
              onKeyUp={(event) => setloginEmail(event.target.value)}
              required
            />
            <h2 class="Password_login">Password</h2>
            <div id="DivPassword" className="loginPassword">
              {" "}
              <input
                type={passwordShown ? "text" : "password"}
                onKeyUp={(event) => setloginPassword(event.target.value)}
                required
                class="loginpasswordtext"
              />
              <i onClick={togglePasswordVisiblity} class="togglePassword">
              <span class="material-symbols-outlined">
                {passwordShown ? "visibility" : "visibility_off"}
              </span>
              </i>{" "}
            </div>
            
            <label
              onClick={() => navigate("/forgot-password")}
              class="Forgot_Password"
            >
              Forgot Password?
            </label>
            <button className="submit_btn" onClick={signIn}>
              Login
            </button>
            <small class="have_no_account">
              Don't have an account? <label for="toggle">Sign Up</label>{" "}
            </small>
            
          </form>
        </div>

        <div class="signup">
          <div class="logos">
            <div className="booklovesinguplogo"></div>
          </div>
          <h1 class="create_an_account">Create an account</h1>
          <form>
            <p class="enteryourdetailstxt">Enter your details</p>
            <div class="row">
            <div class="col-md">

              <div class="displaynameDiv">
                <label for="displaynameinput" class="signuplabelsleft">Display Name</label>
                  <input
                    type="text"
                    placeholder="Display Name"
                    onChange={(event) => setRegName(event.target.value)}
                    required
                    id="displaynameinput"
                  />
              </div>

              <div class="birthdayDiv">
                <label for="birthday" class="signuplabelsleft">Birth Date</label>
                  <input
                    type="date"
                    placeholder="Enter Birthday"
                    onChange={(event) => setBirthday(event.target.value)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="Birthday"
                    max={current}
                    required
                    id="birthday"
                  />
              </div>

              <div class="sexDiv">
                <label for="sex" class="signuplabelsleft">Sex</label>
                  <RadioGroup
                    classname="radiogroup"
                    label="Sex"
                    name="Sex"
                    id="sex"
                    onChange={(event) => setSex(event.target.value)}
                    required
                    row
                  >
                    <div class="malesexdivsub">
                      <FormControlLabel
                        classname="radiogroup"
                        class="sexlabel"
                        value="Male"
                        control={<Radio />}
                        id="Male"
                      />
                      <label for="Male" class="sexlabels">Male</label>
                    </div>

                    <div class="femalesexdivsub">
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        id="Female"
                      />
                      <label for="Female" class="sexlabels">Female</label>
                    </div>
                  
                    <div class="secretsexdivsub">
                      <FormControlLabel
                        value="Rather Not Say"
                        control={<Radio />}
                        id="secretgenderid"
                      />
                      <label for="secretgenderid" class="rathernotsaylabel">Rather Not Say</label>
                    </div>
                  
                  </RadioGroup>
              </div>

            </div>
            <div class="col-md">
              <div class="emailDiv">
                <label for="Email" class="signuplabelsleft">Email</label>
                <input
                className="input_signup"
                type="email"
                placeholder="Email"
                onChange={(event) => setregisterEmail(event.target.value)}
                required
                id="Email"
                />
              </div>
            
              <div class="passwordDiv">
                <label for="password" class="signuplabelsleft">Password</label>
                <input
                 className="input_signup"
                  type="password"
                  placeholder="Password"
                 onChange={(event) => setregisterPassword(event.target.value)}
                 required
                 id="password"
                />
              </div>

              <div class="confirmpasswordDiv">
                <label for="ConfirmPassword" class="signuplabelsleft">Confirm Password</label>
                <input
                  className="input_signup"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(event) => setComPass(event.target.value)}
                  required
                  id="ConfirmPassword"
                />
              </div>

          </div>
          </div>
              <div class="noaccountDiv">
                <small class="have_an_account">
                 Already have an account? <label for="toggle">Sign In</label>
                </small>
              </div>

              <div class="createaccountbuttonDiv">
                <button className="submit_btn" onClick={signUp}>
                  Create Account
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
    </div>
)}
    </div>
  );
}

export default LoginForm;
