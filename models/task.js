const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
  task: { type: String, required: true },
  date: { type: Date, required: true },
  done:{type:Boolean,default:false,required:true}
});

module.exports = mongoose.model("task", taskSchema);
