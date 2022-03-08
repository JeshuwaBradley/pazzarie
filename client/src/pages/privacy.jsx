import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Privacy = () => {
	return (
		<div>
			<Navbar />
			<div className="privacy-policy-title">
				<h2>Privacy Policy</h2>
			</div>
			<div className="terms">
				<h3>Information that is gathered from visitors</h3>
				<p>
					In common with other websites, log files are stored on the
					web server saving details such as the visitor's IP address,
					browser type, referring page and time of visit.
				</p>
				<p>
					{" "}
					Cookies may be used to remember visitor preferences when
					interacting with the website.
				</p>
				<p>
					{" "}
					Collected information may include visitor information that
					is directly provided or automatically collected by use of
					our website and services. Any information that is not
					personal does not allow us to specifically identify a user
					or visitor, only to understand general and aggregate user
					behaviour. This information includes date and time stamps,
					mouse, scroll, heatmap, and click behavior, as well as
					operating system, browser, screen, ISP, keyboard. We may use
					certain technologies like tags, cookies, beacons, and
					scripts to keep track of user preferences and overall
					improve user experience.
				</p>
				<p>
					{" "}
					We may also collect personal information that individuals
					directly provide like name, email, password, contact,
					billing, language, and location information, as well as
					connected third party services and any other information or
					access directly provided to us through our form or
					explicitly requested.
				</p>
				<p>
					All information may be stored by the website developer,
					Fisherman Technologies, Inc.
				</p>
				<h3>How the information is used</h3>
				<p>
					We use the collected information in order to enhance the
					experience of our users, including improving our website
					technology and design based on usage metrics, to determine
					what services might be more or less useful, to better
					understand and service the needs of our users (including
					information we maintain about previous users), and relay
					additional benefits to both visitors and users.
				</p>
				<p>
					Email addresses will not be sold, rented or leased to 3rd
					parties.
				</p>
				<p>
					Email may be sent to inform you of news of our services or
					offers by us or our affiliates.
				</p>
				<h3>Visitors Options</h3>
				<p>
					If you have subscribed to one of our services, you may
					unsubscribe by reaching out to us directly.
				</p>
				<p>
					You may be able to block cookies via your browser settings
					but this may prevent you from access to certain features of
					the website.
				</p>
				<h3>Cookies</h3>
				<p>
					Cookies are small digital signature files that are stored by
					your web browser that allow your preferences to be recorded
					when visiting the website. Also they may be used to track
					your return visits to the website.
				</p>
				<p>
					3rd party advertising companies may also use cookies for
					tracking purposes.
				</p>
				<h3>Google Ads</h3>
				<p>
					Google, as a third party vendor, uses cookies to serve ads.
				</p>
				<p>
					Google's use of the DART cookie enables it to serve ads to
					visitors based on their visit to sites they visit on the
					Internet.
				</p>
				<p>
					Website visitors may opt out of the use of the DART cookie
					by visiting the Google ad and content network privacy
					policy.
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Privacy;
