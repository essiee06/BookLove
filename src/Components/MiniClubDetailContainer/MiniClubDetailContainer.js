import "./MiniClubDetailContainer.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { getDocs, collection, query, orderBy, startAfter, limit, doc } from "firebase/firestore";
import { auth, db } from "../../Components/firebase";
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';



const MiniClubDetailContainer = () =>{
  const colRef = collection(db, "Book_Club_Information");
  const docsSnap = getDocs(colRef);
  const [bookClubName, setbookClubName] = useState(null);
  const [bookClubDesc, setbookClubDesc] = useState(null);
  const [bookClubs, setbookClubs] = useState([]);

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
    return (
      <div class="miniclubdetailDiv">
        <Stack direction="vertical" gap={5}>
        {bookClubs.map((bookClubs) => {
          return (
            <Card className="cardcontainer">
            <Card.Body>
            <Card.Title><h2 className="clubnameh2">{bookClubs.BookClub_Name}</h2></Card.Title>
            <Card.Subtitle ></Card.Subtitle>
            <Card.Text className="clubdesc"> {bookClubs.BookClub_Description} </Card.Text>
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
               );
              })}
              </Stack>
              </div>
      
    );
    
};

export default MiniClubDetailContainer;