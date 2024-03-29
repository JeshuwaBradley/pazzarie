import React from "react";

const CartItem = ({ product, handleDelete, i }) => {
	let string = product.itemTitle;
	if (string.length > 15) {
		string = string.substring(0, 15) + "...";
	}
	return (
		<div className="cart-row" key={i}>
			<div className="cart-column">
				<img
					loading="lazy"
					src={product.imgSrc}
					layout="fill"
					objectfit="cover"
					className="cart-item-image"
					alt={product.itemTitle}
				/>
			</div>
			<div className="cart-column">
				<span className="cart-name">{string}</span>
			</div>
			<div className="cart-column">
				<div className="cart-extras">
					{product.extras.map((extra) => (
						<p key={extra._id}>{extra.text},</p>
					))}
				</div>
			</div>
			<div className="cart-column">
				<span className="cart-price">${product.price.toFixed(2)}</span>
			</div>
			<div className="cart-column">
				<span className="cart-quantity">{product.quantity}</span>
			</div>
			<div className="cart-column">
				<span className="cart-total">
					${(product.price * product.quantity).toFixed(2)}
				</span>
			</div>
			<div className="cart-column">
				<span
					style={{
						fontSize: "1.5em",
						color: "#d1411e",
						cursor: "pointer",
					}}
					onClick={() => handleDelete(product)}
				>
					<i className="fa fa-trash" aria-hidden="true"></i>
				</span>
			</div>
		</div>
	);
};

export default CartItem;
