import express from "express"
import { config } from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Year2023Model from "./models/Year2023.js"
import Year2022Model from "./models/Year2022.js"

config()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB OK"))
.catch((err) => console.log("DB Error", err))

const app = express();

app.use(express.json());
app.use(cors());

function sumArray(array) {
  let sum = 0;
  for (const item of array) {
   sum += item.points;
  }
  return sum;
 }

app.get("/2023", async (req, res) => {
  try{
    const r = await Year2023Model.find();
    for (let i=0; i< r.length; i++) {
      for (let j=1; j< r[i].results.length; j++) {
        if (r[i].results[j].show == r[i].results[j-1].show){
          r[i].results.splice(j-1, 1);
        }
      }
    }
    for (let i = 1; i < r.length; i++) {
      for (let j = 0; j < r.length - i; j++) {
        if (sumArray(r[j].results) < sumArray(r[j+1].results)) {
          [r[j], r[j + 1]] = [r[j + 1], r[j]];
        }
      }
    }
    return res.json(r);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to get data" });
   }
})

app.post("/2023", async (req, res) => {
  try{
    config()
    if (req.body.password !== process.env.SECRET) return res.status(403).json({message: "fail"})
    const data = await req.body.data;
    let ret = [];
    for (let i in data){
      const user = await data[i].slice(0, data[i].indexOf(" -"));
      const userData = await Year2023Model.find(
        {user: user},
      )
      if (userData.length === 0) {
        const doc = new Year2023Model({
          user: user,
          results: [{
            show: req.body.show,
            points: parseFloat(data[i].slice(data[i].indexOf(" - ")+3))
        }]
        })
        const r = await doc.save();
        ret.push(r);
      } else {
        const r = await Year2023Model.findOneAndUpdate(
          {user: user},
          {
            $push: {results: {show: req.body.show, points: parseFloat(data[i].slice(data[i].indexOf(" - ")+3))}}
          },
          {returnDocument: "after"}
        );
        ret.push(r);
      }
    }
    return res.json(ret);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to post data" });
   }
})

app.get("/2022", async (req, res) => {
  try{
    const r = await Year2022Model.find();
    for (let i=0; i< r.length; i++) {
      for (let j=1; j< r[i].results.length; j++) {
        if (r[i].results[j].show == r[i].results[j-1].show){
          r[i].results.splice(j-1, 1);
        }
      }
    }
    for (let i = 1; i < r.length; i++) {
      for (let j = 0; j < r.length - i; j++) {
        if (sumArray(r[j].results) < sumArray(r[j+1].results)) {
          [r[j], r[j + 1]] = [r[j + 1], r[j]];
        }
      }
    }
    return res.json(r);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to get data" });
   }
})

app.post("/2022", async (req, res) => {
  try{
    const data = await req.body.data;
    let ret = [];
    for (let i in data){
      const user = await data[i].slice(0, data[i].indexOf(" -"));
      const userData = await Year2022Model.find(
        {user: user},
      )
      if (userData.length === 0) {
        const doc = new Year2022Model({
          user: user,
          results: [{
            show: req.body.show,
            points: parseFloat(data[i].slice(data[i].indexOf(" - ")+3))
        }]
        })
        const r = await doc.save();
        ret.push(r);
      } else {
        const r = await Year2022Model.findOneAndUpdate(
          {user: user},
          {
            $push: {results: {show: req.body.show, points: parseFloat(data[i].slice(data[i].indexOf(" - ")+3))}}
          },
          {returnDocument: "after"}
        );
        ret.push(r);
      }
    }
    return res.json(ret);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to post data" });
   }
})

app.listen(process.env.PORT || 4445, (err) => 
  {
    if (err) {
      return console.log(err);
    }
    console.log("Server OK");
  }
);
