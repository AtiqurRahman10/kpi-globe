import React, { useEffect } from "react";
import Navbar from "../comman/Navbar";
import Sidebar from "../comman/Sidebar";
import { useNavigate, useParams, Outlet } from "react-router-dom";
function Enrollment() {
	const navitage = useNavigate();
	useEffect(() => {
		console.log(window.location.pathname);
		// navitage("/signup/overview");
	}, []);
	return (
		<React.Fragment>
			<Sidebar isActive={true} path={"enrollment"} />
			<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
				<Navbar />
				<Outlet />
			</main>
		</React.Fragment>
	);
}

export default Enrollment;
