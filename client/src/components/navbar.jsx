import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [width, setWindowWidth] = useState(0);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		updateDimensions();

		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const updateDimensions = () => {
		const width = window.innerWidth;
		setWindowWidth(width);
	};
	const quantity = useSelector((state) => state.cart.quantity);
	if (width > 900) {
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
											<div className="count">
												{quantity}
											</div>
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
	} else {
		return (
			<div className="navbar-mobile">
				<div className="navbar-top-container-mobile">
					<div className="mobile-left">
						<Link to="/">
							<div className="item">Nova's</div>
						</Link>
					</div>
					<div className="mobile-right">
						<div className="item">
							<span onClick={() => setOpen(!open)}>
								{open !== true ? (
									<i className="fa fa-solid fa-bars"></i>
								) : (
									<i className="fa fa-times"></i>
								)}
							</span>
						</div>
					</div>
				</div>
				{open ? (
					<div className="navbar-bottom-container-mobile">
						<Link to="/menu" className="mobile-nav-item">
							<div className="">Menu</div>
						</Link>
						<Link to="/" className="mobile-nav-item">
							<div className="mobile-nav-item">Promotions</div>
						</Link>
						<Link to="/" className="mobile-nav-item">
							<div className="mobile-nav-item">Contact</div>
						</Link>
						<Link to="/cart" className="mobile-nav-item">
							<div className="">Cart</div>
						</Link>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
};

export default Navbar;
