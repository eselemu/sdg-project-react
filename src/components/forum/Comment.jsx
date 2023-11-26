import React from "react";

import './Forum.css';

function Comment(props) {
	let comment = props.comment;
	return (
		<div className="row">
			<div className="col-2 col-xl-1 right-align">
				<img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile" className="pic-comment" />
			</div>
			<div className="col-10 col-xl-11">
				<h5>{comment.author}</h5>
				<p>{comment.text}</p>
			</div>
		</div>
	);
}

export default Comment;