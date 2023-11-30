const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const upload = require("./multerConfig");
const path = require("path");
const fs = require("fs");

// app configurations
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "userProfiles")));

// database connection
let database;
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect((err, connection) => {
  if (err) return console.log("Error in Db connection:", err);
  database = connection.db("school");
  console.log("Database connected");
});

app.get("/student-by-id", (req, res) => {
  const studentCollection = database.collection("student");
  studentCollection.findOne({ _id: ObjectId(req.query.id) }, (err, docs) => {
    res.send(!err ? { status: "ok", data: docs } : { status: "failed", data: err });
  });
});

app.get("/list-students", (req, res) => {
  const studentCollection = database.collection("student");
  studentCollection.find().toArray((err, docs) => {
    res.send(!err ? { status: "ok", data: docs } : { status: "failed", data: err });
  });
});

app.get("/delete-student", (req, res) => {
  const studentCollection = database.collection("student");
  studentCollection.deleteOne({ _id: ObjectId(req.query.id) }, (err, result) => {
    res.send(
      !err
        ? { status: "ok", data: "Student's data deleted" }
        : { status: "failed", data: err }
    );
  });
});

app.post("/create-student", (req, res) => {
  const studentCollection = database.collection("student");
  studentCollection.insertOne(req.body, (err) => {
    if (!err)
      return res.send({ status: "ok", data: "Student's data created successfully" });
    res.send({ status: "failed", data: err });
  });
});

app.post("/short-update", (req, res) => {
  const studentCollection = database.collection("student");
  const { id, name, email, age, marks, city } = req.body;
  studentCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, age, email, marks, city } },
    (err) => {
      if (err) return res.send({ status: "failed", data: err });
      res.send({ status: "ok", data: "students's data updated successfully" });
    }
  );
});

app.post("/update-student", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(503).send({ status: "failed", data: err });
    const studentCollection = database.collection("student");
    const { _id, name, email, age, marks, city } = req.body;
    const profile = req.files.profile[0].filename;
    let oldData;
    try {
      // getting oldData for remove older image from server files
      oldData = await studentCollection.findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.log(error);
      return res.send({ status: "failed", data: "Internal Server Error" });
    }
    if (!oldData) return res.send({ status: "failed", data: "Internal Server Error" });
    studentCollection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { profile, name, age, email, marks, city } },
      (err) => {
        if (err) return res.send({ status: "failed", data: err });
        res.send({ status: "ok", data: "Student's data updated successfully" });
        const oldImageName = oldData?.profile;
        oldImageName &&
          fs.unlink(`${__dirname}/userProfiles/${oldImageName}`, (error) => {
            console.log(
              !error ? (oldData, " deleted successfully") : ("delete error", error)
            );
          });
      }
    );
  });
});

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
