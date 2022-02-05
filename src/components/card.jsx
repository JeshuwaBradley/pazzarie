import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
	return (
		// <div className="card-container">
		// 	<img src="/img/pizza.jpg" alt="item" width="250" height="250" />
		// 	<h1 className="card-title">FIORI DI ZUCCA</h1>
		// 	<span className="card-price">$19.9</span>
		// 	<p className="card-description">
		// 		Lorem ipsum dolor sit amet consectetur aduofsfs elit.
		// 	</p>
		// </div>
		<div className="card-container">
			<div className="card">
				<img
					src="/img/pizza.png"
					className="card-image"
					alt="item"
					width="200"
					height="200"
				/>
				<h1 className="card-title">FIORI DI ZUCCA</h1>
				<p className="card-description">
					Lorem ipsum dolor sit amet consectetur aduofsfs elit.
				</p>
				<span className="card-price">$19.9</span>
				<a href="/product" className="card-link">
					Select Options
				</a>
			</div>
		</div>
	);
};

export default Card;
