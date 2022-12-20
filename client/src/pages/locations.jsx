import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Locations = () => {
	useEffect(() => {
		document.title = "Our Locations | Nova's Pizza";
	}, []);
	return (
		<div>
			<Navbar />
			<div className="menu-hero">
				<div className="menu-hero-title">
					<div className="menu-hero-title-bgc"></div>
					<h1>Locations</h1>
				</div>
			</div>
			<div className="locations">
				<div className="locations-inner">
					<div className="location">
						<h2>
							<i
								className="fa fa-map-marker"
								style={{ color: "red" }}
							></i>{" "}
							Berkeley, California
						</h2>
						{/* <div className="location-name">Berkeley, California</div> */}
						<div className="location-address">
							1704, University Avenue, Berkeley, California 94703,
							USA
						</div>
						<div className="location-deliver">Pickup Available</div>
						<div className="location-deliver">
							Delivery Available
						</div>
					</div>
					<div className="location">
						<h2>
							<i
								className="fa fa-map-marker"
								style={{ color: "red" }}
							></i>{" "}
							Oakland, California
						</h2>
						{/* <div className="location-name">Oakland, California</div> */}
						<div className="location-address">
							1438 Broadway, Oakland, California 94612, USA
						</div>
						{/* <div className="location-deliver">Pickup Available</div> */}
						<div className="location-deliver">
							Delivery Available
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Locations;
