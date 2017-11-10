const express       = require("express"),
      bodyParser    = require("body-parser"),
      mongoose      = require('mongoose'),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      Content       = require('./models/content'),
      Comment       = require('./models/comments'),
      User          = require('./models/user')
      seeds         = require('./seeds');



var app = express();


//Connecting to mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://aditya:aditya@ds131914.mlab.com:31914/tech-share", {useMongoClient: true});


//Setting all views to ejs
app.set("view engine","ejs");

//Used for Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Seeding the data
//seeds();
//=======================
// PASSPORT CONFIGURATION
//=======================
app.use(require("express-session")({
    secret: "TechShare is the best website - Cyanamous!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//=======================
// MIDDLEWARE
//=======================
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};
//=======================
// ROUTES
//=======================
//Home Page
app.get("/",(req,res) => {
    res.render("home",{currentUser:req.user});
});

//=======================
//CONTENT ROUTES
//=======================


//DISPLAY - Show content from DB
app.get("/content",(req,res) => {
    //Get all content from DB
    Content.find({},(err,articles) => {
      if(err){
        console.log("Could not retrive data from DB!");
        console.log(err);
      }
      else {
        res.render("content/index",{articles:articles,currentUser:req.user});
      }
    });
});

//CREATE - Add new content to DB
app.post("/content",isLoggedIn,(req,res) => {
    //Getting data from the form
    var name = req.body.name;
    var image = req.body.image;
    var newContent = {name:name,imageUrl:image}
    //Create a new content in the DB
    Content.create(
      newContent,
      (err,content) => {
        if(err){
          console.log(err);
        }
        else {
          console.log(content);
          // articles.push(content);
        }
      }
    );
    //Redirecting back to content page
    res.redirect("/content");
});

//NEW - Show form to create a new content
app.get("/content/new",isLoggedIn,(req,res) => {
    res.render("content/new",{currentUser:req.user});
});

//Show - Show details of the particular content
app.get("/content/:id",(req,res) => {
    //fint the content with the provided ID
    //params.id because we gave name link /:id

    Content.findById(req.params.id).populate("comments").exec(function(err,foundarticles){
      if(err){
        console.log("Could not retrive data from DB!");
        console.log(err);
      }
      else {
        //render show template with content details
        // console.log(foundarticles);
        res.render("content/show",{article:foundarticles,currentUser:req.user});
      }
    });
});

//=======================
//COMMENT ROUTES
//=======================
//Create new comment form
app.get("/content/:id/comments/new",isLoggedIn,(req,res) => {
  Content.findById(req.params.id,(err,content) => {
    if(err)
    {
      console.log(err);
    }else {
      res.render("comment/new",{content:content,currentUser:req.user});
    }
  });
});

//Creating new comment post
app.post("/content/:id/comments",isLoggedIn,(req,res) => {
  Content.findById(req.params.id,(err,content) => {
    if(err)
    {
      console.log(err);
      res.redirect("/content");
    }else {
      // console.log(req.body.comment);
      Comment.create(req.body.comment,(err,comment) => {
        if(err){
          console.log(err);
        }
        else {
          content.comments.push(comment);
          content.save();
          res.redirect("/content/"+content._id);
        }
      });
    }
  });
});
//=======================
// AUTH ROUTES
//=======================
//REGISTER
app.get("/register",(req,res) => {
    res.render("register",{currentUser:req.user});
});
//REGISTER Logic
app.post("/register",(req,res) => {
  var newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,(err,user) => {
    if(err){
      console.log(err);
      return res.redirect("register");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/content");
    });
  });
});
//LOGIN
app.get("/login",(req,res) => {
    res.render("login",{currentUser:req.user});
});
//LOGIN LOGIC
app.post("/login",passport.authenticate("local",
    {
      successRedirect:"/content",
      failureRedirect:"/register"
    }),
    (req,res) => {
});
//LOGOUT Logic
app.get("/logout",(req,res) => {
  req.logout();
  res.redirect("/content");
});

//=======================
// ALL OTHER ROUTES
//=======================
app.get("*",(req,res) => {
    res.send("<h1>Visited the Wrong page!</h1>");
});


app.listen(process.env.PORT, process.env.IP,() => {
   console.log("Server has Started!");
});

//mongod --dbpath "A:\Academics\Programming\Web Dev\WDB\Backend\data"
// var articles = [
//   {name:"iMac 2017",image:"https://support.apple.com/content/dam/edam/applecare/images/en_US/mac/macfamily-productnav-imac_2x.png"},
//   {name:"Asus ROG Gaming Laptop",image:"http://www.techalone.com/wp-content/uploads/2016/04/Asus-ROG-Gaming-Laptops.jpg"},
//   {name:"Galaxy Note 8",image:"https://i.ytimg.com/vi/fddIl8UGFvE/hq720.jpg"},
//   {name:"One Plus 5",image:"http://drop.ndtv.com/TECH/product_database/images/620201794031PM_635_oneplus_5.jpeg"},
//   {name:"Acer Predator",image:"https://www.gamecrate.com/sites/default/files/field/image/acer-predator-desktop-g6-skylake-review-3.jpg"},
//   {name:"Oculus Rift",image:"https://www.profesionalreview.com/wp-content/uploads/2016/10/OCULUS-RIFT.jpg"},
// ];
