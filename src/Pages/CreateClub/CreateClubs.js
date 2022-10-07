import React, { useState } from "react";
import { Container, Button, Figure, Form, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import styles from "./CreateClubs.module.css";
import { auth, db } from "../../Components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();

  const [bookClubName, setbookClubName] = useState("");
  const [bookClubDescription, setbookClubDescription] = useState("");
  const [welcomeMessage, setwelcomeMessage] = useState("");
  const [ownerName, setownerName] = useState("");
  const [ownerUid, setownerUid] = useState("");
  const [bookClubSlug, setbookClubSlug] = useState("");

  var add_club = () => {
    console.log("sending request");
    var userUid = auth.currentUser.uid;
    var user = auth.currentUser

    auth.onAuthStateChanged((user) =>{
      setownerName(user.displayName);
      setownerUid(userUid);
    });
    
    setbookClubSlug(bookClubName.replace(/\s/g, '_').toLowerCase())

    var requestData = {
      BookClub_Name: bookClubName,
      BookClub_Description: bookClubDescription,
      Welcome_Message: welcomeMessage,
      Owner_Name: ownerName,
      Owner_Uid: ownerUid,
      BookClub_Slug: bookClubSlug
    };
    push_to_firebase_create(requestData);
  };

  var push_to_firebase_create = function (data) {
    var userUid = auth.currentUser.uid;
    console.log(userUid);
    setDoc(doc(db, "Book_Club_Information",bookClubSlug), {
      BookClub_Name: data["BookClub_Name"],
      BookClub_Description: data["BookClub_Description"],
      Welcome_Message: data["Welcome_Message"],
      Owner_Name: data["Owner_Name"],
      Owner_Uid: data["Owner_Uid"],
      BookClub_Slug: data["BookClub_Slug"],
    });
  };

  const createClub = async (e) => {
    e.preventDefault();
    add_club();
    window.alert("Club successfully created");
    navigate("/home");
  }

  

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
              <input type = "text" id="ClubName" onChange={(event) => setbookClubName(event.target.value)}>
              </input>
          </div>
          <div>
            <label for="ClubDesc" class="CreateClubsLabels">Book Club Description</label>
              <textarea 
              type = "text" 
              id="ClubDesc" 
              placeholder="Describe your Book Club briefly to attract members."
              onChange={(event) => setbookClubDescription(event.target.value)}>
              </textarea>
          </div>
        </div>
        <div class="col-md">
          <div>
          <label for="WelcomeMessage" class="CreateClubsLabels">Welcome Message</label>
              <textarea 
              type = "text" 
              placeholder="Enter a message that will be shown to the members when visiting the club." 
              id="WelcomeMessage"
              onChange={(event) => setwelcomeMessage(event.target.value)}>
              </textarea>
          </div>
          <div>
          <Button id="CreateClub" className={styles.CreateClubbuttonlabel} onClick={createClub}>Create Club</Button>
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
