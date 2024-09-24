import { useEffect, useState } from "react";
import SleepItem from "../../components/sleepItem/sleepItem";
import SleepForm from "../../components/sleepForm/sleepForm";
import styles from "./home.module.css";

const Home = () => {
  const [sleepItems, setSleepItems] = useState(null);

  useEffect(() => {
    const fetchSleepItems = async () => {
      const responce = await fetch("/sleepItems");
      const json = await responce.json();

      if (responce.ok) {
        setSleepItems(json);
      }
    };

    fetchSleepItems();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <SleepForm />
      <div className={styles.sleepItemContainer}>
        {sleepItems && sleepItems.map(sleepItem => (
          <SleepItem desp={sleepItem.desp} variant={sleepItem.variant} progress={sleepItem.progress}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
