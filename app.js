var express = require("express");
var mongoose=require("mongoose");
var app=express();
var fs=require("fs");

var HomeControler=require("./controllers/home");
var productsControler=require("./controllers/products");
var itemsControler=require("./controllers/items");

app.use("/",HomeControler);
app.use("/products",productsControler);
app.use("/items",itemsControler);

app.set("view engine","ejs");
app.set("views","./views")


mongoose.connect("mongodb://127.0.0.1:27017/BlueDB");

var files=fs.readdirSync(__dirname+"/models")
files.forEach(function(file){
  require(__dirname+"/models/"+file);
});

app.listen(8080);
