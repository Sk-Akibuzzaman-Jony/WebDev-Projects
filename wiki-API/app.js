const express = require('express')
const app = express()
let ejs = require('ejs');
const mongoose = require('mongoose');
const { response } = require('express');
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.set('strictQuery', false);


mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleschema = {
    title:String,
    content:String
}

const Article = mongoose.model("Article",articleschema);

////////////////////////////////////////////////REQUESTS TARGETTING ALL ARTICLES////////////////////////

app.route("/articles")               //<---chaining in express 

.get(function(req,res){
    Article.find(function(err,foundArticles){
        if(!err){
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
        
    });

})
.post(function(req,res){
   
    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("seccessfulle added new entry")
        } else{
            res.send(err)
        }
    });
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("all records deleted successfully");
        } else{
            res.send(err);
        }
    })
});

////////////////////////////////////////////////REQUESTS TARGETTING A SPECIFIC ARTICLE////////////////////////

app.route("/articles/:articleTitle").get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("No articles found with that title");
        }
    });
})
.put(function(req,res){
    Article.updateOne({title:req.params.articleTitle},
        {title:req.body.title, content:req.body.content},
        function(err){
            if(!err){
                res.send("Successfully updated");
            } else {
                res.send(err);
            }

        })
})
.patch(function(req,res){
    Article.updateOne({
        title:req.params.articleTitle
    },
    {
        $set:req.body
    },
    function(err){
        if(!err){
            res.send("successfully patched the articles");
        }
        else {
            res.send(err);
        }
    }
    )
})
.delete(function(req,res){
    Article.deleteOne({title:req.params.articleTitle},
        {title:req.body.title},
        function(err){
            if(!err){
                res.send("Successfully deleted the Entry");
            } else{
                res.send(err);
            }
        });
});



app.listen(3000, function(){
    console.log("server started at http://localhost:3000/");
});
