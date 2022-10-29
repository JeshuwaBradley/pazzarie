import React from "react";
import { Link } from "react-router-dom";

const HomeDeal = () => {
	return (
		<div className="homeDeal">
			<div className="homeDeal-inner">
				<h1>Want to see some</h1>
				<h1 className="exclusive">Exlusive Deals?</h1>
				<Link to="/daily-deals" className="homeDeal-link">
					<i
						className="fa fa-external-link"
						style={{
							fontSize: "0.8em",
							marginRight: "10px",
							color: "#e2241a",
						}}
					></i>
					Deals{" "}
				</Link>
			</div>
		</div>
	);
};

export default HomeDeal;
