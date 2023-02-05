import mongoose from "mongoose";

const Year2022Schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  results: {
    type: Array,
    required: true,
  },
},
{
  timestamps: true
}
);

export default mongoose.model('Year2022', Year2022Schema);