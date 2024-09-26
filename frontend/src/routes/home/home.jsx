import { useEffect } from "react";
import SleepItem from "../../components/sleepItem/sleepItem";
import SleepForm from "../../components/sleepForm/sleepForm";
import { useSleepItemContext } from "../../hooks/useSleepItemContext"; 
import styles from "./home.module.css";

const Home = () => {
  const { sleepItems, dispatch } = useSleepItemContext();

  useEffect(() => {
    const fetchSleepItems = async () => {
      const responce = await fetch("/sleepItems");
      const json = await responce.json();
      console.log(json)

      if (responce.ok) {
        dispatch({type: "SET_SLEEP_ITEM", payload: json});
      }
    };

    fetchSleepItems();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <SleepForm />
      <div className={styles.sleepItemContainer}>
        {sleepItems && sleepItems.map(sleepItem => (
          <SleepItem key={sleepItem.id} id={sleepItem.id} desp={sleepItem.desp} variant={sleepItem.variant} progress={sleepItem.progress} date={new Date(sleepItem.date)}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
