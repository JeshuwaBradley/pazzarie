import axios from "axios";
import React, { useState } from "react";

const Modal = ({ order, setOpen }) => {
	const handleClose = () => {
		setOpen(false);
	};
	const orderStatus = (status) => {
		if (status === 0) {
			return (status = "Ordered");
		} else if (status === 1) {
			return (status = "Ready");
		} else if (status === 2) {
			return (status = "Delivered");
		}
	};
	const createDate = (data) => {
		let date = new Date(data);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();
		let hour = date.getHours();
		let min = date.getMinutes();
		return `${hour}:${min} - ${day}/${month}/${year}`;
	};
	const handleUpdateReady = async (id) => {
		try {
			const res = await axios.put(`/api/order/status/${id}`, {
				status: 1,
			});
			if (res.status === 200) {
				setOpen(false);
			}
			console.log(res.status);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateDelivered = async (id) => {
		try {
			const res = await axios.put(`/api/order/status/${id}`, {
				status: 2,
			});
			if (res.status === 200) {
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="shop-modal shop-modal-bg"></div>
			<div className="shop-modal-content shop-modal-content-show">
				<i
					className="shop-modal-close fa fa-times fa-lg"
					onClick={handleClose}
				></i>
				<div className="shop-modal-row first">
					<div className="shop-modal-column">
						<div>
							Order ID : <span className="bold">{order._id}</span>
						</div>
						<div>
							Shop No: <span className="bold">{order.shop}</span>
						</div>
						<div>
							Time/Date:
							<span className="bold">
								{createDate(order.createdAt)}
							</span>
						</div>
					</div>
					<div className="shop-modal-column">
						<div>
							Customer Name:
							<span className="bold">{order.customer}</span>
						</div>
						<div>
							Customer Phone:
							<span className="bold">{order.mobile}</span>
						</div>
						<div>
							Items Deliver:
							<span className="bold">
								{/* {order.deliver === true ? "Deliver" : "Pickup"} */}
								{order.deliver}
							</span>
						</div>
						{order.deliver === "deliver" ? (
							<div>
								Customer Address:{" "}
								<span className="bold">
									{order.address}, {order.city}, {order.state}
									, {order.zip}
								</span>
							</div>
						) : (
							""
						)}
						<div>
							No. of Items:{" "}
							<span className="bold">
								{order.orderItems.length}
							</span>
						</div>
						<div>
							Order Status:{" "}
							<span className="bold">
								{orderStatus(order.status)}
							</span>
						</div>

						<div>
							Special Notes:{" "}
							<span className="bold">{order.notes}</span>
						</div>
					</div>
				</div>
				<div className="shop-modal-row">
					<h3>Order Items</h3>
				</div>
				<div className="shop-modal-row-main">
					{order.orderItems?.map((item, i) => (
						<div className="shop-modal-row-item" key={i}>
							<div>
								Item Name:{" "}
								<span className="bold">{item.itemName}</span>
							</div>
							<div>
								Item Size:{" "}
								<span className="bold">{item.size}</span>
							</div>
							<div className="">
								Item Crust:{" "}
								<span className="bold">{item.crust}</span>
							</div>
							<div>
								Extras:{" "}
								{item?.extras?.map((extra, i) => (
									<span key={i}>
										<span className="bold">{extra}</span>
										{", "}
									</span>
								))}
							</div>
							<div>
								Quantity:{" "}
								<span className="bold">{item.quantity}</span>
							</div>
							<div>
								Additional Notes:{" "}
								<span className="bold">
									{item.specialNotes}
								</span>
							</div>
						</div>
					))}
				</div>
				{order.status !== 2 ? (
					<div className="shop-modal-row buttons">
						<div className="">
							<label htmlFor="">Update order status:</label>
							{order.status === 0 ? (
								<button
									onClick={() => handleUpdateReady(order._id)}
								>
									Ready
								</button>
							) : order.status === 1 ? (
								<button
									onClick={() =>
										handleUpdateDelivered(order._id)
									}
								>
									Delivered
								</button>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};

const ShopItem = ({ order }) => {
	const [open, setOpen] = useState(false);
	const orderStatus = (status) => {
		if (status === 0) {
			return "Ordered";
		} else if (status === 1) {
			return "Ready";
		} else if (status === 2) {
			return "Delivered";
		}
	};

	const createDate = (data) => {
		let date = new Date(data);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();
		let hour = date.getHours();
		let min = date.getMinutes();
		return `${hour}:${min} - ${day}/${month}/${year}`;
	};
	return (
		<React.Fragment>
			<div className="shop-table-row" onClick={() => setOpen(true)}>
				<div className="shop-table-row-id">
					<p>{createDate(order.createdAt)}</p>
				</div>
				<div className="shop-table-row-customer">
					<p>{order.customer}</p>
				</div>
				<div className="shop-table-row-number">
					<p>{order.orderItems.length}</p>
				</div>
				<div className="shop-table-row-deliver">
					{/* <p>{order.deliver === true ? "Deliver" : "Pickup"}</p> */}
					<p style={{ textTransform: "capitalize" }}>
						{order.deliver}
					</p>
				</div>
				<div className="shop-table-row-status">
					<p>{orderStatus(order.status)}</p>
				</div>
			</div>
			{open ? <Modal order={order} setOpen={setOpen} /> : ""}
		</React.Fragment>
	);
};

export default ShopItem;
