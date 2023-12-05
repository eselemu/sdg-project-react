import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './Forum.css';

function ModalPost(props) {
  let username = props.username;

  const navigate = useNavigate();

  const [post, setPost] = useState({
    author: username,
    topic: "",
    content: "",
  });

  function fieldListener(event) {
    const { value, name } = event.target;
    setPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submitPost(event) {
    event.preventDefault();

    // Create a new FormData instance
    var formData = new FormData();

    // Append the string data
    formData.append('author', post.author);
    formData.append('topic', post.topic);
    formData.append('content', post.content);

    // Append the file
    // This assumes that you have a reference to the file input DOM node
    var imagefile = document.querySelector('#formFile');
    formData.append("image", imagefile.files[0]);

    var apiPath = "";

    if (process.env.NODE_ENV === "production") {

      apiPath = "/api";

    }

    axios.post(apiPath + "/postForum", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data);
      navigate(`/forum?topic=${encodeURIComponent(post.topic.toUpperCase())}`);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
      alert("Error creating post: " + err.message);
    });
  }

  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <form action="/postForum" method="POST" encType="multipart/form-data" onSubmit={submitPost}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a post</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-2">
                      <img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile" className="pic-comment" />
                    </div>
                    <div className="col-10">
                      <h5>{username}</h5>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <input type="text" name="topic" className="form-control" id="exampleFormControlInput1" placeholder="Topic" onChange={fieldListener} required />
                      </div>
                      <div className="mb-3">
                        <textarea name="content" className="form-control" id="exampleFormControlTextarea1" placeholder="What's on your mind?" rows="4" onChange={fieldListener} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload a picture</label>
                        <input className="form-control" type="file" name="image" id="formFile" placeholder="Upload image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary btn-addpost">PUBLISH</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;