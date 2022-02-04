import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Cart = () => {
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
								<tr className="cart-trTitle">
									<th>Product</th>
									<th>Name</th>
									<th>Extras</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Total</th>
									<th>Actions</th>
								</tr>
								<tr className="cart-tr">
									<td>
										<div className="cart-imgContainer">
											<img
												src="/img/pizza.png"
												layout="fill"
												objectFit="cover"
												width={100}
												height={100}
												alt=""
											/>
										</div>
									</td>
									<td>
										<span className="cart-name">
											CORALZO
										</span>
									</td>
									<td>
										<span className="cart-extras">
											Double ingredient, spicy sauce
										</span>
									</td>
									<td>
										<span className="cart-price">
											$19.90
										</span>
									</td>
									<td>
										<span className="cart-quantity">2</span>
									</td>
									<td>
										<span className="cart-total">
											$39.80
										</span>
									</td>
									<td>
										<span
											style={{
												fontSize: "1.5em",
												color: "#d1411e",
												cursor: "pointer",
											}}
										>
											<i
												class="fa fa-trash"
												aria-hidden="true"
											></i>
										</span>
									</td>
								</tr>
								<tr className="cart-tr">
									<td>
										<div className="cart-imgContainer">
											<img
												src="/img/pizza.png"
												layout="fill"
												objectFit="cover"
												width={100}
												height={100}
												alt=""
											/>
										</div>
									</td>
									<td>
										<span className="cart-name">
											CORALZO
										</span>
									</td>
									<td>
										<span className="cart-extras">
											Double ingredient, spicy sauce
										</span>
									</td>
									<td>
										<span className="cart-price">
											$19.90
										</span>
									</td>
									<td>
										<span className="cart-quantity">2</span>
									</td>
									<td>
										<span className="cart-total">
											$39.80
										</span>
									</td>
									<td>
										<span
											style={{
												fontSize: "1.5em",
												color: "#d1411e",
												cursor: "pointer",
											}}
										>
											<i
												class="fa fa-trash"
												aria-hidden="true"
											></i>
										</span>
									</td>
								</tr>
							</table>
						</div>
						<div className="cart-container-right">
							<div className="cart-container-right-wrapper">
								<h2 className="cart-total-title">CART TOTAL</h2>
								<div className="totalText">
									<b className="totalTextTitle">Subtotal:</b>
									$79.60
								</div>
								<div className="totalText">
									<b className="totalTextTitle">Discount:</b>
									$0.00
								</div>
								<div className="totalText">
									<b className="totalTextTitle">Total:</b>
									$79.60
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
