import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import styles from "./Manage.module.css";
import { Avatar } from "@mui/material";

const Manage = () => {
  return (
    <form className={styles.EditClubForm}>
        <div class="row" className={styles.EditBookClubInformation}>
          <div class="col-md">
            <div className={styles.EditBookClubName}>
              <label for="ClubName">Book Club Name</label>
              <input type="text" id="ClubName"></input>
            </div>
            <div>
              <label for="ClubDesc" class="CreateClubsLabels">
                Book Club Description
              </label>
              <textarea
                type="text"
                id="ClubDesc"
                placeholder="Describe your Book Club briefly to attract members."
              ></textarea>
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
              ></textarea>
            </div>
            <div>
              <Button id="CreateClub" className={styles.EditClubbuttonlabel}>
                Save Changes
              </Button>
            </div>
          </div>
          <div class="col-md">
            <div className={styles.EditClubPicture}>
              <div className={styles.clubprofile}>
                <Avatar
                  className={styles.clubpic}
                  //   src={url}
                  sx={{ width: 150, height: 150 }}
                />
                <input className={styles.intclubcpic} id="pic" type="file" />
              </div>
            </div>
          </div>
        </div>
      </form>

  );
};

export default Manage;
