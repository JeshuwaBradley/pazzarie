import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
	const [width, setWindowWidth] = useState(0);
	const [open, setOpen] = useState(false);
	const [shopOpen, setShopOpen] = useState(false);
	const [list, setList] = useState(false);
	const [early, setEarly] = useState(false);
	let serverOpen;
	useEffect(() => {
		updateDimensions();

		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const updateDimensions = () => {
		const width = window.innerWidth;
		setWindowWidth(width);
	};

	const [openData, setOpenData] = useState({});
	const [openTime, setOpenTime] = useState("");
	useEffect(() => {
		const d = new Date();
		let day = d.getDay();
		const dayByName = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		let time = d.getHours();
		axios.get("/api/open").then((res) => {
			setOpenData(res.data);
			let x = res.data["days"][day][dayByName[day]]["openTime"];
			let y = res.data["days"][day][dayByName[day]]["closeTime"];
			setOpenTime(
				`${x > 12 ? x - 12 + ":00PM" : x + ":00AM"} - ${y}:00AM`
			);
			serverOpen = res.data["open"];

			if (serverOpen) {
				if (day === 1) {
					if (time < 1) {
						setShopOpen(true);
					} else {
						setShopOpen(false);
					}
				} else if (day === 2) {
					setEarly(false);
					if (time < 16) {
						setShopOpen(false);
					} else {
						setShopOpen(true);
					}
				} else if (day === 3 || day === 4 || day === 0) {
					setEarly(false);
					if (time >= 1 && time < 16) {
						setShopOpen(false);
					} else {
						setShopOpen(true);
					}
				} else if (day === 5 || day === 6) {
					setEarly(true);
					if (time >= 1 && time < 11) {
						setShopOpen(false);
					} else {
						setShopOpen(true);
					}
				}
			} else if (!serverOpen) {
				setShopOpen(false);
			}
		});
	}, []);

	const quantity = useSelector((state) => state.cart.quantity);
	if (width > 900) {
		return (
			<div className="navbar">
				<div className="">
					<div className="navbar-container">
						<div className="left">
							<div className="item">
								<ul className="list">
									<Link to="/" title="Home">
										<li className="listItem">
											<i
												className="fa fa-home fa-lg"
												style={{ marginLeft: "20px" }}
											></i>
										</li>
									</Link>
									<Link to="/menu" title="Menu">
										<li className="listItem">Menu</li>
									</Link>
									<Link to="/promotions" title="Promotions">
										<li className="listItem">Promotions</li>
									</Link>
									<Link to="/contact" title="Contact">
										<li className="listItem">Contact</li>
									</Link>
								</ul>
							</div>
						</div>
						<div className="center">
							<img
								src="/img/logo.webp"
								alt="Logo"
								width="180px"
								height="75px"
							/>
						</div>
						<div className="right">
							{/* <div className="item">
								<a
									href="tel:5108419378"
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									(510) 841-9378
								</a>
							</div> */}
							<div
								className="item"
								onClick={() => setList(!list)}
							>
								{shopOpen ? (
									<span className="open-status open">
										Open
									</span>
								) : (
									<span className="open-status closed">
										Closed
									</span>
								)}
								{/* {early ? (
									<span>11:00AM - 1:00AM</span>
								) : (
									<span>4:00PM - 1:00AM</span>
								)} */}
								<span>{openTime}</span>
								{list ? <List data={openData} /> : ""}
							</div>
							<div className="item">
								<Link to="/cart" title="Cart">
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
				<div
					style={{
						textAlign: "center",
						padding: "10px",
						paddingBottom: "0px",
					}}
				>
					{shopOpen ? (
						<span className="open-status open">Open</span>
					) : (
						<span className="open-status closed">Closed</span>
					)}
					{/* {early ? (
						<span style={{ marginLeft: "10px", color: "white" }}>
							11:00AM - 1:00AM
						</span>
					) : (
						<span style={{ marginLeft: "10px", color: "white" }}>
							4:00PM - 1:00AM
						</span>
					)} */}
					<span style={{ marginLeft: "10px", color: "white" }}>
						{openTime}
					</span>
				</div>
				<div className="navbar-top-container-mobile">
					<div className="mobile-left">
						<Link to="/">
							<div className="item">
								<img
									src="/img/logo.webp"
									alt="Logo"
									width="110px"
									height="40px"
								/>
							</div>
						</Link>
					</div>
					<div className="mobile-right">
						<div className="item" style={{ marginRight: "20px" }}>
							<span onClick={() => setOpen(!open)}>
								{open !== true ? (
									<i className="fa fa-solid fa-bars"></i>
								) : (
									<i className="fa fa-times"></i>
								)}
							</span>
						</div>
						<div className="item">
							<Link to="/cart" title="Cart">
								<div className="cart">
									<img
										src="/img/cart.png"
										alt="cart"
										width="25px"
										height="25px"
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
				{open ? (
					<div className="navbar-bottom-container-mobile">
						<Link to="/" className="mobile-nav-item">
							<div className="mobile-nav-item">Home</div>
						</Link>
						<Link to="/menu" className="mobile-nav-item">
							<div className="mobile-nav-item">Menu</div>
						</Link>
						<Link to="/promotions" className="mobile-nav-item">
							<div className="mobile-nav-item">Promotions</div>
						</Link>
						<Link to="/contact" className="mobile-nav-item">
							<div className="mobile-nav-item">Contact</div>
						</Link>
						{/* <Link to="/cart" className="mobile-nav-item">
							<div className="">
								{quantity === 0 ? (
									<>
										Cart{"  "}
										<i
											className="fa fa-regular fa-angle-right"
											style={{
												marginLeft: "5px",
											}}
										></i>
									</>
								) : quantity === 1 ? (
									<>
										{quantity} Item in Cart{" "}
										<i
											className="fa fa-regular fa-angle-right"
											style={{ marginLeft: "5px" }}
										></i>
									</>
								) : (
									<>
										{quantity} Items in Cart{" "}
										<i
											className="fa fa-regular fa-angle-right"
											style={{ marginLeft: "5px" }}
										></i>
									</>
								)}
							</div>
						</Link> */}
					</div>
				) : (
					""
				)}
			</div>
		);
	}
};

export default Navbar;

const List = ({ data }) => {
	return (
		<div className="nav-list-open">
			<ul>
				{data["days"].map((day, i) => {
					let date = Object.keys(day);
					if (day[date]["open"] === true) {
						return (
							<li key={i}>
								<div className="nav-list-item">
									<h3>{date[0]}</h3>
									<span>
										{day[`${date}`]["openTime"] > 12
											? `${
													day[date]["openTime"] - 12
											  }:00PM`
											: `${day[date]["openTime"]}:00AM`}{" "}
										-{" "}
										{day[date]["closeTime"] > 12
											? `${
													day[date]["closeTime"] - 12
											  }:00PM`
											: `${day[date]["closeTime"]}:00AM`}
									</span>
								</div>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};
