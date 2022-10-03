import React from "react";
import { Container, Button, Figure, Form, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import styles from "./CreateClubs.module.css";

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}


const CreateClubs = () => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <Container>

      <div className={styles.CreateAClubwrapper}>
          <span>Create A Club</span>
      </div>
      <div className={styles.CreateAClubline}>
      </div>
      <form className={styles.CreateClubForm}>
      <div class="row">
        <div class="col-md">
          <div class>
            <label for="ClubName" class="CreateClubsLabels">Book Club Name</label>
              <input type = "text" id="ClubName">
              </input>
          </div>
          <div>
            <label for="ClubDesc" class="CreateClubsLabels">Book Club Description</label>
              <textarea type = "text" id="ClubDesc" placeholder="Describe your Book Club briefly to attract members.">
              </textarea>
          </div>
        </div>
        <div class="col-md">
          <div>
          <label for="WelcomeMessage" class="CreateClubsLabels">Welcome Message</label>
              <textarea type = "text" placeholder="Enter a message that will be shown to the members when visiting the club." id="WelcomeMessage">
              </textarea>
          </div>
          <div>
          <Button id="CreateClub" className={styles.CreateClubbuttonlabel}>Create Club</Button>
          </div>
        </div>
        <div class="col-md">
        <div className={styles.AddClubPicture}>
          <Stack direction="vertical" gap={1}>
            <Figure>
              <Figure.Image
                width={280}
                height={280}
                alt="171x180"
                src="/profile.jpg"
                roundedCircle="true"
              />
            </Figure>
            <Button id="AddClubPicture" className={styles.addpicbuttonlabel}>Add Club Picture</Button>
          </Stack>
        </div> 
        </div>    
      </div>
      </form>
      </Container>
      </div>
  );
};

export default CreateClubs;
