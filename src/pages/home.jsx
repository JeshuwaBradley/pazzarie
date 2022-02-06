import React from "react";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Navbar from "../components/navbar";

const Home = () => {
	return (
		<div className="">
			<Navbar />
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
						<h3>Welcome to edible happy pizzerie</h3>
						<p>
							Edible happy pizzerie proudly serves delicious food
							to the greater oakland community
						</p>
					</div>
					<div className="row-item"></div>
				</div>
			</div>
			{/* <div className="productList">
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
			</div> */}
			<Footer />
		</div>
	);
};

export default Home;
