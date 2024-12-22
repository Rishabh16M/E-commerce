const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 3020;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb://127.0.0.1:27017/Form");
const db = mongoose.connection;

db.once("open", () => {
  console.log("mongodb connection successfully..");
});

const Userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: String
});

const User = mongoose.model("User", Userschema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/submit-credentials", async (req, res) => {
  const { username, email, password, firstName, lastName, phone, address } = req.body;
  const user = new User({
    username,
    email,
    password,
    firstName,
    lastName,
    phone,
    address
  });
  try {
    await user.save();
    res.send("User credentials saved successfully!");
  } catch (error) {
    res.status(500).send("Failed to save user credentials.");
  }
});

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});

