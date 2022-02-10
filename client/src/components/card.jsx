import React, { useState } from "react";

const Card = ({ item }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className="card-container">
				<div className="card">
					<img
						src={item.imgSrc}
						className="card-image"
						alt="item"
						width="200"
						height="200"
					/>
					<h1 className="card-title">{item.itemTitle}</h1>
					<p className="card-description">{item.itemDesc}</p>
					<span className="card-price">$ {item.itemPrices[0]}</span>
					<button
						className="card-link"
						onClick={(e) => setModalOpen(true)}
					>
						Order
					</button>
				</div>
			</div>

			<div className={`${modalOpen ? "modal modal-bg" : "modal"}`}></div>

			<div
				className={`${
					modalOpen
						? "modal-content modal-content-show"
						: "modal-content"
				}`}
			>
				<i
					className="modal-close fa fa-times fa-lg"
					onClick={handleClose}
				></i>

				<div className="modal-left">
					<img className="modal-img" src={item.imgSrc} alt="" />
				</div>

				<div className="modal-right">
					<div className="detail">
						<div className="detail-item">
							<h2 className="detail-title">{item.itemTitle}</h2>
						</div>
						<div className="detail-item">
							<p className="detail-description">
								{item.itemDesc}
							</p>
						</div>
						<div className="detail-item">
							<h3>Choose the size</h3>
							<form>
								<div>
									<input
										type="radio"
										name="size"
										id="large"
										value="large"
									/>
									<label htmlFor="large">Large</label>
								</div>
								<div>
									<input
										type="radio"
										name="size"
										id="medium"
										value="medium"
									/>
									<label htmlFor="medium">Medium</label>
								</div>
								<div>
									<input
										type="radio"
										name="size"
										id="small"
										value="small"
									/>
									<label htmlFor="small">Small</label>
								</div>
							</form>
						</div>
						{item?.extraOptions.length !== 0 ? (
							<div className="detail-item">
								<h3>Choose additional ingredients</h3>
								<form>
									{item?.extraOptions.length !== 0
										? item.extraOptions.map((option) => {
												return (
													<div>
														<input
															type="checkbox"
															id="extra-cheese"
															name="extra-cheese"
															value="extra-cheese"
														/>
														<label htmlFor="extra-cheese">
															{option?.text}
														</label>
													</div>
												);
										  })
										: ""}
								</form>
							</div>
						) : (
							""
						)}
						<div className="detail-item">
							<p className="detail-price">
								$ {item.itemPrices[0]}
							</p>
						</div>
						<div className="detail-item">
							<p className="detail-bagBtn">Add to Cart</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
