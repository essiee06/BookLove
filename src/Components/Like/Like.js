import { getDoc, doc, collection, deleteDoc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import * as icon from "react-icons/fa";
import styles from "./Like.module.css";

const Like  = (data) => {

  const postid=data["postid"];
  const useruid=data["useruid"];
  const clubslug=data["clubslug"];
  const [liked, setLiked] = useState(false);
  const [number, setNumber] = useState(0);
  const [numlikes, setNumLikes] = useState([]);

  const postRef = doc(db, "Book_Club_Information", clubslug, "Posts", postid, "Likes", useruid);
  const likesRef = collection(db, "Book_Club_Information", clubslug, "Posts", postid, "Likes");

    getDoc(postRef).then((postSnap) => {
      if (postSnap.exists()) {
        // var joinbtn = document.getElementById("joinclub");
        // joinbtn.style.display = "none";
        setLiked(true);
      }
    });

    getDocs(likesRef).then((snapshot) =>{
      let list = 0;
      snapshot.docs.forEach(doc =>{
        list = list +1;
      })
      setNumLikes(list);
    });

  const handleClick = () =>{
    if(liked){
      deleteDoc(
       doc(db, "Book_Club_Information", clubslug, "Posts", postid, "Likes", useruid)
      ).then(() =>{
        window.alert("Unliked");
      })
    }else{
      setNumber(number+1);
      console.log(number);
      setDoc(doc(db, "Book_Club_Information", clubslug, "Posts", postid, "Likes", useruid),{
        Likes: 1,
      })
      .then(()=>{
        window.alert("Liked");
      })
    }
  }
  // state = {
  //   likes: null,
  // };

  // handleClick = () => {
  //   this.setState({
  //     likes: this.state.likes + 1,
  //   });
  // };

  // render() {
  // }

  return (
    <div>
      <button className={styles.btnlike} onClick={handleClick}>
        <icon.FaHeart className={styles.icon} />
          {numlikes}
      </button>
    </div>
  );
}

export default Like;
