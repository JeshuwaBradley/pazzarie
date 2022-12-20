import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PromotionDeal from "../components/promotion-deal";
import PromotionDealTwo from "../components/promotionDealTwo";
import PromotionalDealThree from "../components/PromotionalDealThree";

const Promotion = ({ data }) => {
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
				<PromotionDeal data={data} />
				<PromotionalDealThree data={data} />
				<PromotionDealTwo />
			</div>
			<Footer />
		</div>
	);
};

export default Promotion;
