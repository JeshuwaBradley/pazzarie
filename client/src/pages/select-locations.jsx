import React from "react";
import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { addShop } from "../redux/cartSlice";

const SelectLocations = ({ shops }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const handleSetLocation = (e) => {
		let location = e.target.value;
		dispatch(addShop(location));
	};
	return (
		<div>
			<Navbar />
			<div
				style={{
					height: "70vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<h2>Select your closest location</h2>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginTop: "50px",
					}}
				>
					{shops?.map((shop, i) => (
						<button
							key={i}
							value={shop.location}
							onClick={(e) => handleSetLocation(e)}
							style={{
								margin: "10px",
								width: "15em",
								padding: "20px",
								fontSize: "18px",
								outline: "none",
								cursor: "pointer",
								borderColor: "red",
								backgroundColor: "#e2241a",
								color: "white",
							}}
						>
							{shop.location}
						</button>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SelectLocations;
