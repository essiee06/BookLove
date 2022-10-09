import React, { useState, useEffect } from "react";
import { Container, Button, Figure, Form, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./CreateClubs.module.css";
import { auth, db } from "../../Components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import Splash from "../../Components/Splash/Splash";

import { FaCheck } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./profile.png";

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
  let navigate = useNavigate();

  //splash
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [bookClubName, setbookClubName] = useState("");
  const [bookClubDescription, setbookClubDescription] = useState("");
  const [welcomeMessage, setwelcomeMessage] = useState("");
  const [ownerName, setownerName] = useState("");
  const [ownerUid, setownerUid] = useState("");
  const [bookClubSlug, setbookClubSlug] = useState("");

  var clubnameslug = (name) => {
    setbookClubName(name);
    setbookClubSlug(name.replace(/\s+/g, "_").toLowerCase());

    auth.onAuthStateChanged((user) => {
      setownerName(user.displayName);
      setownerUid(user.uid);
    });
  };

  var add_club = () => {
   
    console.log("sending request");

    var requestData = {
      BookClub_Name: bookClubName,
      BookClub_Description: bookClubDescription,
      Welcome_Message: welcomeMessage,
      Owner_Name: ownerName,
      Owner_Uid: ownerUid,
      BookClub_Slug: bookClubSlug,
    };

    push_to_firebase_create(requestData);
  };

  var push_to_firebase_create = function (data) {

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
      Member_Uid: data["Owner_Uid"],
    });

  };

  const createClub = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Book_Club_Information", bookClubSlug);

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        window.alert("Book Club Name already exists.");
        navigate("/create");
      } else {
        add_club();
        window.alert("Club successfully created");
        navigate("/home");
      }
    });
  };

  //club picture
  const [images2, setImages] = useState([]);
  const [imageURLs2, setImageURLs] = useState([]);

  console.log("Images", images2);
  console.log("imageUrls", imageURLs2);
  const [imgCrop2, setimgCrop2] = useState(false);
  const [storeImage2, setstoreImage2] = useState([]);
  const [dialogs2, setdialogs2] = useState(false);

  const onCrop = (view) => {
    setimgCrop2(view);
  };
  const onClose = () => {
    setimgCrop2(null);
  };
  const saveImage = () => {
    setstoreImage2([...storeImage2, { imgCrop2 }]);
    setdialogs2(false);
  };

  const profileImageShow = storeImage2.map((item) => item.imgCrop2);

  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
    <div>
      <NavBar />
      <Sidebar />
      <Container>
        <div className={styles.CreateAClubwrapper}>
          <span>Create A Club</span>
        </div>
        <div className={styles.CreateAClubline}></div>
        <form className={styles.CreateClubForm}>
          <div class="row">
            <div class="col-md">
              <div class>
                <label for="ClubName" class="CreateClubsLabels">
                  Book Club Name
                </label>
                <input
                  type="text"
                  id="ClubName"
                  onKeyUp={(event) => clubnameslug(event.target.value)}
                ></input>
              </div>
              <div>
                <label for="ClubDesc" class="CreateClubsLabels">
                  Book Club Description
                </label>
                <textarea
                  type="text"
                  id="ClubDesc"
                  placeholder="Describe your Book Club briefly to attract members."
                  onChange={(event) =>
                    setbookClubDescription(event.target.value)
                  }
                ></textarea>
              </div>
            </div>
            <div class="col-md">
              <div>
                <label for="WelcomeMessage" class="CreateClubsLabels">
                  Welcome Message
                </label>
                <textarea
                  type="text"
                  placeholder="Enter a message that will be shown to the members when visiting the club."
                  id="WelcomeMessage"
                  onChange={(event) => setwelcomeMessage(event.target.value)}
                ></textarea>
              </div>
              <div>
                <Button
                  id="CreateClub"
                  className={styles.CreateClubbuttonlabel}
                  onClick={createClub}
                >
                  Create Club
                </Button>
              </div>
            </div>
            <div class="col-md">
              <div className={styles.AddClubPicture}>
                {/* <Stack direction="vertical" gap={1}>
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
          </Stack> */}
                <div className="profile_img text-center p-4">
                  <div className={styles.profile_position}>
                    <img
                      className={styles.profile}
                      src={profileImageShow.length ? profileImageShow : img}
                      alt=""
                      onClick={() => setdialogs2(true)}
                    />

                    <Dialog
                      className={styles.dialog}
                      visible={dialogs2}
                      header={() => (
                        <p htmlfor="" className="text-2x1 font-semibold">
                          Update Profile
                        </p>
                      )}
                      onHide={() => setdialogs2(false)}
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
                <div className={styles.editProfilewrapper}>
                  <span className={styles.editProfileTxt}>Club Photo</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
    )}
    </div>
  );
};

export default CreateClubs;
