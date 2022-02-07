import React, { useState } from "react";
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
							<div className="productList-wrapper"></div>
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
							<div className="productList-wrapper"></div>
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
							<div className="productList-wrapper"></div>
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
							<div className="productList-wrapper"></div>
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
