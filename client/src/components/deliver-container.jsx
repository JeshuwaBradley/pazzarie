// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addDelivery, deleteDelivery } from "../redux/cartSlice";

// const DeliverContainer = () => {
// 	const [inputs, setInputs] = useState({});
// 	const [error, setError] = useState(false);
// 	const [addressSet, setAddressSet] = useState(false);
// 	const [deliverySet, setDeliverySet] = useState(false);
// 	const [deliver, setDeliver] = useState(false);
// 	const dispatch = useDispatch();
// 	let autoComplete;

// 	const loadScript = (url, callback) => {
// 		let script = document.createElement("script");
// 		script.type = "text/javascript";

// 		if (script.readyState) {
// 			script.onreadystatechange = function () {
// 				if (
// 					script.readyState === "loaded" ||
// 					script.readyState === "complete"
// 				) {
// 					script.onreadystatechange = null;
// 					callback();
// 				}
// 			};
// 		} else {
// 			script.onload = () => callback();
// 		}
// 		script.src = url;
// 		document.getElementsByTagName("head")[0].appendChild(script);
// 	};

// 	const handleScriptLoad = (updateQuery) => {
// 		const componentForm = [
// 			"location",
// 			"locality",
// 			"administrative_area_level_1",
// 			"country",
// 			"postal_code",
// 		];

// 		const autocompleteInput = document.getElementById("location");
// 		autoComplete = new window.google.maps.places.Autocomplete(
// 			autocompleteInput,
// 			{
// 				fields: ["address_components", "geometry", "name"],
// 				types: ["address"],
// 			}
// 		);
// 		// autoComplete.setFields(["address_components", "formatted_address"]);
// 		autoComplete.addListener("place_changed", function () {
// 			const place = autoComplete.getPlace();

// 			if (!place.geometry) {
// 				window.alert(
// 					"No details available for input: '" + place.name + "'"
// 				);
// 				return;
// 			}
// 			fillInAddress(place);
// 		});
// 		const fillInAddress = (place) => {
// 			const addressNameFormat = {
// 				street_number: "short_name",
// 				route: "long_name",
// 				locality: "long_name",
// 				administrative_area_level_1: "long_name",
// 				country: "long_name",
// 				postal_code: "short_name",
// 			};
// 			const getAddressComp = function (type) {
// 				for (const component of place.address_components) {
// 					if (component.types[0] === type) {
// 						return component[addressNameFormat[type]];
// 					}
// 				}
// 				return "";
// 			};
// 			document.getElementById("location").value =
// 				getAddressComp("street_number") + " " + getAddressComp("route");
// 			for (const component of componentForm) {
// 				if (component !== "location") {
// 					document.getElementById(component).value =
// 						getAddressComp(component);
// 				}
// 				updateQuery();
// 			}
// 		};
// 	};

// 	const handleAddressChange = () => {
// 		let x = document.getElementById("location").value;
// 		let y = document.getElementById("locality").value;
// 		let z = document.getElementById("administrative_area_level_1").value;
// 		let a = document.getElementById("country").value;
// 		let b = document.getElementById("postal_code").value;
// 		let g = {
// 			address: x,
// 			city: y,
// 			state: z,
// 			zip: b,
// 			country: a,
// 		};
// 		setInputs((values) => ({ ...values, ...g }));
// 		setTimeout(() => setAddressSet(true), 1000);
// 	};

// 	const deliverToMe = (e) => {
// 		setDeliver(!deliver);
// 		if (deliver === true) {
// 			dispatch(deleteDelivery());
// 			setDeliverySet(false);
// 			setAddressSet(false);
// 		}
// 	};

// 	const calcDeliveryFee = (distance) => {
// 		// if (distance <= 5632.7) {
// 		// 	return 6.99;
// 		// } else {
// 		// 	let initialCharge = 6.99;
// 		// 	let secondHalf = ((distance - 1609) / 804) * 1.5;
// 		// 	let finalCharge = initialCharge + secondHalf;
// 		// 	return finalCharge;
// 		// }
// 		let finalCharge = 5.99;
// 		return finalCharge;
// 	};

// 	const handleDeliveryFee = () => {
// 		console.log(inputs);
// 		if (!deliverySet) {
// 			axios
// 				.post("/api/distance", {
// 					address: inputs.address,
// 					city: inputs.city,
// 					state: inputs.state,
// 					zip: inputs.zip,
// 					country: inputs.country,
// 				})
// 				.then((response) => {
// 					let distance =
// 						response.data.rows[0].elements[0].distance.value;
// 					if (distance > 5632.7) {
// 						setError(true);
// 						setDeliver();
// 						let input = document.getElementById("deliver");
// 						input.checked = false;
// 					} else {
// 						dispatch(addDelivery(calcDeliveryFee(distance)));
// 					}
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		}
// 	};

// 	if (addressSet && !deliverySet) {
// 		handleDeliveryFee();
// 		setDeliverySet(true);
// 	}

// 	const handleChange = (event) => {
// 		const name = event.target.name;
// 		const value = event.target.value;
// 		setInputs((values) => ({ ...values, [name]: value }));
// 	};

// 	useEffect(() => {
// 		loadScript(
// 			`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=handleScriptLoad&solution_channel=GMP_QB_addressselection_v1_cAC`,
// 			() => handleScriptLoad(handleAddressChange)
// 		);
// 	});
// 	return (
// 		<>
// 			<>
// 				<div className="form-item">
// 					<div className="form-label">
// 						<label htmlFor="address">Address:</label>
// 					</div>
// 					<div className="form-input">
// 						<input
// 							type="text"
// 							name="address"
// 							placeholder="250 W Bullard Ave"
// 							id="location"
// 							onChange={handleChange}
// 						/>
// 					</div>
// 				</div>
// 				<div className="form-item">
// 					<div className="form-label">
// 						<label htmlFor="city">City:</label>
// 					</div>
// 					<div className="form-input">
// 						<input
// 							type="text"
// 							name="city"
// 							placeholder="Clovis"
// 							id="locality"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 					</div>
// 				</div>
// 				<div className="form-item">
// 					<div className="form-label">
// 						<label htmlFor="state">State:</label>
// 					</div>
// 					<div className="form-input">
// 						<input
// 							type="text"
// 							name="state"
// 							placeholder="California"
// 							id="administrative_area_level_1"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 					</div>
// 				</div>
// 				<div className="form-item">
// 					<div className="form-label">
// 						<label htmlFor="zip">ZIP:</label>
// 					</div>
// 					<div className="form-input">
// 						<input
// 							type="text"
// 							name="zip"
// 							placeholder="93612"
// 							id="postal_code"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 					</div>
// 				</div>

// 				<div className="form-item">
// 					<div className="form-label">
// 						<label htmlFor="country">Country:</label>
// 					</div>
// 					<div className="form-input">
// 						<input
// 							type="text"
// 							name="country"
// 							placeholder="USA"
// 							id="country"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 					</div>
// 				</div>

// 				{/* <div className="form-item">
// 													<button
// 														className="checkout-button"
// 														onClick={
// 															handleDeliveryFee
// 														}
// 													>
// 														Calculate Delivery Fee
// 													</button>
// 												</div> */}
// 			</>
// 			{/* )} */}
// 			{error ? (
// 				<div className="form-item">
// 					<p
// 						style={{
// 							color: "red",
// 							fontWeight: "bold",
// 						}}
// 					>
// 						Cannot deliver. Too far
// 					</p>
// 				</div>
// 			) : (
// 				""
// 			)}
// 		</>
// 	);
// };

// export default DeliverContainer;
