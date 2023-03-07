import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPromotion } from "../redux/cartSlice";
import PromotionDealItem from "./deal-item";

const SaturdayDeal = ({ data }) => {
	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState([]);
	const [itemSelected, setItemSelected] = useState(false);
	const [open, setOpen] = useState(false);

	const extras = [];
	const quantity = 1;
	const specialNotes = "";
	const price = 35;
	const imgSrc = "https://i.ibb.co/HpL2dTD/CHRISTMAS-PIZZA-SMALLER.jpg";
	let itemTitle;

	const handleCart = () => {
		if (itemSelected) {
			itemTitle =
				`One 15'(Large) ${selectedItem[0].item["itemTitle"]} & One 15'(Large) ${selectedItem[1].item["itemTitle"]}`.toLowerCase();
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
							<p
								className="design"
								style={{ textAlign: "center" }}
							>
								Saturday Special Deal
							</p>
							<p className="topic">
								Get any two large (15' Inches) Traditional Pizza
								for just only $35
							</p>
						</div>
						<div className="promotionalDeal-secondary">
							<p className="promotion-selection">
								Select any two pizzas
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
							<p
								className="design"
								style={{ textAlign: "center" }}
							>
								Saturday Special Deal
							</p>
							<p className="topic">
								Get any two large (15' Inches) Traditional Pizza
								for just only $35
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default SaturdayDeal;
