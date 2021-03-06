import React, { useState } from "react";

const Modal = ({ order, setOpen }) => {
	const handleClose = () => {
		setOpen(false);
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
						<div>Order ID : {order._id}</div>
						<div>Shop No: : {order.shop}</div>
					</div>
					<div className="shop-modal-column">
						<div>Customer : {order.customer}</div>
						<div>Customer Phone: {order.mobile}</div>
						<div>
							Items Deliver:{" "}
							{order.deliver === true ? "Deliver" : "Pickup"}
						</div>
						{order.deliver === true ? (
							<div>
								Customer Address: {order.address}, {order.city},{" "}
								{order.state}, {order.zip}.
							</div>
						) : (
							""
						)}
						<div>No. of Items: {order.orderItems.length}</div>
					</div>
				</div>
				<div className="shop-modal-row">
					<h3>Order Items</h3>
				</div>
				{order.orderItems?.map((item, i) => (
					<div className="shop-modal-row" key={i}>
						<div>Item Name: {item.itemName}</div>
						<div>Item Size: {item.size}</div>
						<div>
							Extras:{" "}
							{item?.extras?.map((extra, i) => (
								<span key={i}>
									{extra}
									{", "}
								</span>
							))}
						</div>
						<div>Quantity: {item.quantity}</div>
					</div>
				))}
				{console.log(order)}
			</div>
		</>
	);
};

const ShopItem = ({ order }) => {
	const [open, setOpen] = useState(false);
	const orderStatus =
		order.status === 0
			? "Ordered"
			: order.status === 1
			? "Preparing"
			: order.status === 2
			? "Delivered"
			: "";
	return (
		<React.Fragment>
			<div className="shop-table-row" onClick={() => setOpen(true)}>
				<div className="shop-table-row-id">
					<p>{order._id.slice(0, 9)}</p>
				</div>
				<div className="shop-table-row-customer">
					<p>{order.customer}</p>
				</div>
				<div className="shop-table-row-number">
					<p>{order.orderItems.length}</p>
				</div>
				<div className="shop-table-row-deliver">
					<p>{order.deliver === true ? "Deliver" : "Pickup"}</p>
				</div>
				<div className="shop-table-row-status">
					<p>{orderStatus}</p>
				</div>
			</div>
			{open ? <Modal order={order} setOpen={setOpen} /> : ""}
		</React.Fragment>
	);
};

export default ShopItem;
