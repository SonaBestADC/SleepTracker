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
    const { email, desp, hours_slept, date, variant, progress } = data;
    const result = await this.db.run(
      `INSERT INTO sleep_items (email, desp, hours_slept, date, variant, progress) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [email, desp, hours_slept, date, variant, progress]
    );

    const insertedItem = await this.db.get("SELECT * FROM sleep_items WHERE id = ?", result.lastID);
    return insertedItem;
  }

  // Get a single sleep item by ID
  async getSleepItemByID(id) {
    const sleepitem = await this.db.get("SELECT * FROM sleep_items WHERE id = ?", [id]);

    if (!sleepitem) throw Error("Sleep Item not found");
    return sleepitem;
  }

  // Get all sleep Items
  async getAllSleepItems() {
    return await this.db.all("SELECT * FROM sleep_items");
  }

  // Get all sleep items by email
  async getAllSleepItemsByEmail(email) {
    const sleepItems = await this.db.all("SELECT * FROM sleep_items WHERE email LIKE ?", [email]);
    if (!sleepItems) throw new Error("Sleep items not found");
    return sleepItems
  }

  // Delete sleep item by id
  async deleteSleepItemByID(id) {
    const itemToDelete = await this.db.get("SELECT * FROM sleep_items WHERE id = ?", [id]);
    if (!itemToDelete) throw new Error("Sleep item not found");
    const result = await this.db.run("DELETE FROM sleep_items WHERE id = ?", [id]);
    if (result.changes === 0) throw new Error("Sleep item not deleted");
    
    return itemToDelete;
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

  //Get all friends
  async getAllFriends() {
    return await this.db.all("SELECT * FROM friends");
  }

  // Get friends by user
  async getFriendByUser(user) {
    const friends = await this.db.all("SELECT friend FROM friends WHERE user = ?", [user]);
    if (!friends.length) throw Error("This user has no friends");
    return friends;
  }

  // add a friend to db
  async addFriend(user, friend) {
    await this.db.run("INSERT INTO friends (user, friend) VALUES (?, ?)", [user, friend]);
    await this.db.run("INSERT INTO friends (user, friend) VALUES (?, ?)", [friend, user]);
    const friends = await this.db.get("SELECT friend FROM friends WHERE user = ? AND friend = ?", [user, friend]);
    // might change return to return json
    return friends;
  }

  // Tests
  async getAllUser() {
    return await this.db.all("SELECT * FROM users");
  }

  // get user by email
  async getUser(email){
    const result = this.db.get("SELECT * FROM users WHERE email = ?", [email]);
    return result;
  }
  
}
