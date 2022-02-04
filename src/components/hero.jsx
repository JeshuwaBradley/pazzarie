import React from "react";

const Hero = () => {
	// const [index, setIndex] = useState(0);
	// const images = [
	// 	"/img/featured.jpg",
	// 	"/img/featured2.jpg",
	// 	"/img/featured3.jpg",
	// ];
	// const handleArrow = (direction) => {
	// 	if (direction === "l") {
	// 		setIndex(index !== 0 ? index - 1 : 2);
	// 	}
	// 	if (direction === "r") {
	// 		setIndex(index !== 2 ? index + 1 : 0);
	// 	}
	// };
	return (
		<div className="hero-container">
			{/* <div
				className="arrowContainer"
				style={{ left: 0 }}
				onClick={() => handleArrow("l")}
			>
				<img src="/img/arrowl.png" alt="left arrow" layout="fill" />
			</div> */}
			<div className="hero-wrapper">
				{/* {images.map((image, i) => ( */}
				<div className="hero-imageContainer">
					<div className="hero-text">
						<h2>Discover what's new!</h2>
						<div className="second-text">
							<div className="small-text">and</div>
							<div className="large-text">order</div>
							<div className="small-text">
								with <br /> visa
							</div>
							<div className="large-text">online</div>
						</div>
					</div>
				</div>
				{/* ))} */}
			</div>
			{/* <div
				className="arrowContainer"
				style={{ right: 0 }}
				onClick={() => handleArrow("r")}
			>
				<img src="/img/arrowr.png" alt="right arrow" layout="fill" />
			</div> */}
		</div>
	);
};

export default Hero;
