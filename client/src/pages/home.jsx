import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
// import Review from "../components/review";
import axios from "axios";
import { Link } from "react-router-dom";
import PizzaCard from "../components/pizza-card";
import Popup from "../components/popup";

const Home = () => {
	const [data, setData] = useState(null);
	const [showPopUp, setShowPopUp] = useState(false);

	//time the popup for email marketing

	const showPopupHandler = () => setShowPopUp(true);
	useEffect(() => {
		setTimeout(() => {
			showPopupHandler();
		}, 7000);
	}, []);
	let popup = null;
	if (showPopUp) {
		popup = <Popup setShowPopUp={setShowPopUp} />;
	}

	//get products for the specials section on home page
	useEffect(() => {
		axios
			.get("/api/product/find")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	}, []);

	const pizzaItems = [];

	if (data) {
		for (let i in data) {
			if (data.hasOwnProperty(i)) {
				if (data[i].itemCategory === "pizza") {
					pizzaItems.push(data[i]);
				}
			}
		}
	}

	return (
		<div className="">
			<Navbar />
			<Hero />
			{popup}
			<div className="home-image-container">
				<div className="row">
					<div className="row-item"></div>
					<div className="row-item text-row">
						<h3>
							Nova's pizza proudly serves delicious, quality, and
							authentic Italian pizza.
						</h3>
					</div>
				</div>
				<div className="row">
					<div className="row-item text-row">
						<h3>The best pizza in town</h3>
						<p>Get a taste of authentic Italian Pizza.</p>
					</div>
					<div className="row-item"></div>
				</div>
			</div>
			<div className="productList">
				<div className="productList-title-container">
					<h2 className="productList-title">Today's Specials</h2>
					<hr className="productList-hr" />
				</div>
				<div className="productList-container">
					<div className="productList-wrapper">
						{pizzaItems !== 0 &&
							pizzaItems?.slice(0, 4).map((item, i) => {
								return <PizzaCard item={item} key={i} />;
							})}
					</div>
					<Link to="/menu" className="productList-menu-link">
						View Full Menu
						<span>
							<i
								className="fa fa-external-link"
								style={{
									fontSize: "1.5em",
									marginLeft: "10px",
									color: "#e2241a",
								}}
							></i>
						</span>
					</Link>
				</div>
			</div>
			{/* <Review /> */}
			<Footer />
		</div>
	);
};

export default Home;
