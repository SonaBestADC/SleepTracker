import React from 'react'
import SleepItem from '../../components/sleepItem/sleepItem'
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
        <SleepItem />
        <SleepItem />
        <SleepItem />
        <SleepItem />
    </div>
  )
}

export default Home