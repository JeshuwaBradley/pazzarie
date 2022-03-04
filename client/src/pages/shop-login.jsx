// import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

const ShopLogin = () => {
	const navigate = useNavigate();
	const { userShopHasAuthenticated } = useAppContext();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(false);

	const handleClick = async () => {
		userShopHasAuthenticated(true);
		navigate("/shop/1");
		// try {
		// 	await axios.post("http://localhost:5000/api/auth/login", {
		// 		email: email,
		// 		password: password,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<div className="admin-login-container">
			<div className="admin-login-wrapper">
				<h1>Shop Dashboard</h1>
				<input
					type="email"
					placeholder="johndoe@email.com"
					className="admin-login-input"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					placeholder="password"
					type="password"
					className="admin-login-input"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleClick} className="admin-login-button">
					Log In
				</button>
				{error && (
					<span className="admin-login-error">
						Wrong Credentials!
					</span>
				)}
			</div>
		</div>
	);
};

export default ShopLogin;
