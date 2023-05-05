const  express = require("express");               //express
const bodyParser = require("body-parser");     //body-parser parses your request and converts it into a format.
const date = require(__dirname + "/date.js");

const app = express();         //create app

const items = ["Buy Food", "Cook Food", "Eat Food"];     // item in '/' 

const workItems = [];      //items for work 


app.set('view engine', 'ejs');       //for ejs.

app.use(bodyParser.urlencoded({extended:true}));    //bodyparser

app.use(express.static("public"))       // render css and other files like header, footer, image.

// main page 
 // Generate current day in a particulate formate that we desire
app.get("/", function(req, res){
    
   let day = date.getDate();
    res.render("list", {listTitle : day, newListItems : items});
    

});


// for main and work page when user add item in work otherwise item add in main page '/' 

app.post("/", function(req, res){

    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{

        items.push(item);
    
        res.redirect("/");
    }
   
    
});


//for work page

app.get("/work", function(req, res){
    res.render("list", {listTitle : "Work List", newListItems : workItems})

});


//for about page

app.get("/about", function(req, res){
    res.render("about");

})

//  Server running on port 
app.listen("3000", function(){
    console.log("Server running on port 3000");
});
