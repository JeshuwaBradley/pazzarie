import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const PageNotFound = () => {
	useEffect(() => {
		document.title = "404 - Page Not Found | Nova's Pizza";
	}, []);
	return (
		<div>
			<Navbar />
			<div className="pnf">
				<div className="pnf-container">
					<h1>404</h1>
				</div>
				<h2 className="pnf-desc">Page Not Found</h2>
			</div>
			<Footer />
		</div>
	);
};

export default PageNotFound;
