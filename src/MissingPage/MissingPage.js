import React ,{useState, useEffect} from "react";
import { Navigate, Link } from 'react-router-dom';
import styles from "./MissingPage.module.css";
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import { Button, Container, Row, Col} from "react-bootstrap";
import Splash from "../Components/Splash/Splash";

function MissingRoute() {
const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
return (
    <div>
       {loading ? (
        <Splash loading="loading" />
      ) : (
      <div> 
    <div className={styles["center-container"]}>
          <div className={styles["booklovelogo"]}></div>
          <div stack className= {styles.stackpos}>
            <Stack direction="vertical" gap={3} >
                <div><h2 className = {styles.pagetext1}>Sorry :(</h2> </div>
                <div><h2 className = {styles.pagetext}>Page Does Not Exist</h2> </div>
                <div className={styles.buttonpos}><Link to={`/`}>
                <Button
                  id="ViewClub"
                  className="CreateClubbuttonlabel"
                >
                Find My Way
                </Button></Link></div>
            </Stack>
          </div>
    </div>
    </div>
      )}
    </div>
);
}

export { MissingRoute }