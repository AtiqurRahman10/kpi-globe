import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
	const [activeIcon, setActiveIcon] = useState(
		"icon icon-shape shadow border-radius-md text-center d-flex align-items-center justify-content-center me-2"
	);
	const [activeTab, setactiveTab] = useState(
		"opacity-10 text-2xl d-flex align-items-center justify-content-center"
	);

	const nameUrl = props;
	let activeUrl = window.location.pathname;

	console.log("window.location.href", window.location.pathname);
	console.log(nameUrl);
	return (
		<React.Fragment>
			<aside
				className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
				id="sidenav-main">
				<div className="sidenav-header">
					<i
						className="fas fa-times cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
						aria-hidden="true"
						id="iconSidenav"></i>
					<Link
						className="navbar-brand m-0"
						to="../../pages/dashboards/crm.html">
						<img
							src="../../assets/img/logo-ct-dark.png"
							className="navbar-brand-img"
							alt="main_logo"
						/>
						<span className="ms-2 text-xxl font-weight-bold">
							Tremfya With Me
						</span>
					</Link>
				</div>
				{/* <!--  User --> */}
				<hr className="horizontal dark" />
				<div
					className="collapse navbar-collapse w-auto h-auto"
					id="sidenav-collapse-main">
					<ul className="navbar-nav">
						{/* <li className="nav-item">
							<a href="../../pages/dev-pages/account/settings.html">
								<div className="nav-link p-3">
									<img
										src="https://lh3.googleusercontent.com/ogw/ADea4I74_-_H7q-ze1cX7R_Tt761ZO-GsbAN9GtecMjcfw=s64-c-mo"
										className="icon-shape shadow border-radius-lg text-center d-flex align-items-center justify-content-center p-1 me-2"
									/>
									<div className="">
										<span className="nav-link-text ms-1">Tyler Doyle</span>
									</div>
								</div>
							</a>
						</li> */}
					</ul>
					{/* <!--  Home --> */}
					<ul className="navbar-nav">
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#homePages"
								className="nav-link active p-3"
								aria-controls="dashboardsExamples"
								role="button"
								aria-expanded="true">
								<div
									className={`${activeIcon} ${
										nameUrl.path == "home" ? "bg-gradient-primary" : ""
									}`}>
									<i
										className={`${activeTab} ${
											nameUrl.path == "home"
												? "fa-solid fa-house fa-fw text-white"
												: "fa-solid fa-house fa-fw text-gradient text-primary"
										}`}
										aria-hidden="true"></i>
								</div>
								<span className="nav-link-text ms-1">Home</span>
							</a>
							{/* <div className="collapse show" id="homePages"> */}
							<div
								className={`collapse ${nameUrl.path == "home" ? "show" : ""}`}
								id="homePages">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/home/overview" ? "active" : ""
													}`}
													to="/home/overview">
													<span className="sidenav-normal"> Overview </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/home/driver" ? "active" : ""
													}`}
													to="/home/driver">
													<span className="sidenav-normal"> Drivers </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/home/engagement" ? "active" : ""
													}`}
													to="/home/engagement">
													<span className="sidenav-normal"> Engagement </span>
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						{/* <!--  Sign Up --> */}
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#signUpPages"
								className="nav-link"
								aria-controls="pagesExamples"
								role="button"
								aria-expanded="false">
								<div
									className={`${activeIcon} ${
										nameUrl.path == "signup" ? "bg-gradient-primary" : ""
									}`}>
									<i
										className={`${activeTab} ${
											nameUrl.path == "signup"
												? "fa-solid fa-pen-line fa-fw text-white"
												: "fa-solid fa-pen-line fa-fw text-gradient text-primary"
										}`}></i>
								</div>
								<span className="nav-link-text ms-1">Sign Up</span>
							</a>
							{/* <div className="collapse" id="signUpPages"> */}
							<div
								className={`collapse ${nameUrl.path == "signup" ? "show" : ""}`}
								id="signUpPages">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/signup/overview" ? "active" : ""
													}`}
													to="/signup/overview">
													<span className="sidenav-normal"> Overview </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/signup/driver" ? "active" : ""
													}`}
													to="/signup/driver">
													<span className="sidenav-normal"> Drivers </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/signup/engagement" ? "active" : ""
													}`}
													to="/signup/engagement">
													<span className="sidenav-normal"> Engagement </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/signup/demographics" ? "active" : ""
													}`}
													to="/signup/demographics">
													<span className="sidenav-normal"> Demographics </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/signup/hcp-performance"
															? "active"
															: ""
													}`}
													to="/signup/hcp-performance">
													<span className="sidenav-normal">
														{" "}
														HCP Performance{" "}
													</span>
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						{/* <!--  Enrollment --> */}
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#enrollmentPages"
								className="nav-link"
								aria-controls="applicationsExamples"
								role="button"
								aria-expanded="false">
								{/* <div className="icon icon-shape shadow border-radius-md text-center d-flex align-items-center justify-content-center me-2">
									<i className="fa-solid fa-clipboard-user fa-fw opacity-10 text-2xl text-gradient text-primary d-flex align-items-center justify-content-center"></i>
								</div> */}

								<div
									className={`${activeIcon} ${
										nameUrl.path == "enrollment" ? "bg-gradient-primary" : ""
									}`}>
									<i
										className={`${activeTab} ${
											nameUrl.path == "enrollment"
												? "fa-solid fa-clipboard-user fa-fw text-white"
												: "fa-solid fa-clipboard-user fa-fw text-gradient text-primary"
										}`}></i>
								</div>

								<span className="nav-link-text ms-1">Enrollment</span>
							</a>
							<div
								className={`collapse ${
									nameUrl.path == "enrollment" ? "show" : ""
								}`}
								id="enrollmentPages">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/enrollment/enrollment-overview.html">
													<span className="sidenav-normal"> Overview </span>
												</a> */}

												<Link
													className={`nav-link ${
														activeUrl == "/enrollment/overview" ? "active" : ""
													}`}
													to="/enrollment/overview">
													<span className="sidenav-normal"> Overview </span>
												</Link>
											</li>
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/enrollment/enrollment-drivers.html">
													<span className="sidenav-normal"> Drivers </span>
												</a> */}

												<Link
													className={`nav-link ${
														activeUrl == "/enrollment/driver" ? "active" : ""
													}`}
													to="/enrollment/driver">
													<span className="sidenav-normal"> Drivers </span>
												</Link>
											</li>
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/enrollment/enrollment-engagement.html">
													<span className="sidenav-normal"> Engagement </span>
												</a> */}
												<Link
													className={`nav-link ${
														activeUrl == "/enrollment/engagement"
															? "active"
															: ""
													}`}
													to="/enrollment/engagement">
													<span className="sidenav-normal"> Engagement </span>
												</Link>
											</li>
											<li className="nav-item">
												<Link
													className={`nav-link ${
														activeUrl == "/enrollment/demographic"
															? "active"
															: ""
													}`}
													to="/enrollment/demographic">
													<span className="sidenav-normal"> Demographics </span>
												</Link>
											</li>
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/enrollment/enrollment-reasons.html">
													<span className="sidenav-normal"> Reasons </span>
												</a> */}
												<Link
													className={`nav-link ${
														activeUrl == "/enrollment/reasons" ? "active" : ""
													}`}
													to="/enrollment/reasons">
													<span className="sidenav-normal"> Reasons </span>
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						{/* <!--  Fulfillment --> */}
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#fulfillmentPages"
								className="nav-link"
								aria-controls="ecommerceExamples"
								role="button"
								aria-expanded="false">
								{/* <div className="icon icon-shape shadow border-radius-md text-center d-flex align-items-center justify-content-center me-2">
									<i className="fa-solid fa-prescription-bottle-medical fa-fw opacity-10 text-2xl text-gradient text-primary d-flex align-items-center justify-content-center"></i>
								</div> */}
								<div
									className={`${activeIcon} ${
										nameUrl.path == "fulfillmentment"
											? "bg-gradient-primary"
											: ""
									}`}>
									<i
										className={`${activeTab} ${
											nameUrl.path == "fulfillmentment"
												? "fa-solid fa-clipboard-user fa-fw text-white"
												: "fa-solid fa-clipboard-user fa-fw text-gradient text-primary"
										}`}></i>
								</div>
								<span className="nav-link-text ms-1">Fulfillment</span>
							</a>
							<div
								className={`collapse ${
									nameUrl.path == "fulfillment" ? "show" : ""
								}`}
								id="fulfillmentPages">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/fulfillment/fulfillment-overview.html">
													<span className="sidenav-normal"> Overview </span>
												</a> */}
												<Link
													className={`nav-link ${
														activeUrl == "/fulfillment/overview" ? "active" : ""
													}`}
													to="/fulfillment/overview">
													<span className="sidenav-normal"> Overview </span>
												</Link>
											</li>
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/fulfillment/fulfillment-engagement.html">
													<span className="sidenav-normal"> Engagement </span>
												</a> */}
												<Link
													className={`nav-link ${
														activeUrl == "/fulfillment/engagement"
															? "active"
															: ""
													}`}
													to="/fulfillment/engagement">
													<span className="sidenav-normal"> Engagement </span>
												</Link>
											</li>
											<li className="nav-item">
												{/* <a
													className="nav-link"
													href="../../pages/fulfillment/fulfillment-demographics.html">
													<span className="sidenav-normal"> Demographics </span>
												</a> */}
												<Link
													className={`nav-link ${
														activeUrl == "/fulfillment/demographic"
															? "active"
															: ""
													}`}
													to="/fulfillment/demographic">
													<span className="sidenav-normal"> Demographics </span>
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						{/* <!--  Start Treatment --> */}
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#startTreatmentPages"
								className="nav-link"
								aria-controls="authExamples"
								role="button"
								aria-expanded="false">
								<div className="icon icon-shape shadow border-radius-md text-align-center d-flex align-items-center justify-content-center me-2">
									<i className="fa-solid fa-play fa-fw opacity-10 text-gradient text-primary d-flex align-items-center justify-content-center"></i>
								</div>
								<span className="nav-link-text ms-1">Start Treatment</span>
							</a>
							<div className="collapse" id="startTreatmentPages">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/start-treatment/treatment-overview.html">
													<span className="sidenav-normal"> Overview </span>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/start-treatment/treatment-engagement.html">
													<span className="sidenav-normal"> Engagement </span>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/start-treatment/treatment-demographics.html">
													<span className="sidenav-normal"> Demographics </span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						{/* <!--  Keeping The Momentum --> */}
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#momentumPages"
								className="nav-link"
								aria-controls="basicExamples"
								role="button"
								aria-expanded="false">
								<div className="icon icon-shape shadow border-radius-md text-center d-flex align-items-center justify-content-center me-2">
									<i className="fa-solid fa-handshake-simple fa-fw opacity-10 text-2xl text-gradient text-primary d-flex align-items-center justify-content-center"></i>
								</div>
								<span className="nav-link-text ms-1">Momentum</span>
							</a>
							<div className="collapse" id="momentumPages">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/momentum/momentum-overview.html">
													<span className="sidenav-normal"> Overview </span>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/momentum/momentum-engagement.html">
													<span className="sidenav-normal"> Engagement </span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						{/* <!--  Manage Profile --> */}
						<li className="nav-item">
							<a
								data-bs-toggle="collapse"
								href="#manageProfile"
								className="nav-link"
								aria-controls="basicExamples"
								role="button"
								aria-expanded="false">
								<div className="icon icon-shape shadow border-radius-md text-center d-flex align-items-center justify-content-center me-2">
									<i className="fa-solid fa-building fa-fw opacity-10 text-2xl text-gradient text-primary d-flex align-items-center justify-content-center"></i>
								</div>
								<span className="nav-link-text ms-1">Manage</span>
							</a>
							<div className="collapse" id="manageProfile">
								<ul className="nav ms-4 ps-3">
									<li className="nav-item">
										<ul className="nav nav-sm flex-column">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/manage/manage-company.html">
													<span className="sidenav-normal">
														{" "}
														Manage Company{" "}
													</span>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/manage/manage-profile.html">
													<span className="sidenav-normal">
														{" "}
														Manage Profile{" "}
													</span>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/momentum/momentum-overview.html">
													<span className="sidenav-normal"> Approvals </span>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/momentum/momentum-engagement.html">
													<span className="sidenav-normal"> Metrics </span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</aside>
		</React.Fragment>
	);
}

export default Sidebar;
