// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import DateTime from "./date-time";
// import "./styles.css";
// import { addPickUporDeliver, addShop, removeShop } from "../../redux/cartSlice";
// import { useDispatch } from "react-redux";

// const PickUpOrDeliver = () => {
// 	const dispatch = useDispatch();
// 	const [pickUp, setPickUp] = useState(false);
// 	const [deliver, setDeliver] = useState(false);
// 	const [deliverySet, setDeliverySet] = useState(false);
// 	const [pickUpShop, setPickUpShop] = useState("");
// 	const [deliverShop, setDeliverShop] = useState(false);
// 	const [deliveryAddress, setDeliveryAddress] = useState("");

// 	let autoComplete;

// 	const handleScriptLoad = () => {
// 		const autocompleteInput = document.getElementById("location");

// 		autoComplete = new window.google.maps.places.Autocomplete(
// 			autocompleteInput,
// 			{
// 				fields: ["address_components", "geometry", "name"],
// 				types: ["address"],
// 			}
// 		);

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

// 			let address =
// 				getAddressComp("street_number") +
// 				", " +
// 				getAddressComp("route") +
// 				", " +
// 				getAddressComp("locality") +
// 				", " +
// 				getAddressComp("administrative_area_level_1") +
// 				", " +
// 				getAddressComp("country") +
// 				", " +
// 				getAddressComp("postal_code");

// 			document.getElementById("location").value = address;
// 			setDeliveryAddress(address);
// 		};
// 	};

// 	useEffect(() => {
// 		handleScriptLoad();
// 	});

// 	const handleContinue = () => {
// 		setDeliverShop(true);
// 	};

// 	const handleDeliveryFee = () => {
// 		if (!deliverySet) {
// 			axios
// 				.post("/api/distance", {
// 					deliveryAddress,
// 				})
// 				.then((response) => {
// 					let distance =
// 						response.data.rows[0].elements[0].distance.value;
// 					if (distance > 5632.7) {
// 						// setError(true);
// 						setDeliver();
// 						let input = document.getElementById("deliver");
// 						input.checked = false;
// 					} else {
// 						// dispatch(addDelivery(calcDeliveryFee(distance)));
// 					}
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		}
// 	};

// 	if (deliveryAddress && !deliverySet) {
// 		handleDeliveryFee();
// 		setDeliverySet(true);
// 	}

// 	const handleDeliver = () => {
// 		setDeliver(true);
// 		setPickUp(false);
// 		setPickUpShop("");
// 		dispatch(addShop("1"));
// 		dispatch(addPickUporDeliver("deliver"));
// 	};

// 	const handlePickup = () => {
// 		setPickUp(true);
// 		setDeliver(false);
// 		setDeliverySet(false);
// 		setDeliverShop(false);
// 		setDeliveryAddress("");
// 		dispatch(removeShop());
// 		dispatch(addPickUporDeliver("pickup"));
// 	};

// 	return (
// 		<div className="pord">
// 			<div className="pord-button-container">
// 				<div
// 					className={pickUp ? "pord-button active" : "pord-button"}
// 					onClick={handlePickup}
// 				>
// 					PickUp
// 				</div>
// 				<div
// 					className={deliver ? "pord-button active" : "pord-button"}
// 					onClick={handleDeliver}
// 				>
// 					Deliver
// 				</div>
// 			</div>
// 			{pickUpShop || deliverShop ? (
// 				<DateTime address={deliveryAddress} />
// 			) : (
// 				<>
// 					{pickUp ? (
// 						<div className="pord-info-container">
// 							<div className="pord-info">
// 								<div className="label">Coming Soon...</div>
// 							</div>
// 						</div>
// 					) : (
// 						""
// 					)}
// 					{deliver ? (
// 						<div className="pord-info-container">
// 							<div className="pord-info">
// 								<div className="label">
// 									Enter the delivery address
// 									<div className="label-small">
// 										Start typing to search for an address
// 									</div>
// 								</div>

// 								<input
// 									className="pord-input"
// 									type="text"
// 									name=""
// 									id="location"
// 								/>
// 								<button
// 									className="pord-continue-button"
// 									onClick={handleContinue}
// 								>
// 									Continue
// 								</button>
// 							</div>
// 						</div>
// 					) : (
// 						""
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default PickUpOrDeliver;
