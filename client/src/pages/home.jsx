import React from "react";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Review from "../components/review";
import Card from "../components/card";

const Home = () => {
	const item = {
		imgSrc: "/img/pizza.png",
		itemTitle: "FIORI DI ZUCCA",
		itemDesc: "Lorem ipsum dolor sit amet consectetur aduofsfs elit.",
		itemPrices: [19.9, 12.9, 10],
		extraOptions: [],
	};
	return (
		<div className="">
			{/* <Navbar /> */}
			<Hero />
			<div className="home-image-container">
				<div className="row">
					<div className="row-item"></div>
					<div className="row-item text-row">
						<h3>Welcome to edible happy pizzerie</h3>
						<p>
							Edible happy pizzerie proudly serves delicious food
							to the greater oakland community
						</p>
					</div>
				</div>
				<div className="row">
					<div className="row-item text-row">
						<h3>The best pizza you can get in town</h3>
						<p>
							Get a taste of the best pizza you can get in the
							town of Oakland.
						</p>
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
						<Card item={item} />
						<Card item={item} />
						<Card item={item} />
					</div>
					<a href="/menu" className="productList-menu-link">
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
					</a>
				</div>
			</div>
			<Review />
			<Footer />
		</div>
	);
};

export default Home;
