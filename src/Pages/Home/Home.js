import React ,{useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";
import Splash from "../../Components/Splash/Splash";


import { auth } from "../../Components/firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";



const Home = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  auth.onAuthStateChanged((user) =>{
    if(!auth.currentUser){
      navigate("/");
    }
  });

  return (
    <div>
       {loading ? (
        <Splash loading="loading" />
      ) : (
      <div> 
      <NavBar />
      <Sidebar />
      <Feed />
      </div>
      )}
    </div>
  );
};

export default Home;
