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
					<div className="hero-text" style={{ display: "none" }}>
						<h2 className="second-h2">Discover what's new!</h2>
						<div className="text second-text">
							<div className="small-text small-text-1">and</div>
							<div className="large-text">order</div>
							<div className="small-text small-text-1">
								with <br /> visa
							</div>
							<div className="large-text">online</div>
						</div>
					</div>
					<div className="hero-text" style={{ display: "none" }}>
						<div className="special-tag special-tag-clr">
							<h2 className="third-h2">$ 12.99</h2>
							<h3>only</h3>
						</div>
						<div className="text third-text">
							<div className="large-text">original italy</div>
							<div className="small-text small-text-2">
								pizza lovers set
							</div>
						</div>
					</div>
					<div className="hero-text" style={{ display: "block" }}>
						<div className="special-tag special-tag-trns">
							<div className="new-tag">
								<h2>new!</h2>
							</div>
							<h2 className="third-h2">limited time offer!</h2>
						</div>
						<div className="text fourth-text">
							<div className="large-text">supreme bbq</div>
							<div className="small-text small-text-2">
								chicken
							</div>
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
