import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/navbar";

const Admin = () => {
	const [orders, setOrders] = useState(null);
	const [products, setProducts] = useState(null);
	let total = 0;

	useEffect(() => {
		axios
			.get("/api/order/find")
			.then((res) => {
				setOrders(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get("/api/product/find")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	if (orders !== null) {
		orders.map((order) => {
			let x = order.total;
			total += x;
		});
	}

	return (
		<div className="admin">
			<Navbar />
			<div className="admin-main-one">
				<div className="numbers-container">
					<div className="numbers-container-inner white">
						<h3 className="small-title">Total Orders</h3>
						<h2 className="large-title">{orders?.length}</h2>
					</div>
				</div>
				<div className="numbers-container">
					<div className="numbers-container-inner blue">
						<h3 className="small-title">Total Sales</h3>
						<h2 className="large-title white">
							${total.toFixed(2)}
						</h2>
					</div>
				</div>
				<div className="numbers-container">
					<div className="numbers-container-inner pink">
						<h3 className="small-title">Total Products</h3>
						<h2 className="large-title white">
							{products?.length}
						</h2>
					</div>
				</div>
				<div className="numbers-container">
					<div className="numbers-container-inner black">
						<h3 className="small-title">Total Shops</h3>
						<h2 className="large-title white">250</h2>
					</div>
				</div>
			</div>
			<div className="admin-main-two">
				<div className="main-two-section-one">
					<h2>Products</h2>
					<div className="products-table">
						<div className="products-table-body">
							<div className="products-image">
								<h2>Image</h2>
							</div>
							<div className="products-desc">
								<h2>Description</h2>
							</div>
							<div className="products-action">
								<h2>Action</h2>
							</div>
						</div>
						{products?.map((product, i) => (
							<div className="products-table-body" key={i}>
								<div className="products-image">
									<img
										src={product.imgSrc}
										layout="fill"
										objectfit="cover"
										className="cart-item-image"
										alt=""
									/>
								</div>
								<div className="products-desc">
									<h3>{product.itemTitle} </h3>
									<p>
										Price: $ {product.itemPrices[0]} -{" "}
										{product.itemPrices[2]}
									</p>
								</div>
								<div className="products-action">
									<span
										style={{
											fontSize: "1.5em",
											color: "#d1411e",
											cursor: "pointer",
										}}
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
				</div>
				<div className="main-two-section-two">
					<h2>Orders</h2>
					<div className="orders-table">
						<div className="orders-table-body">
							<div className="order-id">
								<h2>ID</h2>
							</div>
							<div className="order-customer">
								<h2>Customer</h2>
							</div>
							<div className="order-total">
								<h2>Total</h2>
							</div>
							<div className="order-payment">
								<h2>Payment</h2>
							</div>
							<div className="order-action">
								<h2>Action</h2>
							</div>
						</div>
						{orders?.map((order) => (
							<div className="orders-table-body">
								<div className="order-id">
									<p>{order._id.slice(0, 5)}</p>
								</div>
								<div className="order-customer">
									<p>{order.customer}</p>
								</div>
								<div className="order-total">
									<p>{order.total}</p>
								</div>
								<div className="order-payment">
									<div className="order-success">success</div>
								</div>
								<div className="order-action">
									<span
										style={{
											fontSize: "1.5em",
											color: "#d1411e",
											cursor: "pointer",
										}}
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
				</div>
			</div>
		</div>
	);
};

export default Admin;
