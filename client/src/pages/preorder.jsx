import React, { lazy, Suspense, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";

const PreOrderContainer = ({ item, addItem, removeItem }) => {
	const [checked, setChecked] = useState(false);

	const clickCheck = (e) => {
		const checked = e.target?.checked;
		if (!checked) {
			setChecked(false);
			removeItem(item);
		} else {
			setChecked(true);
			addItem(item);
		}
	};

	return (
		<>
			<div className="preorder-container">
				<div>
					<input
						type="checkbox"
						name={item.itemTitle}
						id={item.itemTitle}
						onChange={(e) => clickCheck(e)}
						style={{ marginRight: "5px" }}
					/>
					<label htmlFor={item.itemTitle}>{item.itemTitle}</label>
				</div>
			</div>
		</>
	);
};

const Preorder = ({ data }) => {
	const [selectedItems, setSelectedItems] = useState([]);

	const addItem = (item) => {
		setSelectedItems((prevItems) => [...prevItems, item.itemTitle]);
		list();
	};

	const removeItem = (itemx) => {
		const x = selectedItems.find(
			(item) => item.itemTitle === itemx.itemTitle
		);
		selectedItems.splice(selectedItems.indexOf(x), 1);
		list();
	};

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

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState(null);
	const [location, setLocation] = useState("");
	const [dateTime, setDateTime] = useState("");
	const [additionalNotes, setAdditionalNotes] = useState("");

	const [sent, setSent] = useState(false);
	const [error, setError] = useState(false);

	const preorder = () => {
		if (
			selectedItems === [] ||
			name === "" ||
			email === "" ||
			mobile === "" ||
			location === "" ||
			dateTime === ""
		) {
			console.log("error");
			setError(true);
		} else {
			console.log({
				selectedItems: selectedItems,
				name: name,
				email: email,
				mobile: mobile,
				location: location,
				dateTime: dateTime,
			});
			axios
				.post("/api/preorder/", {
					name,
					email,
					mobile,
					location,
					dateTime,
					selectedItems,
					additionalNotes,
				})
				.then((res) => {
					if (res.status === 200) {
						console.log(res);
						setSent(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	console.log(selectedItems);

	let string = "";
	const list = () => {
		selectedItems.map((item) => (string += `${item.itemTitle}, \n`));
	};
	return (
		<div style={{ overflow: "auto" }}>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Preorder Menu</h1>
				</div>
			</div>
			{!sent ? (
				<div className="preorder">
					<>
						<div className="productList-wrapper">
							<Suspense fallback={<div>Loading...</div>}>
								{pizzaItems.map((item, i) => (
									<PreOrderContainer
										item={item}
										key={i}
										addItem={addItem}
										removeItem={removeItem}
									/>
								))}
								{appetizerItems.map((item, i) => (
									<PreOrderContainer
										item={item}
										key={i}
										addItem={addItem}
										removeItem={removeItem}
									/>
								))}
								{saladItems.map((item, i) => (
									<PreOrderContainer
										item={item}
										key={i}
										addItem={addItem}
										removeItem={removeItem}
									/>
								))}
								{drinkItems.map((item, i) => (
									<PreOrderContainer
										item={item}
										key={i}
										addItem={addItem}
										removeItem={removeItem}
									/>
								))}
							</Suspense>
						</div>
						{error ? (
							<div className="form-item-preorde error">
								<p
									className=""
									style={{
										color: "red",
										textAlign: "center",
									}}
								>
									Select any of the following.
								</p>
							</div>
						) : (
							""
						)}
					</>
					<div className="preorder-form">
						<form action="">
							<div className="preorder-title">
								<h2>Pre-order Form</h2>
							</div>
							<div className="form-item-preorder">
								<div className="form-label">
									<label htmlFor="name">Name:</label>
								</div>
								<div className="form-input">
									<input
										type="text"
										name="name"
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>
							</div>
							{error ? (
								<div className="form-item-preorde error">
									<p
										className=""
										style={{
											color: "red",
											textAlign: "center",
										}}
									>
										Enter the name
									</p>
								</div>
							) : (
								""
							)}
							<div className="form-item-preorder">
								<div className="form-label">
									<label htmlFor="email">Email:</label>
								</div>
								<div className="form-input">
									<input
										type="text"
										name="email"
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
							</div>
							{error ? (
								<div className="form-item-preorde error">
									<p
										className=""
										style={{
											color: "red",
											textAlign: "center",
										}}
									>
										Enter an Email Address
									</p>
								</div>
							) : (
								""
							)}
							<div className="form-item-preorder">
								<div className="form-label">
									<label htmlFor="mobile">Mobile:</label>
								</div>
								<div className="form-input">
									<input
										type="number"
										name="mobile"
										onChange={(e) =>
											setMobile(e.target.value)
										}
									/>
								</div>
							</div>
							{error ? (
								<div className="form-item-preorde error">
									<p
										className=""
										style={{
											color: "red",
											textAlign: "center",
										}}
									>
										Enter a Mobile Number
									</p>
								</div>
							) : (
								""
							)}
							<div className="form-item-preorder">
								<div className="form-label">
									<label htmlFor="datetime">
										Date & Time:
									</label>
								</div>
								<div className="form-input">
									<input
										type="datetime-local"
										name="datetime"
										id="datetime"
										onChange={(e) =>
											setDateTime(e.target.value)
										}
									/>
								</div>
							</div>
							{error ? (
								<div className="form-item-preorde error">
									<p
										className=""
										style={{
											color: "red",
											textAlign: "center",
										}}
									>
										Select the date and time the order
										should be fulfilled
									</p>
								</div>
							) : (
								""
							)}
							<div className="form-item-preorder">
								<div className="form-label">
									<label htmlFor="locations">
										Locations:
									</label>
								</div>
								<div className="form-input">
									<select
										name="locations"
										id="locations"
										onChange={(e) =>
											setLocation(e.target.value)
										}
									>
										<option value="default">Select</option>
										<option value="berkeley">
											Berkeley
										</option>
										<option value="oakland">Oakland</option>
									</select>
								</div>
							</div>
							{error ? (
								<div className="form-item-preorde error">
									<p
										className=""
										style={{
											color: "red",
											textAlign: "center",
										}}
									>
										Select the closest location
									</p>
								</div>
							) : (
								""
							)}
							<div className="form-item-preorder">
								<div className="form-label">
									<label htmlFor="notes">
										Additional Notes:
									</label>
								</div>
								<div className="form-input">
									<textarea
										name="notes"
										id=""
										cols="15"
										rows="5"
										onChange={(e) =>
											setAdditionalNotes(e.target.value)
										}
									></textarea>
								</div>
							</div>
							<div className="form-item-preorder-button">
								<button
									onClick={(e) => {
										e.preventDefault();
										preorder();
									}}
									className="cart-menu-link"
								>
									Pre-order
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div
					style={{
						height: "250px",
						position: "relative",
						paddingTop: "30px",
						paddingBottom: "30px",
					}}
				>
					<div
						className="success-message"
						style={{
							textAlign: "center",
							maxWidth: " 500px",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<svg
							viewBox="0 0 76 76"
							className="success-message__icon icon-checkmark"
							style={{
								maxWidth: "75px",
							}}
						>
							<circle
								cx="38"
								cy="38"
								r="36"
								style={{
									fill: "#3DC480",
									transformOrigin: "50% 50%",
									transition:
										"transform 200ms cubic-bezier(.22, .96, .38, .98)",
									transform: "scale(1)",
								}}
							/>
							<path
								fill="none"
								stroke="#FFFFFF"
								strokeWidth="5"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeMiterlimit="10"
								d="M17.7,40.9l10.9,10.9l28.7-28.7"
								style={{
									transition: "stroke-dashoffset 350ms ease",
									transitionDelay: "100ms",
								}}
							/>
						</svg>
						<h1
							className="success-message__title"
							style={{
								color: "#3DC480",
								transform: "translateY(25px)",
								opacity: "1",
								transition: "all 200ms ease",
							}}
						></h1>
						<div
							className="success-message__content"
							style={{
								color: "#000",
								transition: "all 200ms ease",
								transitionDelay: "50ms",
								transform: "translateY(0)",
								opacity: "1",
							}}
						>
							<p>
								Order Received. <br />
								We will respond as soon as possible
							</p>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Preorder;
