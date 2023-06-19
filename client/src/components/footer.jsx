import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-wrapper">
				<div className="social-container">
					<div className="facebook">
						<a
							title="Nova's Pizza Facebook"
							href="https://www.facebook.com/profile.php?id=100087345287467"
						>
							<span
								style={{
									fontSize: "2em",
									color: "#fff",
									cursor: "pointer",
								}}
							>
								<i className="fa fa-facebook-square"></i>
							</span>
						</a>
					</div>
					<div className="instagram">
						<a
							title="Nova's Pizza Yelp"
							href="https://www.yelp.com/biz/novas-pizza-berkeley?utm_campaign=www_business_share_popup&utm_medium=copy_link&utm_source=(direct)"
						>
							<span
								style={{
									fontSize: "2em",
									color: "#fff",
									cursor: "pointer",
								}}
							>
								<i className="fa fa-brands fa-yelp"></i>
							</span>
						</a>
					</div>
					<div className="twitter">
						<a
							title="Nova's Pizza Instagram"
							href="https://www.instagram.com/novas_pizza_llc/"
						>
							<span
								style={{
									fontSize: "2.5em",
									color: "#fff",
									cursor: "pointer",
								}}
							>
								<i className="fa  fa-instagram"></i>
							</span>
						</a>
					</div>
				</div>
				<div className="links-container">
					<div className="links-main">
						<div className="links">
							<Link to="/" title="Home">
								Home
							</Link>
							<Link to="/about-us" title="About Us">
								About Us
							</Link>
							<Link to="/menu" title="Menu">
								Menu
							</Link>
							{/* <Link to="/daily-deals" title="Daily Deals">
								Daily Deals
							</Link> */}
							<Link to="/locations" title="Locations">
								Locations
							</Link>
							<Link to="/contact" title="Contact">
								Contact
							</Link>
						</div>
					</div>
				</div>
				<div className="copyright">
					<span>
						© {new Date().getFullYear()} Nova's All Rights Reserved.
					</span>
					<span>Designed and developed by Nova's Pizza LLC.</span>
					<span>
						<Link
							to="/privacy-policy"
							title="Privacy Policy"
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
