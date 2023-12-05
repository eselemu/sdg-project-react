//Added dependencies
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

//Use of session
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

//Declaration of used schemas
const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now } // or Date
});
CommentSchema.set("strictQuery", true);

const PostSchema = new mongoose.Schema({
  author: String,
  topic: String,
  content: String,
  image: String,
  comments: [CommentSchema], // This is an array of Comment subdocuments
  createdAt: { type: Date, default: Date.now } // or Date
});
PostSchema.set("strictQuery", true);

const TopicSchema = new mongoose.Schema({
  topic: String,
});
TopicSchema.set("strictQuery", true);

const Post = mongoose.model("Post", PostSchema);
const Topic = mongoose.model("Topic", TopicSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});
UserSchema.set("strictQuery", true);

const User = mongoose.model("User", UserSchema);

//Sign Up endpoint, it receives a username to register, if it alredy exists it return error, if not is saved on our mongodb
app.route("/signup")
  .post(async (req, res) => {
    const { username, email } = req.body.user;
    // Check if the username or email already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] }).exec();

    if (userExists) {
      // If user exists, send a conflict status code
      res.status(409).json({ message: "Username or email already registered." });
    } else {
      // If user does not exist, create a new user
      const newUser = new User({
        name: req.body.user.name,
        username,
        email,
        password: req.body.user.password,
      });
      await newUser.save();
      res.status(201).json(newUser);
    }
  });

  //Login endpoint, it checks if theres a user with the credentials provided on our mongodb, and returns the logged user or the error
app.route("/login")
  .post(async (req, res) => {
    const { username, password } = req.body.user;

    // Attempt to find the user by username
    const userDB = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    }).exec();


    if (userDB && userDB.password === password) {
      // If user is found and password matches, handle login success
      res.status(200).json({ message: "Login successful", userDB });
    } else {
      // If user is not found or password does not match, send an unauthorized status code
      res.status(401).json({ message: "Invalid username or password" });
    }
  });

// Serve images from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the directory for storing uploaded images
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);//Random and unique name for the image
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

//Post endpoint, it receives a post along with its image, the uploads the posts on mongodb, if the topic is new, it also creates a new topic on mongodb
app.post('/postForum', upload.single('image'), async (req, res) => {
  const topic = req.body.topic.toUpperCase();
  const content = req.body.content;
  const author = req.body.author;
  //Creation of json object with the atributes of the post
  const newPost = new Post({
    author: author,
    topic: topic,
    content: content,
    image: req.file ? `/uploads/${req.file.filename}` : null,//Here if a file is received then it will save in the json object the route to teh alredy uploaded img in uploads
    comments: [],//Comments array, by default the post doesnt have any
  });


  var existingTopic = await Topic.findOne({ topic: topic }).exec();

  //If the topic doesnt exists it creates a new one
  if (!existingTopic) {
    const newTopic = new Topic({
      topic: topic,
    });
    newTopic.save();
  }

  console.log(newPost);
  newPost.save();
  res.status(200).json(newPost);
});

//Comment endpoint, it receives a comment an changes the comments array of the post from which te comment is from in mongodb
app.post('/postComment', async (req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  const postId = req.body.post._id;
  const newComment = {
    author: author,
    content: content,
  };

  try {
    // Find the post by id and update it
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId }, // filter
      { $push: { comments: newComment } }, // update
      { new: true } // options
    ).exec();

    if (!updatedPost) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    res.status(500).send("Error while updating post: " + err.message);
  }
});

//Getposts endpoint, it returns te posts from a specific topic received in the request
app.post('/getPosts', async (req, res) => {
  const topic = req.body.topic;
  let postsDB = await Post.find({ topic: topic }).sort({ createdAt: -1 }).exec();
  if (!postsDB && postsDB === 0) {
    res.status(401).send("Error while extracting posts from database");
  }
  res.status(200).json(postsDB);
});

//const news = require('./news.json');

app.route("/newsletter")
  .get((req, res) => {
    res.render("newsletter", { news: news });
  });

  //NewNews end point, it receives the new to upload and uploads it
app.post('/newNews', upload.single('Image'), (req, res) => {
  console.log(req.body.Title);
  const title = req.body.Title;
  const text = req.body.Text;
  const url = req.body.URL;
  const shortD = req.body.ShortDescription
  const newDataToAppend = {
    Image: req.file ? `/uploads/${req.file.filename}` : null,//Here if a file is received then it will save in the json object the route to teh alredy uploaded img in uploads
    Author: "",
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
;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("There was an error in the app");
});
//Selection of port depending if its productin or test
const PORT = process.env.PORT || 5000;
//Listening of the specified port
app.listen(PORT, () => console.log(`Server started port ${PORT}`));