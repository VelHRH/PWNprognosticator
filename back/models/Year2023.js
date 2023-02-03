import mongoose from "mongoose";

const Year2023Schema = new mongoose.Schema({
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

export default mongoose.model('Year2023', Year2023Schema);