import React from "react";
import styles from "./Splash.module.css"; 
import Image from "react-bootstrap/Image";
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

const Splash = (loading) => {
  return (
    
      <div className={styles["center-container"]}>
            <div className={styles["booklovelogo"]}></div>
            <Stack direction="horizontal" gap={3} >
              <Spinner animation="grow" variant="light"  role="status" size="large" className={styles["center-loader"]}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <Spinner animation="grow" variant="light"  role="status" size="large" className={styles["center-loader"]}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <Spinner animation="grow" variant="light"  role="status" size="large" className={styles["center-loader"]}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Stack>
      </div>
  );
};

export default Splash;