import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addUpselling } from "../redux/cartSlice";

const UpsellingItem = ({ item }) => {
	const dispatch = useDispatch();
	const [price, setPrice] = useState(0);
	const [size, setSize] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [extras, setExtras] = useState([]);
	const [crust, setCrust] = useState("classic-pan-tossed");
	const [upsaleItem, setUpsaleItem] = useState(true);

	const handleUpsellSize = (sizeIndex) => {
		setSize(item.itemPrices[sizeIndex].text);
		setPrice(item.itemPrices[sizeIndex].price);
	};
	useEffect(() => {
		if (item?.itemPrices.length > 1) {
			setPrice(item.itemPrices[1].price);
			setSize(item.itemPrices[1].text);
		} else {
			setPrice(item.itemPrices[1].price);
			setSize(item.itemPrices[1].text);
		}
	}, [item.itemPrices]);

	const handleCart = () => {
		dispatch(addUpselling());
		dispatch(
			addProduct({
				...item,
				extras,
				price,
				quantity,
				size,
				crust,
				upsaleItem,
			})
		);
		alert("Product added to cart");
	};
	return (
		<div className="upselling-item">
			<div
				className="upselling-item-image"
				style={{
					backgroundImage: "url(" + `${item.imgSrc}` + ")",
				}}
			></div>
			<div className="upselling-content-div">
				<div className="upselling-item-name">{item.itemTitle}</div>
				<div className="upselling-item-price">$ {price.toFixed(2)}</div>
				<div className="upselling-item-size-select">
					<label htmlFor="upselling-item-size-label">Size</label>
					<select
						name="size"
						id="upselling-item-size"
						defaultValue={1}
						onChange={(e) => handleUpsellSize(e.target.value)}
					>
						{item?.itemPrices.map((size, i) => {
							if (i === 1) {
								return (
									<option id={size?.text} value={i} key={i}>
										{size?.text}
									</option>
								);
							} else {
								return (
									<option id={size?.text} value={i} key={i}>
										{size?.text}
									</option>
								);
							}
						})}
					</select>
				</div>
				<div className="upselling-item-button">
					<button onClick={handleCart}>Add To Cart</button>
				</div>
			</div>
		</div>
	);
};

export default UpsellingItem;
