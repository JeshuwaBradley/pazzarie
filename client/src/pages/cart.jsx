import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProduct,
	addDelivery,
	deleteDelivery,
	reset,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [deliver, setDeliver] = useState(false);
	const [inputs, setInputs] = useState({});
	const dispatch = useDispatch();

	const total = cart.total.toFixed(2);
	const orderItems = [];
	cart.products.forEach((product) => {
		let itemName = product.itemTitle;
		let size =
			product.size == 0
				? "small"
				: product.size == 1
				? "medium"
				: product.size == 2
				? "large"
				: "";
		let quantity = product.quantity;
		let itemPrice = product.price.toFixed(2);
		let itemTotal = (product.price * product.quantity).toFixed(2);
		let extras = [];
		product.extraOptions.map((item) => {
			extras.push(item.text);
		});
		orderItems.push({
			itemName: itemName,
			size: size,
			quantity: quantity,
			itemPrice: itemPrice,
			itemTotal: itemTotal,
			extras: extras,
		});
	});

	const deliverToMe = (e) => {
		setDeliver(!deliver);
		const checked = e.target.checked;
		if (checked) {
			dispatch(addDelivery(200));
		} else {
			dispatch(deleteDelivery(200));
		}
	};

	const handleDelete = (x) => {
		dispatch(deleteProduct(x));
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleOrder = (e) => {
		e.preventDefault();
		let x = {
			...inputs,
			orderItems: orderItems,
			total: total,
		};
		axios
			.post("http://localhost:5000/api/order/", { ...x })
			.then((response) => {
				console.log(response);
				dispatch(reset());
			})
			.catch((error) => {
				console.log(error);
			});
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
									<div>
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
										{cart?.products?.map((product, i) => (
											<div className="cart-row" key={i}>
												<div className="cart-column">
													<img
														src={product.imgSrc}
														layout="fill"
														objectfit="cover"
														className="cart-item-image"
														alt=""
													/>
												</div>
												<div className="cart-column">
													<span className="cart-name">
														{product.itemTitle}
													</span>
												</div>
												<div className="cart-column">
													<div className="cart-extras">
														{product.extras.map(
															(extra) => (
																<p
																	key={
																		extra._id
																	}
																>
																	{extra.text}
																	,
																</p>
															)
														)}
													</div>
												</div>
												<div className="cart-column">
													<span className="cart-price">
														$
														{product.price.toFixed(
															2
														)}
													</span>
												</div>
												<div className="cart-column">
													<span className="cart-quantity">
														{product.quantity}
													</span>
												</div>
												<div className="cart-column">
													<span className="cart-total">
														$
														{(
															product.price *
															product.quantity
														).toFixed(2)}
													</span>
												</div>
												<div className="cart-column">
													<span
														style={{
															fontSize: "1.5em",
															color: "#d1411e",
															cursor: "pointer",
														}}
														onClick={() =>
															handleDelete(
																product
															)
														}
													>
														<i
															className="fa fa-trash"
															aria-hidden="true"
														></i>
													</span>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
							<div className="total-container">
								<div className="total-container-inner">
									<div className="deliver-container">
										<input
											type="checkbox"
											name="deliver"
											id="deliver"
											onChange={(e) => deliverToMe(e)}
										/>
										<label htmlFor="deliver">
											Deliver the goods to me
										</label>
									</div>
								</div>
								<div className="total-container-inner">
									<div className="total-container-text">
										Subtotal: $
									</div>
									<div className="total-container-total">
										{cart.total.toFixed(2)}
									</div>
								</div>
								<div className="total-container-inner">
									<div className="total-container-text">
										Discount: $
									</div>
									<div className="total-container-total">
										0.00
									</div>
								</div>
								<div className="total-container-inner">
									<div className="total-container-text">
										Total to pay: $
									</div>
									<div className="total-container-total">
										{cart.total.toFixed(2)}
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
													placeholder="John Doe"
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
													placeholder="johndoe@email.com"
													onChange={(e) =>
														handleChange(e)
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
															onChange={(e) =>
																handleChange(e)
															}
														/>
													</div>
												</div>
											</>
										)}
										<div className="form-item">
											<button
												onClick={(e) => handleOrder(e)}
											>
												Continue Checkout
											</button>
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
