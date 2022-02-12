import React from "react";

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
							<a href="/sdc">Locations</a>
							<a href="/sdc">Contact</a>
						</div>
					</div>
				</div>
				<div className="copyright">
					<span>© {new Date().getFullYear()} Company Name.</span>
					<span>Designed and developed by Jeshuwa Bradley</span>
					<span>Privacy Policy</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
