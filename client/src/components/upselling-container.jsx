import React from "react";
import UpsellingItem from "./upselling-item";

const UpsellingContainer = ({ data }) => {
	let appetizerItems = [];
	if (data) {
		for (let i in data) {
			if (data.hasOwnProperty(i)) {
				if (data[i].itemCategory === "appetizer") {
					appetizerItems.push(data[i]);
				}
			}
		}
	}
	return (
		<>
			{appetizerItems ? (
				<div className="upselling-container">
					<h3 className="upselling-container-title">
						Add one or more of the items below to get 15% OFF the
						whole order
					</h3>
					<div className="upselling-container-inner">
						{appetizerItems?.map((item, i) => (
							<UpsellingItem key={i} item={item} />
						))}
					</div>
				</div>
			) : null}
		</>
	);
};

export default UpsellingContainer;
