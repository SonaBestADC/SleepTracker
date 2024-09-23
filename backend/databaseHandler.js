import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import fs from "node:fs";

export default class DatabaseHandler {
  dataSql = fs.readFileSync("SleepTrackerDBFe.sql").toString();
  /**@type {Database} */
  db;

  // I declare an object without ever declaring an object. So what?
  constructor() {
    if (fs.existsSync("./database.db")) {
      open({ filename: "database.db", driver: sqlite3.Database })
        .then((data) => (this.db = data))
        .catch((error) => console.error(error));
      return;
    }

    new sqlite3.Database("database.db", (err) => {
      if (err) console.error(err);
    });

    open({ filename: "database.db", driver: sqlite3.Database })
      .then((data) => {
        this.db = data;
        this.db.exec(this.dataSql);
      })
      .catch((error) => console.error(error));
  }

  async addUser(data) {
    this.db.run(
        `INSERT INTO users ("email", "username", "password") VALUES (?, ?, ?)`,
        data
      );
    return 200
  }

  async addItem(data) {
    console.log(data)
    this.db.run(
      `INSERT INTO sleep_items ("email", "desp", "start_date", "end_date", "variant", "progress") VALUES (?, ?, ?, ?, ?, ?)`,
      data
    );
    return 200
  }


  async getAllUser(){
    return await this.db.all("SELECT * FROM users");
  }

  async getAllSleepData(){
    return await this.db.all("SELECT * FROM sleep_items");
  }
}
