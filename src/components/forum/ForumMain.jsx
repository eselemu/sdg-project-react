import React from "react";

import ModalPost from "./ModalPost";

function ForumMain() {
	let username = "eselemu";
	let currTopic = "HEALTH"
	return (
		<div>
			<ModalPost username={username} />
			<div class="container containerVisual">
				<div class="row">
					<div class="col-7 col-sm-10">
						<form action="/searchTopic" method="get">
							<div class="input-group mb-3">
								<input type="text" name="topic" class="form-control" placeholder="Topic" aria-label="Topic"
									aria-describedby="button-addon2"/>
									<button type="submit" class="btn btn-labeled btn-success btn-search">
										<span class="btn-label"><i class="fa fa-search"></i></span>Search</button>
							</div>
						</form>
					</div>
					<div class="col-5 col-sm-2 right-align">
						<button type="button" class="btn btn-primary btn-addpost" data-bs-toggle="modal"
							data-bs-target="#exampleModal">NEW
							POST</button>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h1>{currTopic}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForumMain;