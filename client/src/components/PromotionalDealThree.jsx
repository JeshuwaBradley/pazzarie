import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPromotion } from "../redux/cartSlice";
import PromotionDealItem from "./deal-item";

const PromotionalDealThree = ({ data }) => {
	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState(null);
	const [itemSelected, setItemSelected] = useState(false);
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const extras = [];
	let extrasA = "";
	const quantity = 1;
	const price = 45;
	const imgSrc = "https://i.ibb.co/HpL2dTD/CHRISTMAS-PIZZA-SMALLER.jpg";
	let itemTitle;

	const handleCart = () => {
		if (selectedItem) {
			itemTitle =
				`One Large ${selectedItem.item["itemTitle"]} & One medium cheese Bread & 12 BBQ Wings`.toLowerCase();
			dispatch(addPromotion());
			dispatch(
				addProduct({ itemTitle, price, extras, quantity, imgSrc })
			);
			alert("Product added to cart");
			setOpen(false);
		} else {
			alert("Select any one pizza before clicking add to cart");
		}
	};

	const addToSelect = (item) => {
		setSelectedItem(item);
		setItemSelected(true);
	};

	const removeFromSelect = () => {
		setSelectedItem(null);
		setItemSelected(false);
	};

	return (
		<>
			{open ? (
				<>
					<div className="promotion-deal">
						<div
							className="promotionDeal-main large"
							onClick={() => setOpen(false)}
						>
							<p className="design">Seasonal Treating</p>
							<p className="topic">
								Get 1 Large Specialty Pizza, 12 Peices of BBQ
								Wings and 1 Medium Cheese Bread for $45.
							</p>
						</div>
						<div className="promotionalDeal-secondary">
							<p className="promotion-selection">
								Select one pizza
							</p>
						</div>
						<div className="promotion-select">
							{data.slice(3, data?.length).map((item, i) => {
								if (item.itemCategory === "pizza") {
									return (
										<PromotionDealItem
											item={item}
											addToSelect={addToSelect}
											removeFromSelect={removeFromSelect}
											itemSelected={itemSelected}
											key={i}
										/>
									);
								} else {
									return null;
								}
							})}
						</div>
						<div
							className="promotion-button"
							onClick={() => {
								handleCart();
							}}
						>
							Add To Cart
						</div>
					</div>
				</>
			) : (
				<>
					<div
						className="promotionDeal"
						onClick={() => setOpen(true)}
					>
						<div className="promotionDeal-main">
							<p className="design">Seasonal Treating</p>
							<p className="topic">
								Get 1 Large Specialty Pizza, 12 Peices of BBQ
								Wings and 1 Medium Cheese Bread for $45.
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default PromotionalDealThree;
