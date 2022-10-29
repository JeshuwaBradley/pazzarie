// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTime, addDate } from "../../redux/cartSlice";
// import "./styles.css";

// const DateTime = (address) => {
// 	console.log(address);
// 	const dispatch = useDispatch();
// 	const dates = [];
// 	let i = 0;
// 	const getDate = () => {
// 		const days = [
// 			"Sunday",
// 			"Monday",
// 			"Tuesday",
// 			"Wednesday",
// 			"Thursday",
// 			"Friday",
// 			"Saturday",
// 		];
// 		let date = new Date();
// 		dates.push([date.getMonth() + 1, date.getDate(), "Today"]);
// 		while (i < 5) {
// 			if (date.getDay() !== 0) {
// 				date.setDate(date.getDate() + 1);
// 				dates.push([
// 					date.getMonth() + 1,
// 					date.getDate(),
// 					days[date.getDay()],
// 				]);
// 				i++;
// 			} else {
// 				date.setDate(date.getDate() + 1);
// 			}
// 		}
// 	};
// 	getDate();

// 	const [date, setDate] = useState(dates[0]);
// 	const [time, setTime] = useState("");

// 	const handleStartOrder = () => {
// 		console.log(date, time);
// 		dispatch(addTime(time));
// 		dispatch(addDate(date));
// 		// window.location.href = "/order/menu";
// 	};

// 	return (
// 		<div className="dateTime">
// 			<div className="dateTime-a address">
// 				<div className="label">
// 					Delivery Available
// 					<div className="label-small"></div>
// 				</div>
// 			</div>
// 			<div className="dateTime-select date">
// 				<div className="dateTime-icon">
// 					<i className="fa fa-calendar" aria-hidden="true"></i>
// 				</div>
// 				<div className="dateTime-select select">
// 					<select
// 						name=""
// 						id=""
// 						onChange={(e) => setDate(e.target.value)}
// 					>
// 						{dates.map((e, i) => (
// 							<option value={`${e[2]} ${e[0]}/${e[1]}`} key={i}>
// 								{e[2]} {e[0]}/{e[1]}
// 							</option>
// 						))}
// 					</select>
// 				</div>
// 			</div>
// 			<div className="dateTime-select time">
// 				<div className="dateTime-icon">
// 					<i className="fa fa-clock-o" aria-hidden="true"></i>
// 				</div>
// 				<div className="dateTime-select select">
// 					<select
// 						name=""
// 						id=""
// 						onChange={(e) => setTime(e.target.value)}
// 					>
// 						<option value="9:15 AM">9:15 AM</option>
// 						<option value="9:30 AM">9:30 AM</option>
// 						<option value="9:45 AM">9:45 AM</option>
// 						<option value="10:00 AM">10:00 AM</option>
// 						<option value="10:15 AM">10:15 AM</option>
// 						<option value="10:30 AM">10:30 AM</option>
// 						<option value="10:45 AM">10:45 AM</option>
// 						<option value="11:00 AM">11:00 AM</option>
// 						<option value="11:15 AM">11:15 AM</option>
// 						<option value="11:30 AM">11:30 AM</option>
// 						<option value="11:45 AM">11:45 AM</option>
// 						<option value="12:00 PM">12:00 PM</option>
// 						<option value="12:15 PM">12:15 PM</option>
// 						<option value="12:30 PM">12:30 PM</option>
// 						<option value="12:45 PM">12:45 PM</option>
// 						<option value="1:00 PM">1:00 PM</option>
// 						<option value="1:15 PM">1:15 PM</option>
// 						<option value="1:30 PM">1:30 PM</option>
// 						<option value="1:45 PM">1:45 PM</option>
// 						<option value="2:00 PM">2:00 PM</option>
// 						<option value="2:15 PM">2:15 PM</option>
// 						<option value="2:30 PM">2:30 PM</option>
// 						<option value="2:45 PM">2:45 PM</option>
// 						<option value="3:15 PM">3:15 PM</option>
// 						<option value="3:30 PM">3:30 PM</option>
// 						<option value="3:45 PM">3:45 PM</option>
// 						<option value="4:00 PM">4:00 PM</option>
// 						<option value="4:15 PM">4:15 PM</option>
// 						<option value="4:30 PM">4:30 PM</option>
// 						<option value="4:45 PM">4:45 PM</option>
// 						<option value="5:00 PM">5:00 PM</option>
// 						<option value="5:15 PM">5:15 PM</option>
// 						<option value="5:30 PM">5:30 PM</option>
// 						<option value="5:45 PM">5:45 PM</option>
// 						<option value="6:00 PM">6:00 PM</option>
// 						<option value="6:15 PM">6:15 PM</option>
// 						<option value="6:30 PM">6:30 PM</option>
// 						<option value="6:45 PM">6:45 PM</option>
// 						<option value="7:00 PM">7:00 PM</option>
// 						<option value="7:15 PM">7:15 PM</option>
// 						<option value="7:30 PM">7:30 PM</option>
// 						<option value="7:45 PM">7:45 PM</option>
// 						<option value="8:00 PM">8:00 PM</option>
// 						<option value="8:15 PM">8:15 PM</option>
// 						<option value="8:30 PM">8:30 PM</option>
// 						<option value="8:45 PM">8:45 PM</option>
// 						<option value="9:00 PM">9:00 PM</option>
// 						<option value="9:15 PM">9:15 PM</option>
// 						<option value="9:30 PM">9:30 PM</option>
// 						<option value="9:45 PM">9:45 PM</option>
// 						<option value="10:00 PM">10:00 PM</option>
// 						<option value="10:15 PM">10:15 PM</option>
// 						<option value="10:30 PM">10:30 PM</option>
// 						<option value="10:45 PM">10:45 PM</option>
// 						<option value="11:00 PM">11:00 PM</option>
// 						<option value="11:15 PM">11:15 PM</option>
// 						<option value="11:30 PM">11:30 PM</option>
// 						<option value="11:45 PM">11:45 PM</option>
// 						<option value="12:00 AM">12:00 AM</option>
// 						<option value="12:15 AM">12:15 AM</option>
// 						<option value="12:30 AM">12:30 AM</option>
// 						<option value="12:45 AM">12:45 AM</option>
// 					</select>
// 				</div>
// 			</div>
// 			<div className="dateTime-select button" onClick={handleStartOrder}>
// 				Start your order
// 			</div>
// 		</div>
// 	);
// };

// export default DateTime;
