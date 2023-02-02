import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

app.get("/2023", (req, res) => {
  try{
  res.json("OK")
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to get data" });
   }
})

app.post("/2023", (req, res) => {
  try{
    let data = req.body.data;
    let users = [];
    let ratings = [];
    for (let i in data){
      users.push(
        {
          user: data[i].slice(0, data[i].indexOf(" ")), 
          ratings: [...ratings, parseFloat(data[i].slice(data[i].indexOf("-")+1))]
        });
    }
    res.json({show: req.body.show, users: users})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to post data" });
   }
})

app.listen(4445, (err) => 
  {
    if (err) {
      return console.log(err);
    }
    console.log("Server OK");
  }
);
