import React from "react";
import { Button, Container, Figure, Form, Stack } from "react-bootstrap";
import NavBar2 from "../../Components/NavBar/NavBar2";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import styles from "./EditProfile.module.css";
import { useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { updatePassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./profile.png";

const EditProfile = () => {
  let navigate = useNavigate();

  const [DisplayName, setDisplayName] = useState("");
  const [NewDisplayName, setNewDisplayName] = useState("");
  const [NewPassword, setNewPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [Message, setMessage] = useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  auth.onAuthStateChanged((user) => {
    // commented out lang sa para di maglisod ug check pero included jud ni siya
    // if(auth.currentUser==null){
    //   navigate("/");
    // }

    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //DISPLAY NAME
            setDisplayName(doc.data().Display_Name);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  var UpdateDName = function () {
    var user = auth.currentUser;
    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //UPDATE DISPLAY NAME
            updateDoc(docRef, {
              Display_Name: NewDisplayName,
            });
          }
        })
        .then((response) => {
          updateProfile(user, {
            displayName: NewDisplayName,
          });
          navigate("/profile");
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };

  var check = function () {
    //checking newpass and confirm pass
    if (
      NewPassword == ConfirmPassword &&
      NewPassword != "" &&
      ConfirmPassword != ""
    ) {
      setMessage("Passwords Match");
    } else if (
      NewPassword != ConfirmPassword &&
      NewPassword != "" &&
      ConfirmPassword != ""
    ) {
      setMessage("Passwords Do Not Match");
    } else if (NewPassword == "" || ConfirmPassword == "") {
      setMessage("Please fill in all fields");
    }
    console.log(NewPassword);
    console.log(ConfirmPassword);
    console.log(Message);
  };

  const ChangePassword = async (e) => {
    check();
    e.preventDefault();
    var user = auth.currentUser;

    if (
      NewPassword == ConfirmPassword &&
      NewPassword != null &&
      ConfirmPassword != null
    ) {
      if (NewPassword.length <= 12 && NewPassword.length >= 6) {
        updatePassword(user, NewPassword).then(() => {
          navigate("/");
          window.alert(
            "You will be logged out. Please login again with your new password."
          );
        });
      } else {
        window.alert("Password must have 6-12 characters");
      }
    }
  };

  //image upload
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  console.log("Images", images);
  console.log("imageUrls", imageURLs);
  const [imgCrop, setimgCrop] = useState(false);
  const [storeImage, setstoreImage] = useState([]);
  const [dialogs, setdialogs] = useState(false);

  const onCrop = (view) => {
    setimgCrop(view);
  };
  const onClose = () => {
    setimgCrop(null);
  };
  const saveImage = () => {
    setstoreImage([...storeImage, { imgCrop }]);
    setdialogs(false);
  };

  const profileImageShow = storeImage.map((item) => item.imgCrop);

  return (
    <div>
      {" "}
      <NavBar2 />
      <Sidebar />
      <Container>
        <div className={styles.CreateAClubwrapper}>
          <span>Edit Profile</span>
        </div>
        <div className={styles.CreateAClubline}></div>
        <div>
          <Button href="/profile" variant="transparent">
            <FaArrowLeft className={styles.backArow} />
          </Button>
        </div>
        <div className={styles.editProfilewrapper}>
          <span className={styles.editProfileTxt}>Profile Picture</span>
        </div>
        <div className={styles.editDisplayName}>
          <Stack direction="horizontal" gap={3}>
            <label className>Display Name</label>
            <Form.Control
              className="me-auto"
              placeholder={DisplayName}
              onKeyUp={(event) => setNewDisplayName(event.target.value)}
            />
            <Button variant="danger" onClick={UpdateDName}>
              Update Display Name
            </Button>
          </Stack>
        </div>
        <div className={styles.editPassword}>
          <Stack direction="vertical" gap={2}>
            <label>New Password</label>
            <Form.Control
              className="me-auto"
              type={NewPassword ? "text" : "password"}
              onKeyUp={(event) => setNewPassword(event.target.value)}
            />
            <label>Confirm Password</label>
            <Form.Control
              className="me-auto"
              type={ConfirmPassword ? "text" : "password"}
              onKeyUp={(event) => setConfirmPassword(event.target.value)}
            />
            <p className={styles.samepass}>{Message}</p>
            <Button variant="danger" onClick={ChangePassword}>
              Change Password
            </Button>
          </Stack>
        </div>
        <div className={styles.EditProfilePic}>
          {/* <Stack direction="vertical" gap={3}>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="/profile.jpg"
                roundedCircle="true"
              />
            </Figure>
            <Button variant="danger">Change Picture</Button>
          </Stack> */}
          <div className="profile_img text-center p-4">
            <div className={styles.profile_position}>
              <img
                className={styles.profile}
                src={profileImageShow.length ? profileImageShow : img}
                alt=""
                onClick={() => setdialogs(true)}
              />

              <Dialog
                className={styles.dialog}
                visible={dialogs}
                header={() => (
                  <p htmlfor="" className="text-2x1 font-semibold">
                    Update Profile
                  </p>
                )}
                onHide={() => setdialogs(false)}
              >
                <div className={styles.confirmation_content}>
                  <div className="flex flex-column align items-center mt-5 w-12">
                    <div className="flex flex-colum justify-content-around w-12 mt-4">
                      <Avatar
                        width={400}
                        height={300}
                        onClose={onClose}
                        onCrop={onCrop}
                      />
                      <Button
                        onClick={saveImage}
                        // label="Save"
                        // icon="pi pi-check"
                      >
                        <FaCheck className={styles.check} />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditProfile;
