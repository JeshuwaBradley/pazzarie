import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPromotion } from "../redux/cartSlice";
import PromotionDealItem from "./deal-item";

const PromotionDeal = ({ data }) => {
	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState(null);
	const [itemSelected, setItemSelected] = useState(false);
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const extras = [];
	let extrasA = "";
	const quantity = 1;
	const price = 40;
	const imgSrc = "https://i.ibb.co/HpL2dTD/CHRISTMAS-PIZZA-SMALLER.jpg";
	let itemTitle;

	const handleCart = () => {
		if (selectedItem) {
			itemTitle = `One Large ${selectedItem.item["itemTitle"]} ${
				extrasA !== "" ? "with " + extrasA : ""
			} & One Large cheese Bread & 6 BBQ Wings`.toLowerCase();
			dispatch(addPromotion());
			dispatch(
				addProduct({ itemTitle, price, extras, quantity, imgSrc })
			);
			alert("Product added to cart");
			close();
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

	const addExtra = (e) => {
		extrasA += `${e.target.value} `;
	};

	const close = () => {
		setSelectedItem(null);
		setItemSelected(false);
		setOpen(false);
	};

	return (
		<>
			{open ? (
				<>
					<div className="promotion-deal large">
						<div
							className="promotionDeal-main large"
							onClick={() => close()}
						>
							<p className="design">Special Promotion</p>
							<p className="topic">
								Get a large traditional two topping Pizza, one
								large Cheese Bread, and six pieces of BBQ wings
								for $40.
							</p>
						</div>
						<div className="promotionalDeal-secondary">
							<p className="promotion-selection">
								Select one pizza
							</p>
						</div>
						<div className="promotion-select">
							{data.slice(0, 3).map((item, i) => {
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
						{selectedItem === null ? null : (
							<>
								<p className="promotion-selection">
									Select extra-options
								</p>
								<div className="promoionDeal-extras">
									{selectedItem.item["extraOptions"].map(
										(item, i) => {
											return (
												<div
													className="promotionDeal-extra"
													key={i}
												>
													<input
														type="checkbox"
														id={item["text"]}
														name={item["text"]}
														value={item["text"]}
														onChange={(e) => {
															addExtra(e);
														}}
													/>
													<label
														htmlFor={item["text"]}
													>
														{item["text"]}
													</label>
												</div>
											);
										}
									)}
								</div>
							</>
						)}
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
							<p className="design">Special Promotion</p>
							<p className="topic">
								Get a large traditional two topping Pizza, one
								large Cheese Bread, and six pieces of bbq wings
								for $40.
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default PromotionDeal;
