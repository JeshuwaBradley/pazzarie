import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";

const Contact = () => {
	const [city, setCity] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [message, setMessage] = useState("");
	const [sent, setSent] = useState(false);

	const handleSend = (e) => {
		e.preventDefault();
		axios
			.post("/api/contact/", { city, name, email, number, message })
			.then((res) => {
				if (res.status === 200) {
					setSent(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
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

			{!sent ? (
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
									required
								/>
							</div>
							<div className="contact-form-item">
								<label htmlFor="name"> Your Name:</label>
								<input
									type="text"
									name="name"
									id="name"
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="contact-form-item">
								<label htmlFor="email"> Your Email:</label>
								<input
									type="email"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="contact-form-item">
								<label htmlFor="number">
									{" "}
									Your Phone Number:
								</label>
								<input
									type="text"
									name="number"
									id="number"
									onChange={(e) => setNumber(e.target.value)}
									required
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
									required
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
								opacity: " 0",
								transition: "all 200ms ease",
							}}
						>
							Message Received
						</h1>
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
							<p>We will respond as soon as possible</p>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Contact;
