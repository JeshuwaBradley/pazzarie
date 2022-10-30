import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Product = () => {
	const [size, setSize] = useState(0);
	const pizza = {
		id: 1,
		img: "/img/pizza.png",
		name: "CAMPAGNOLA",
		price: [19.9, 23.9, 27.9],
		ingre: "Shrimp, Red Capsicum, Green Capsicum, Onion, Chilli flakes, Lemon Pepper, Mozzarella, finished with Aioli",
	};

	return (
		<div className="">
			<Navbar />
			<div className="product-container">
				<h1 className="title">{pizza.name}</h1>
				<div className="product-container-sub">
					<div className="product-container-left">
						<div className="product-container-imageContainer">
							<img
								loading="lazy"
								src={pizza.img}
								objectFit="contain"
								alt="pizza img"
								layout="fill"
							/>
						</div>
					</div>
					<div className="product-container-right">
						<p className="product-container-right-ingre">
							{pizza.ingre}
						</p>
						<h3 className="product-container-right-choose">
							Choose the size
						</h3>
						<div className="product-container-right-sizes">
							<div
								className="product-container-right-size"
								onClick={() => setSize(0)}
							>
								<img
									loading="lazy"
									src="/img/size.png"
									layout="fill"
									alt=""
									width={40}
									height={40}
								/>
								<span className="product-container-right-number">
									Small
								</span>
							</div>
							<div
								className="product-container-right-size"
								onClick={() => setSize(1)}
							>
								<img
									loading="lazy"
									src="/img/size.png"
									layout="fill"
									alt=""
									width={50}
									height={50}
								/>
								<span className="product-container-right-number">
									Medium
								</span>
							</div>
							<div
								className="product-container-right-size"
								onClick={() => setSize(2)}
							>
								<img
									loading="lazy"
									src="/img/size.png"
									layout="fill"
									alt=""
									height={60}
									width={60}
								/>
								<span className="product-container-right-number">
									Large
								</span>
							</div>
						</div>
						<h3 className="product-container-right-choose">
							Choose additional ingredients
						</h3>
						<div className="product-container-right-ingredients">
							<div className="product-container-right-option">
								<input
									type="checkbox"
									id="double"
									name="double"
									className="product-container-right-checkbox"
								/>
								<label htmlFor="double">
									Double Ingredients
								</label>
							</div>
							<div className="product-container-right-option">
								<input
									type="checkbox"
									id="cheese"
									name="cheese"
									className="product-container-right-checkbox"
								/>
								<label htmlFor="cheese">Extra Cheese</label>
							</div>
							<div className="product-container-right-option">
								<input
									type="checkbox"
									id="spicy"
									name="spicy"
									className="product-container-right-checkbox"
								/>
								<label htmlFor="spicy">Spicy Sauce</label>
							</div>
							<div className="product-container-right-option">
								<input
									type="checkbox"
									id="garlic"
									name="garlic"
									className="product-container-right-checkbox"
								/>
								<label htmlFor="garlic">Garlic Sauce</label>
							</div>
						</div>
						<span className="product-container-right-price">
							$ {pizza.price[size]}
						</span>
						<div className="add">
							<input
								type="number"
								defaultValue={1}
								className="product-container-right-quantity"
							/>
							<button className="product-container-right-button">
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Product;
