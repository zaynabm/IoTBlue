var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var items=new Schema({
  name:String,
  Id:String,
  product:String,
})
// ORM
mongoose.model("items",items)
