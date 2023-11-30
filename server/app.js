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
    if (!err) {
      res.send({ status: "ok", data: docs });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.get("/list-students", (req, res) => {
  const studentCollection = database.collection("student");
  studentCollection.find().toArray((err, docs) => {
    if (!err) {
      res.send({ status: "ok", data: docs });
    } else {
      res.send({ status: "failed", data: err });
    }
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
  studentCollection.insertOne(req.body, (err, result) => {
    if (!err) {
      res.send({ status: "ok", data: "Student's data created successfully" });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.post("/short-update", (req, res) => {
  const studentCollection = database.collection("student");
  studentCollection.updateOne(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        marks: req.body.marks,
        city: req.body.city
      }
    },
    (err, result) => {
      if (err) {
        res.send({ status: "failed", data: err });
      } else {
        res.send({ status: "ok", data: "students's data updated successfully" });
      }
    }
  );
});

app.post("/update-student", (req, res) => {
  upload(req, res, async (err) => {
    if (!err) {
      const studentCollection = database.collection("student");
      const oldData = await studentCollection.findOne({
        _id: ObjectId(req.body._id)
      });
      studentCollection.updateOne(
        { _id: ObjectId(req.body._id) },
        {
          $set: {
            profile: req.files.profile[0].filename,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            marks: req.body.marks,
            city: req.body.city
          }
        },
        (err, result) => {
          if (!err) {
            res.send({ status: "ok", data: "Student's data updated successfully" });
            const oldImageName = oldData.profile;
            try {
              fs.unlinkSync(`${__dirname}/userProfiles/${oldImageName}`);
              console.log(oldImageName + " deleted successfully");
            } catch (error) {
              console.log("delete error", error);
            }
          } else {
            res.send({ status: "failed", data: err });
          }
        }
      );
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
