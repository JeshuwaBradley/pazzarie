import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const DailyDeals = () => {
	return (
		<div>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Daily Deals</h1>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default DailyDeals;
