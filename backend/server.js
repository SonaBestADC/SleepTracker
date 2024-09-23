import "dotenv/config";
import express from "express";
import DatabaseHandler from "./databaseHandler.js";

const app = express();
const database = new DatabaseHandler();
app.use(express.json());

app.param("id", (req, res, next, value) => {
  req.id = value;
  next();
});

app.get("/", (req, res) => {
  res.send("uWu");
});

app.post("/addUser", async (req, res) => {
  res.send(
    await database.addUser([
      req.body.email,
      req.body.username,
      req.body.password,
    ])
  );
});

app.post("/addSleepTest", async (req, res) => {
  let data = [
    req.body.email,
    req.body.desp,
    req.body.start_date,
    req.body.end_date,
    req.body.variant,
    req.body.progress,
  ];
  res.send(await database.addItem(data));
});

app.get("/getAllUsers", async (req, res) => {
  console.log(await database.getAllUser());
  res.send("ok");
});

app.get("/getAllSleep", async (req, res) => {
    console.log(await database.getAllSleepData());
    res.send("ok");
  });

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
