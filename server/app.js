const express = require("express");
const cors = require("cors");
const Mongoclient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const upload = require("./multerConfig");
const path = require("path");
const env = require("dotenv").config();
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "userProfiles")));

const client = new Mongoclient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
  const studentcollection = connection.db("school").collection("student");
  studentcollection.find({ _id: ObjectId(req.query.id) }).toArray((err, docs) => {
    if (!err) {
      res.send({ status: "ok", data: docs });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.get("/list-students", (req, res) => {
  const studentcollection = connection.db("school").collection("student");
  studentcollection.find().toArray((err, docs) => {
    if (!err) {
      res.send({ status: "ok", data: docs });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.get("/delete-student", (req, res) => {
  const studentcollection = connection.db("school").collection("student");
  studentcollection.remove({ _id: ObjectId(req.query.id) }, (err, result) => {
    if (!err) {
      res.send({ status: "ok", data: "Student's data deleted" });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.post("/create-student", bodyParser.json(), (req, res) => {
  const studentcollection = connection.db("school").collection("student");
  studentcollection.insert(req.body, (err, result) => {
    if (!err) {
      res.send({ status: "ok", data: "Student's data created successfully" });
    } else {
      res.send({ status: "failed", data: err });
    }
  });
});

app.post("/update-student", bodyParser.json(), (req, res) => {
  upload(req, res, async (err) => {
    if (!err) {
      const studentcollection = connection.db("school").collection("student");
      const oldData = await studentcollection.findOne({
        _id: ObjectId(req.body._id),
      });
      studentcollection.updateOne(
        { _id: ObjectId(req.body._id) },
        {
          $set: {
            profile: req.files.profile[0].filename,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            marks: req.body.marks,
            city: req.body.city,
          },
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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
