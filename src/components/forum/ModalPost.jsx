import React from "react";

function ModalPost(props) {
	let username = props.username;
	return (
		<div>
			<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<form action="/post" method="POST" enctype="multipart/form-data">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5" id="exampleModalLabel">Create a post</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<div class="container">
									<div class="row">
										<div class="col-2">
											<img src={process.env.PUBLIC_URL + '/imgs/forum/profile-pic.jpg'} alt="Default profile picture"
												class="pic-comment" />
										</div>
										<div class="col-10">
											<h5>{username}</h5>
										</div>
									</div>
									<br />
									<div class="row">
										<div class="col-12">
											<div class="mb-3">
												<input type="text" name="topic" class="form-control" id="exampleFormControlInput1" placeholder="Topic" required/>
											</div>
											<div class="mb-3">
												<textarea name="content" class="form-control" id="exampleFormControlTextarea1" placeholder="What's on your mind?" rows="4" required></textarea>
											</div>
											<div class="mb-3">
												<label for="formFile" class="form-label">Upload a picture</label>
												<input class="form-control" type="file" name="image" id="formFile" placeholder="Upload image"/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="submit" class="btn btn-primary btn-addpost">PUBLISH</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ModalPost;