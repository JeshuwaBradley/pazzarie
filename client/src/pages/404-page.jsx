import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const PageNotFound = () => {
	useEffect(() => {
		document.title = "404 - Page Not Found | Nova's Pizza";
	}, []);
	document.addEventListener("DOMContentLoaded", () => {
		const cheese = document.querySelector(".cheese");

		let deg = 0;

		function spin() {
			setInterval(() => {
				deg++;
				if (deg >= 360) {
					deg = 0;
				} else {
					cheese.style.transform = `rotate(${deg}deg)`;
				}
			}, 50);
		}

		spin();
	});
	return (
		<div>
			<Navbar />
			<div className="pnf">
				<div className="pnf-container">
					<h1>404</h1>
					<div className="pizza"></div>
					<div className="cheese">
						<div className="pepperoni pep-1"></div>
						<div className="pepperoni pep-2"></div>
						<div className="pepperoni pep-3"></div>
						<div className="pepperoni pep-4"></div>
						<div className="pepperoni pep-5"></div>
						<div className="pepperoni pep-6"></div>
						<div className="pepperoni pep-7"></div>
						<div className="pepperoni pep-8"></div>
						<div className="pepperoni pep-9"></div>
						<div className="pepperoni pep-10"></div>
						<div className="pepperoni pep-11"></div>
						<div className="line line-1"></div>
						<div className="line line-2"></div>
						<div className="line line-3"></div>
						<div className="line line-4"></div>
					</div>
				</div>
				<h2 className="pnf-desc">Page Not Found</h2>
			</div>
			<Footer />
		</div>
	);
};

export default PageNotFound;
