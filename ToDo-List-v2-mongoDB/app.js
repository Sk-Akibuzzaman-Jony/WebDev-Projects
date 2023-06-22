const express = require('express')
const app = express()
let ejs = require('ejs');
const mongoose = require('mongoose');
const { response } = require('express');
const _ = require('lodash');
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.set('strictQuery', false);


mongoose.connect('mongodb+srv://admin-jony:jony123@cluster0.r9kc6df.mongodb.net/todolistDB');

const itemsSchema = new mongoose.Schema({    //<--chreating schema
    name:  String, 
})


const Item = mongoose.model("item",itemsSchema);  //<--creating model

const itm1 = new Item({
    name:"cooking"
})

const itm2 = new Item({
    name:"reading"
})
const itm3 = new Item({
    name:"watching movies"
})

const defaultItems = [itm1,itm2,itm3];

const listSchema = {    //<--chreating schema
    name:  String,
    items: [itemsSchema] 
};

const List = mongoose.model("List",listSchema);

app.get("/",function(req, res){
    var today = new Date;
    var currDay = today.getDay();
    const nameDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"];
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        
    }

    Item.find({},function(err,foundItems){
        res.render('list', {kindOfDay: "Today", newListItems:foundItems});
    });

    var day = today.toLocaleString('en-in', options);
    

});

app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name:customListName}, function(err, foundList){
        {
            if(!err){
                if (!foundList) {
                    const list = new List({
                        name: customListName,
                        items: defaultItems
                    });
                    list.save();
                    res.redirect("/"+customListName);
                }
                else{
                    res.render('list.ejs', {kindOfDay:customListName , newListItems:foundList.items});
                }
            }
        }
    })

     
    
});

app.post("/",function(request, respond){
    
    const itemName = request.body.newItem;
    const listName = request.body.list;
    
    const itm = new Item({
        name:itemName,
    });

    if (listName == "Today") {
        itm.save();
        respond.redirect("/");
    } else {
        List.findOne({name:listName},function(err, foundList){
            foundList.items.push(itm);
            foundList.save();
            respond.redirect("/"+listName);
        })
    }

    
})


app.post("/delete", function(req,res){
    const id = req.body.checkbox;
    const listName = req.body.listName;
    
    if (listName === "Today") {
        Item.findByIdAndRemove(id,function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}},function(err,foundList){     //-->See $pull in the docs
            if(!err){
                res.redirect("/"+listName);
            }
        });   
    }

    
});





app.listen(3000, function(){
    console.log("server started at http://localhost:3000/");
}); 