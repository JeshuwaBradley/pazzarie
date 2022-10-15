import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const CreateYourOwn = () => {
	return (
		<>
			<Navbar />
			<div className="create-your-own">
				<div className="cyo-left">
					<div className="cyo-item"></div>
					<div className="cyo-item"></div>
					<div className="cyo-item"></div>
					<div className="cyo-item"></div>
					<div className="cyo-item"></div>
				</div>
				<div className="cyo-right"></div>
			</div>
			<Footer />
		</>
	);
};

export default CreateYourOwn;
