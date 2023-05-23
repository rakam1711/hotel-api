const Mongoose = require("mongoose");

const Admin = new Mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status:{
    type:Boolean,
    default:true
  },
  role: {
    type: String,
    enum: ["Admin", "SubAdmin"],
    default: "Admin",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Mongoose.model("Admin", Admin);
