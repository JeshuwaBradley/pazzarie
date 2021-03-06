import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import ShopItem from "../components/shop-item";

const Items = ({ currentItems }) => {
	return (
		<>
			{currentItems &&
				currentItems.map((order, i) => {
					return <ShopItem order={order} key={i} />;
				})}
		</>
	);
};

const Shop = () => {
	const { id } = useParams();
	const [orders, setOrders] = useState(null);
	const itemsPerPage = 10;
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		axios
			.get(`/api/order/find-shop/${id}`)
			.then((res) => {
				setOrders(res.data);
				const endOffset = itemOffset + itemsPerPage;
				setCurrentItems(res.data?.slice(itemOffset, endOffset));
				setPageCount(Math.ceil(res.data.length / itemsPerPage));
			})
			.catch((err) => console.log(err));
	}, [itemOffset, itemsPerPage, id]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % orders.length;
		setItemOffset(newOffset);
	};

	const handleRefresh = () => {
		setOrders(null);
		setCurrentItems(null);
		setPageCount(0);
		setItemOffset(0);
		axios
			.get(`/api/order/find-shop/${id}`)
			.then((res) => {
				setOrders(res.data);
				const endOffset = itemOffset + itemsPerPage;
				setCurrentItems(res.data?.slice(itemOffset, endOffset));
				setPageCount(Math.ceil(res.data.length / itemsPerPage));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<Navbar />
			<div className="shop-main">
				<div className="shop-main-title">
					<h2>Orders for shop id: {id}</h2>
				</div>
				<div className="refresh">
					<button onClick={handleRefresh}>
						Refresh
						<span>
							<i className="fa fa-refresh"></i>
						</span>
					</button>
				</div>
				<div className="shop-main-table">
					<div className="shop-table">
						<div className="shop-table-row">
							<div className="shop-table-row-id">
								<h2>ID</h2>
							</div>
							<div className="shop-table-row-customer">
								<h2>Customer</h2>
							</div>
							<div className="shop-table-row-number">
								<h2>Items</h2>
							</div>
							<div className="shop-table-row-deliver">
								<h2>Deliver</h2>
							</div>
							<div className="shop-table-row-status">
								<h2>Status</h2>
							</div>
						</div>
						<Items currentItems={currentItems} />
					</div>
					<ReactPaginate
						breakLabel="..."
						nextLabel=">"
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel="<"
						renderOnZeroPageCount={null}
						className="react-paginate"
						activeClassName="paginate-active"
						previousClassName="arrow-button"
						nextClassName="arrow-button"
						previousLinkClassName="previous"
						nextLinkClassName="next"
						disabledClassName="disabled"
					/>
				</div>
			</div>
		</div>
	);
};

export default Shop;
