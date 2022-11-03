import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Locations = () => {
	useEffect(() => {
		document.title = "Our Locations | Nova's Pizza";
	}, []);
	return (
		<div>
			<Navbar />
			<Footer />
		</div>
	);
};

export default Locations;
