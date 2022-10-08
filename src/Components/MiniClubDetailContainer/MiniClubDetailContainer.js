import "./MiniClubDetailContainer.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack } from "react-bootstrap";



const MiniClubDetailContainer = () =>{
    return (
      <div class="miniclubdetailDiv">
        <div class="containerposition">
              <Container className="miniclubdetailcontainer">
                <div class="clubprofilediv">
                  <img class="clubprofile" alt="" src="/profile.jpg" />
                </div>
                <div class="clubnamediv">
                  <h2 class="clubnameh2">Book Club Name</h2>
                </div>
                <div class="aboutclubdiv">
                  <Container className="aboutclubcontainer">
                  <p class="aboutclubtxt">This club is about you and me.</p>
                  </Container>
                </div>
                <div>
                <Button id="ViewClub" className="CreateClubbuttonlabel">View Club</Button>
                </div>
              </Container>
        </div>
      </div>
        
    );
};

export default MiniClubDetailContainer;