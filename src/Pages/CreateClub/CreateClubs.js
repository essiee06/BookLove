import React, { useState } from "react";
import { Container, Button, Figure, Form, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./CreateClubs.module.css";
import { auth, db } from "../../Components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}

const CreateClubs = () => {
  var userUid = auth.currentUser.uid;
  var user = auth.currentUser;

  let navigate = useNavigate();

  const [bookClubName, setbookClubName] = useState("");
  const [bookClubDescription, setbookClubDescription] = useState("");
  const [welcomeMessage, setwelcomeMessage] = useState("");
  const [ownerName, setownerName] = useState("");
  const [ownerUid, setownerUid] = useState("");
  const [bookClubSlug, setbookClubSlug] = useState("");

  var clubnameslug = (name) => {
    setbookClubName(name);
    setbookClubSlug(name.replace(/\s+/g, '_').toLowerCase())
    setownerName(user.displayName);
    setownerUid(userUid);
  }

  var add_club = () => {
    console.log("sending request");

    var requestData = {
      BookClub_Name: bookClubName,
      BookClub_Description: bookClubDescription,
      Welcome_Message: welcomeMessage,
      Owner_Name: ownerName,
      Owner_Uid: ownerUid,
      BookClub_Slug: bookClubSlug
    };
    console.log(bookClubSlug);
    push_to_firebase_create(requestData);
  };

  var push_to_firebase_create = function (data) {
    // console.log(bookClubSlug);
    setDoc(doc(db, "Book_Club_Information", bookClubSlug), {
      BookClub_Name: data["BookClub_Name"],
      BookClub_Description: data["BookClub_Description"],
      Welcome_Message: data["Welcome_Message"],
      Owner_Name: data["Owner_Name"],
      Owner_Uid: data["Owner_Uid"],
      BookClub_Slug: data["BookClub_Slug"],
    });
    
    setDoc(doc(db, "Book_Club_Information", bookClubSlug, "Members", ownerUid), {
      Member_Name: data["Owner_Name"],
      Member_Uid: data["Owner_Uid"]
    });

    setDoc(doc(db, "Users_Information", userUid, "Book Clubs", bookClubSlug), {
      BookClub_Name: data["BookClub_Name"],
      BookClub_Slug: data["BookClub_Slug"]
    })
    
    console.log("push to firebase2");
  };

  const createClub = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Book_Club_Information", bookClubSlug);
    
    getDoc(docRef).then(docSnap => {

      if (docSnap.exists()) {
        window.alert("Book Club Name already exists.");
        navigate("/create");
      }
      else{
        add_club();
        window.alert("Club successfully created");
        navigate("/home");
      }
    });
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
              <input type = "text" id="ClubName" onKeyUp={(event) => clubnameslug(event.target.value)}>
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
