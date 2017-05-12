var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var products=new Schema({
  name:String,
  Id:String,
  company:String,
  description:String,
})
// ORM
mongoose.model("products",products)
