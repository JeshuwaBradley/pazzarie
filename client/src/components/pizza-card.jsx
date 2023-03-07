import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import UpsellingContainer from "./upselling-container";
import ReactGA from "react-ga";

const PizzaCard = ({ item, data }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [price, setPrice] = useState(0);
	const [size, setSize] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [extras, setExtras] = useState([]);
	const [crust, setCrust] = useState("classic-pan-tossed");
	const [addedToCart, setAddedToCart] = useState(false);
	const dispatch = useDispatch();

	let string = item.itemDesc;
	if (string.length > 90) {
		string = string.substring(0, 90) + "...";
	}

	useEffect(() => {
		if (item?.itemPrices.length > 1) {
			setPrice(item.itemPrices[1].price);
			setSize(item.itemPrices[1].text);
		} else {
			setPrice(item.itemPrices[1].price);
			setSize(item.itemPrices[1].text);
		}
	}, [item.itemPrices]);

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
		setSize(item.itemPrices[sizeIndex].text);
		setPrice(item.itemPrices[sizeIndex].price);
		resetExtras();
		resetQuantity();
		ReactGA.event({
			category: "select",
			action: `Changed ${item.itemTitle} size to ${item.itemPrices[sizeIndex].text}`,
		});
	};

	const handleCrust = (value) => {
		setCrust(value);
		ReactGA.event({
			category: "select",
			action: `Changed ${item.itemTitle} crust to ${value}`,
		});
		const checked = value.target?.checked;
		if (checked) {
			setCrust(value.target.value);
		}
	};

	const handleChange = (e, option) => {
		const checked = e.target?.checked;
		if (checked) {
			setPrice(price + option.price);
			setExtras((prev) => [...prev, option]);
		} else {
			setPrice(price - option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	const [specialNotes, setSpecialNotes] = useState("");

	const handleSpecialNotes = (notes) => {
		setSpecialNotes(notes);
	};

	const handleIncrease = () => {
		setQuantity(quantity + 1);
		ReactGA.event({
			category: "button",
			action: `Increased the quantity to ${quantity + 1}`,
		});
	};

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
			ReactGA.event({
				category: "button",
				action: `Decreased the quantity to ${quantity - 1}`,
			});
		}
	};

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [addedToCart]);

	const handleCart = () => {
		dispatch(
			addProduct({
				...item,
				extras,
				price,
				quantity,
				size,
				crust,
				specialNotes,
			})
		);
		setAddedToCart(true);
		ReactGA.event({
			category: "Button",
			action: `Added ${item.itemTitle}  to cart`,
		});
		alert("Product added to cart");
	};

	return (
		<>
			<div className="card">
				<div
					className="card-image-container"
					style={
						`${item.imgSrc}`.slice(0, 5) === "https"
							? {
									backgroundImage:
										"url(" + `${item.imgSrc}` + ")",
							  }
							: {
									backgroundImage:
										"url(" + `/img/${item.imgSrc}` + ")",
							  }
					}
				>
					<div className="card-front-price">$ {price.toFixed(2)}</div>
					<div className="card-front-button">
						<button onClick={() => setModalOpen(true)}>
							Customize
							<span>
								<i className="fa fa-solid fa-arrow-right"></i>
							</span>
						</button>
					</div>
				</div>
				<div className="card-desc-container">
					<div className="card-front-title">
						<p
							style={{ cursor: "pointer" }}
							onClick={() => setModalOpen(true)}
						>
							{item.itemTitle}
						</p>
					</div>
					<div className="card-front-desc">
						<p>{string}</p>
					</div>
					<div className="card-cart-container-main">
						<div className="card-cart-container">
							<div className="card-front-size">
								<label htmlFor="size">Size</label>
								<select
									id="sizes"
									className="select"
									defaultValue={1}
									onChange={(e) => handleSize(e.target.value)}
								>
									{item?.itemPrices.map((size, i) => {
										if (i === 1) {
											return (
												<option
													id={size?.text}
													value={i}
													key={i}
												>
													{size?.text}
												</option>
											);
										} else {
											return (
												<option
													id={size?.text}
													value={i}
													key={i}
												>
													{size?.text}
												</option>
											);
										}
									})}
								</select>
							</div>
							<div className="card-front-crust">
								<label htmlFor="crust">Crust</label>
								<select
									id="crust"
									className="select"
									defaultValue={"Classic hand toasted"}
									onChange={(e) =>
										handleCrust(e.target.value)
									}
								>
									<option value="Classic hand toasted">
										Classic pan tossed
									</option>
									<option value="thin crust">
										Thin crust
									</option>
								</select>
							</div>
						</div>
						<div className="card-cart-container">
							<div className="card-front-add-button">
								<button onClick={handleCart}>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`${modalOpen ? "modal modal-bg" : "modal"}`}
				onClick={() => setModalOpen(false)}
			></div>

			<div
				className={`${
					modalOpen
						? "modal-content modal-content-show"
						: "modal-content"
				}`}
				id="scroll-to-bottom"
			>
				<div ref={messagesEndRef} />
				{addedToCart && item?.upsellingItems ? (
					<span
						className="modal-close go-back"
						onClick={(e) => {
							setAddedToCart(false);
						}}
					>
						<i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
						Go Back
					</span>
				) : null}
				<i
					className="modal-close fa fa-times fa-lg"
					onClick={(e) => {
						setAddedToCart(false);
						handleClose();
					}}
				></i>
				{addedToCart ? (
					<>
						<UpsellingContainer data={data} />
					</>
				) : (
					<div className="modal-main-container">
						<div className="modal-left">
							<img
								loading="lazy"
								className="modal-img"
								alt={item.itemTitle}
								// src={`/img/${item.imgSrc}`}
								src={
									`${item.imgSrc}`.slice(0, 5) === "https"
										? `${item.imgSrc}`
										: `/img/${item.imgSrc}`
								}
							/>
							{/* <img className="modal-img" src={item.imgSrc} alt="" /> */}
						</div>

						<div className="modal-right">
							<div className="detail">
								<div className="detail-item">
									<h2 className="detail-title">
										{item.itemTitle}
									</h2>

									<p className="detail-description">
										{item.itemDesc}
									</p>
								</div>
								<div className="detail-item">
									<h3>Choose the crust</h3>
									<form
										onChange={(e) =>
											handleCrust(e.target.value)
										}
									>
										<div>
											<input
												type="radio"
												name="size"
												id="classic-pan-tossed"
												value="classic-pan-tossed"
											/>
											<label htmlFor="classic-pan-tossed">
												Classic Pan Tossed
											</label>
										</div>
										<div>
											<input
												type="radio"
												name="size"
												id="thin-crust"
												value="thin-crust"
											/>
											<label htmlFor="thin-crust">
												Thin Crust
											</label>
										</div>
									</form>
								</div>
								{item?.itemPrices !== 0 ? (
									<div className="detail-item">
										<h3>Choose the size</h3>
										<form
											onChange={(e) =>
												handleSize(e.target.value)
											}
										>
											{item?.itemPrices.map((size, i) => {
												return (
													<div key={i}>
														<input
															type="radio"
															name="size"
															id={`${size?.text}${item.itemTitle}`}
															value={i}
														/>
														<label
															htmlFor={`${size?.text}${item.itemTitle}`}
														>
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
												? item.extraOptions.map(
														(option, i) => {
															return (
																<div key={i}>
																	<input
																		type="checkbox"
																		id={`${option?.text}${item.itemTitle}`}
																		name={
																			option?.text
																		}
																		value={
																			option?.text
																		}
																		onChange={(
																			e
																		) =>
																			handleChange(
																				e,
																				option
																			)
																		}
																	/>
																	<label
																		htmlFor={`${option?.text}${item.itemTitle}`}
																	>
																		{
																			option?.text
																		}
																	</label>
																</div>
															);
														}
												  )
												: ""}
										</form>
									</div>
								) : (
									""
								)}
								<div className="detail-item">
									<label htmlFor="" className="">
										Notes for kitchen
									</label>
									<textarea
										name=""
										id=""
										cols="30"
										rows="2"
										onChange={(e) =>
											handleSpecialNotes(e.target.value)
										}
									></textarea>
								</div>
								<div className="detail-item quantity-box">
									<span onClick={handleIncrease}>+</span>
									<p>{quantity}</p>
									<span onClick={handleDecrease}>-</span>
								</div>
								<div className="detail-item">
									<p className="detail-price">
										$ {price.toFixed(2)}
									</p>
								</div>
								<div
									className="detail-item"
									onClick={handleCart}
								>
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
				)}
			</div>
		</>
	);
};

export default PizzaCard;
