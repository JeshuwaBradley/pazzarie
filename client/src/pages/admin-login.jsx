import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

const AdminLogin = () => {
	const navigate = useNavigate();
	const { userAdminHasAuthenticated } = useAppContext();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(false);

	const handleClick = async () => {
		try {
			await axios
				.post("http://localhost:5000/api/auth/login", {
					email: email,
					password: password,
				})
				.then((res) => {
					if (res.data.isAdmin === true) {
						userAdminHasAuthenticated(true);
						navigate("/admin");
					} else {
						setError(true);
					}
				})
				.catch((error) => {
					console.log(error);
					setError(true);
				});
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div className="admin-login-container">
			<div className="admin-login-wrapper">
				<h1>Admin Dashboard</h1>
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

export default AdminLogin;
