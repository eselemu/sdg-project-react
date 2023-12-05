import React, { useState } from "react";
import axios from 'axios';

import Comment from "./Comment";

import './Forum.css';

function Post(props) {
	let post = props.post;

	const [commentContent, setCommentContent] = useState("");

	function fieldListener(event) {
		setCommentContent(event.target.value);
	}

	async function commentSubmit(event) {
		event.preventDefault();
		setCommentContent("");
		var apiPath = "";

		if (process.env.NODE_ENV === "production") {

			apiPath = "/api";

		}
		try {
			const response = await axios.post(apiPath + '/postComment', { author: props.username, content: commentContent, post: post });
			if (response.status === 200) {
				props.reloadPosts();
			} else {
				console.error("Error while extracting posts from database: " + response.status);
			}
		} catch (err) {
			console.error("Error in axios call: " + err.message);
		}
	}

	function mapComments() {
		if (post.comments) {
			return post.comments.map((comment) => (
				<Comment
					comment={comment} />
			));
		}
		return undefined;
	}

	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
		return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
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
							<p>{formatDate(post.createdAt)}</p>
							<h5>{post.content}</h5>
						</div>
						{
							post.image != null && (
								<div className="col-12 d-flex justify-content-center align-items-center">
									<img src={post.image} alt="Default profile" className="img-post" />
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
							<form action="/" method="POST" onSubmit={commentSubmit}>
								<input name="postComment" className="form-control form-control-sm" type="text" placeholder="Write a public comment" aria-label=".form-control-sm example" onChange={fieldListener} value={commentContent} />
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