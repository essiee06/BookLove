import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import styles from "./Discuss.module.css";
import ClubFeed from "../ClubFeed/ClubFeed";
import { Container } from "react-bootstrap";

const Discuss = (Slug) => {
  // const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const dataslug = Slug["data"];
  
  let navigate = useNavigate();

  return (
    <div>
      <ClubFeed data={dataslug}/>
    </div>
  );
};

export default Discuss;
