//jshint esversion:6

const express = require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-harsh:Himanshu@7@cluster0-r82xm.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {

 title: String,
imageurl:String,
 content: String

};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, posts){

     res.render("home", {

       

       posts: posts

       });

   });


});




https=require("https");


app.get("/weather", function(req, res){

res.render("weather");
});





app.post("/weather",function(req,res){
  city=req.body.cityname;
url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a1557a9f525d344e8c9b6026293b8de1&units=metric";
https.get(url,function(response){

response.on("data",function(data){
  const weatherdata=JSON.parse(data);
  const temp=weatherdata.main.temp;
  const desc=weatherdata.weather[0].description;
  const icon=weatherdata.weather[0].icon;
  res.write("<h1 style=color:blue;text-align:center;>Temperature of "+city+" is "+temp+" degree celcius </h1>");
    const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p style= color:red;font-size:30px;text-align:center; >"+desc+"</p>")
    res.write( "<p style=text-align:center;>" +"<img src="+imgurl+" width=200 height=200  >"+ "</p>"   );
  res.send();

});


});
});






app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/publish",function(req,res){
res.render("publish");
});


app.get("/compose", function(req, res){

  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    imageurl:req.body.imageurl,
    content: req.body.postBody
  });

post.save();

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
 // const requestedTitle = _.lowerCase(req.params.postName);
     const requestedTitle=req.params.postName;

  Post.findOne({title: requestedTitle}, function(err, post){
     res.render("post", {

       title: post.title,
       imageurl:post.imageurl,
       content: post.content

     }
   );

   });

});


app.get("/delete",function(req,res){

  Post.find({}, function(err, posts){

     res.render("delete", {


       posts: posts

       });

   });


});




app.post("/delete",function(req,res){
  var ids=req.body.checkbox;



  Post.findByIdAndRemove(ids,function(err){
    if(err)
    {

    }
  });

res.redirect("/delete");
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
