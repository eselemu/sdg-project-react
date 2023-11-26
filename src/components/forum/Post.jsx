import React from "react";

import Comment from "./Comment";

import './Forum.css';

function Post(props) {
	let post = props.post;
	let currTopic = props.currTopic;

	function mapComments() {
		if (post.comments) {
			return post.comments.map((comment) => (
				<Comment
					comment={comment} />
			));
		}
		return undefined;
	}

	let renderedComments = mapComments();
	return (
		<div>
			<div class="post container containerVisual">
				<div class="message">
					<div class="row">
						<div class="post-profile col-12 col-xl-1 col-sm-2 d-flex justify-content-sm-end justify-content-start">
							<img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile" class="pic-post" />
						</div>
						<div class="post-body col-12 col-xl-11 col-sm-10">
							<h2>{post.author}</h2>
							<p>{post.createdAt}</p>
							<h5>{post.content}</h5>
						</div>
						{
							post.image != null && (
								<div className="col-12 d-flex justify-content-center align-items-center">
									<img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile" className="img-post" />
								</div>
							)
						}
						<div class="col-12"><br /></div>
					</div>
				</div>
				<div className="comment">
					<div className="row">
						<div className="col-2 col-xl-1 right-align">
							<img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile" className="pic-comment" />
						</div>
						<div className="col-10 col-xl-11">
							<form action="/postComment" method="POST">
								<input name="postComment" className="form-control form-control-sm" type="text" placeholder="Write a public comment" aria-label=".form-control-sm example" />
								<input type="hidden" name="indexPost" value={0} />
								<input type="hidden" name="currTopic" value={currTopic} />
								<button type="submit" className="btn btn-primary btn-addpost" hidden>PUBLISH</button>
							</form>
						</div>
					</div>
					<div>
						<br />
					</div>
				</div>

				<div className="comments">
					{renderedComments}
				</div>

			</div>
		</div>
	);
}

export default Post;