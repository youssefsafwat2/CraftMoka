import React, { useState } from "react";
import styles from "./homeStyles.module.css";
const Home = () => {
  return (
    <>
      <div className={styles.home}></div>
      <button className={styles.button}>Explore now</button>
    </>
  );
};

export default Home;
