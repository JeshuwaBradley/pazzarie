import React, { useEffect, useState } from "react";
import {
	addDelivery,
	addPickUporDeliver,
	addShop,
	deleteDelivery,
	removeAddPickuporDeliver,
	removeShop,
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const PickUpDeliver = ({ inputs, setInputs, setButton, inputError }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const [addressSet, setAddressSet] = useState(false);
	const [deliverySet, setDeliverySet] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState();
	const [mode, setMode] = useState("");
	const [error, setError] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [loading, setLoading] = useState(false);

	const shops = [
		{
			id: 1,
			location: "Berkeley",
			address: "1706 University Ave, Berkeley, CA 94703, USA",
			pickUp: true,
			deliver: true,
			distance: 5632.7,
		},
		// {
		// 	id: 2,
		// 	location: "Oakland",
		// 	address: "1438 Broadway, Oakland, CA 94612, USA",
		// 	pickUp: false,
		// 	deliver: true,
		// 	distance: 9656.06,
		// },
	];

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handlePorD = (e) => {
		let value = e.target.value;
		setMode("");
		dispatch(deleteDelivery());
		dispatch(removeAddPickuporDeliver());
		if (value === "pickup") {
			setMode("pickup");
			dispatch(addPickUporDeliver("pickup"));
		} else if (value === "deliver") {
			setMode("deliver");
			dispatch(addPickUporDeliver("deliver"));
		} else {
			setMode("");
			dispatch(removeAddPickuporDeliver());
		}
	};

	const handleShop = (e) => {
		let value = e.target.value;
		if (value !== "") {
			dispatch(removeAddPickuporDeliver());
			dispatch(addShop(value));
			setSelectedLocation(value);
			dispatch(deleteDelivery());
			setMode("");
			let select = document.getElementById("pord");
			select.selectedIndex = 0;
		} else {
			dispatch(removeShop());
			setSelectedLocation();
			dispatch(deleteDelivery());
		}
	};

	const handleRemoverDeliver = () => {
		setDeliverySet(false);
		setAddressSet(false);
		dispatch(deleteDelivery());
		console.log(cart);
	};

	let autoComplete;

	const loadScript = (url, callback) => {
		let script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState) {
			script.onreadystatechange = function () {
				if (
					script.readyState === "loaded" ||
					script.readyState === "complete"
				) {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = () => callback();
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	const handleScriptLoad = (updateQuery) => {
		const componentForm = [
			"location",
			"locality",
			"administrative_area_level_1",
			"country",
			"postal_code",
		];

		const autocompleteInput = document.getElementById("location");
		autoComplete = new window.google.maps.places.Autocomplete(
			autocompleteInput,
			{
				fields: ["address_components", "geometry", "name"],
				types: ["address"],
			}
		);
		// autoComplete.setFields(["address_components", "formatted_address"]);
		autoComplete.addListener("place_changed", function () {
			const place = autoComplete.getPlace();

			if (!place.geometry) {
				window.alert(
					"No details available for input: '" + place.name + "'"
				);
				return;
			}
			fillInAddress(place);
		});
		const fillInAddress = (place) => {
			const addressNameFormat = {
				street_number: "short_name",
				route: "long_name",
				locality: "long_name",
				administrative_area_level_1: "long_name",
				country: "long_name",
				postal_code: "short_name",
			};
			const getAddressComp = function (type) {
				for (const component of place.address_components) {
					if (component.types[0] === type) {
						return component[addressNameFormat[type]];
					}
				}
				return "";
			};
			document.getElementById("location").value =
				getAddressComp("street_number") + " " + getAddressComp("route");
			for (const component of componentForm) {
				if (component !== "location") {
					document.getElementById(component).value =
						getAddressComp(component);
				}
				updateQuery();
			}
		};
	};

	const handleAddressChange = () => {
		let x = document.getElementById("location").value;
		let y = document.getElementById("locality").value;
		let z = document.getElementById("administrative_area_level_1").value;
		let a = document.getElementById("country").value;
		let b = document.getElementById("postal_code").value;
		let g = {
			address: x,
			city: y,
			state: z,
			zip: b,
			country: a,
		};
		setInputs((values) => ({ ...values, ...g }));
		setTimeout(() => {
			setAddressSet(true);
			setLoading(true);
		}, 500);
	};

	const handleDeliveryFee = () => {
		if (!deliverySet) {
			axios
				.post("/api/distance", {
					address: inputs.address,
					city: inputs.city,
					state: inputs.state,
					zip: inputs.zip,
					country: inputs.country,
					destination: shops[selectedLocation - 1].address,
				})
				.then((response) => {
					let distance =
						response.data.rows[0].elements[0].distance.value;
					if (distance > shops[selectedLocation - 1].distance) {
						setLoading(false);
						setConfirm(false);
						setError(true);
						handleRemoverDeliver();
					} else {
						setLoading(false);
						setError(false);
						setConfirm(true);
						dispatch(addDelivery(calcDeliveryFee(distance)));
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const calcDeliveryFee = (distance) => {
		console.log(distance);
		// if (distance <= 5632.7) {
		// 	return 6.99;
		// } else {
		// 	let initialCharge = 6.99;
		// 	let secondHalf = ((distance - 1609) / 804) * 1.5;
		// 	let finalCharge = initialCharge + secondHalf;
		// 	return finalCharge;
		// }
		let finalCharge = 5.99;
		return finalCharge;
	};

	if (addressSet && !deliverySet) {
		handleDeliveryFee();
		setDeliverySet(true);
	}

	useEffect(() => {
		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=handleScriptLoad&solution_channel=GMP_QB_addressselection_v1_cAC`,
			() => handleScriptLoad(handleAddressChange)
		);
	});

	if (selectedLocation !== undefined || mode !== "") {
		if (mode === "deliver") {
			if (confirm) {
				setButton(true);
			} else {
				setButton(false);
			}
		} else if (mode === "pickup") {
			setButton(true);
		}
	} else {
		setButton(false);
	}

	return (
		<>
			<div className="form-item">
				<div className="form-label">
					<label htmlFor="address">Locations:</label>
				</div>
				<div className="form-input">
					<select
						name="location"
						style={
							inputError
								? {
										borderColor: "red",
								  }
								: null
						}
						onChange={(e) => handleShop(e)}
					>
						<option value="">--Select--</option>
						{shops.map((shop, i) => (
							<option key={i} value={shop.id}>
								{shop.location}
							</option>
						))}
					</select>
					{inputError ? <small>Required</small> : null}
				</div>
			</div>
			{selectedLocation ? (
				<div className="form-item">
					<div className="form-label">
						<label htmlFor="">Pickup or Deliver:</label>
					</div>
					<div className="form-input">
						<select
							name="mode"
							id="pord"
							style={
								inputError
									? {
											borderColor: "red",
									  }
									: null
							}
							onChange={(e) => {
								handlePorD(e);
							}}
						>
							<option value="">--Select--</option>
							{shops[selectedLocation - 1]?.pickUp ? (
								<option value="pickup">Pickup</option>
							) : null}
							{shops[selectedLocation - 1]?.deliver ? (
								<option value="deliver">Deliver</option>
							) : null}
						</select>
						{inputError ? <small>Required</small> : null}
					</div>
				</div>
			) : null}
			{mode === "deliver" ? (
				<>
					<div className="form-item">
						<div className="form-label">
							<label htmlFor="address">Address:</label>
						</div>
						<div className="form-input">
							<input
								type="text"
								name="address"
								placeholder="250 W Bullard Ave"
								id="location"
								style={
									inputError
										? {
												borderColor: "red",
										  }
										: null
								}
								onChange={handleChange}
							/>
							{inputError ? <small>Required</small> : null}
						</div>
					</div>
					<div className="form-item">
						<div className="form-label">
							<label htmlFor="city">City:</label>
						</div>
						<div className="form-input">
							<input
								type="text"
								name="city"
								placeholder="Clovis"
								id="locality"
								style={
									inputError
										? {
												borderColor: "red",
										  }
										: null
								}
								onChange={(e) => handleChange(e)}
							/>
							{inputError ? <small>Required</small> : null}
						</div>
					</div>
					<div className="form-item">
						<div className="form-label">
							<label htmlFor="state">State:</label>
						</div>
						<div className="form-input">
							<input
								type="text"
								name="state"
								placeholder="California"
								id="administrative_area_level_1"
								style={
									inputError
										? {
												borderColor: "red",
										  }
										: null
								}
								onChange={(e) => handleChange(e)}
							/>
							{inputError ? <small>Required</small> : null}
						</div>
					</div>
					<div className="form-item">
						<div className="form-label">
							<label htmlFor="zip">ZIP:</label>
						</div>
						<div className="form-input">
							<input
								type="text"
								name="zip"
								placeholder="93612"
								id="postal_code"
								style={
									inputError
										? {
												borderColor: "red",
										  }
										: null
								}
								onChange={(e) => handleChange(e)}
							/>
							{inputError ? <small>Required</small> : null}
						</div>
					</div>

					<div className="form-item">
						<div className="form-label">
							<label htmlFor="country">Country:</label>
						</div>
						<div className="form-input">
							<input
								type="text"
								name="country"
								placeholder="USA"
								id="country"
								style={
									inputError
										? {
												borderColor: "red",
										  }
										: null
								}
								onChange={(e) => handleChange(e)}
							/>
							{inputError ? <small>Required</small> : null}
						</div>
					</div>
					{confirm ? (
						<div
							className="form-item"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<p
								style={{
									color: "green",
									fontWeight: "bold",
								}}
							>
								Delivery Available
							</p>
						</div>
					) : (
						""
					)}
					{loading ? (
						<div
							className="form-item"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<p
								style={{
									color: "green",
									fontWeight: "bold",
								}}
							>
								<i
									className="fa fa-spinner fa-spin"
									style={{
										marginRight: "5px",
									}}
								></i>
								Checking Address
							</p>
						</div>
					) : (
						""
					)}
				</>
			) : (
				""
			)}
			{error ? (
				<div
					className="form-item"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<p
						style={{
							color: "red",
							fontWeight: "bold",
						}}
					>
						Too far. Enter different address
					</p>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default PickUpDeliver;
