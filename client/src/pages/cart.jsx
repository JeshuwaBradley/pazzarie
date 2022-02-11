import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { reset, deleteProduct } from "../redux/cartSlice";
import axios from "axios";

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const amount = cart.total;
	const currency = "USD";
	const dispatch = useDispatch();

	// const createOrder = async (data) => {
	// 	try {
	// 		const res = await axios.post("/api/orders", data);
	// 		if (res.status === 201) {
	// 			dispatch(reset());
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const handleDelete = (x) => {
		// console.log(x._id);
		dispatch(deleteProduct(x));
	};

	return (
		<div>
			<Navbar />
			<div>
				<div className="cart-container">
					<div className="cart-title">
						<h2>Your Cart</h2>
					</div>
					<div className="cart-main">
						<div className="cart-container-left">
							<table className="cart-table">
								<thead>
									<tr className="cart-trTitle">
										<th>Product</th>
										<th>Name</th>
										<th>Extras</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{cart?.products?.map((product) => (
										<tr
											className="cart-tr"
											key={product._id}
										>
											<td>
												<div className="cart-imgContainer">
													<img
														src={product.imgSrc}
														layout="fill"
														objectfit="cover"
														width={100}
														height={100}
														alt=""
													/>
												</div>
											</td>
											<td>
												<span className="cart-name">
													{product.itemTitle}
												</span>
											</td>
											<td>
												<div className="cart-extras">
													{product.extras.map(
														(extra) => (
															<p key={extra._id}>
																{extra.text},
															</p>
														)
													)}
												</div>
											</td>
											<td>
												<span className="cart-price">
													$ {product.price.toFixed(2)}
												</span>
											</td>
											<td>
												<span className="cart-quantity">
													{product.quantity}
												</span>
											</td>
											<td>
												<span className="cart-total">
													$
													{(
														product.price *
														product.quantity
													).toFixed(2)}
												</span>
											</td>
											<td>
												<span
													style={{
														fontSize: "1.5em",
														color: "#d1411e",
														cursor: "pointer",
													}}
													onClick={() =>
														handleDelete(product)
													}
												>
													<i
														className="fa fa-trash"
														aria-hidden="true"
													></i>
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="cart-container-right">
							<div className="cart-container-right-wrapper">
								<h2 className="cart-total-title">CART TOTAL</h2>
								<div className="totalText">
									<b className="totalTextTitle">Subtotal:</b>$
									{cart.total.toFixed(2)}
								</div>
								<div className="totalText">
									<b className="totalTextTitle">Discount:</b>
									$0.00
								</div>
								<div className="totalText">
									<b className="totalTextTitle">Total:</b>$
									{cart.total.toFixed(2)}
								</div>
								<button className="checkout-button">
									CHECKOUT NOW!
								</button>
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
