// import React, { useState } from "react";

// const DealItem = ({ title, img, desc }) => {
// 	const [selected, setSelected] = useState(false);
// 	return (
// 		<div
// 			style={{
// 				width: "250px",
// 				border: "1px solid teal",
// 				margin: "10px",
// 				paddingTop: "10px",
// 			}}
// 		>
// 			<div className="item-image">
// 				<img src={img} alt="" height={150} width={200} />
// 			</div>
// 			<div className="item-title" style={{ margin: "5px" }}>
// 				<h3 style={{ fontSize: "20px" }}>{title}</h3>
// 			</div>
// 			<div className="item-desc" style={{ margin: "5px" }}>
// 				{desc}
// 			</div>
// 			<div
// 				className="item-button"
// 				style={{
// 					backgroundColor: "teal",
// 					color: "white",
// 					margin: "5px",
// 					padding: "10px",
// 					fontSize: "20px",
// 					cursor: "pointer",
// 				}}
// 				onClick={(e) => {
// 					e.preventDefault();
// 					setSelected(!selected);
// 				}}
// 			>
// 				{selected ? "Selected" : "Select"}
// 			</div>
// 		</div>
// 	);
// };

// export default DealItem;
