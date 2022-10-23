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
						</div>
					))}
				</div>
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
