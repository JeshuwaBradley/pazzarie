import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Contact = () => {
	const [city, setCity] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [message, setMessage] = useState("");
	const validate = () => {
		if (
			city === "" ||
			name === "" ||
			email === "" ||
			number === "" ||
			message === ""
		) {
			return false;
		} else {
			return true;
		}
	};
	const handleSend = (e) => {
		e.preventDefault();
		validate();
		console.log(city, name, email, number, message);
	};
	return (
		<div>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Contact</h1>
				</div>
			</div>
			<div className="contact-main">
				<div className="contact-form">
					<form>
						<div className="contact-form-item">
							<label htmlFor="city"> City:</label>
							<input
								type="text"
								name="city"
								id="city"
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div className="contact-form-item">
							<label htmlFor="name"> Your Name:</label>
							<input
								type="text"
								name="name"
								id="name"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="contact-form-item">
							<label htmlFor="email"> Your Email:</label>
							<input
								type="email"
								name="email"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="contact-form-item">
							<label htmlFor="number"> Your Phone Number:</label>
							<input
								type="text"
								name="number"
								id="number"
								onChange={(e) => setNumber(e.target.value)}
							/>
						</div>
						<div className="contact-form-item">
							<label htmlFor="message"> Your Message:</label>
							<textarea
								name="message"
								id="message"
								cols="50"
								rows="10"
								onChange={(e) => setMessage(e.target.value)}
							></textarea>
						</div>
						<div className="contact-form-item">
							<button
								type="submit"
								onClick={(e) => handleSend(e)}
							>
								Send
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Contact;
