import React from "react";

function ModalPost(props) {
	let username = props.username;
	return (
		<div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <form action="/post" method="POST" encType="multipart/form-data">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a post</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-2">
                      <img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile picture" className="pic-comment" />
                    </div>
                    <div className="col-10">
                      <h5>{username}</h5>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <input type="text" name="topic" className="form-control" id="exampleFormControlInput1" placeholder="Topic" required />
                      </div>
                      <div className="mb-3">
                        <textarea name="content" className="form-control" id="exampleFormControlTextarea1" placeholder="What's on your mind?" rows="4" required></textarea>
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