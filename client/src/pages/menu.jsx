import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import NewCard from "../components/card/newCard";
import CardSimple from "../components/card-simple/cardSimple";

const Menu = () => {
	const [pizza, setPizza] = useState(true);
	const [appetizer, setAppetizer] = useState(false);
	const [salads, setSalads] = useState(false);
	const [drinks, setDrinks] = useState(false);
	const [data, setData] = useState(null);

	const pizzaItems = [];
	const appetizerItems = [];
	const saladItems = [];
	const drinkItems = [];

	useEffect(() => {
		axios
			.get("/api/product/find")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	}, []);

	if (data) {
		data.forEach((item) => {
			if (item.itemCategory === "pizza") {
				pizzaItems.push(item);
			} else if (item.itemCategory === "drinks") {
				drinkItems.push(item);
			} else if (item.itemCategory === "appetizer") {
				appetizerItems.push(item);
			} else if (item.itemCategory === "salads") {
				saladItems.push(item);
			}
		});
	}

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
		<div className="menu-main" style={{ position: "relative" }}>
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
								{pizzaItems.length !== 0
									? pizzaItems.map((item, i) => {
											return (
												<NewCard item={item} key={i} />
											);
									  })
									: ""}
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
								{appetizerItems.length !== 0
									? appetizerItems.map((item, i) => {
											return (
												<CardSimple
													item={item}
													key={i}
												/>
											);
									  })
									: ""}
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
								{saladItems.length !== 0
									? saladItems.map((item, i) => {
											return (
												<CardSimple
													item={item}
													key={i}
												/>
											);
									  })
									: ""}
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
								{drinkItems.length !== 0
									? drinkItems.map((item, i) => {
											return (
												<CardSimple
													item={item}
													key={i}
												/>
											);
									  })
									: ""}
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
