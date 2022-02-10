import React from "react";

const Hero = () => {
	const slides = document.getElementsByClassName("carousel-item");
	let position = 0;

	function hideAllSlides() {
		for (const slide of slides) {
			slide.classList.remove("carousel-item-visible");
			slide.classList.add("carousel-item-hidden");
		}
	}

	const handleMoveToNextSlide = function () {
		hideAllSlides();
		if (position === 0) {
			position++;
		} else if (position === 1) {
			position++;
		} else if (position === 2) {
			position = 0;
		}
		slides[position].classList.add("carousel-item-visible");
	};
	(function loop() {
		setTimeout(function () {
			handleMoveToNextSlide();
			loop();
		}, 10000);
	})();

	return (
		<div className="hero-container">
			<div
				className="hero-wrapper carousel slide"
				id="carouselExampleSlidesOnly"
				data-ride="carousel"
			>
				<div className="hero-imageContainer carousel">
					<div className="hero-text carousel-item carousel-item-visible">
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
					<div className="hero-text carousel-item">
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
					<div className="hero-text carousel-item">
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
			</div>
		</div>
	);
};

export default Hero;