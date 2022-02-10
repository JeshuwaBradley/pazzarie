import React from "react";

const Review = () => {
	// const [pos, setPos] = useState(0);
	// const articles = [
	// 	{
	// 		author: "Susan Smith",
	// 		info: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
	// 	},
	// 	{
	// 		author: "Peter Jones",
	// 		info: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
	// 	},
	// 	{
	// 		author: "Anna Johnson",
	// 		info: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
	// 	},
	// 	{
	// 		author: "Bill Anderson",
	// 		info: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic.",
	// 	},
	// ];

	// let avatarTitle;
	// let authorContainer;
	// let infoContainer;

	// const setArticle = ({ obj }) => {
	// 	avatarTitle = obj.author.toUpperCase();
	// 	authorContainer = obj.author;
	// 	infoContainer = obj.info;
	// };

	// const leftArrowClick = () => {
	// 	const prevArticle = pos - 1;
	// 	setPos(prevArticle >= 0 ? prevArticle : articles.length - 1);
	// 	console.log(pos);
	// 	setArticle(articles[pos]);
	// 	console.log(articles[pos]);
	// };

	// const rightArrowClick = () => {
	// 	const nextArticle = pos + 1;
	// 	setPos(nextArticle < articles.length ? nextArticle : 0);
	// 	console.log(pos);
	// 	setArticle(articles[pos]);
	// 	console.log(articles[pos]);
	// };

	return (
		<div className="review-main">
			<main className="review-container col">
				<section className="review-container col">
					<div className="review-container-title">
						<h2>Our Customer Reviews</h2>
						<div className="underline"></div>
					</div>
					<article className="review">
						<div className="review-img-container">
							<img
								src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg"
								alt=""
								title="Peter Jones"
								id="img"
							/>
							<i className="fa fa-quote-right"></i>
						</div>
						<p id="author">Peter Jones</p>
						<p id="info">
							Edison bulb put a bird on it humblebrag, marfa pok
							pok heirloom fashion axe cray stumptown venmo
							actually seitan. VHS farm-to-table schlitz, edison
							bulb pop-up 3 wolf moon tote bag street art shabby
							chic.
						</p>
						<div className="review-arrow-buttons">
							<button
								className="btn arrow-btn"
								// onClick={leftArrowClick}
							>
								<i className="fa fa-chevron-left"></i>
							</button>
							<button
								className="btn arrow-btn"
								// onClick={rightArrowClick}
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
