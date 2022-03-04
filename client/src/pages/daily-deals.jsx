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
					<h1>Deals of the Day</h1>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default DailyDeals;
