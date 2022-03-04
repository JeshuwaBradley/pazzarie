import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Contact = () => {
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
							<input type="text" name="city" id="city" />
						</div>
						<div className="contact-form-item">
							<label htmlFor="name"> Your Name:</label>
							<input type="text" name="name" id="name" />
						</div>
						<div className="contact-form-item">
							<label htmlFor="email"> Your Email:</label>
							<input type="email" name="email" id="email" />
						</div>
						<div className="contact-form-item">
							<label htmlFor="number"> Your Phone Number:</label>
							<input type="text" name="number" id="number" />
						</div>
						<div className="contact-form-item">
							<label htmlFor="message"> Your Message:</label>
							<textarea
								name="message"
								id="message"
								cols="50"
								rows="10"
							></textarea>
						</div>
						<div className="contact-form-item">
							<button type="submit">Send</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Contact;
