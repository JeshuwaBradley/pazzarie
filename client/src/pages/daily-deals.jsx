import React from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { addProduct } from "../redux/cartSlice";

const DailyDeals = () => {
	const dispatch = useDispatch();
	let product1 = {
		itemTitle: "Cheese Bread",
		imgSrc: "https://i.ibb.co/bKJQ3cW/cheese-bread.jpg",
		extras: [],
		quantity: 2,
		size: 0,
		price: 11.495,
		itemTotal: 22.99,
		deal: "true",
	};
	let product2 = {
		itemTitle: "Cheese Bread",
		imgSrc: "https://i.ibb.co/bKJQ3cW/cheese-bread.jpg",
		extras: [],
		quantity: 3,
		size: 0,
		price: 10.99,
		itemTotal: 32.99,
		deal: true,
	};
	const addToCart = (product) => {
		dispatch(addProduct({ ...product }));
		alert("Product added to cart");
	};
	return (
		<div>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Deals of the Day</h1>
				</div>
			</div>
			<div className="deals">
				<div className="deal">
					<div className="deal-heading">
						<h2>Special Deal</h2>
					</div>
					<div className="deal-image">
						<div className="image">
							<img
								src="https://i.ibb.co/bKJQ3cW/cheese-bread.jpg"
								alt="cheese bread"
							/>
						</div>
					</div>
					<div className="deal-details">
						<h3>Get 2 Regular Servings</h3>
						<h3 className="item-name">Cheese Bread</h3>
						<div className="style-4">
							<div className="">
								<del>
									<span className="amount">$27.98</span>
								</del>
							</div>
							<div className="">
								<ins>
									<span className="amount">$22.99</span>
								</ins>
							</div>
						</div>
					</div>
					<div className="deal-button">
						<div
							className="button"
							onClick={() => addToCart(product1)}
						>
							add to cart
						</div>
					</div>
				</div>
				<div className="deal">
					<div className="deal-heading">
						<h2>Special Deal</h2>
					</div>
					<div className="deal-image">
						<div className="image">
							<img
								src="https://i.ibb.co/bKJQ3cW/cheese-bread.jpg"
								alt="cheese bread"
							/>
						</div>
					</div>
					<div className="deal-details">
						<h3>Get 3 Regular Servings</h3>
						<h3 className="item-name">Cheese Bread</h3>
						<div className="style-4">
							<div className="">
								<del>
									<span className="amount">$41.97</span>
								</del>
							</div>
							<div className="">
								<ins>
									<span className="amount">$32.99</span>
								</ins>
							</div>
						</div>
					</div>
					<div className="deal-button">
						<div
							className="button"
							onClick={() => addToCart(product2)}
						>
							add to cart
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default DailyDeals;
