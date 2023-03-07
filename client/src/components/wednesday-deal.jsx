import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPromotion } from "../redux/cartSlice";
import PromotionDealItem from "./deal-item";

const WednesdayDeal = ({ data }) => {
	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState(null);
	const [itemSelected, setItemSelected] = useState(false);
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const extras = [];
	let extrasA = "";
	const quantity = 1;
	const price = 15.5;
	const imgSrc = "https://i.ibb.co/HpL2dTD/CHRISTMAS-PIZZA-SMALLER.jpg";
	let itemTitle;

	const handleCart = () => {
		if (selectedItem) {
			itemTitle =
				`One 12'(Medium) ${selectedItem.item["itemTitle"]}`.toLowerCase();
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

	const close = () => {
		setSelectedItem(null);
		setItemSelected(false);
		setOpen(false);
	};

	return (
		<>
			{open ? (
				<>
					<div className="promotion-deal">
						<div
							className="promotionDeal-main large"
							onClick={() => close()}
						>
							<p
								className="design"
								style={{ textAlign: "center" }}
							>
								Wednesday Special Deal
							</p>
							<p className="topic">
								Get a 12'(Medium) Specialty Pizza only for just
								$15.50
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
							<p
								className="design"
								style={{ textAlign: "center" }}
							>
								Wednesday Special Deal
							</p>
							<p className="topic">
								Get a 12'(Medium) Specialty Pizza only for just
								$15.50
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default WednesdayDeal;
