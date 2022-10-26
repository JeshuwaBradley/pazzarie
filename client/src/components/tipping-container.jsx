import { set } from "mongoose";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTip, removeTip } from "../redux/cartSlice";

const TippingContainer = () => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [ten, setTen] = useState(false);
	const [fifteen, setFifteen] = useState(false);
	const [twenty, setTwenty] = useState(false);
	const [twentyFive, setTwentyFive] = useState(false);
	const [tips, setTips] = useState(false);
	const handleTip = (amount) => {
		setTips(true);
		if (amount === 10) {
			setTen(true);
			setFifteen(false);
			setTwenty(false);
			setTwentyFive(false);
			dispatch(removeTip());
			let tip = (cart.subtotal * amount) / 100;
			let tipFixed = Math.round(tip * 100) / 100;
			dispatch(addTip(tipFixed));
		} else if (amount === 15) {
			setTen(false);
			setFifteen(true);
			setTwenty(false);
			setTwentyFive(false);
			dispatch(removeTip());
			let tip = (cart.subtotal * amount) / 100;
			let tipFixed = Math.round(tip * 100) / 100;
			dispatch(addTip(tipFixed));
		} else if (amount === 20) {
			setTen(false);
			setFifteen(false);
			setTwenty(true);
			setTwentyFive(false);
			dispatch(removeTip());
			let tip = (cart.subtotal * amount) / 100;
			let tipFixed = Math.round(tip * 100) / 100;
			dispatch(addTip(tipFixed));
		} else if (amount === 25) {
			setTen(false);
			setFifteen(false);
			setTwenty(false);
			setTwentyFive(true);
			dispatch(removeTip());
			let tip = (cart.subtotal * amount) / 100;
			let tipFixed = Math.round(tip * 100) / 100;
			dispatch(addTip(tipFixed));
		}
	};
	const removeTips = () => {
		setTips(false);
		setTen(false);
		setFifteen(false);
		setTwenty(false);
		setTwentyFive(false);
		dispatch(removeTip());
	};
	// const handleOtherTip = () => {
	// 	setTen(false);
	// 	setFifteen(false);
	// 	setTwenty(false);
	// 	setTwentyFive(false);
	// 	setOtherTip(true);
	// 	dispatch(removeTip());
	// };
	// const oTip = (e) => {
	// 	let tip = e.target.value;
	// 	tip = Number(tip);
	// 	if (tip > 0) {
	// 		dispatch(addTip(tip));
	// 	} else {
	// 		dispatch(removeTip());
	// 	}
	// };

	return (
		<>
			<div className="total-container-inner tipping">
				<div
					className={ten ? "tip on" : "tip"}
					onClick={() => handleTip(10)}
				>
					10%
				</div>
				<div
					className={fifteen ? "tip on" : "tip"}
					onClick={() => handleTip(15)}
				>
					15%
				</div>
				<div
					className={twenty ? "tip on" : "tip"}
					onClick={() => handleTip(20)}
				>
					20%
				</div>
				<div
					className={twentyFive ? "tip on" : "tip"}
					onClick={() => handleTip(25)}
				>
					25%
				</div>
				{tips ? (
					<div className="tip" onClick={removeTips}>
						Cancel
					</div>
				) : (
					""
				)}
				{/* <div
					className={otherTip ? "tip on" : "tip"}
					onClick={handleOtherTip}
				>
					Other
				</div> */}
			</div>
			{/* {otherTip ? (
				<div className="total-container-inner otherTip">
					<input
						type="number"
						name=""
						id=""
						onChange={(e) => oTip(e)}
					/>
				</div>
			) : (
				""
			)} */}
		</>
	);
};

export default TippingContainer;
