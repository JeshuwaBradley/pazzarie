import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";

const Card = ({ item }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [price, setPrice] = useState(0);
	const [size, setSize] = useState();
	const [quantity, setQuantity] = useState(1);
	const [extras, setExtras] = useState([]);
	const dispatch = useDispatch();

	const handleClose = () => {
		setModalOpen(false);
	};

	const resetExtras = () => {
		setExtras([]);
		let x = document.querySelectorAll('input[type="checkbox"]:checked');

		x.forEach((item) => {
			item.checked = false;
		});
	};

	const resetQuantity = () => {
		setQuantity(1);
	};

	const handleSize = (sizeIndex) => {
		setSize(sizeIndex);
		setPrice(item.itemPrices[sizeIndex].price);
		resetExtras();
		resetQuantity();
	};

	const handleChange = (e, option) => {
		const checked = e.target.checked;

		if (checked) {
			setPrice(price + option.price);
			setExtras((prev) => [...prev, option]);
		} else {
			setPrice(price - option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	const handleIncrease = () => {
		setQuantity(quantity + 1);
	};

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleCart = () => {
		dispatch(addProduct({ ...item, extras, price, quantity, size }));
		handleClose();
	};

	return (
		<>
			<div className="card-container">
				<div className="card">
					<img
						src={item.imgSrc}
						className="card-image"
						alt="item"
						width="200"
						height="200"
					/>
					<h1 className="card-title">{item.itemTitle}</h1>
					<p className="card-description">{item.itemDesc}</p>
					<span className="card-price">
						$ {item.itemPrices[0].price}
					</span>
					<button
						className="card-link"
						onClick={(e) => setModalOpen(true)}
					>
						Order
					</button>
				</div>
			</div>

			<div className={`${modalOpen ? "modal modal-bg" : "modal"}`}></div>

			<div
				className={`${
					modalOpen
						? "modal-content modal-content-show"
						: "modal-content"
				}`}
			>
				<i
					className="modal-close fa fa-times fa-lg"
					onClick={handleClose}
				></i>

				<div className="modal-left">
					<img className="modal-img" src={item.imgSrc} alt="" />
				</div>

				<div className="modal-right">
					<div className="detail">
						<div className="detail-item">
							<h2 className="detail-title">{item.itemTitle}</h2>

							<p className="detail-description">
								{item.itemDesc}
							</p>
						</div>
						{item?.itemPrices !== 0 ? (
							<div className="detail-item">
								<h3>Choose the size</h3>
								<form
									onChange={(e) => handleSize(e.target.value)}
								>
									{item?.itemPrices.map((size, i) => {
										console.log(size);
										return (
											<div key={i}>
												<input
													type="radio"
													name="size"
													id={size?.text}
													value={i}
												/>
												<label htmlFor={size?.text}>
													{size?.text}
												</label>
											</div>
										);
									})}
								</form>
							</div>
						) : (
							""
						)}
						{item?.extraOptions.length !== 0 ? (
							<div className="detail-item">
								<h3>Choose additional ingredients</h3>
								<form>
									{item?.extraOptions.length !== 0
										? item.extraOptions.map((option, i) => {
												return (
													<div key={i}>
														<input
															type="checkbox"
															id={option?.text}
															name={option?.text}
															value={option?.text}
															onChange={(e) =>
																handleChange(
																	e,
																	option
																)
															}
														/>
														<label
															htmlFor={
																option?.text
															}
														>
															{option?.text}
														</label>
													</div>
												);
										  })
										: ""}
								</form>
							</div>
						) : (
							""
						)}
						<div className="detail-item quantity-box">
							<span onClick={handleIncrease}>+</span>
							<p>{quantity}</p>
							<span onClick={handleDecrease}>-</span>
						</div>
						<div className="detail-item">
							<p className="detail-price">$ {price.toFixed(2)}</p>
						</div>
						<div className="detail-item" onClick={handleCart}>
							<p
								className={
									size == null
										? "detail-bagBtn-disabled"
										: "detail-bagBtn"
								}
							>
								Add to Cart
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
