import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-wrapper">
				<div className="social-container">
					{/* <div className="facebook">
						<span
							style={{
								fontSize: "2em",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<i className="fa fa-facebook-square"></i>
						</span>
					</div> */}
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
					{/* <div className="twitter">
						<span
							style={{
								fontSize: "2em",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<i className="fa fa-twitter-square"></i>
						</span>
					</div> */}
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
							<Link to="/daily-deals" title="Daily Deals">
								Daily Deals
							</Link>
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
					<span>
						Designed and developed by{" "}
						<a
							href="https://portfolio-bradley.herokuapp.com"
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
