import React, { useLayoutEffect, useEffect, useState } from "react";
import { appendScript } from "../utils/appendScript";
import { removeScript } from "../utils/removeScript";

import { singup_overview, d3_min } from "../comman/Constant";
// import { funnelData } from "./data.js";
import FunnelGraph from "../components/FunnelGraph";
import LineChart from "../components/LineChart";
import AppleChart from "../components/AppleChart";
import MeterChart from "../components/MeterChart";
// import { barChartData } from "./data";

var filters = localStorage.getItem("filters");

function SignupOverview(props) {
	const [filter, setFilter] = useState(filters);
	const [funnelData, setFunnelData] = useState(null);
	const [signupRejectPage, setSignupRejectPage] = useState(null);
	const [signupReject, setSignupReject] = useState(null);
	const [barChartData, setBarChartData] = useState(null);
	const [lineChartData, setLineChartData] = useState(null);

	useLayoutEffect(() => {
		// appendScript(singup_overview);
		// appendScript(d3_min);

		return () => {
			// removeScript(singup_overview);
			// removeScript(d3_min);
		};
	}, []);

	useEffect(() => {
		const fetchSignupOverviewData = async () => {
			const res = await fetch(
				"https://kpi-tool.psglobalgroup.com/api/signup-overview.php",
				{ key: filter }
			);
			const data = await res.json();
			console.log("data ==== ", data);
			setFunnelData({
				displayPercent: true,
				subLabelValue: "raw",
				labels: data.signup_method,
				subLabels: ["Patient Site", "HCP Site", "Patient Text"],
				colors: [
					["#fa9567", "#f971b4", "#f82c91"],
					["#ceb4ff", "#925aff"],
					["#83deff", "#7795FF"],
				],
				values: data.signup_overview,
			});
			setSignupRejectPage(data.signuppge_reject_page);
			setSignupReject(data.signuppge_reject);

			setBarChartData({
				type: "bar",
				data: {
					labels: data.signup_time_month,
					datasets: [
						{
							label: "Patient Microsite",
							tension: 0.4,
							borderWidth: 0,
							borderRadius: 4,
							borderSkipped: false,
							backgroundColor: "#0dbeff",
							data: data.signup_time.PatientSite,
							maxBarThickness: 8,
						},
						{
							label: "HCP Microsite",
							tension: 0.4,
							borderWidth: 0,
							borderRadius: 4,
							borderSkipped: false,
							backgroundColor: "#b2b9bf",
							data: data.signup_time.HCPSite,
							maxBarThickness: 8,
						},
						{
							label: "Patient Text",
							tension: 0.4,
							borderWidth: 0,
							borderRadius: 4,
							borderSkipped: false,
							backgroundColor: "#38d6ae",
							data: data.signup_time.PatientText,
							maxBarThickness: 8,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: "Chart.js Line Chart - Multi Axis",
					},
					tooltips: {
						intersect: false,
						mode: "index",
					},
					legend: {
						display: true,
						position: "bottom",
						labels: {
							fontSize: 14,
							fontColor: "#b2b9bf",
							fontFamily: "Nunito Sans",
							fontStyle: "bold",
							lineHeight: 2,
						},
					},
					// scales: {
					// 	y: {
					// 		grid: {
					// 			drawBorder: false,
					// 			display: false,
					// 			drawOnChartArea: false,
					// 			drawTicks: false,
					// 		},
					// 		ticks: {
					// 			display: true,
					// 			padding: 10,
					// 			suggestedMin: 0,
					// 			suggestedMax: 800,
					// 			beginAtZero: true,
					// 			color: "#b2b9bf",
					// 			font: {
					// 				size: 14,
					// 				family: "Nunito Sans",
					// 				style: "bold",
					// 				lineHeight: 2,
					// 			},
					// 		},
					// 	},
					// 	x: {
					// 		grid: {
					// 			drawBorder: false,
					// 			display: false,
					// 			drawOnChartArea: false,
					// 			drawTicks: false,
					// 		},
					// 		ticks: {
					// 			display: true,
					// 			padding: 10,
					// 			suggestedMin: 0,
					// 			suggestedMax: 800,
					// 			beginAtZero: true,
					// 			color: "#b2b9bf",
					// 			font: {
					// 				size: 14,
					// 				family: "Nunito Sans",
					// 				style: "bold",
					// 				lineHeight: 2,
					// 			},
					// 		},
					// 	},
					// },
					scales: {
						yAxes: [
							{
								gridLines: {
									drawBorder: false,
									display: false,
									drawOnChartArea: false,
									drawTicks: false,
								},
								ticks: {
									display: true,
									padding: 10,
									position: "bottom",
									suggestedMin: 0,
									suggestedMax: 300,
									beginAtZero: true,
									// min: 0,
									// max: 600, // Your absolute max value
									// callback: function (value) {
									// 	return ((value / 600) * 100).toFixed(0) + "%"; // convert it to percentage
									// },
									fontColor: "#b2b9bf",
									fontSize: 14,
									fontFamily: "Nunito Sans",
									fontStyle: "bold",
									lineHeight: 2,
								},
								// scaleLabel: {
								// 	display: false,
								// 	labelString: "Percentage",
								// },
							},
						],
						xAxes: [
							{
								gridLines: {
									drawBorder: false,
									display: false,
									drawOnChartArea: false,
									drawTicks: false,
									borderDash: [5, 5],
								},
								ticks: {
									display: true,
									padding: 10,
									suggestedMin: 0,
									suggestedMax: 800,
									beginAtZero: true,
									fontColor: "#b2b9bf",
									fontSize: 14,
									fontFamily: "Nunito Sans",
									fontStyle: "bold",
									lineHeight: 2,
								},
							},
						],
					},
				},
			});
			setLineChartData({
				type: "line",
				data: {
					labels: data.device_type_month,
					datasets: [
						{
							label: "Mobile",
							tension: 0.4,
							borderWidth: 0,
							pointRadius: 0,
							borderColor: "#38d6ae",
							borderWidth: 3,
							backgroundColor: [
								"rgba(56, 214, 174,0.3)",
								"rgba(56, 214, 174,0.2)",
								"rgba(56, 214, 174,0.1)",
							],
							fill: true,
							data: data.device_type.mobile,
							maxBarThickness: 6,
						},
						{
							label: "Desktop",
							tension: 0.4,
							borderWidth: 0,
							pointRadius: 0,
							borderColor: "#e9ecef",
							borderWidth: 3,
							backgroundColor: [
								"rgba(233, 236, 239, 0.3)",
								"rgba(233, 236, 239, 0.2)",
								"rgba(233, 236, 239, 0.1)",
							],
							fill: true,
							data: data.device_type.desktop,
							maxBarThickness: 6,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: "Chart.js line Chart - Multi Axis",
					},
					tooltips: {
						intersect: false,
						mode: "index",
					},
					legend: {
						display: true,
						position: "bottom",
						labels: {
							fontSize: 14,
							fontColor: "#b2b9bf",
							fontFamily: "Nunito Sans",
							fontStyle: "bold",
							lineHeight: 2,
						},
					},
					scales: {
						yAxes: [
							{
								gridLines: {
									drawBorder: false,
									display: true,
									drawOnChartArea: true,
									drawTicks: false,
									borderDash: [5, 5],
								},
								ticks: {
									display: true,
									padding: 10,
									suggestedMin: 1,
									suggestedMax: 5,
									beginAtZero: true,
									fontSize: 14,
									fontColor: "#b2b9bf",
									fontFamily: "Nunito Sans",
									fontStyle: "bold",
									lineHeight: 2,
								},
							},
						],
						xAxes: [
							{
								gridLines: {
									drawBorder: false,
									display: false,
									drawOnChartArea: false,
									drawTicks: false,
									borderDash: [5, 5],
								},
								ticks: {
									display: true,
									padding: 10,
									suggestedMin: 0,
									suggestedMax: 800,
									beginAtZero: true,
									fontColor: "#b2b9bf",
									fontSize: 14,
									fontFamily: "Nunito Sans",
									fontStyle: "bold",
									lineHeight: 2,
								},
							},
						],
					},
				},
			});
		};

		fetchSignupOverviewData();
	}, [filter]);

	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-lg-7 position-relative z-index-2">
						<div className="card card-plain mb-4">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-lg-12">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Sign Up Overview
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row mb-n4">
						<div className="col-12">
							<div className=" ">
								<div className="card-header pb-0 p-3">
									<div className="d-flex align-items-center">
										<h6 className="mb-0">Sign Up Overview</h6>
										<button
											type="button"
											className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title="The funnel represents the number of users for a given period who entered the microsite, visited the submission page, and successfully completed the sign-up form so that a guide could contact them to enroll.">
											<i className="fas fa-info" aria-hidden="true"></i>
										</button>
										<div className="ms-auto">
											<div className="dropdown pe-2">
												<a
													href="javascript:;"
													className="text-white ps-4"
													id="dropdownCard"
													data-bs-toggle="dropdown"
													aria-expanded="false">
													<i
														className="fas fa-ellipsis-v"
														aria-hidden="true"></i>
												</a>
												<ul
													className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
													aria-labelledby="dropdownCard">
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;">
															<i className="fa-regular fa-share me-2"></i> Share
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;">
															<i className="fa-regular fa-add me-2"></i> Add to
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															id="toPng">
															<i className="fa-regular fa-file-arrow-down me-2"></i>
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															// href="javascript:;"
															id="toPdf">
															<i className="fa-regular fa-file-arrow-down me-2"></i>
															Download PDF
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								{funnelData && (
									<FunnelGraph
										id="funnel"
										direction="horizontal"
										data={funnelData}
									/>
								)}
								{/* <div id="f1" className="funnel funnel-container m-3"></div>
								<div id="f2" className="d-none"></div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- Progress Wrapper Chart --> */}
			<div className="row m-3 mt-n4 mb-4 z-index-2">
				<div className="col-12">
					<div className="z-index-3 p-4">
						<div className="card-header mx-3 pb-0 p-4">
							<div className="d-flex align-items-center">
								<h6 className="mb-0">Drop Contribution</h6>
								<button
									type="button"
									className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="This metric shows the Drop Contribution">
									<i className="fas fa-info" aria-hidden="true"></i>
								</button>
							</div>
						</div>
						<div className="row my-2 mx-3">
							<div className="col-6 p-4">
								<div className="progress-wrapper">
									<div className="progress-info">
										<div className="progress-percentage mb-2">
											<span className="text-sm font-weight-bold">
												<span id="signup_reject_percent">
													{signupRejectPage}
												</span>
												% Dropoff Between Phases
											</span>
										</div>
									</div>
									<div className="progress progress-lg">
										<div
											className="progress-bar-lg bg-gradient-danger"
											role="progressbar"
											id="signup_reject_percent_progress"
											aria-valuenow={40}
											aria-valuemin={0}
											aria-valuemax={100}
											style={{ width: `${signupRejectPage}%` }}></div>
									</div>
								</div>
							</div>
							<div className="col-6 p-4">
								<div className="progress-wrapper">
									<div className="progress-info">
										<div className="progress-percentage mb-2">
											<span className="text-sm font-weight-bold">
												<span id="signup_reject_percent_drop">
													{signupReject}
												</span>
												% of Sign Up Page visitors didn't complete the Sign-up
												Form
											</span>
										</div>
									</div>
									<div className="progress progress-lg">
										<div
											className="progress-bar-lg bg-gradient-danger"
											role="progressbar"
											id="signup_reject_percent_drop_progress"
											aria-valuenow={60}
											aria-valuemin={0}
											aria-valuemax={100}
											style={{ width: `${signupReject}%` }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- End Drop Progress --> */}
			<div className="row m-3">
				<div className="col-lg-5">
					<div className="card p-3 z-index-2 height-400">
						<div className="card-header pb-0 p-3">
							<div className="d-flex align-items-center">
								<h6 className="mb-0">Sign Up Time Per Channel (seconds)</h6>
								<button
									type="button"
									className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="Sign Up Time Per Channel">
									<i className="fas fa-info" aria-hidden="true"></i>
								</button>
								<div className="ms-auto">
									<div className="dropdown pe-2">
										<a
											href="javascript:;"
											className="text-white ps-4"
											id="dropdownCard"
											data-bs-toggle="dropdown"
											aria-expanded="false">
											<i className="fas fa-ellipsis-v" aria-hidden="true"></i>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
											aria-labelledby="dropdownCard">
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;">
													<i className="fa-regular fa-share me-2"></i> Share
													Report{" "}
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;">
													<i className="fa-regular fa-add me-2"></i> Add to
													Report
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													onclick="downloadPNGChart(chartSignupTime,'Sign Up Time Per Channel (seconds)');">
													<i className="fa-regular fa-file-arrow-down me-2"></i>
													Download PNG
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													onclick="downloadPDFChart('chart-bars','Sign Up Time Per Channel (seconds)')">
													<i className="fa-regular fa-file-arrow-down me-2"></i>{" "}
													Download PDF{" "}
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="card-body p-3">
							<div className="border-radius-lg py-3 pe-1 min-height-300">
								<div className="chart min-height-250">
									{/* <canvas
										id="chart-bars"
										className="chart-canvas"
										height="100vh"></canvas> */}
									{barChartData && (
										<LineChart
											id="chart-bars"
											config={barChartData}
											height={100}
										/>
									)}
								</div>
							</div>
							<div className="container border-radius-lg"></div>
						</div>
					</div>
				</div>
				<div className="col-lg-7">
					<div className="card p-3 z-index-2 height-400">
						<div className="card-header pb-0 p-3">
							<div className="d-flex align-items-center">
								<h6 className="mb-0">Users by Device Type</h6>
								<button
									type="button"
									className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="Compare how often users are accessing the microsite through their mobile phones, tablets, or desktop devices to ensure the user experience is optimized on all platforms.
								Source: Google Analytics">
									<i className="fas fa-info" aria-hidden="true"></i>
								</button>
								<div className="ms-auto">
									<div className="dropdown pe-2">
										<a
											href="javascript:;"
											className="text-white ps-4"
											id="dropdownCard"
											data-bs-toggle="dropdown"
											aria-expanded="false">
											<i className="fas fa-ellipsis-v" aria-hidden="true"></i>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
											aria-labelledby="dropdownCard">
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;">
													<i className="fa-regular fa-share me-2"></i> Share
													Report{" "}
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;">
													<i className="fa-regular fa-add me-2"></i> Add to
													Report
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													onclick="downloadPNGChart(chartDevice,'Users by Device Type');">
													<i className="fa-regular fa-file-arrow-down me-2"></i>
													Download PNG
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													onclick="downloadPDFChart('chart-line','Users by Device Type')">
													<i className="fa-regular fa-file-arrow-down me-2"></i>{" "}
													Download PDF{" "}
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="card-body p-3">
							<div className="chart min-height-300">
								{lineChartData && (
									<LineChart
										id="chart-line"
										config={lineChartData}
										height={100}
									/>
								)}
								{/* <canvas
									id="chart-line"
									className="chart-canvas"
									height="100vh"></canvas> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row m-3">
				<div className="col-5">
					<div className="card p-3 height-600">
						<div className="card-header pb-0 p-3 mb-2">
							<div className="d-flex align-items-center">
								<h6 className="mb-0">Acquisition Cost by Channel</h6>
								<button
									type="button"
									className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="Percentage of patients who view one page and leave.">
									<i className="fas fa-info" aria-hidden="true"></i>
								</button>
								<div className="ms-auto">
									<div className="dropdown pe-2">
										<a
											href="javascript:;"
											className="text-white ps-4"
											id="dropdownCard"
											data-bs-toggle="dropdown"
											aria-expanded="false">
											<i className="fas fa-ellipsis-v" aria-hidden="true"></i>
										</a>
										<ul
											className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
											aria-labelledby="dropdownCard">
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;">
													<i className="fa-regular fa-share me-2"></i> Share
													Report
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;">
													<i className="fa-regular fa-add me-2"></i> Add to
													Report
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													onclick="apple1ChartPng()">
													<i className="fa-regular fa-file-arrow-down me-2"></i>
													Download PNG
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													onclick="apple1ChartPdf()">
													<i className="fa-regular fa-file-arrow-down me-2"></i>
													Download PDF
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="ms-auto">
									<div id="exportmeterchart"></div>
								</div>
							</div>
						</div>
						{/* <AppleChart id="apple1" /> */}

						<AppleChart id="apple1" total_nbrx_enrollment={70} />
						{/* <div className="apple1" id="apple1"></div> */}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SignupOverview;
