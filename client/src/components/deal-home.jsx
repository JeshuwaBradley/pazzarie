import React from "react";
import { Link } from "react-router-dom";

const HomeDeal = () => {
	return (
		<div className="homeDeal">
			<div className="homeDeal-inner">
				<h1>Want to see some</h1>
				<h1 className="exclusive">Exlusive Promotions?</h1>
				<Link to="/promotions" className="homeDeal-link">
					<i
						className="fa fa-external-link"
						style={{
							fontSize: "0.8em",
							marginRight: "10px",
							color: "#e2241a",
						}}
					></i>
					Promotions{" "}
				</Link>
			</div>
		</div>
	);
};

export default HomeDeal;
