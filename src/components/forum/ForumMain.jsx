import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import ModalPost from "./ModalPost";
import Post from "./Post";

import './Forum.css';

function ForumMain() {
  const username = localStorage.getItem('usernameSaludDigna');
  const [shownTopic, setShownTopic] = useState("HEALTH");
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();

  // Use a state to track the current topic
  const [currTopic, setCurrTopic] = useState(searchParams.get('topic') || "HEALTH");

  const getPosts = async () => {
    try {
      const response = await axios.post('/getPosts', { topic: currTopic.toUpperCase() });
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.error("Error while extracting posts from database: " + response.status);
      }
    } catch (err) {
      console.error("Error in axios call: " + err.message);
    }
  };

  useEffect(() => {
    getPosts();
    setShownTopic(currTopic);
  }, []);


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

  let renderedPosts = mapPosts();

  return (

      <div className="forumMain">

        <ModalPost username={username} setTopic={setCurrTopic} reloadPosts = {resetTopicForum}/>

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

        {renderedPosts}

      </div>
  );
}

export default ForumMain;