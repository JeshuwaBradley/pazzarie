import React from "react";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="wrapper">
				<div className="navbar-container">
					<div className="item">
						<div className="callButton">
							<img
								src="/img/telephone.png"
								alt=""
								width="32"
								height="32"
							/>
						</div>
						<div className="navbar-text">
							<div className="navbar-text">Order Now!</div>
							<div className="navbar-text">012 345 678</div>
						</div>
					</div>
					<div className="item">
						<ul className="list">
							{/* <li className="listItem">Homepage</li>
							<li className="listItem">Products</li>
							<li className="listItem">Menu</li> */}
							{/* <img
								src="/img/logo.png"
								alt="logo"
								width="160px"
								height="69px"
							/> */}
							{/* <li className="listItem">Event</li>
							<li className="listItem">Blog</li>
							<li className="listItem">Contact</li> */}
						</ul>
					</div>
					<div className="item">
						<div className="cart">
							<img
								src="/img/cart.png"
								alt="cart"
								width="30px"
								height="30px"
							/>
							<div className="count">2</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
