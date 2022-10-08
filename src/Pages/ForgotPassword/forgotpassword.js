import React from "react";
import "./forgotpassword.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../Components/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Button, Container, Figure, Form, Stack } from "react-bootstrap";

function ForgotPassword() {
  //navigation
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");

  const changePass = async (e) => {
    e.preventDefault();
    // db.settings({merge: true});
    sendPasswordResetEmail(auth, Email)
      .then(() => {
        window.alert("Email sent.");
        navigate("/sign-in-up");
      })
      .catch((e) => {
        window.alert("Email is invalid and does not exist.");
        navigate("/forgot-password");
      });
  };

  return (
    <div className="body">
      <div class="container">
      <div>
          
        </div>
        <div class="forgotpass">
        <Button href="/" variant="transparent">
            <FaArrowLeft class="backArow" />
          </Button>
          <div className="logobook"></div>
          <div className="booklove"></div>
          <h1 class="resetpass_title">Reset Your Password</h1>
          <p class="please_enter_text">
            Please enter your email. A password reset link will be sent to your
            email.
          </p>
          <h2 class="Email_login">Email</h2>
          <input
            class="loginEmail"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button className="change_pass" onClick={changePass}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
