import React, { lazy, Suspense, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProduct,
	reset,
	addCoupon,
	removeCoupon,
	addDiscountCode,
	removeDiscountCode,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import TippingContainer from "../components/tipping-container";
import CartItem from "../components/cart-item";
// import PickUpDeliver from "../components/pickup-deliver";
const PickUpDeliver = lazy(() => import("../components/pickup-deliver"));

const Cart = ({ discountCodes }) => {
	useEffect(() => {
		document.title = "Cart Page | Nova's Pizza";
	}, []);
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);

	const [promote, setPromote] = useState(false);
	const [inputs, setInputs] = useState({});
	const [customer, setCustomer] = useState("");
	const [notes, setNotes] = useState("");
	const [loading, setLoading] = useState(false);
	const [paymentError, setPaymentError] = useState("");
	const [button, setButton] = useState(false);
	const [success, setSuccess] = useState(false);
	const [inputError, setInputError] = useState(false);
	const [promotionError, setPromotionError] = useState(false);
	const [discountCode, setDiscountCode] = useState("");
	const [orderDeliver, setOrderDeliver] = useState(false);
	const [limitError, setLimitError] = useState(false);
	const [selectedDay, setSelectedDay] = useState("");
	const [preOrderTime, setPreOrderTime] = useState("early");
	const [selectedTime, setSelectedTime] = useState("");

	const dispatch = useDispatch();

	const total = cart.total.toFixed(2);
	const orderItems = [];
	cart.products.forEach((product) => {
		let itemName = product.itemTitle;
		let size = product.size;
		let quantity = product.quantity;
		let itemPrice = product.price.toFixed(2);
		let itemTotal =
			(product.price * product.quantity).toFixed(2) || product.itemTotal;
		let extras = [];
		let crust = product.crust;
		let specialNotes = product.specialNotes;
		product.extras.map((item) => {
			extras.push(item.text);
		});
		orderItems.push({
			itemName: itemName,
			size: size,
			crust: crust,
			specialNotes: specialNotes,
			quantity: quantity,
			itemPrice: itemPrice,
			itemTotal: itemTotal,
			extras: extras,
		});
	});

	const handleDelete = (x) => {
		dispatch(deleteProduct(x));
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleCouponCode = (e) => {
		if (cart.promotion === true) {
			setPromotionError(true);
		} else if (cart.upselling === true) {
			setPromotionError(true);
		} else {
			let code = e.target.value;
			code = code.toString().trim().toUpperCase();
			discountCodes?.map((item) => {
				if (cart.discount === 0 && item.code === code) {
					if (item?.limit) {
						if (cart.total >= item.limit) {
							setPromotionError(false);
							setLimitError(false);
							dispatch(addCoupon(item.percent));
							dispatch(addDiscountCode(code));
							setDiscountCode(code);
						} else {
							setLimitError(true);
						}
					} else {
						setPromotionError(false);
						setLimitError(false);
						dispatch(addCoupon(item.percent));
						dispatch(addDiscountCode(code));
						setDiscountCode(code);
					}
				}
			});
			if (cart.discount === 0) {
				if (code === "NOVASPIZZA") {
					setPromotionError(false);
					setLimitError(false);
					dispatch(addCoupon(10));
					dispatch(addDiscountCode(code));
					setDiscountCode(code);
				}
			}
			if (cart.discount !== 0 && code !== "NOVASPIZZA") {
				dispatch(removeCoupon());
				setDiscountCode("");
				dispatch(removeDiscountCode());
			}
		}
	};

	const [stripeToken, setStripeToken] = useState(null);

	const onToken = (token) => {
		setStripeToken(token);
	};

	const sendReciept = async (data) => {
		await axios
			.post("/api/receipt/", { ...data })
			.then((res) => {
				setSuccess(true);
				dispatch(reset());
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	useEffect(() => {
		const handleOrder = async (e) => {
			let x = {
				...inputs,
				customer: customer,
				shop: Number(cart.shop),
				deliver: cart.pickUporDeliver,
				notes: notes,
				promote: promote,
				orderItems: orderItems,
				tip: cart.tip,
				discount: cart.discount,
				discountCode: cart.discountCode,
				preOrderDate: selectedDay,
				preOrderTime: selectedTime,
				total: total,
			};
			await axios
				.post("/api/order/", { ...x })
				.then((response) => {
					if (response.status === 200) {
						if (validateEmail(response.data.email)) {
							sendReciept(response);
						} else {
							setSuccess(true);
							dispatch(reset());
							setLoading(false);
						}
						if (response.data.deliver === "pickup") {
							setOrderDeliver(false);
						} else {
							setOrderDeliver(true);
						}
						setLoading(false);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		};

		const makeRequest = async () => {
			setLoading(true);
			const res = await axios.post("/api/checkout/payment", {
				tokenId: stripeToken.id,
				amount: total * 100,
			});
			if (res.data?.statusCode === 402) {
				setStripeToken(null);
				setLoading(false);
				setPaymentError(res.data.raw.message);
			} else {
				handleOrder();
			}
		};
		if (stripeToken) {
			setPaymentError("");
			makeRequest();
		}
	}, [stripeToken]);

	const handleNotesForKitchen = (notes) => {
		setNotes(notes);
	};

	const days = [
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const early = [
		"11:15 a.m",
		"11:30 a.m",
		"11:45 a.m",
		"12:00 p.m",
		"12:15 p.m",
		"12:30 p.m",
		"12:45 p.m",
		"01:00 p.m",
		"01:15 p.m",
		"01:30 p.m",
		"01:45 p.m",
		"02:00 p.m",
		"02:15 p.m",
		"02:30 p.m",
		"02:45 p.m",
		"03:00 p.m",
		"03:15 p.m",
		"03:30 p.m",
		"03:45 p.m",
		"04:00 p.m",
		"04:15 p.m",
		"04:30 p.m",
		"04:45 p.m",
		"05:00 p.m",
		"05:15 p.m",
		"05:30 p.m",
		"05:45 p.m",
		"06:00 p.m",
		"06:15 p.m",
		"06:30 p.m",
		"06:45 p.m",
		"07:00 p.m",
		"07:15 p.m",
		"07:30 p.m",
		"07:45 p.m",
		"08:00 p.m",
		"08:15 p.m",
		"08:30 p.m",
		"08:45 p.m",
		"09:00 p.m",
		"09:15 p.m",
		"09:30 p.m",
		"09:45 p.m",
		"10:00 p.m",
		"10:15 p.m",
		"10:30 p.m",
		"10:45 p.m",
		"11:00 p.m",
		"11:15 p.m",
		"11:30 p.m",
		"11:45 p.m",
		"12:00 a.m",
		"12:15 a.m",
		"12:30 a.m",
		"12:45 a.m",
	];

	const late = [
		"04:15 p.m",
		"04:30 p.m",
		"04:45 p.m",
		"05:00 p.m",
		"05:15 p.m",
		"05:30 p.m",
		"05:45 p.m",
		"06:00 p.m",
		"06:15 p.m",
		"06:30 p.m",
		"06:45 p.m",
		"07:00 p.m",
		"07:15 p.m",
		"07:30 p.m",
		"07:45 p.m",
		"08:00 p.m",
		"08:15 p.m",
		"08:30 p.m",
		"08:45 p.m",
		"09:00 p.m",
		"09:15 p.m",
		"09:30 p.m",
		"09:45 p.m",
		"10:00 p.m",
		"10:15 p.m",
		"10:30 p.m",
		"10:45 p.m",
		"11:00 p.m",
		"11:15 p.m",
		"11:30 p.m",
		"11:45 p.m",
		"12:00 a.m",
		"12:15 a.m",
		"12:30 a.m",
		"12:45 a.m",
	];

	const handlePreOrderDays = (e) => {
		setSelectedDay(e.target.value);
		if (
			e.target.value === "Tuesday" ||
			e.target.value === "Wednesday" ||
			e.target.value === "Thursday" ||
			e.target.value === "Sunday"
		) {
			setPreOrderTime("late");
		} else {
			setPreOrderTime("early");
		}
	};

	const handlePreOrderTime = (e) => {
		setSelectedTime(e.target.value);
	};

	const handleCustomer = (e) => {
		setCustomer(e.target.value);
	};

	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);

	let serverOpenS;
	useEffect(() => {
		const d = new Date();
		let day = d.getDay();
		const dayByName = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		let time = d.getHours();
		axios.get("/api/open").then((res) => {
			serverOpenS = res.data["open"];
			if (serverOpenS) {
				if (day === 1) {
					if (time < 1) {
						setOpen(true);
					} else {
						setOpen(false);
					}
				} else if (day === 2) {
					if (time < 16) {
						setOpen(false);
					} else {
						setOpen(true);
					}
				} else if (day === 0) {
					if (time >= 1 && time < 16) {
						setOpen(false);
					} else {
						setOpen(true);
					}
				} else if (day === 3 || day === 4) {
					if (time >= 1 && time < 16) {
						setOpen(false);
					} else {
						setOpen(true);
					}
				} else if (day === 5 || day === 6) {
					if (time >= 1 && time < 11) {
						setOpen(false);
					} else {
						setOpen(true);
					}
				}
			} else if (!serverOpenS) {
				setOpen(false);
			}
		});
	}, []);

	return (
		<div>
			<Navbar />
			<div>
				<div className="cart-container">
					{success ? (
						<div
							style={{
								height: "30em",
								position: "relative",
								paddingTop: "30px",
								paddingBottom: "30px",
							}}
						>
							<div
								className="success-message"
								style={{
									textAlign: "center",
									maxWidth: " 500px",
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
								}}
							>
								<svg
									viewBox="0 0 76 76"
									className="success-message__icon icon-checkmark"
									style={{
										maxWidth: "75px",
									}}
								>
									<circle
										cx="38"
										cy="38"
										r="36"
										style={{
											fill: "#3DC480",
											transformOrigin: "50% 50%",
											transition:
												"transform 200ms cubic-bezier(.22, .96, .38, .98)",
											transform: "scale(1)",
										}}
									/>
									<path
										fill="none"
										stroke="#FFFFFF"
										strokeWidth="5"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeMiterlimit="10"
										d="M17.7,40.9l10.9,10.9l28.7-28.7"
										style={{
											transition:
												"stroke-dashoffset 350ms ease",
											transitionDelay: "100ms",
										}}
									/>
								</svg>
								<h1
									className="success-message__title"
									style={{
										color: "#3DC480",
										opacity: "0",
										transform: "translateY(25px)",

										transition: "all 200ms ease",
									}}
								>
									Order has been placed
								</h1>
								<div
									className="success-message__content"
									style={{
										color: "#000",
										transition: "all 200ms ease",
										transitionDelay: "50ms",
										transform: "translateY(0)",
										opacity: "1",
										lineHeight: "25px",
									}}
								>
									<p>Order has been placed</p>
								</div>
							</div>
						</div>
					) : (
						<>
							<div className="cart-title">
								<h2>Cart</h2>
								<div className="underline"></div>
							</div>
							<div className="cart-main">
								<div className="cart-container-left">
									<div className="cart-table">
										{cart.products.length === 0 ? (
											<div className="empty-cart">
												Your cart is empty. Explore
												items
												<div className="cart-menu-link">
													<Link to="/menu">
														Explore
													</Link>
												</div>
											</div>
										) : (
											<>
												<div className="cart-row-main">
													<div className="cart-row">
														<div className="cart-column">
															<h3>Product</h3>
														</div>
														<div className="cart-column">
															<h3>Name</h3>
														</div>
														<div className="cart-column">
															<h3>Extras</h3>
														</div>
														<div className="cart-column">
															<h3>Price</h3>
														</div>
														<div className="cart-column">
															<h3>Quantity</h3>
														</div>
														<div className="cart-column">
															<h3>Total</h3>
														</div>
														<div className="cart-column">
															<h3>Actions</h3>
														</div>
													</div>
													{cart?.products?.map(
														(product, i) => (
															<CartItem
																product={
																	product
																}
																handleDelete={
																	handleDelete
																}
																key={i}
															/>
														)
													)}
												</div>
												<div className="cart-message-area">
													<div className="message-area">
														<label
															htmlFor=""
															className=""
														>
															Notes for kitchen
														</label>
														<textarea
															name=""
															id=""
															cols="38"
															rows="2"
															onChange={(e) =>
																handleNotesForKitchen(
																	e.target
																		.value
																)
															}
														></textarea>
													</div>
												</div>
											</>
										)}
									</div>
									<div className="total-container">
										<div className="total-container-inner">
											<div className="total-container-text">
												Discount
											</div>
											<div className="total-container-total">
												${cart.discount.toFixed(2)}
											</div>
										</div>
										<div className="total-container-inner">
											<div className="total-container-text">
												Subtotal
											</div>
											<div className="total-container-total">
												${cart.subtotal.toFixed(2)}
											</div>
										</div>
										<div className="total-container-inner">
											<div className="total-container-text">
												Sales-Tax
											</div>
											<div className="total-container-total">
												${cart.salesTax.toFixed(2)}
											</div>
										</div>
										<div className="total-container-inner">
											<div className="total-container-text">
												Delivery Fee
											</div>
											<div className="total-container-total">
												$
												{cart.deliveryCharges.toFixed(
													2
												)}
											</div>
										</div>
										<div className="total-container-inner">
											<div className="total-container-text">
												Tip
											</div>
											<div className="total-container-total">
												${cart.tip.toFixed(2)}
											</div>
										</div>
										<TippingContainer />
										<div className="total-container-inner">
											<div className="total-container-text">
												Total to pay
											</div>
											<div className="total-container-total">
												${cart.total.toFixed(2)}
											</div>
										</div>
									</div>
								</div>
								<div className="cart-container-right">
									<div className="checkout-form">
										<div className="form-title">
											<h2>Customer Information</h2>
										</div>
										<div className="form">
											<form action="">
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="customer">
															Customer Name:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="customer"
															id="customer"
															style={
																inputError
																	? {
																			borderColor:
																				"red",
																	  }
																	: null
															}
															placeholder="John Doe (Required)"
															onChange={(e) =>
																handleCustomer(
																	e
																)
															}
														/>
														{inputError ? (
															<small>
																Required
															</small>
														) : null}
													</div>
												</div>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="email">
															Customer Email:
														</label>
													</div>
													<div className="form-input">
														<input
															type="email"
															name="email"
															id="email"
															style={
																inputError
																	? {
																			borderColor:
																				"red",
																	  }
																	: null
															}
															placeholder="johndoe@email.com (Required)"
															onChange={(e) =>
																handleChange(e)
															}
														/>
														{inputError ? (
															<small>
																Required
															</small>
														) : null}
													</div>
												</div>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="mobile">
															Customer Mobile:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="mobile"
															id="mobile"
															style={
																inputError
																	? {
																			borderColor:
																				"red",
																	  }
																	: null
															}
															placeholder="+1-123-456-7890 (Required)"
															onChange={(e) =>
																handleChange(e)
															}
														/>
														{inputError ? (
															<small>
																Required
															</small>
														) : null}
													</div>
												</div>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="couponCode">
															Coupon Code:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="couponCode"
															placeholder="Coupon Code"
															onChange={(e) =>
																handleCouponCode(
																	e
																)
															}
														/>
													</div>
												</div>
												{limitError ? (
													<div className="form-item">
														<div className="form-label"></div>
														<div
															className="form-input"
															style={{
																color: "red",
															}}
														>
															Cart total is below
															the coupon limit
														</div>
													</div>
												) : null}
												{promotionError ? (
													<div className="form-item">
														<div className="form-label"></div>
														<div
															className="form-input"
															style={{
																color: "red",
															}}
														>
															Cannot use coupon
															code
														</div>
													</div>
												) : null}

												<div className="form-item">
													<div className="form-label">
														<label htmlFor="address">
															Pre-Order Date:
														</label>
													</div>
													<div className="form-input">
														<select
															name="location"
															style={
																inputError &&
																open === false
																	? {
																			borderColor:
																				"red",
																	  }
																	: null
															}
															onChange={(e) =>
																handlePreOrderDays(
																	e
																)
															}
														>
															<option value="">
																-Select-
															</option>
															{days?.map(
																(day, i) => (
																	<option
																		key={i}
																		value={
																			day
																		}
																	>
																		{day}
																	</option>
																)
															)}
														</select>
														{inputError &&
														open === false ? (
															<small>
																Required
															</small>
														) : null}
													</div>
												</div>
												{selectedDay !== "" ? (
													<div className="form-item">
														<div className="form-label">
															<label htmlFor="address">
																Pre-Order Time:
															</label>
														</div>
														<div className="form-input">
															<select
																name="location"
																style={
																	inputError &&
																	open ===
																		false
																		? {
																				borderColor:
																					"red",
																		  }
																		: null
																}
																onChange={(e) =>
																	handlePreOrderTime(
																		e
																	)
																}
															>
																<option value="">
																	-Select
																</option>
																{preOrderTime ===
																"early"
																	? early?.map(
																			(
																				time,
																				i
																			) => (
																				<option
																					key={
																						i
																					}
																					value={
																						time
																					}
																				>
																					{
																						time
																					}
																				</option>
																			)
																	  )
																	: preOrderTime ===
																	  "late"
																	? late?.map(
																			(
																				time,
																				i
																			) => (
																				<option
																					key={
																						i
																					}
																					value={
																						time
																					}
																				>
																					{
																						time
																					}
																				</option>
																			)
																	  )
																	: ""}
															</select>
															{inputError &&
															open === false ? (
																<small>
																	Required
																</small>
															) : null}
														</div>
													</div>
												) : (
													""
												)}
												<Suspense
													fallback={
														<div>Loading...</div>
													}
												>
													<PickUpDeliver
														inputs={inputs}
														setInputs={setInputs}
														setButton={setButton}
														inputError={inputError}
													/>
												</Suspense>

												<div className="form-item">
													<div className="promotional-checkbox">
														<input
															type="checkbox"
															name="promotion"
															id="promotion"
															onChange={(e) => {
																setPromote(
																	!promote
																);
															}}
														/>
														<label htmlFor="promotion">
															Yes, we would like
															to receive
															promotional offers
															from Nova’s pizza.
														</label>
													</div>
												</div>
												{open === true ? (
													<div className="form-item">
														{button === false ? (
															<button
																className="checkout-button"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	setInputError(
																		true
																	);
																}}
															>
																Continue
																Checkout
															</button>
														) : loading ? (
															<div className="checkout-button">
																<i
																	className="fa fa-spinner fa-spin"
																	style={{
																		marginRight:
																			"5px",
																	}}
																></i>
																Placing Order
															</div>
														) : (
															<StripeCheckout
																name="Nova's Pizza"
																description={`Your total is $${cart.total}`}
																amount={
																	total * 100
																}
																token={onToken}
																stripeKey={
																	process.env
																		.REACT_APP_PUBLISHABLE_KEY
																}
															>
																<button
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																	}}
																	className={
																		cart
																			.products
																			.length ===
																		0
																			? "checkout-button-disabled"
																			: "checkout-button"
																	}
																>
																	Continue
																	Checkout
																</button>
															</StripeCheckout>
														)}
													</div>
												) : cart.products.length !==
														0 &&
												  customer !== "" &&
												  selectedDay !== "" &&
												  selectedTime !== "" &&
												  button !== false &&
												  loading ? (
													<div className="form-item">
														<div className="checkout-button">
															<i
																className="fa fa-spinner fa-spin"
																style={{
																	marginRight:
																		"5px",
																}}
															></i>
															Placing Order
														</div>
													</div>
												) : cart.products.length !==
														0 &&
												  customer !== "" &&
												  selectedDay !== "" &&
												  selectedTime !== "" &&
												  button !== false ? (
													<div className="form-item">
														<StripeCheckout
															name="Nova's Pizza"
															description={`Your total is $${cart.total}`}
															amount={total * 100}
															token={onToken}
															stripeKey={
																process.env
																	.REACT_APP_PUBLISHABLE_KEY
															}
														>
															<button
																onClick={(
																	e
																) => {
																	e.preventDefault();
																}}
																className={
																	cart
																		.products
																		.length ===
																	0
																		? "checkout-button-disabled"
																		: "checkout-button"
																}
															>
																Continue
																Checkout
															</button>
														</StripeCheckout>
													</div>
												) : (
													<div className="form-item">
														<button
															className="checkout-button"
															onClick={(e) => {
																e.preventDefault();
																setInputError(
																	true
																);
																alert(
																	"Shops are closed. You can preorder instead"
																);
															}}
														>
															Continue Checkout
														</button>
													</div>
												)}
											</form>
											{paymentError ? (
												<div className="form-item">
													<p
														style={{
															color: "red",
															fontWeight: "bold",
															textAlign: "center",
														}}
													>
														{paymentError}
													</p>
												</div>
											) : (
												""
											)}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Cart;
