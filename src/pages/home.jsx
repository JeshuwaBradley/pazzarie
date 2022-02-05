import React from "react";
import Card from "../components/card";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Navbar from "../components/navbar";

const Home = () => {
	return (
		<div className="">
			<Navbar />
			<Hero />
			<div className="productList">
				<div className="productList-title-container">
					<h2 className="productList-title">Our Menu</h2>
					<hr className="productList-hr" />
				</div>
				<div className="productList-container">
					<div className="productList-wrapper">
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
