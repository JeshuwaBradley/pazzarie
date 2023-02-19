import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PromotionDeal from "../components/promotion-deal";
import PromotionDealTwo from "../components/promotionDealTwo";
import PromotionalDealThree from "../components/PromotionalDealThree";
import PromotionDealFour from "../components/promotionDealFour";

const Promotion = ({ data }) => {
	useEffect(() => {
		document.title = "Promotions | Nova's Pizza";
	}, []);
	return (
		<div>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Promotions</h1>
				</div>
			</div>
			<div className="promotion-container">
				<PromotionDealFour data={data} />
				<PromotionDeal data={data} />
				<PromotionalDealThree data={data} />
				<PromotionDealTwo />
			</div>
			<Footer />
		</div>
	);
};

export default Promotion;
