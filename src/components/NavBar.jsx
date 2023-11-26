import React from "react";

function NavBar() {
	return (
		<div>
			<nav className="navbar navbar-expand-lg container-fluid" id="navegacion">
				<div className="container">
					<a className="navbar-brand" href="/">Salud y Bienestar</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link " aria-current="page" href="/">Home</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" aria-current="page" href="/newsletter">Newsletter</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" aria-current="page" href="/forum">Forum</a>
							</li>
							<li className="nav-item">
								<a className="nav-link " aria-current="page" href="/videogame">Videogame</a>
							</li>
							<li className="nav-item">
								<a className="nav-link " aria-current="page" href="/login">Login</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="container-fluid" id="navbarLostSpace"></div>
		</div>

	);
}

export default NavBar;