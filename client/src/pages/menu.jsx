import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import CardSimple from "../components/cardSimple";
import PizzaCard from "../components/pizza-card";
import SaladCard from "../components/salad-card";
import { Link } from "react-router-dom";

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
				<div className="menu-tabs">
					{pizza ? (
						<div className="tab" id="pizza-tab">
							{/* <div className="tab-title">
								<h2>Create Your Own Pizza</h2>
								<div className="underline menu"></div>
							</div>
							<div className="productList-wrapper bottom-margin">
								<div className="cyo-link">
									<div
										className="card-image-container"
										style={{
											backgroundImage:
												'url("/img/CYO_RegLg.jpg")',
										}}
									></div>

									<div className="cyo-details">
										<div className="card-front-title">
											<p>Create Your Own Pizza</p>
										</div>
										<Link to="create-your-own" className="">
											Let's Go
										</Link>
									</div>
								</div>
							</div> */}
							<div className="tab-title">
								<h2>Traditional Pizzas</h2>
								<div className="underline menu"></div>
							</div>
							<div className="productList-wrapper bottom-margin">
								{pizzaItems.length !== 0
									? pizzaItems.slice(0, 3).map((item, i) => {
											return (
												<PizzaCard
													item={item}
													key={i}
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
