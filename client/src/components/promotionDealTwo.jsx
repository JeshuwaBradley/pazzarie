import React from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPromotion } from "../redux/cartSlice";

const PromotionDealTwo = () => {
	const dispatch = useDispatch();
	const quantity = 1;
	const imgSrc = "https://i.ibb.co/HpL2dTD/CHRISTMAS-PIZZA-SMALLER.jpg";
	const price = 40;
	const itemTitle = "Two Large Cheese Bread & 12 BBQ Wings";
	const extras = [];
	const addToCart = () => {
		dispatch(addPromotion());
		dispatch(addProduct({ quantity, price, itemTitle, extras, imgSrc }));
		dispatch(addPromotion());
		alert("Item added to cart");
	};
	return (
		<div className="promotionDeal">
			<div className="promotionDeal-main">
				<p className="design">Special Promotion</p>
				<p className="topic">
					Get Two Large Cheese Bread and 12 Chicken wings for $40
				</p>
			</div>
			<div className="promotionDeal-secondary">
				<div className="promotionDealTwo-button" onClick={addToCart}>
					Add To Cart
				</div>
			</div>
		</div>
	);
};

export default PromotionDealTwo;
