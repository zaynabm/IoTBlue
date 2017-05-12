var express=require("express");
var router=express.Router();
var mongoose=require("mongoose")
var bodyParser=require("body-parser");
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

router.get("/",function (req,resp) {
    mongoose.model("products").find(function(err,data){
        if(!err){
            resp.render("products/list",{products:data});
        }
    });
})

router.get("/add",function (req,resp) {
    resp.render('products/add');
})

router.post("/add",middleToParseRequestBody,function(req,resp){
    var userModel=mongoose.model("products")
    var newProduct=new userModel()
    newProduct.name=req.body.name;
    newProduct.Id=req.body.Id;
    newProduct.company=req.body.company;
    newProduct.description=req.body.desc;

    newProduct.save(function(err){
        console.log("Done:new product saved to DB");
        mongoose.model("products").find(function(err,data){
            if(!err){
                resp.render("products/list",{products:data});
            }
        });
    })
})

router.get("/edit/:Id",function(req,resp){
    var pToEdit;
    mongoose.model("products").find({"Id":req.params.Id},function(err,data){
    pToEdit = data[0];
    mongoose.model("products").remove({"Id":req.params.Id},function(err,data){
        resp.render("products/edit",{product:pToEdit});
    });
    })
});

router.get("/delete/:Id",function(req,resp){
    mongoose.model("products").remove({"Id":req.params.Id},function(){
        resp.redirect("/products");
        console.log("Done:Deleted!!");
    });
})

router.post("/show",middleToParseRequestBody,function(req,resp){
    mongoose.model("products").find({"Id":req.body.IDToSearch},function(err,data){
        if(!err){
            pToSearch = data[0];
            resp.render("products/show",{product:pToSearch});
        }else{
            resp.render("products/show",{product:false});
        }
    })
});

module.exports=router;
