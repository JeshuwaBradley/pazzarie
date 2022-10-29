import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProduct,
	addDelivery,
	deleteDelivery,
	reset,
	addCoupon,
	removeCoupon,
	addTip,
	removeTip,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import TippingContainer from "../components/tipping-container";
import CartItem from "../components/cart-item";

const Cart = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const [deliver, setDeliver] = useState(false);
	const [promote, setPromote] = useState(true);
	const [shop, setShop] = useState(1);
	const [inputs, setInputs] = useState({});
	const [error, setError] = useState(false);
	const [addressSet, setAddressSet] = useState(false);
	const [deliverySet, setDeliverySet] = useState(false);
	const [notes, setNotes] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	let autoComplete;

	const loadScript = (url, callback) => {
		let script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState) {
			script.onreadystatechange = function () {
				if (
					script.readyState === "loaded" ||
					script.readyState === "complete"
				) {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = () => callback();
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	const handleScriptLoad = (updateQuery) => {
		const componentForm = [
			"location",
			"locality",
			"administrative_area_level_1",
			"country",
			"postal_code",
		];

		const autocompleteInput = document.getElementById("location");
		autoComplete = new window.google.maps.places.Autocomplete(
			autocompleteInput,
			{
				fields: ["address_components", "geometry", "name"],
				types: ["address"],
			}
		);
		// autoComplete.setFields(["address_components", "formatted_address"]);
		autoComplete.addListener("place_changed", function () {
			const place = autoComplete.getPlace();

			if (!place.geometry) {
				window.alert(
					"No details available for input: '" + place.name + "'"
				);
				return;
			}
			fillInAddress(place);
		});
		const fillInAddress = (place) => {
			const addressNameFormat = {
				street_number: "short_name",
				route: "long_name",
				locality: "long_name",
				administrative_area_level_1: "long_name",
				country: "long_name",
				postal_code: "short_name",
			};
			const getAddressComp = function (type) {
				for (const component of place.address_components) {
					if (component.types[0] === type) {
						return component[addressNameFormat[type]];
					}
				}
				return "";
			};
			document.getElementById("location").value =
				getAddressComp("street_number") + " " + getAddressComp("route");
			for (const component of componentForm) {
				if (component !== "location") {
					document.getElementById(component).value =
						getAddressComp(component);
				}
				updateQuery();
			}
		};
	};

	const handleAddressChange = () => {
		let x = document.getElementById("location").value;
		let y = document.getElementById("locality").value;
		let z = document.getElementById("administrative_area_level_1").value;
		let a = document.getElementById("country").value;
		let b = document.getElementById("postal_code").value;
		let g = {
			address: x,
			city: y,
			state: z,
			zip: b,
			country: a,
		};
		setInputs((values) => ({ ...values, ...g }));
		setTimeout(() => setAddressSet(true), 1000);
	};

	const handleDeliveryFee = () => {
		if (!deliverySet) {
			axios
				.post("/api/distance", {
					address: inputs.address,
					city: inputs.city,
					state: inputs.state,
					zip: inputs.zip,
					country: inputs.country,
				})
				.then((response) => {
					let distance =
						response.data.rows[0].elements[0].distance.value;
					if (distance > 5632.7) {
						setError(true);
						setDeliver();
						let input = document.getElementById("deliver");
						input.checked = false;
					} else {
						dispatch(addDelivery(calcDeliveryFee(distance)));
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	if (addressSet && !deliverySet) {
		handleDeliveryFee();
		setDeliverySet(true);
	}

	// useEffect(() => {
	// 	handleScriptLoad(handleAddressChange);
	// });

	useEffect(() => {
		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=handleScriptLoad&solution_channel=GMP_QB_addressselection_v1_cAC`,
			() => handleScriptLoad(handleAddressChange)
		);
	});

	const total = cart.total.toFixed(2);
	const orderItems = [];
	cart.products.forEach((product) => {
		let itemName = product.itemTitle;
		let size;
		if (product.category === "pizza") {
			size =
				product.size == 0 ? "small" : product.size == 1 ? "large" : "";
		} else {
			size =
				product.size == 0
					? "small"
					: product.size == 1
					? "medium"
					: product.size == 2
					? "large"
					: "";
		}
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

	const deliverToMe = (e) => {
		setDeliver(!deliver);
		if (deliver === true) {
			dispatch(deleteDelivery());
			setDeliverySet(false);
			setAddressSet(false);
		}
	};

	const calcDeliveryFee = (distance) => {
		// if (distance <= 5632.7) {
		// 	return 6.99;
		// } else {
		// 	let initialCharge = 6.99;
		// 	let secondHalf = ((distance - 1609) / 804) * 1.5;
		// 	let finalCharge = initialCharge + secondHalf;
		// 	return finalCharge;
		// }
		let finalCharge = 5.99;
		return finalCharge;
	};

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
			if (code === "NOVASPIZZA") {
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
				shop: shop,
				deliver: deliver,
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
						dispatch(reset());
						setLoading(false);
						navigate(`/`);
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
			if (res.status === 200) {
				handleOrder();
			} else {
				console.log(res);
			}
		};
		if (stripeToken) {
			makeRequest();
		}
	}, [stripeToken]);

	const handleNotesForKitchen = (notes) => {
		setNotes(notes);
	};

	return (
		<div>
			<Navbar />
			<div>
				<div className="cart-container">
					<div className="cart-title">
						<h2>Cart</h2>
						<div className="underline"></div>
					</div>
					<div className="cart-main">
						<div className="cart-container-left">
							<div className="cart-table">
								{cart.products.length === 0 ? (
									<div className="empty-cart">
										Your cart is empty. Explore items
										<div className="cart-menu-link">
											<Link to="/menu">Explore</Link>
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
														product={product}
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
												<label htmlFor="" className="">
													Notes for kitchen
												</label>
												<textarea
													name=""
													id=""
													cols="38"
													rows="2"
													onChange={(e) =>
														handleNotesForKitchen(
															e.target.value
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
									<div className="deliver-container">
										<label
											htmlFor="deliver"
											className="switch"
										>
											<input
												type="checkbox"
												name="deliver"
												id="deliver"
												onChange={(e) => deliverToMe(e)}
											/>
											<span className="slider round"></span>
										</label>
										Deliver to my doorstep
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
										${cart.deliveryCharges.toFixed(2)}
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
													placeholder="John Doe (Required)"
													onChange={(e) =>
														handleChange(e)
													}
												/>
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
													placeholder="johndoe@email.com (Required)"
													onChange={(e) =>
														handleChange(e)
													}
												/>
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
													placeholder="+1-123-456-7890 (Required)"
													onChange={(e) =>
														handleChange(e)
													}
												/>
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
														handleCouponCode(e)
													}
												/>
											</div>
										</div>
										{deliver && (
											<>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="address">
															Address:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="address"
															placeholder="250 W Bullard Ave"
															id="location"
															onChange={
																handleChange
															}
														/>
													</div>
												</div>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="city">
															City:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="city"
															placeholder="Clovis"
															id="locality"
															onChange={(e) =>
																handleChange(e)
															}
														/>
													</div>
												</div>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="state">
															State:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="state"
															placeholder="California"
															id="administrative_area_level_1"
															onChange={(e) =>
																handleChange(e)
															}
														/>
													</div>
												</div>
												<div className="form-item">
													<div className="form-label">
														<label htmlFor="zip">
															ZIP:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="zip"
															placeholder="93612"
															id="postal_code"
															onChange={(e) =>
																handleChange(e)
															}
														/>
													</div>
												</div>

												<div className="form-item">
													<div className="form-label">
														<label htmlFor="country">
															Country:
														</label>
													</div>
													<div className="form-input">
														<input
															type="text"
															name="country"
															placeholder="USA"
															id="country"
															onChange={(e) =>
																handleChange(e)
															}
														/>
													</div>
												</div>
											</>
										)}
										{error ? (
											<div className="form-item">
												<p
													style={{
														color: "red",
														fontWeight: "bold",
													}}
												>
													Cannot deliver. Too far
												</p>
											</div>
										) : (
											""
										)}
										<div className="form-item">
											<div className="promotional-checkbox">
												<input
													type="checkbox"
													name="promotion"
													id="promotion"
													onChange={(e) => {
														setPromote(!promote);
													}}
												/>
												<label htmlFor="promotion">
													Yes, we would like to
													receive promotional offers
													from Nova’s pizza.
												</label>
											</div>
										</div>
										<div className="form-item">
											{loading ? (
												<div className="checkout-button">
													<i
														className="fa fa-spinner fa-spin"
														style={{
															marginRight: "5px",
														}}
													></i>
													Placing Order
												</div>
											) : (
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
														onClick={(e) => {
															e.preventDefault();
														}}
														className={
															cart.products
																.length === 0
																? "checkout-button-disabled"
																: "checkout-button"
														}
													>
														Continue Checkout
													</button>
												</StripeCheckout>
											)}
											{/* {paymentError !== "" ? (
												<div className="form-item">
													<p
														style={{
															color: "red",
															fontWeight: "bold",
														}}
													>
														{paymentError}
													</p>
												</div>
											) : (
												""
											)}
											{orderState !== "" ? (
												<div className="form-item">
													<p
														style={{
															color: "red",
															fontWeight: "bold",
														}}
													>
														{orderState}
													</p>
												</div>
											) : (
												""
											)} */}
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Cart;
