import React, { useState } from "react";

const Review = () => {
	const [pos, setPos] = useState(0);
	const articles = [
		{
			author: "Josuhua",
			info: "The pizza here is real amazing and would recommend trying these guys out. They have a great toppings selections and great prices on a single sliced.",
		},
		{
			author: "Peter Jones",
			info: "The best pizza we ever had in (City)!! The pizza was so delicious and with so many flavor could choose that we even ordered pizza twice in the same day!",
		},
		{
			author: "Anna Johnson",
			info: "Consistently great pizza with great variety of toppings and styles. Delivery is fast too. Can’t go wrong with this place.",
		},
		{
			author: "Bill Anderson",
			info: "They offer an awesome range of fresh pizzas. I liked ordering pizza from here. Prices are reasonable and delivers the pizza fast.",
		},
	];

	let authorContainer;
	let infoContainer;

	const setArticle = (obj) => {
		authorContainer = obj?.author;
		infoContainer = obj?.info;
	};

	setArticle(articles[pos]);

	const leftArrowClick = () => {
		const prevArticle = pos - 1;
		setPos(prevArticle >= 0 ? prevArticle : articles.length - 1);
		console.log(pos);
		setArticle(articles[pos]);
		console.log(articles[pos]);
	};

	const rightArrowClick = () => {
		const nextArticle = pos + 1;
		setPos(nextArticle < articles.length ? nextArticle : 0);
		console.log(pos);
		setArticle(articles[pos]);
		console.log(articles[pos]);
	};

	return (
		<div className="review-main">
			<main className="review-container col">
				<section className="review-container col">
					<div className="review-container-title">
						<h2>Our Customer Reviews</h2>
						<div className="underline"></div>
					</div>
					<article className="review">
						{/* <div className="review-img-container">
							<img  loading="lazy"
								src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg"
								alt=""
								title="Peter Jones"
								id="img"
							/>
							<i className="fa fa-quote-right"></i>
						</div> */}
						<p id="author">{authorContainer}</p>
						<p id="info">{infoContainer}</p>
						<div className="review-arrow-buttons">
							<button
								className="btn arrow-btn"
								onClick={leftArrowClick}
							>
								<i className="fa fa-chevron-left"></i>
							</button>
							<button
								className="btn arrow-btn"
								onClick={rightArrowClick}
							>
								<i className="fa fa-chevron-right"></i>
							</button>
						</div>
					</article>
				</section>
			</main>
		</div>
	);
};

export default Review;
