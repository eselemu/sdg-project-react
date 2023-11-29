const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose");

require("dotenv").config(); //Access from my process variable

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

//Configuration to Use mongoDB
const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASS;
const mongoPostUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.6iz2suz.mongodb.net/post?retryWrites=true&w=majority`;
mongoose.connect(mongoPostUrl, { useNewUrlParser: true, useUnifiedTopology: true }); //Structure or our schema, every parameter is a column

//Use of schemas

const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
  createdAt: String // or Date
});
CommentSchema.set("strictQuery", true); 

const PostSchema = new mongoose.Schema({
  author: String,
  topic: String,
  content: String,
  image: String,
  comments: [CommentSchema], // This is an array of Comment subdocuments
  createdAt: String // or Date
});
PostSchema.set("strictQuery", true); 
const Post = mongoose.model("Post", PostSchema);

const userFilePath = "./data/user.json";
//const user = require(userFilePath);

app.route("/")
  .get((req, res) => {
    res.render("index");
  })
  .post((req, res) => {
    res.redirect("/");
  });

app.route("/signup")
  .get((req, res) => {
    res.render("login_singup", { action: 'signup' });
  })
  .post((req, res) => {
    // Recopila los datos del formulario de registro
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    // Verifica si el usuario ya existe
    const userExists = user.some(user => user.username === newUser.username);

    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Agrega el nuevo usuario al array
    user.push(newUser);

    // Guarda los usuarios en el archivo JSON
    fs.writeFile(userFilePath, JSON.stringify(user, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing users:', err);
        return res.status(500).send('Server Error');
      }
      req.session.username = newUser.username; // Inicia sesión al usuario registrado
      res.redirect("/forum");
    });
  });

app.route("/login")
  .get((req, res) => {
    res.render("login_singup", { action: 'login' });
  })
  .post((req, res) => {
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;

    // Verifica las credenciales del usuario
    //const user = user.find(user => user.username === inputUsername);
    const foundUser = user.find(u => u.username === inputUsername);


    if (foundUser && foundUser.password === inputPassword) {
      req.session.username = inputUsername; // Inicia sesión al usuario
      res.redirect("/forum");
    } else {
      res.status(401).send("Login failed");
    }
  });

// Serve images from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Current and default topic of the posts section
var currTopic = "HEALTH";

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the directory for storing uploaded images
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

//Filtered posts depending on the topic
var filteredPosts;

app.route("/forum")
  .get((req, res) => {
    //Filter the posts depending on the topic
    filteredPosts = posts.filter(post => post.topic === currTopic);
    // Render your EJS template with the filtered posts
    res.render("forum", { posts: filteredPosts, username: req.session.username, currTopic: currTopic, topics: topics.topics });
  });

app.post('/postForum', upload.single('image'), (req, res) => {
  const topic = req.body.topic.toUpperCase();
  const content = req.body.content;
  const author = req.body.author;
  //Creation of json object with the atributes of the post
  const post = new Post({
    author: author,
    topic: topic,
    content: content,
    image: req.file ? `/uploads/${req.file.filename}` : null,//Here if a file is received then it will save in the json object the route to teh alredy uploaded img in uploads
    comments: [],//Comments array, by default the post doesnt have any
    createdAt: moment(new Date()).format('MMM DD, YYYY, HH:mm:ss'),//Date of creation, it is formatted using moment (In order to look nicer and more readable)
  });

  console.log(post);
  post.save();
  res.status(200).json(post);
});

//Endpoint to submit a comment to a post
app.post('/postComment', (req, res) => {
  //The user needs to be logged
  if (req.session.username == undefined) {
    res.status(401).send("Not logged user");
  }
  else {
    //Get the topic and the filtered posts from the post to be commented
    currTopic = req.body.currTopic;
    filteredPosts = posts.filter(post => post.topic === currTopic);
    //Get the content of the comment and the index of the commented post
    const content = req.body.postComment;
    const indexPost = req.body.indexPost;

    //Creation of the json object with the attributes of the comment
    const comment = {
      author: req.session.username,
      text: content,
      createdAt: moment(new Date()).format('MMM DD, YYYY, HH:mm:ss'), // Comment creation timestamp
    };
    //Set the comment in the original array of posts
    posts.forEach(post => {
      if (filteredPosts[indexPost] == post) {
        post.comments.push(comment);
      }
    });
    //Write updated posts json file with added comment
    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing posts:', err);
        return res.status(500).send('Server Error');
      }

      res.redirect('/forum');
    });
  }
});
//Enpoint to search topic
app.route("/searchTopic")
  .get((req, res) => {
    const topic = req.query.topic.toUpperCase();
    //If the topic exists, we set the current topic to the searched one
    if (topics.topics.includes(topic)) {
      currTopic = topic;
    }
    //Else the default topic will be shown
    else {
      currTopic = "HEALTH"
    }
    res.redirect('/forum');
  });

//const news = require('./news.json');

app.route("/newsletter")
  .get((req, res) => {
    res.render("newsletter", { news: news });
  });

app.post('/newNews', upload.single('Image'), (req, res) => {
  console.log(req.body.Title);
  const title = req.body.Title;
  const text = req.body.Text;
  const url = req.body.URL;
  const shortD = req.body.ShortDescription
  const newDataToAppend = {
    Image: req.file ? `/uploads/${req.file.filename}` : null,//Here if a file is received then it will save in the json object the route to teh alredy uploaded img in uploads
    Author: "",
    // New author needs the database of users, thats why it is empty
    Title: title,
    Text: text,
    URL: url,
    ShortDescription: shortD
  };
  news.push(newDataToAppend);
  fs.writeFile('./news.json', JSON.stringify(news, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing news to JSON file:', err);
    } else {
      console.log('News updated in JSON file.');
    }
  });

  res.redirect('/newsletter');
});

app.route("/videogame")
  .get((req, res) => {
    res.render("videogame");
  })
  .post((req, res) => {
    res.redirect("/");
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("There was an error in the app");
});

app.listen(5000, () => {
  console.log("Listening Port 5000");
});