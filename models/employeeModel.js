import mongoose from "mongoose";
// Employee schema to store data in MongoDB
const employeeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    mobileno: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    empid: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    address:{
      type: String,
      required:true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("employees", employeeSchema);
