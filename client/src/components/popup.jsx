import React, { useState } from "react";
import axios from "axios";

const Popup = ({ setShowPopUp }) => {
	const [inputs, setInputs] = useState({});
	const [show, setShow] = useState(false);
	const [copied, setCopied] = useState(false);
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};
	const handleEmail = () => {
		console.log({ inputs });
		axios
			.post("/api/email/", { ...inputs })
			.then((response) => {
				setShow(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleCopy = () => {
		let copyText = "NOVASPIZZA";
		navigator.clipboard.writeText(copyText);
		setCopied(true);
		setTimeout(() => {
			setShowPopUp(false);
		}, 1000);
	};
	return (
		<div className="popup-back">
			<div className="popup-container">
				<div className="close" onClick={() => setShowPopUp(false)}>
					<div className="close-button">
						<i className="fa fa-close"></i>
					</div>
				</div>
				<h1 className="title">Get 10% OFF</h1>
				<p>Enter your email to get the 10% OFF discount code</p>
				{show === false ? (
					<div className="popup-form">
						<input
							type="emial"
							name="email"
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							placeholder="Enter your email here"
							onChange={(e) => handleChange(e)}
						/>
						<button type="submit" onClick={handleEmail}>
							Get Code
						</button>
					</div>
				) : (
					<div className="popup-form">
						<input
							type="text"
							id="coupon-value"
							value="NOVASPIZZA"
							style={{
								textAlign: "center",
								borderColor: copied ? "green" : "red",
							}}
						/>
						<button
							type="submit"
							onClick={handleCopy}
							style={{
								backgroundColor: copied ? "green" : "",
							}}
						>
							{copied ? "Copied" : "Copy"}
						</button>
					</div>
				)}

				<p className="small">
					*By completing this form you are subscribing to our emails
					and can unsubscribe anytime.
				</p>
			</div>
		</div>
	);
};

export default Popup;
