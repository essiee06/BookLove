import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import styles from "./Manage.module.css";
import { Avatar } from "@mui/material";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Splash from "../../Components/Splash/Splash";
import { updateProfile } from "firebase/auth";

const Manage = (slug) => {
  let navigate = useNavigate();
    const slugdata = slug["data"];
    const clubdata = doc(db, "Book_Club_Information", slugdata);

    //DEFAULT CLUB INFO
    const [ClubName, setClubName] = useState("");
    const [ClubDescription, setClubDescription] = useState("");
    const [ClubWM, setClubWM] = useState("");
    const [ClubPhoto, setClubPhoto] = useState("");
    const [ClubSlug, setClubSlug] = useState("");

    //NEW CLUB INFO
    const [newClubName, setnewClubName] = useState("");
    const [newClubDescription, setnewClubDescription] = useState("");
    const [newClubWM, setnewClubWM] = useState("");
    const [newClubPhoto, setnewClubPhoto] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    getDoc(clubdata)
    .then((doc) => {
      if (doc.exists) {
        setClubName(doc.data().BookClub_Name);
        setClubDescription(doc.data().BookClub_Description);
        setClubWM(doc.data().Welcome_Message);
        setClubPhoto(doc.data().BookClub_Picture);
        setClubSlug(doc.data().BookClub_Slug);
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

    var updateClubDescription = function() {
      getDoc(clubdata)
      .then((doc) => {
        if (doc.exists) {
          updateDoc(clubdata,{
            BookClub_Description: newClubDescription,
          })}
      }).then(() =>{
        window.alert("Club Description is updated.");
        navigate("/browse");
      })
    } 

    var updateClubWM = function() {
      getDoc(clubdata)
      .then((doc) => {
        if (doc.exists) {
          updateDoc(clubdata,{
            Welcome_Message: newClubWM,
          })}
      }).then(() =>{
        window.alert("Club Welcome Message is updated.");
        navigate("/browse");
      })
    } 

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleSubmit = () => {
      const imageRef = ref(storage, slugdata);

      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
              getDoc(clubdata)
                .then((doc) => {
                  if (doc.exists) {
                    //UPDATE PROFILE PICTURE
                    updateDoc(clubdata, {
                      BookClub_Picture: url,
                    });
                  }
                })
                .catch((error) => {
                  console.log("Error getting document:", error);
                });
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
      <form className={styles.EditClubForm}>
        <div class="row" className={styles.EditBookClubInformation}>
          <div class="col-md">
            <div className={styles.EditBookClubName}>
              <label for="ClubName">Book Club Name</label>
              <input
                type="text"
                id="ClubName"
                placeholder = {ClubName}
                onKeyUp={(event) => setnewClubName(event.target.value)}
                disabled
              ></input>
            </div>
            <div className={styles.clubdescpos}>
              <label for="ClubDesc" >
                Book Club Description
              </label>
              <textarea
                type="text"
                id="ClubDesc"
                placeholder = {ClubDescription}
                onChange={(event) => setnewClubDescription(event.target.value)}
              ></textarea>
              <Button className={styles.btndesc} variant="danger" onClick={updateClubDescription}>
                Update Club Description
              </Button>
            </div>
          </div>
          <div class="col-md" className={styles.welcomepos}>
            <div className={styles.EditWelcomeMessage}>
              <label for="WelcomeMessage" class="CreateClubsLabels">
                Welcome Message
              </label>
              <textarea
                className={styles.EditedWelcomeMessage}
                type="text"
                placeholder = {ClubWM}
                onChange={(event) => setnewClubWM(event.target.value)}
              ></textarea>
              <Button className={styles.btnwelcome} variant="danger" onClick={updateClubWM}>
                Update Club Welcome Message
              </Button>
            </div>
            {/* <div>
              <Button
                id="CreateClub"
                className={styles.EditClubbuttonlabel}
                onClick={Manage}
              >
                Save Changes
              </Button>
            </div> */}
          </div>
          <div class="col-md" className={styles.avatarpos}>
            <div className={styles.EditClubPicture}>
              <div className={styles.clubprofile}>
                <Avatar
                  className={styles.clubpic}
                    src={ClubPhoto}
                  sx={{ width: 150, height: 150 }}
                />
                <input className={styles.intclubcpic1} type="file" onChange={handleImageChange}/>
                <Button className={styles.btnimg} variant="danger" onClick = {handleSubmit}>
                  Update Club Photo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
};

export default Manage;
