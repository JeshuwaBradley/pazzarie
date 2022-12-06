import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProduct,
	reset,
	addCoupon,
	removeCoupon,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import TippingContainer from "../components/tipping-container";
import CartItem from "../components/cart-item";
import PickUpDeliver from "../components/pickup-deliver";

const Cart = () => {
	useEffect(() => {
		document.title = "Cart Page | Nova's Pizza";
	}, []);
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);

	const [promote, setPromote] = useState(true);
	const [inputs, setInputs] = useState({});
	const [notes, setNotes] = useState("");
	const [loading, setLoading] = useState(false);
	const [paymentError, setPaymentError] = useState("");
	const [button, setButton] = useState(false);
	const [success, setSuccess] = useState(false);
	const [inputError, setInputError] = useState(false);

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
		product.extras.map((item) => {
			extras.push(item.text);
		});
		orderItems.push({
			itemName: itemName,
			size: size,
			crust: crust,
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
		let code = e.target.value;
		code = code.toString().toUpperCase();
		if (cart.discount === 0) {
			if (code === "NOVASPIZZA" || code === "NOVASGIFT") {
				dispatch(addCoupon(10));
			}
			if (code === "15DISCOUNT") {
				dispatch(addCoupon(15));
			}
			if (code === "20DISCOUNT") {
				dispatch(addCoupon(20));
			}
		}
		if (cart.discount !== 0 && code !== "NOVASPIZZA") {
			dispatch(removeCoupon());
		}
	};

	const [stripeToken, setStripeToken] = useState(null);

	const onToken = (token) => {
		setStripeToken(token);
	};

	useEffect(() => {
		const handleOrder = async (e) => {
			let x = {
				...inputs,
				shop: Number(cart.shop),
				deliver: cart.pickUporDeliver,
				notes: notes,
				promote: promote,
				orderItems: orderItems,
				tip: cart.tip,
				discount: cart.discount,
				total: total,
			};
			axios
				.post("/api/order/", { ...x })
				.then((response) => {
					if (response.status === 200) {
						setSuccess(true);
						dispatch(reset());
						setLoading(false);
						// navigate(`/`);
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

	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);

	useEffect(() => {
		const d = new Date();
		let day = d.getDay();
		let time = d.getHours();
		if (day === 1) {
			setOpen(false);
		} else if (day === 2 || day === 3 || day === 4 || day === 0) {
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
									{cart.pickUporDeliver === "deliver" ? (
										<p>
											Your order will be delivered in 15
											minutes to the given
										</p>
									) : (
										<p>
											Your order will be ready in 15
											minutes <br />
											You can collect it from <br />
											<strong>
												1706 University Ave, Berkeley,
												CA 94703, USA.
											</strong>
										</p>
									)}
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
														<label htmlFor="mobile">
															Coupon Code:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="mobile"
															placeholder="Coupon Code"
															onChange={(e) =>
																handleCouponCode(
																	e
																)
															}
														/>
													</div>
												</div>
												<PickUpDeliver
													inputs={inputs}
													setInputs={setInputs}
													setButton={setButton}
													inputError={inputError}
												/>
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
												) : (
													<>
														<div
															className="form-item"
															style={{
																justifyContent:
																	"center",
															}}
														>
															<button
																className="checkout-button"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	setOpenError(
																		true
																	);
																}}
															>
																Continue
																Checkout
															</button>
														</div>
														{openError === true ? (
															<div className="form-item">
																<p
																	style={{
																		color: "red",
																	}}
																>
																	Shops are
																	closed
																</p>
															</div>
														) : (
															""
														)}
													</>
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
