import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import ModalPost from "./ModalPost";
import Post from "./Post";

import './Forum.css';
/*Main component of the forum, it renders the searchbar and the posts*/

function ForumMain() {
  //Declaration of user, shownTopic and posts
  const username = localStorage.getItem('usernameSaludDigna');
  const [shownTopic, setShownTopic] = useState("HEALTH");
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();//To get if a specific topic must be shown

  // Use a state to track the current topic
  const [currTopic, setCurrTopic] = useState(searchParams.get('topic') || "HEALTH");//If there arent no parameters, by default the topic is HEALTH

  //Function that receives the posts of the current Topic from the express server through an axios call
  const getPosts = async () => {
    //Use if apiPath depending if the website is in production
    var apiPath = "";

    if (process.env.NODE_ENV === "production") {

      apiPath = "/api";

    }
    try {
      const response = await axios.post(apiPath + '/getPosts', { topic: currTopic.toUpperCase() });
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.error("Error while extracting posts from database: " + response.status);
      }
    } catch (err) {
      console.error("Error in axios call: " + err.message);
    }
  };
  //To render after both functions have ran
  useEffect(() => {
    getPosts();
    setShownTopic(currTopic);
  }, []);

  //For each post it creates a post component
  function mapPosts() {
    if (posts) {
      return posts.map((post) => (
        <Post
          post={post}
          currTopic={currTopic} 
          username={username}
          reloadPosts = {getPosts}/>
      ));
    }
    return undefined;
  }

  function resetTopicForum(){
    getPosts();
    setShownTopic(currTopic);
  }

  function handleSearchSubmit(event){
    event.preventDefault();
    resetTopicForum();
  }

  function handleTopicChange(event){
    setCurrTopic(event.target.value.toUpperCase());
  }
  //rendered posts is the result of the map function
  let renderedPosts = mapPosts();

  return (

      <div className="forumMain">
        {/* Modal component, activated when the user wants to make a new post*/}
        <ModalPost username={username} setTopic={setCurrTopic} reloadPosts = {resetTopicForum}/>
        {/*Search topic component in which a new topic is selected */}
        <div className="container containerVisual">
          <div className="row">
            <div className="col-7 col-sm-10">
              <form method="get" onSubmit={handleSearchSubmit}>
                <div className="input-group mb-3">
                  <input type="text" name="topic" className="form-control" placeholder="Topic" aria-label="Topic" aria-describedby="button-addon2" onChange={handleTopicChange} value={currTopic}/>
                  <button type="submit" className="btn btn-labeled btn-success btn-search">
                    <span className="btn-label"><i className="fa fa-search"></i></span>Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-5 col-sm-2 right-align">
              <button type="button" className="btn btn-primary btn-addpost" data-bs-toggle="modal" data-bs-target="#exampleModal">
                NEW POST
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h1>{shownTopic}</h1>
            </div>
          </div>
        </div>
        {/* Finally all the posts from the topic are shown*/}
        {renderedPosts}

      </div>
  );
}

export default ForumMain;