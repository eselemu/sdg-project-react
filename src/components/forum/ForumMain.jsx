import React from "react";

import ModalPost from "./ModalPost";
import Post from "./Post";

import './Forum.css';
import posts from './posts'

function ForumMain() {
	let username = "eselemu";
	let currTopic = "HEALTH";

	function mapPosts() {
    if (posts) {
      return posts.map((post) => (
        <Post
          post={post} 
					currTopic = {currTopic}/>
      ));
    }
    return undefined;
  }

	let renderedPosts = mapPosts();

	return (
		<div className="forumMain">

      <ModalPost username={username} />

      <div className="container containerVisual">
        <div className="row">
          <div className="col-7 col-sm-10">
            <form action="/searchTopic" method="get">
              <div className="input-group mb-3">
                <input type="text" name="topic" className="form-control" placeholder="Topic" aria-label="Topic" aria-describedby="button-addon2" />
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
            <h1>{currTopic}</h1>
          </div>
        </div>
      </div>

			{renderedPosts}
			
    </div>
	);
}

export default ForumMain;