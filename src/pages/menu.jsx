import React, { useState } from "react";
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Menu = () => {
	const [pizza, setPizza] = useState(true);
	const [appetizer, setAppetizer] = useState(false);
	const [salads, setSalads] = useState(false);
	const [drinks, setDrinks] = useState(false);

	const setAllStates = () => {
		setPizza(false);
		setAppetizer(false);
		setSalads(false);
		setDrinks(false);
	};

	const handleClick = (e) => {
		let value = e.target.id;
		setAllStates();
		if (value === "pizza") {
			setPizza(true);
		} else if (value === "appetizer") {
			setAppetizer(true);
		} else if (value === "salads") {
			setSalads(true);
		} else if (value === "drinks") {
			setDrinks(true);
		}
	};

	const pizzaItem = {
		imgSrc: "/img/pizza.png",
		title: "FIORI DI ZUCCA",
		description: "Lorem ipsum dolor sit amet consectetur aduofsfs elit.",
		price: "19.9",
	};

	const fries = {
		imgSrc: "/img/fries.jpg",
		title: "FRENCH FRIES",
		description: "Lorem ipsum dolor sit amet consectetur aduofsfs elit.",
		price: "10.9",
	};

	const salad = {
		imgSrc: "/img/salad.jpg",
		title: "Salad",
		description:
			"Lorem ipsum dolor sit amet consectetur aduofsfs elit. Lorem ipsum dolor sit amet consectetur aduofsfs elit.",
		price: "15.9",
	};

	const drink = {
		imgSrc: "/img/drink.jpg",
		title: "Fizzy Cola",
		description: "Lorem ipsum dolor sit amet consectetur aduofsfs elit.",
		price: "20.9",
	};

	return (
		<div className="menu-main">
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>menu</h1>
				</div>
			</div>

			<div className="menu-wrapper">
				<div className="menu-list">
					<ul>
						<li
							id="pizza"
							className={pizza ? "active" : ""}
							onClick={(e) => handleClick(e)}
						>
							Pizza
							{pizza ? <div className="arrow-up"></div> : ""}
						</li>
						<li
							id="appetizer"
							className={appetizer ? "active" : ""}
							onClick={(e) => handleClick(e)}
						>
							Appetizers & Sides
							{appetizer ? <div className="arrow-up"></div> : ""}
						</li>
						<li
							id="salads"
							className={salads ? "active" : ""}
							onClick={(e) => handleClick(e)}
						>
							Salads
							{salads ? <div className="arrow-up"></div> : ""}
						</li>
						<li
							id="drinks"
							className={drinks ? "active" : ""}
							onClick={(e) => handleClick(e)}
						>
							Drinks & Desserts
							{drinks ? <div className="arrow-up"></div> : ""}
						</li>
					</ul>
				</div>
				<div className="menu-tabs">
					{pizza ? (
						<div className="tab" id="pizza-tab">
							<div className="tab-title">
								<h2>Pizzas</h2>
								<div className="underline"></div>
							</div>
							<div className="productList-wrapper">
								<Card item={pizzaItem} />
								<Card item={pizzaItem} />
								<Card item={pizzaItem} />
								<Card item={pizzaItem} />
								<Card item={pizzaItem} />
								<Card item={pizzaItem} />
							</div>
						</div>
					) : (
						""
					)}
					{appetizer ? (
						<div className="tab" id="appetizer-tab">
							<div className="tab-title">
								<h2>Appetizers and sides</h2>
								<div className="underline"></div>
							</div>
							<div className="productList-wrapper">
								<Card item={fries} />
								<Card item={fries} />
								<Card item={fries} />
								<Card item={fries} />
								<Card item={fries} />
								<Card item={fries} />
							</div>
						</div>
					) : (
						""
					)}
					{salads ? (
						<div className="tab" id="salads-tab">
							<div className="tab-title">
								<h2>Salads</h2>
								<div className="underline"></div>
							</div>
							<div className="productList-wrapper">
								<Card item={salad} />
								<Card item={salad} />
								<Card item={salad} />
								<Card item={salad} />
								<Card item={salad} />
								<Card item={salad} />
							</div>
						</div>
					) : (
						""
					)}
					{drinks ? (
						<div className="tab" id="drinks-tab">
							<div className="tab-title">
								<h2>Drinks and Desserts</h2>
								<div className="underline"></div>
							</div>
							<div className="productList-wrapper">
								<Card item={drink} />
								<Card item={drink} />
								<Card item={drink} />
								<Card item={drink} />
								<Card item={drink} />
								<Card item={drink} />
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Menu;
