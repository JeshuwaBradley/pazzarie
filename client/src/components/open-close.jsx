import axios from "axios";
import React, { useEffect, useState } from "react";

const OpenClose = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		axios.get("/api/open").then((res) => {
			console.log(`shop open ${res.data["open"]}`);
			if (res.data["open"]) {
				setOpen(true);
			} else if (!res.data["open"]) {
				setOpen(false);
			}
		});
	}, []);

	const handleOpen = () => {
		axios.post("/api/open/close", { value: true }).then((res) => {
			console.log(res.data["open"]);
		});
	};

	const handleClose = () => {
		axios.post("/api/open/close", { value: false }).then((res) => {
			console.log(res.data["open"]);
		});
	};
	return (
		<>
			<div className="open-close-container">
				<h3>Open & Close Shop Button</h3>
				{open ? (
					<button className="open-close-button" onClick={handleClose}>
						Close Shop
					</button>
				) : (
					<button className="open-close-button" onClick={handleOpen}>
						Open Shop
					</button>
				)}
			</div>
		</>
	);
};

export default OpenClose;
