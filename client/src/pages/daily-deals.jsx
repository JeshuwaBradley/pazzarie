import React, { useEffect } from "react";
import Footer from "../components/footer";
import FridayDeal from "../components/friday-deal";
import Navbar from "../components/navbar";
import SaturdayDeal from "../components/saturday-deal";
import SundayDeal from "../components/sunday-deal";
import ThursdayDeal from "../components/thursday-deal";
import TuesdayDeal from "../components/tuesday-deal";
import WednesdayDeal from "../components/wednesday-deal";

const DailyDeals = ({ data }) => {
	useEffect(() => {
		document.title = "Daily Deals | Nova's Pizza - Order Online";
	}, []);
	let date = new Date();
	date = date.getDay();
	return (
		<div>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Deals of the Day</h1>
				</div>
			</div>
			<div className="deals" style={{ padding: "50px 10px" }}>
				{date === 0 ? <SundayDeal data={data} /> : null}
				{date === 2 ? <TuesdayDeal data={data} /> : null}
				{date === 3 ? <WednesdayDeal data={data} /> : null}
				{date === 4 ? <ThursdayDeal data={data} /> : null}
				{date === 5 ? <FridayDeal data={data} /> : null}
				{date === 6 ? <SaturdayDeal data={data} /> : null}
			</div>
			<Footer />
		</div>
	);
};

export default DailyDeals;
