import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [width, setWindowWidth] = useState(0);
	const [open, setOpen] = useState(false);
	const [list, setList] = useState(false);
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
										<li className="listItem">
											<i
												className="fa fa-home fa-lg"
												style={{ marginLeft: "20px" }}
											></i>
										</li>
									</Link>
									<Link to="/menu">
										<li className="listItem">Menu</li>
									</Link>
									<Link to="/daily-deals">
										<li className="listItem">
											Deal of the day
										</li>
									</Link>
									<Link to="/contact">
										<li className="listItem">Contact</li>
									</Link>
								</ul>
							</div>
						</div>
						<div className="center">
							<img
								src="/img/logo.png"
								alt="Logo"
								width="180px"
								height="75px"
							/>
						</div>
						<div className="right">
							<div
								className="item"
								onClick={() => setList(!list)}
							>
								<span className="open-status open"> Open </span>{" "}
								<span>9:00AM - 1:00AM</span>
								{list ? (
									<div className="nav-list-open">
										<ul>
											<li>
												<div className="nav-list-item">
													<h3>Monday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
											<li>
												<div className="nav-list-item">
													<h3>Tuesday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
											<li>
												<div className="nav-list-item">
													<h3>Wednesday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
											<li>
												<div className="nav-list-item">
													<h3>Thursday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
											<li>
												<div className="nav-list-item">
													<h3>Friday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
											<li>
												<div className="nav-list-item">
													<h3>Saturday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
											<li>
												<div className="nav-list-item">
													<h3>Sunday</h3>
													<span>9:00AM - 1:00AM</span>
												</div>
											</li>
										</ul>
									</div>
								) : (
									""
								)}
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
							<div className="item">
								<img
									src="/img/logo.png"
									alt="Logo"
									width="110px"
									height="40px"
								/>
							</div>
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
						<Link to="/daily-deals" className="mobile-nav-item">
							<div className="mobile-nav-item">
								Deals of the Day
							</div>
						</Link>
						<Link to="/contact" className="mobile-nav-item">
							<div className="mobile-nav-item">Contact</div>
						</Link>
						<Link to="/cart" className="mobile-nav-item">
							<div className="">
								{quantity === 0 ? (
									<>
										Cart{"  "}
										<i
											class="fa fa-regular fa-angle-right"
											style={{
												marginLeft: "5px",
											}}
										></i>
									</>
								) : quantity === 1 ? (
									<>
										{quantity} Item in Cart{" "}
										<i
											class="fa fa-regular fa-angle-right"
											style={{ marginLeft: "5px" }}
										></i>
									</>
								) : (
									<>
										{quantity} Items in Cart{" "}
										<i
											class="fa fa-regular fa-angle-right"
											style={{ marginLeft: "5px" }}
										></i>
									</>
								)}
							</div>
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
