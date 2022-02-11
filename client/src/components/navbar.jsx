import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	return (
		<div className="navbar">
			<div className="">
				<div className="navbar-container">
					<div className="left">
						<div className="item">
							<ul className="list">
								<Link to="/">
									<li className="listItem">Homepage</li>
								</Link>
								<Link to="/menu">
									<li className="listItem">Menu</li>
								</Link>
								<Link to="">
									<li className="listItem">Promotions</li>
								</Link>
								<Link to="">
									<li className="listItem">Contact</li>
								</Link>
							</ul>
						</div>
					</div>
					<div className="center"></div>
					<div className="right">
						<div className="item">
							<span className="open-status open"> Open </span>{" "}
							9:00 A.M - 1:00 A.M
						</div>
						<div className="item">
							<Link to="/cart">
								<div className="cart">
									<img
										src="/img/cart.png"
										alt="cart"
										width="30px"
										height="30px"
									/>
									{quantity !== 0 ? (
										<div className="count">{quantity}</div>
									) : (
										""
									)}
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
