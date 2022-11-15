// import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// import DealItem from "./deal-item";

// const Deal = ({ data }) => {
// 	const [open, setOpen] = useState(false);
// 	console.log(data);
// 	return (
// 		<>
// 			{open ? (
// 				<>
// 					<div className="deal" style={{ width: "90vw" }}>
// 						<div className="deal-image">
// 							<img
// 								src="https://adminsc.pizzahut.lk//images/mainmenu/db136bba-6366-42a5-8ad1-5e4752796a01.jpg"
// 								height={160}
// 								alt=""
// 							/>
// 						</div>
// 						<div className="deal-select-main">
// 							Maximum of Five Items allowed
// 						</div>
// 						<div
// 							className="deal-select"
// 							style={{
// 								padding: "10px",
// 								width: "90vw",
// 								textAlign: "center",
// 								marginBottom: "5px",
// 								display: "flex",
// 							}}
// 						>
// 							{data.map((item) => {
// 								if (item.itemCategory === "pizza") {
// 									return (
// 										<DealItem
// 											title={item.itemTitle}
// 											img={item.imgSrc}
// 											desc={item.itemDesc}
// 										/>
// 									);
// 								} else {
// 									return null;
// 								}
// 							})}
// 						</div>
// 						<div
// 							className="deal-button"
// 							style={{
// 								height: "3em",
// 								width: "90vw",
// 								textAlign: "center",
// 								border: "1px solid #000",
// 								marginBottom: "5px",
// 								backgroundColor: "teal",
// 								color: "white",
// 							}}
// 						>
// 							Add To Cart
// 						</div>
// 					</div>
// 				</>
// 			) : (
// 				<>
// 					<div className="deal" onClick={() => setOpen(true)}>
// 						<div className="deal-image">
// 							<img
// 								src="https://adminsc.pizzahut.lk//images/mainmenu/f631913a-ef69-4eff-aab8-4ba19d3ef6de.jpg"
// 								alt=""
// 								height={200}
// 								width="auto"
// 							/>
// 						</div>
// 						<div className="deal-context">5 Pie Special</div>
// 					</div>
// 				</>
// 			)}
// 		</>
// 	);
// };

// export default Deal;
