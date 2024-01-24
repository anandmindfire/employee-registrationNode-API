import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
 username: { 
    type: String, 
    unique: true, 
    required: true 
    },

 password: {
     type: String,
      required: true 
    },
 });
 export default mongoose.model("admin", adminSchema);