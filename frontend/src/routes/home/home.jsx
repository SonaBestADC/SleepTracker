import React from "react";
import SleepItem from "../../components/sleepItem/sleepItem";
import SleepForm from "../../components/sleepForm/sleepForm";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <SleepForm />
      <div className={styles.sleepItemContainer}>
        <SleepItem
          date="9/18/24"
          desp="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae impedit voluptates voluptas quam accusamus vel cupiditate illum aliquam ea sed?"
          progress={60}
        />
        <SleepItem
          date="9/17/24"
          desp="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae impedit voluptates voluptas quam accusamus vel cupiditate illum aliquam ea sed?"
          progress={100}
          variant="success"
        />
        <SleepItem
          date="9/16/24"
          desp="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae impedit voluptates voluptas quam accusamus vel cupiditate illum aliquam ea sed?"
          progress={10}
          variant="danger"
        />
        <SleepItem
          date="9/15/24"
          desp="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae impedit voluptates voluptas quam accusamus vel cupiditate illum aliquam ea sed?"
          progress={30}
          variant="warning"
        />
        <SleepItem
          date="9/14/24"
          desp="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae impedit voluptates voluptas quam accusamus vel cupiditate illum aliquam ea sed?"
          progress={50}
          variant=""
        />
      </div>
    </div>
  );
};

export default Home;
