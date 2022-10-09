import "./MiniClubDetailContainer.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Stack } from "react-bootstrap";



const MiniClubDetailContainer = ({clubs}) =>{
    return (
      <div class="miniclubdetailDiv">
        <div class="containerposition">
              <Container className="miniclubdetailcontainer">
                <div class="clubprofilediv">
                  <img class="clubprofile" alt="" src="/profile.jpg" />
                </div>
                <div class="clubnamediv">
                  <h2 class="clubnameh2">{clubs.BookClub_Name}</h2>
                </div>
                <div class="aboutclubdiv">
                  <Container className="aboutclubcontainer">
                  <p class="aboutclubtxt">{clubs.BookClub_Description}</p>
                  </Container>
                </div>
                <div>
                <Link to={`/bookclub/${clubs.BookClub_Slug}`}>
                <Button
                  id="ViewClub" 
                  className="CreateClubbuttonlabel"
                >
                View Club
                </Button>
              </Link>
                </div>
              </Container>
        </div>
      </div>
    );
    
};

export default MiniClubDetailContainer;