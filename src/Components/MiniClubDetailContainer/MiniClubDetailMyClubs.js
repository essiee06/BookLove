import "./MiniClubDetailContainer.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Row, Col} from "react-bootstrap";
import { getDocs, collection, query, orderBy, startAfter, limit, doc } from "firebase/firestore";
import { auth, db } from "../../Components/firebase";
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Avatar from "@mui/material/Avatar";
import Avatarbg from './NoClubs.png';



const MiniClubDetailMyClubs = () =>{
  const colRef = collection(db, "Users_Information", auth.currentUser.uid, "My_Book_Clubs");
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
              src={Avatarbg}
              sx={{ width: 100, height: 100 }}
            /></Card.Subtitle>
            <Card.Title><h2 className="clubnameh2"> You Have Not Joined Any Clubs Yet </h2></Card.Title>
            <Card.Text className="clubdesc"> Create or Join A Club!  </Card.Text>
            <div>
                <Link to={`/create`}>
                <Button
                  id="ViewClub" 
                  className="CreateClubbtnlabel"
                >
                Create A Club
                </Button>
              </Link>
              <Link to={`/browse`}>
                <Button
                  id="ViewClub" 
                  className="JoinClubbtnlabel"
                >
                Join A Club
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
                <Link to={`/${bookClubs.BookClub_Slug}`}>
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