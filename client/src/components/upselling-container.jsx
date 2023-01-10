import React from "react";
import UpsellingItem from "./upselling-item";

const UpsellingContainer = ({ item, data }) => {
	let upsellingItems = item?.upsellingItems;

	return (
		<>
			{upsellingItems ? (
				<div className="upselling-container">
					<h3 className="upselling-container-title">
						Add one or more of the items below to get 15% OFF the
						whole order
					</h3>
					<div className="upselling-container-inner">
						{upsellingItems?.map((item, i) => (
							<UpsellingItem
								key={i}
								item={data.find((x) => x._id === item)}
							/>
						))}
					</div>
				</div>
			) : null}
		</>
	);
};

export default UpsellingContainer;
