import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPromotion } from "../redux/cartSlice";
import PromotionDealItem from "./deal-item";

const PromotionDealFour = ({ data }) => {
	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState([]);
	const [itemSelected, setItemSelected] = useState(false);
	const [open, setOpen] = useState(false);

	const [selectedAppetizer, setSelectedAppetizer] = useState(null);
	const [appetizerSelected, setAppetizerSelected] = useState(false);
	const extras = [];
	const quantity = 1;
	const specialNotes = "";
	const price = 70;
	const imgSrc = "https://i.ibb.co/HpL2dTD/CHRISTMAS-PIZZA-SMALLER.jpg";
	let itemTitle;

	const handleCart = () => {
		if (itemSelected) {
			if (appetizerSelected) {
				itemTitle =
					`One Large ${selectedItem[0].item["itemTitle"]}, One Large ${selectedItem[1].item["itemTitle"]}, One Large cheese Bread & 18 ${selectedAppetizer.item["itemTitle"]}`.toLowerCase();
				console.log(itemTitle);
				dispatch(addPromotion());
				dispatch(
					addProduct({
						itemTitle,
						price,
						extras,
						quantity,
						specialNotes,
						imgSrc,
					})
				);
				alert("Product added to cart");
				setOpen(false);
			} else {
				alert("Select any type of wings before clicking add to cart");
			}
		} else {
			alert("Select two pizzas before clicking add to cart");
		}
	};

	const addToSelect = (item) => {
		setSelectedItem((prevItems) => [...prevItems, item]);
		if (selectedItem.length === 1) {
			setItemSelected(true);
		}
	};

	const removeFromSelect = (x) => {
		const y = selectedItem.find((item) => item.itemTitle === x.itemTitle);
		selectedItem.splice(selectedItem.indexOf(y), 1);
		setItemSelected(false);
	};
	console.log(selectedItem);
	console.log(selectedItem.length);

	const close = () => {
		setSelectedItem([]);
		setItemSelected(false);
		setSelectedAppetizer(null);
		setAppetizerSelected(false);
		setOpen(false);
	};

	const addAppetizer = (item) => {
		setSelectedAppetizer(item);
		setAppetizerSelected(true);
	};
	const removeAppetizer = () => {
		setSelectedAppetizer(null);
		setAppetizerSelected(false);
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
							<p className="design">Super Ball Promotion</p>
							<p className="topic">
								Get 2 large Speciality Pizzas, one large Cheese
								Bread, and 18 pieces of BBQ wings for $70.
							</p>
						</div>
						<div className="promotionalDeal-secondary">
							<p className="promotion-selection">
								Select any two pizzas
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
						{selectedItem ? (
							<>
								<div className="promotionalDeal-secondary">
									<p className="promotion-selection">
										Select any type of wings
									</p>
								</div>
								<div className="promotion-select">
									{data.map((item, i) => {
										if (item.itemCategory === "appetizer") {
											if (
												item.itemTitle !==
												"Cheese Bread"
											) {
												return (
													<PromotionDealItem
														item={item}
														addToSelect={
															addAppetizer
														}
														removeFromSelect={
															removeAppetizer
														}
														itemSelected={
															appetizerSelected
														}
														key={i}
													/>
												);
											}
										} else {
											return null;
										}
									})}
								</div>
							</>
						) : (
							""
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
							<p className="design">Super Ball Promotion</p>
							<p className="topic">
								Get 2 large Speciality Pizzas, one large Cheese
								Bread, and 18 pieces of BBQ wings for $70.
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default PromotionDealFour;
