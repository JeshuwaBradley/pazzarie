import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const About = () => {
	useEffect(() => {
		document.title = "About Us | Nova's Pizza";
	}, []);
	return (
		<div>
			<Navbar />
			<Footer />
		</div>
	);
};

export default About;
