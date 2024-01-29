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
      enum: ['male', 'female','others'],
    },
    empid: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['intern', 'developer', 'designer', 'tech lead'],
    },
    address:{
      type: String,
      required:true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("employees", employeeSchema);
