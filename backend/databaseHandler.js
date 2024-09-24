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

  // Used in signup to add user
  async addUser(data) {
    this.db.run(`INSERT INTO users ("email", "username", "password") VALUES (?, ?, ?)`, data);
    return 200;
  }

  // Add single sleep item to DB
  async addSleepItem(data) {
    const { email, desp, start_date, end_date, variant, progress } = data;
    const result = await this.db.run(
      `INSERT INTO sleep_items (email, desp, start_date, end_date, variant, progress) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [email, desp, start_date, end_date, variant, progress]
    );

    const insertedItem = await this.db.get("SELECT * FROM sleep_items WHERE id = ?", result.lastID);
    return insertedItem;
  }

  // Get a single sleep item by ID
  async getSleeItemByID(id) {
    const sleepitem = await this.db.get("SELECT * FROM sleep_items WHERE id = ?", [id]);

    if (!sleepitem) throw Error("Sleep Item not found");
    return sleepitem;
  }

  // Get all sleep Items
  async getAllSleepItems() {
    return await this.db.all("SELECT * FROM sleep_items");
  }

  // Delete sleep item by id
  async deleteSleeItemByID(id) {
    const result = await this.db.run("DELETE FROM sleep_items WHERE id = ?", [id]);

    if (result.changes === 0) throw Error("Sleep item not found");

    return { message: "Sleep item successfully deleted" };
  }

  // Update sleep item by id
  async updateSleepItemById(id, data) {
    const { desp, start_date, end_date, variant, progress } = data;
    const result = await this.db.run(
      `UPDATE sleep_items 
       SET desp = ?, start_date = ?, end_date = ?, variant = ?, progress = ? 
       WHERE id = ?`,
      [desp, start_date, end_date, variant, progress, id]
    );
    if (result.changes === 0) throw Error("Sleep item not found");
    const updatedItem = await this.db.get("SELECT * FROM sleep_items WHERE id = ?", [id]);
    return updatedItem;
  }

  // Tests
  async getAllUser() {
    return await this.db.all("SELECT * FROM users");
  }
}
