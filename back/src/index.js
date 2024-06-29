import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Year2023Model from './models/Year2023.js';

config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB OK'))
  .catch(err => console.log('DB Error', err));

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

app.get('/:year', async (req, res) => {
  try {
    const documents = await Year2023Model.find({ year: req.params.year });
    for (let i = 1; i < documents.length; i++) {
      for (let j = 0; j < documents.length - i; j++) {
        if (sumArray(documents[j].results) < sumArray(documents[j + 1].results)) {
          [documents[j], documents[j + 1]] = [documents[j + 1], documents[j]];
        }
      }
    }
    return res.json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to get data' });
  }
});

app.post('/', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    if (req.body.password !== process.env.SECRET)
      return res.status(403).json({ message: 'not allowed' });
    const data = await req.body.data;
    let ret = [];
    for (let i in data) {
      const user = await data[i].slice(0, data[i].indexOf(' -'));
      const userData = await Year2023Model.find({ user: user, year: currentYear });
      if (userData.length === 0) {
        const doc = new Year2023Model({
          user: user,
          year: currentYear,
          results: [
            {
              show: req.body.show,
              points: parseFloat(data[i].slice(data[i].indexOf(' - ') + 3)),
            },
          ],
        });
        const r = await doc.save();
        ret.push(r);
      } else {
        const r = await Year2023Model.findOneAndUpdate(
          { user: user, year: currentYear },
          {
            $push: {
              results: {
                show: req.body.show,
                points: parseFloat(data[i].slice(data[i].indexOf(' - ') + 3)),
              },
            },
          },
          { returnDocument: 'after' },
        );
        ret.push(r);
      }
    }
    return res.json(ret);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to post data' });
  }
});

app.listen(process.env.PORT || 4445, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
