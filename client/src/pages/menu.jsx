import React, { lazy, Suspense, useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const PizzaCard = lazy(() => import("../components/pizza-card"));
const SaladCard = lazy(() => import("../components/salad-card"));
const CardSimple = lazy(() => import("../components/cardSimple"));

const Menu = ({ data }) => {
	useEffect(() => {
		document.title = "Menu | Nova's Pizza - Order Online";
	}, []);
	const [pizza, setPizza] = useState(true);
	const [appetizer, setAppetizer] = useState(false);
	const [salads, setSalads] = useState(false);
	const [drinks, setDrinks] = useState(false);

	const pizzaItems = [];
	const appetizerItems = [];
	const saladItems = [];
	const drinkItems = [];

	if (data) {
		for (let i in data) {
			if (data.hasOwnProperty(i)) {
				if (data[i].itemCategory === "pizza") {
					pizzaItems.push(data[i]);
				} else if (data[i].itemCategory === "drinks") {
					drinkItems.push(data[i]);
				} else if (data[i].itemCategory === "appetizer") {
					appetizerItems.push(data[i]);
				} else if (data[i].itemCategory === "salads") {
					saladItems.push(data[i]);
				}
			}
		}
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
				<Suspense fallback={<div>Loading...</div>}>
					<div className="menu-tabs">
						{pizza ? (
							<div className="tab" id="pizza-tab">
								<div className="tab-title">
									<h2>Traditional Pizzas</h2>
									<div className="underline menu"></div>
								</div>
								<div className="productList-wrapper bottom-margin">
									{pizzaItems.length !== 0
										? pizzaItems
												.slice(0, 3)
												.map((item, i) => {
													return (
														<PizzaCard
															item={item}
															key={i}
															data={data}
														/>
													);
												})
										: ""}
								</div>
								<div className="tab-title">
									<h2>House Specialty</h2>
									<div className="underline menu"></div>
								</div>
								<div className="productList-wrapper">
									{pizzaItems.length !== 0
										? pizzaItems.slice(3).map((item, i) => {
												return (
													<PizzaCard
														item={item}
														key={i}
														data={data}
													/>
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
														data={data}
														sp={true}
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
													<SaladCard
														item={item}
														key={i}
														data={data}
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
														data={data}
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
				</Suspense>
			</div>
			<Footer />
		</div>
	);
};

export default Menu;
