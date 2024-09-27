import "dotenv/config";
import express from "express";
import DatabaseHandler from "./databaseHandler.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const app = express();
const database = new DatabaseHandler();
app.use(express.json());

const createToken = (email) => {
  return jwt.sign({ email: email }, process.env.SECRET, { expiresIn: "3d" });
};

app.get("/", (req, res) => {
  res.send("uWu");
});

// !User auth routes
// Login route
app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) throw Error("All fields must be filled");
    // Checks email
    const existingUser = await database.db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!existingUser) throw Error("Incorrect email");
    // Checks password
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) throw Error("Invalid password");

    // Creates JWT token
    const token = createToken(email);
    res.status(200).json({ email: email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // Validation
    if (!email || !username || !password) throw Error("All fields must be filled");
    if (!validator.isEmail(email)) throw Error("Email is not valid");
    if (!validator.isStrongPassword(password)) throw Error("Password is not strong enough");

    // Checks for existing user in DB
    const existingUser = await database.db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) throw Error("Email already in use");

    // Hashes the password of the user
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // tries to add user to DB
    await database.addUser([email, username, hash]);
    // creates JWT token
    const token = createToken(email);
    res.status(200).json({ email: email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// !Sleep Item Routes
// GET all sleep items
app.get("/sleepItems", async (req, res) => {
  let data = await database.getAllSleepItems();
  res.status(200).json(data);
});

// POST new sleep item
app.post("/sleepItem", async (req, res) => {
  const { email, desp, hours_slept, date, variant, progress } = req.body;
  console.log(req.body)
  try {
    const insertedSleepItem = await database.addSleepItem({
      email,
      desp,
      hours_slept,
      date,
      variant,
      progress,
    });
    res.status(200).json(insertedSleepItem);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

// GET a single sleep item
app.get("/sleepItem/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await database.deleteSleepItemByID(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a single sleep item by ID
app.delete("/sleepItem/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await database.deleteSleepItemByID(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH a single sleep item by ID
app.patch("/sleepItem/:id", async (req, res) => {
  const { id } = req.params;
  const { desp, start_date, end_date, variant, progress } = req.body;

  try {
    const updatedItems = await database.updateSleepItemById(id, {
      desp,
      start_date,
      end_date,
      variant,
      progress,
    });
    res.status(200).json(updatedItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// !Friends routes

// Get all friends
app.get("/friends", async (req, res) => {
  try {
    const friends = await database.getAllFriends();
    res.status(200).json(friends);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get friends by user email
app.get("/friends/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const friends = await database.getFriendByUser(user);
    res.status(200).json(friends);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST a new friend
app.post("/friends", async (req, res) => {
  const { user, friend } = req.body;
  try {
    if (!user || !friend) throw Error("Both user and friend are required");
    const result = await database.addFriend(user, friend);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Test routes
app.get("/getAllUsers", async (req, res) => {
  const users = await database.getAllUser()
  res.status(200).json(users);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
