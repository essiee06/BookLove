import "./MiniClubDetailContainer.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Row, Col} from "react-bootstrap";
import { getDocs, collection, query, orderBy, startAfter, limit, doc } from "firebase/firestore";
import { auth, db } from "../../Components/firebase";
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Avatar from "@mui/material/Avatar";



const MiniClubDetailMyClubs = () =>{
  const colRef = collection(db, "Book_Club_Information");
  const docsSnap = getDocs(colRef);
  const [bookClubName, setbookClubName] = useState(null);
  const [bookClubDesc, setbookClubDesc] = useState(null);
  const [bookClubs, setbookClubs] = useState([]);
  //retrieving pic
  const [url, setUrl] = useState(null);

  useEffect(() => {
    getDocs(colRef).then((snapshot) =>{
      let list = [];
      snapshot.docs.forEach(doc =>{
        list.push({ id: doc.id, ...doc.data() });
      })
      setbookClubs(list);
    });
    
  }, []);


 

  console.log(bookClubs);
  if (bookClubs.length == '0'){
    return(
      <div class="miniclubdetailDiv">
      <Stack direction="vertical" gap={5}>
      <Card className="cardcontainer">
            <Card.Body>
            <Card.Subtitle><Avatar
              src="https://firebasestorage.googleapis.com/v0/b/rychbooklove.appspot.com/o/NoClubs.png?alt=media&token=003b3c5b-9dd1-46a4-b445-4a90ba110e51"
              sx={{ width: 100, height: 100 }}
            /></Card.Subtitle>
            <Card.Title><h2 className="clubnameh2"> You Have Not Joined Any Clubs Yet </h2></Card.Title>
            <Card.Text className="clubdesc"> Create or Join A Club!  </Card.Text>
            <div>
                <Link to={`/create`}>
                <Button
                  id="ViewClub" 
                  className="CreateClubbuttonlabel"
                >
                Create A Club
                </Button>
              </Link>
                </div>
            </Card.Body>
            </Card>
            </Stack>
              </div>
    )
  }
  else {
    return (
      
      <div class="miniclubdetailDiv">
        <Stack direction="vertical" gap={5}>
        
        {bookClubs.map((bookClubs) => {
          return (
            <Col>
            <Card className="cardcontainer">
            <Card.Body>
            <Card.Subtitle ><Avatar
              src={bookClubs.BookClub_Picture}
              sx={{ width: 100, height: 100 }}
            /></Card.Subtitle>
            <Card.Title><h2 className="clubnameh2">{bookClubs.BookClub_Name}</h2></Card.Title>
           
            <Card.Text className="clubdesc"> 
            {bookClubs.BookClub_Description}
             </Card.Text>
            <div>
                <Link to={`/bookclub/${bookClubs.BookClub_Slug}`}>
                <Button
                  id="ViewClub"
                  className="CreateClubbuttonlabel"
                >
                View Club
                </Button>
              </Link>
                </div>
            </Card.Body>
            </Card>
            </Col>
               );
              })}
              
              </Stack>
              </div>
      
    );
            }
};

export default MiniClubDetailMyClubs;