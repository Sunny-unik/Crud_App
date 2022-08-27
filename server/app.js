const express = require('express');
const cors = require('cors');
const Mongoclient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const upload = require('./multerConfig');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "userProfiles")));

const client = new Mongoclient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let connection;

client.connect((err, db) => {
  if (!err) {
    connection = db;
    console.log("Database connected");
  } else {
    console.log("error in Db connection");
  }
});

app.get("/student-by-id", (req, res) => {
  const studentCollection = connection.db('school').collection('student');
  studentCollection.find({ _id: ObjectId(req.query.id) }).toArray((err, docs) => {
    !err 
      ? res.send({ status: "ok", data: docs })
      : res.send({ status: "failed", data: err });
  });
});

app.get("/list-student", (req, res) => {
  const studentCollection = connection.db('school').collection('student');
  studentCollection.find().toArray((err, docs) => {
    !err
      ? res.send({ status: "ok", data: docs })
      : res.send({ status: "failed", data: err });
  });
});

app.get("/delete-student", (req, res) => {
  const studentCollection = connection.db('school').collection('student');
  studentCollection.remove({ _id: ObjectId(req.query.id) }, (err, result) => {
    !err
      ? res.send({ status: "ok", data: "student deleted" })
      : res.send({ status: "failed", data: err });
  });
});

app.post("/create-student", bodyParser.json(), (req, res) => {
  const studentCollection = connection.db('school').collection('student');
  studentCollection.insert(req.body, (err, result) => {
    !err
      ? res.send({ status: "ok", data: "student created successfully" })
      : res.send({ status: "failed", data: err });
  });
});

app.post("/update-student", bodyParser.json(), (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      const studentCollection = connection.db('school').collection('student');
      studentCollection.updateOne({ _id: ObjectId(req.body.id) }, { $set: { profile: req.files.profile[0].filename, name: req.body.name, age: req.body.age, email: req.body.email, marks: req.body.marks, city: req.body.city } }, (err, result) => {
        !err 
          ? res.send({ status: "ok", data: "student updated successfully" })
          : res.send({ status: "failed", data: err });
      });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server live on http://localhost:${port}`));