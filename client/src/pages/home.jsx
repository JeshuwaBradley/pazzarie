import React, { lazy, Suspense, useEffect, useState } from "react";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Popup from "../components/popup";
import { Link } from "react-router-dom";

const PizzaCard = lazy(() => import("../components/pizza-card"));
// const Popup = lazy(() => import("../components/popup"));
const HomeDeal = lazy(() => import("../components/deal-home"));

const Home = ({ data }) => {
	useEffect(() => {
		document.title = "Nova's Pizza - Order the best pizza in town";
	}, []);
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
						<h1>
							Nova's pizza proudly serves delicious, quality, and
							authentic Italian pizza.
						</h1>
					</div>
				</div>
				<div className="row">
					<div className="row-item text-row">
						<h1>The best pizza in town</h1>
						<h2>Get a taste of authentic Italian Pizza.</h2>
					</div>
					<div className="row-item"></div>
				</div>
			</div>
			{/* <HomeDeal /> */}
			<div className="productList">
				<div className="productList-title-container">
					<h2 className="productList-title">Today's Specials</h2>
					<hr className="productList-hr" />
				</div>
				<Suspense fallback={<div>Loading...</div>}>
					<div className="productList-container">
						<div className="productList-wrapper">
							{pizzaItems !== 0 &&
								pizzaItems?.slice(0, 4).map((item, i) => {
									return (
										<PizzaCard
											item={item}
											key={i}
											data={data}
										/>
									);
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
				</Suspense>
			</div>
			{/* <Review /> */}
			<Footer />
		</div>
	);
};

export default Home;
