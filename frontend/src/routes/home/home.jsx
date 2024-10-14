import { useEffect } from "react";
import SleepItem from "../../components/sleepItem/sleepItem";
import SleepForm from "../../components/sleepForm/sleepForm";
import { useSleepItemContext } from "../../hooks/useSleepItemContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Container, TabContainer } from "react-bootstrap";
import styles from "./home.module.css";

const Home = () => {
  const { sleepItems, dispatch } = useSleepItemContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSleepItems = async () => {
      const responce = await fetch(`/sleepItems/${user.email}`);
      const json = await responce.json();

      if (responce.ok) {
        dispatch({ type: "SET_SLEEP_ITEM", payload: json });
      }
    };

    fetchSleepItems();
  }, [user]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sleepItemContainer}>
        {sleepItems &&
          sleepItems.map((sleepItem) => (
            <SleepItem
              key={sleepItem.id}
              id={sleepItem.id}
              desp={sleepItem.desp}
              variant={sleepItem.variant}
              progress={sleepItem.progress}
              date={new Date(sleepItem.date)}
            />
          ))}
        <SleepForm />
      </div>
    </div>
  );
};

export default Home;
