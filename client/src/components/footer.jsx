import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-wrapper">
				<div className="social-container">
					<div className="facebook">
						<span
							style={{
								fontSize: "2em",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<i className="fa fa-facebook-square"></i>
						</span>
					</div>
					<div className="instagram">
						<span
							style={{
								fontSize: "2em",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<i className="fa fa-instagram"></i>
						</span>
					</div>
					<div className="twitter">
						<span
							style={{
								fontSize: "2em",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<i className="fa fa-twitter-square"></i>
						</span>
					</div>
				</div>
				<div className="links-container">
					<div className="links-main">
						<div className="links">
							<Link to="/about-us">About Us</Link>
							<Link to="/menu">Menu</Link>
							<Link to="/daily-deals">Daily Deals</Link>
							<Link to="/locations">Locations</Link>
							<Link to="/contact">Contact</Link>
						</div>
					</div>
				</div>
				<div className="copyright">
					<span>
						© {new Date().getFullYear()} Nova's All Rights Reserved.
					</span>
					<span>
						Designed and developed by{" "}
						<a
							href="https://portfolio-bradley.herokuapp.com"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								textDecoration: "underline",
								color: "#fff",
							}}
						>
							Jeshuwa Bradley
						</a>
					</span>
					<span>
						<Link
							to="/privacy-policy"
							style={{ textDecoration: "none", color: "#fff" }}
						>
							Privacy Policy
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
