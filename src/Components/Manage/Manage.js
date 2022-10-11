import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import styles from "./Manage.module.css";
import { Avatar } from "@mui/material";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Splash from "../../Components/Splash/Splash";
import { updateProfile } from "firebase/auth";

const Manage = () => {
  return (
    <form className={styles.EditClubForm}>
      <div class="row" className={styles.EditBookClubInformation}>
        <div class="col-md">
          <div className={styles.EditBookClubName}>
            <label for="ClubName">Book Club Name</label>
            <input
              type="text"
              id="ClubName"
              // onKeyUp={(event) => setnewClubname(event.target.value)}
            ></input>
            <Button
              className={styles.btnclubname}
              variant="danger"
              // onClick={updateClubname}
            >
              Update Club Name
            </Button>
          </div>
          <div>
            <label for="ClubDesc" class="CreateClubsLabels">
              Book Club Description
            </label>
            <textarea
              type="text"
              id="ClubDesc"
              placeholder="Describe your Book Club briefly to attract members."
              // onChange={(event) => setbookClubDescription(event.target.value)}
            ></textarea>
            <Button className={styles.btndesc} variant="danger">
              Update Club Description
            </Button>
          </div>
        </div>
        <div class="col-md">
          <div className={styles.EditWelcomeMessage}>
            <label for="WelcomeMessage" class="CreateClubsLabels">
              Welcome Message
            </label>
            <textarea
              className={styles.EditedWelcomeMessage}
              type="text"
              placeholder="Enter a message that will be shown to the members when visiting the club."
              // onChange={(event) => setwelcomeMessage(event.target.value)}
            ></textarea>
            <Button className={styles.btnwelcome} variant="danger">
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
        <div class="col-md">
          <div className={styles.EditClubPicture}>
            <div className={styles.clubprofile}>
              <Avatar
                className={styles.clubpic}
                //   src={url}
                sx={{ width: 150, height: 150 }}
              />
              <input className={styles.intclubcpic1} type="file" />
              <Button className={styles.btnimg} variant="danger">
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
