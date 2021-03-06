import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Review from "../components/review";
import axios from "axios";
import { Link } from "react-router-dom";
import PizzaCard from "../components/card/pizza-card";

const Home = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		axios
			.get("/api/product/find")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	}, []);

	const pizzaItems = [];

	if (data) {
		data.forEach((item) => {
			if (item.itemCategory === "pizza") {
				pizzaItems.push(item);
			}
		});
	}

	return (
		<div className="">
			<Navbar />
			<Hero />
			<div className="home-image-container">
				<div className="row">
					<div className="row-item"></div>
					<div className="row-item text-row">
						<h3>Welcome to Nova's Pizza.</h3>
						<p>
							Nova's Pizza proudly serves delicious, quality and
							authentic Italian Pizza to the San Francisco east
							bay.
						</p>
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
			<Review />
			<Footer />
		</div>
	);
};

export default Home;
