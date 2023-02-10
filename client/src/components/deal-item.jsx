import React, { useState } from "react";

const PromotionDealItem = ({
	item,
	addToSelect,
	removeFromSelect,
	itemSelected,
}) => {
	const [selected, setSelected] = useState(false);

	return (
		<>
			{itemSelected === true && selected === false ? (
				""
			) : (
				<div className="promotion-deal-item">
					<div className="promotion-deal-item-image">
						<img src={item.imgSrc} alt="" />
					</div>
					<div className="promotion-deal-item-content">
						<div className="item-promotion-deal-item-title">
							<h3>{item.itemTitle}</h3>
						</div>
						{selected === true ? (
							<div
								className="promotion-deal-item-button"
								onClick={() => {
									removeFromSelect({ item });
									setSelected(false);
								}}
							>
								Selected
							</div>
						) : (
							<div
								className="promotion-deal-item-button"
								onClick={(e) => {
									e.preventDefault();
									setSelected(true);
									addToSelect({ item });
								}}
							>
								Select
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default PromotionDealItem;
