var express=require("express");
var router=express.Router();
var mongoose=require("mongoose")
var bodyParser=require("body-parser");
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

router.get("/",function (req,resp) {
    mongoose.model("items").find(function(err,data){
        if(!err){
            resp.render("items/list",{items:data});
        }
    });
})

router.get("/add",function (req,resp) {
    mongoose.model("products").find(function(err,data){
        if(!err){
            resp.render("items/add",{items:data});
        }
    });
})

router.post("/add",middleToParseRequestBody,function(req,resp){
    var userModel=mongoose.model("items")
    var newitem=new userModel()
    newitem.name=req.body.name;
    newitem.Id=req.body.Id;
    newitem.product=req.body.product;

    newitem.save(function(err){
        console.log("Done:new item saved to DB");
        mongoose.model("items").find(function(err,data){
            if(!err){
                resp.render("items/list",{items:data});
            }
        });
    })
})


router.get("/delete/:Id",function(req,resp){
    mongoose.model("items").remove({"Id":req.params.Id},function(){
        resp.redirect("/items");
        console.log("Done:Deleted!!");
    });
})

router.post("/show",middleToParseRequestBody,function(req,resp){
    mongoose.model("items").find({"Id":req.body.IDToSearch},function(err,data){
        if(!err){
            pToSearch = data[0];
            resp.render("items/show",{item:pToSearch});
        }else{
            resp.render("items/show",{item:false});
        }
    })
});

module.exports=router;
