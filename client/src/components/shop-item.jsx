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
				<div className="shop-modal-row">
					<div className="shop-modal-column">
						Order ID : {order._id}
					</div>
					<div className="shop-modal-column">
						Customer : {order.customer}
					</div>
				</div>
				<div className="shop-modal-row">
					<div className="shop-modal-column">
						Customer Phone: {order.mobile}
					</div>
					<div className="shop-modal-column">
						Shop No: : {order.shop}
					</div>
				</div>
				<p></p>
				<p>{order.shop}</p>
				<p>{order.email}</p>
				<p></p>
				<p></p>
				<p>{order.deliver === true ? "True" : "False"}</p>
				{order.orderItems?.map((item) => (
					<>
						<p>{item.itemName}</p>
						<p>{item.size}</p>
						{item?.extras?.map((extra) => (
							<p>{extra}</p>
						))}
						<p>{item.quantity}</p>
					</>
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
