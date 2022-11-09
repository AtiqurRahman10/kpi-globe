import React, { useEffect } from "react";
import Navbar from "../comman/Navbar";
import Sidebar from "../comman/Sidebar";
import { useNavigate, useParams, Outlet } from "react-router-dom";
function Fulfillment() {
	const navitage = useNavigate();
	useEffect(() => {
		// navitage("/fulfillment/overview");
	}, []);
	return (
		<React.Fragment>
			<Sidebar isActive={true} path={"fulfillment"} />
			<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
				<Navbar />
				<Outlet />
			</main>
		</React.Fragment>
	);
}

export default Fulfillment;
