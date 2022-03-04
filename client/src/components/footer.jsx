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
							<Link to="/sdc">About Us</Link>
							<Link to="/menu">Menu</Link>
							<Link to="/daily-deals">Daily Deals</Link>
							<Link to="/sdc">Locations</Link>
							<Link to="/contact">Contact</Link>
						</div>
					</div>
				</div>
				<div className="copyright">
					<span>
						© {new Date().getFullYear()} Nova's All Rights Reserved.
					</span>
					<span>Designed and developed by Jeshuwa Bradley</span>
					<span>Privacy Policy</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
