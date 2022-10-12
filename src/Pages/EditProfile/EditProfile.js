import React from "react";
import { Button, Container, Figure, Form, Stack } from "react-bootstrap";
import NavBar2 from "../../Components/NavBar/NavBar2";
import { FaArrowLeft, FaCheck, FaWindowRestore } from "react-icons/fa";
import styles from "./EditProfile.module.css";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../Components/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signOut, updatePassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import { Dialog } from "primereact/dialog";
import Avatar from "@mui/material/Avatar";
// import Avatar from "react-avatar-edit";
import img from "./profile.png";
import Splash from "../../Components/Splash/Splash";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NavBar from "../../Components/NavBar/NavBar";
import "@material-design-icons/font";

const EditProfile = () => {
  let navigate = useNavigate();

  //for password

  //splash
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [DisplayName, setDisplayName] = useState("");
  const [NewDisplayName, setNewDisplayName] = useState("");
  const [NewPassword, setNewPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [Message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  auth.onAuthStateChanged((user) => {
    //navigates the user back to the login page if not logged in
    if (auth.currentUser == null) {
      navigate("/");
    }

    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //DISPLAY NAME
            setDisplayName(doc.data().Display_Name);
            setUrl(doc.data().Profile_Picture);
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
          window.alert("Successfully changed your password. Please log in again with your new password.")
          signOut(auth);
        });
      } else {
        window.alert("Password must have 6-12 characters");
      }
    }
    else{
      window.alert("Recheck your New Password and Confirm Password Input. They must have 6-12 characters and must be the same.");
      navigate("/profile");
    }
  };

  //image upload
  // const [images, setImages] = useState([]);
  // const [imageURLs, setImageURLs] = useState([]);

  // console.log("Images", images);
  // console.log("imageUrls", imageURLs);
  // const [imgCrop, setimgCrop] = useState(false);
  // const [storeImage, setstoreImage] = useState([]);
  // const [dialogs, setdialogs] = useState(false);

  // const onCrop = (view) => {
  //   setimgCrop(view);
  // };
  // const onClose = () => {
  //   setimgCrop(null);
  // };
  // const saveImage = () => {
  //   setstoreImage([...storeImage, { imgCrop }]);
  //   setdialogs(false);
  // };

  // const profileImageShow = storeImage.map((item) => item.imgCrop);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    var user = auth.currentUser;
    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);
    const imageRef = ref(storage, auth.currentUser.uid);

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            if (user) {
              getDoc(docRef)
                .then((doc) => {
                  if (doc.exists) {
                    //UPDATE PROFILE PICTURE
                    updateDoc(docRef, {
                      Profile_Picture: url,
                    });
                  }
                })
                .then((response) => {
                  updateProfile(user, {
                    photoURL: url,
                  });
                  navigate("/profile");
                })
                .catch((error) => {
                  console.log("Error getting document:", error);
                });
            }
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
        <div>
          {" "}
          <NavBar />
          <Sidebar />
          <Container>
            <div className={styles.CreateAClubwrapper}>
              <span>Edit Profile</span>
            </div>
            <div className={styles.CreateAClubline}></div>
            <div>
              <Link to= {`/profile`}>
              <Button variant="transparent">
                <FaArrowLeft className={styles.backArow} />
              </Button>
              </Link>
            </div>
            {/* <div className={styles.editProfilewrapper}>
          <span className={styles.editProfileTxt}>Profile Picture</span>
        </div> */}

            <div className={styles.editDisplayName}>
              <Stack direction="horizontal" gap={3}>
                <label for="editdisplayname" className={styles.editprofileh2}>
                  Display Name
                </label>
                <Form.Control
                  className={styles.normalcontainer}
                  placeholder={DisplayName}
                  onKeyUp={(event) => setNewDisplayName(event.target.value)}
                  maxLength="10"
                  id="editdisplayname"
                />
                <Button
                  className={styles.editprofilebutton}
                  onClick={UpdateDName}
                >
                  Update Display Name
                </Button>
              </Stack>
            </div>

            <div className={styles.editPassword}>
              <Stack direction="horizontal" gap={3}>
                <Stack direction="vertical" className={styles.stackpassgap}>
                  <Stack direction="horizontal" gap={1}>
                    <label for="newpassword" className={styles.editprofileh2x}>
                      New Password
                    </label>{" "}
                    <Form.Control
                      className={styles.normalcontainer2}
                      type={passwordShown ? "text" : "password"}
                      onKeyUp={(event) => setNewPassword(event.target.value)}
                      id="newpassword"
                      maxLength="12"
                    />
                    <i
                      onClick={togglePasswordVisiblity}
                      className={styles.togglePassword1}
                    >
                      <span class="material-symbols-outlined">
                        {passwordShown ? "visibility" : "visibility_off"}
                      </span>
                    </i>{" "}
                  </Stack>
                  <Stack direction="horizontal" gap={-1}>
                    <label for="confirmpass" className={styles.editprofileh2x}>
                      Confirm Password
                    </label>{" "}
                    <Form.Control
                      className={styles.normalcontainer2}
                      type={passwordShown ? "text" : "password"}
                      id="confirmpass"
                      onKeyUp={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      maxLength="12"
                    />
                    <i
                      onClick={togglePasswordVisiblity}
                      className={styles.togglePassword2}
                    >
                      <span class="material-symbols-outlined">
                        {passwordShown ? "visibility" : "visibility_off"}
                      </span>
                    </i>{" "}
                    <p className={styles.samepass}>{Message}</p>
                  </Stack>
                </Stack>
                <Button
                  className={styles.editprofilebutton}
                  onClick={ChangePassword}
                >
                  Change Password
                </Button>
                {}
              </Stack>
            </div>
            <div className={styles.EditProfilePic}>
              <div className={styles.profilepicture} id="profilepicture">
                <Avatar
                  className={styles.avatarpic}
                  src={url}
                  sx={{ width: 200, height: 200 }}
                />
                <input
                  className={styles.inputpic}
                  id="pic"
                  type="file"
                  onChange={handleImageChange}
                />
                <Button
                  className={styles.editprofilebutton2}
                  id="btnup"
                  onClick={handleSubmit}
                >
                  Update Profile Picture
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
