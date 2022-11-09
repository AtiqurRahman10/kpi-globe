import React, { useEffect, useLayoutEffect, useState } from "react";
import FunnelChart from "../components/FunnelGraph";
import { funnelData } from "./data";
import LineChart from "../components/LineChart";
import MeterChart from "../components/MeterChart";
import TreeGraph from "../components/TreeGraph";
function HomeOverview(props) {
	const [lineChartData, setLineChartData] = useState(null);

	useEffect(() => {
		setLineChartData({
			type: "line",
			data: {
				labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [
					{
						label: "Patients Assisted",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 0,
						borderColor: "#38d6ae",
						borderWidth: 3,
						backgroundColor: [
							"rgba(56, 214, 174,0.3)",
							"rgba(56, 214, 174, 0.2)",
							"rgba(56, 214, 174, 0.1)",
						],
						fill: true,
						data: [50, 40, 300, 220, 500, 250, 400, 230, 505],
						maxBarThickness: 6,
					},
					{
						label: "Patients Referred",
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
						data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
						maxBarThickness: 6,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					intersect: false,
					mode: "index",
				},
				title: {
					display: false,
					text: "Chart.js Line Chart",
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
								suggestedMin: 0,
								suggestedMax: 500,
								beginAtZero: true,
								fontColor: "#b2b9bf",
								fontSize: 14,
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
								suggestedMax: 500,
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
	}, []);

	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-6">
						<h4 className>North Star Metrics</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<div className="row">
							<div className="col-6">
								<div className="card mb-3">
									<div className="card-body p-3">
										<div className="row">
											<div className="col-9">
												<div className="numbers">
													<p className="text-sm mb-0 text-capitalize font-weight-bold">
														Current Active Patients
													</p>
													<h5 className="font-weight-bolder mb-0">
														247
														<span className="text-success text-sm font-weight-bolder">
															+3%
														</span>
													</h5>
												</div>
											</div>
											<div className="col-3 text-end">
												<div className="icon icon-shape shadow border-radius-md bg-gradient-primary text-center d-flex align-items-center justify-content-center">
													<i
														className="fa-solid fa-user text-lg opacity-10"
														aria-hidden="true"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card z-index-2 mb-3">
									<div className="card-body p-3">
										<div className="row">
											<div className="col-9">
												<div className="numbers">
													<p className="text-sm mb-0 text-capitalize font-weight-bold">
														Total Patients Assisted Since Launch
													</p>
													<h5 className="font-weight-bolder mb-0">
														402
														<span className="text-success text-sm font-weight-bolder">
															+3%
														</span>
													</h5>
												</div>
											</div>
											<div className="col-3 text-end">
												<div className="icon icon-shape shadow border-radius-md bg-gradient-primary text-center d-flex align-items-center justify-content-center">
													<i
														className="fa-solid fa-user-check text-lg opacity-10"
														aria-hidden="true"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="row">
							<div className="col-6">
								<div className="card mb-3">
									<div className="card-body p-3">
										<div className="row">
											<div className="col-9">
												<div className="numbers">
													<p className="text-sm mb-0 text-capitalize font-weight-bold">
														Bio Naive Patients Since Launch
													</p>
													<h5 className="font-weight-bolder mb-0">
														36%
														<span className="text-success text-sm font-weight-bolder">
															+3%
														</span>
													</h5>
												</div>
											</div>
											<div className="col-3 text-end">
												<div className="icon icon-shape shadow border-radius-md bg-gradient-primary text-center d-flex align-items-center justify-content-center">
													<i
														className="fa-solid fa-language text-lg opacity-10"
														aria-hidden="true"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card z-index-2 mb-3">
									<div className="card-body p-3">
										<div className="row">
											<div className="col-9">
												<div className="numbers">
													<p className="text-sm mb-0 text-capitalize font-weight-bold">
														Indications Since Launch
													</p>
													<h5 className="font-weight-bolder mb-0">
														71% PsO
														<span className="text-success text-sm font-weight-bolder">
															+3%
														</span>
													</h5>
													<h5 className="font-weight-bolder mb-0">
														29% PsA
														<span className="text-success text-sm font-weight-bolder">
															+3%
														</span>
													</h5>
												</div>
											</div>
											<div className="col-3 text-end">
												<div className="icon icon-shape shadow border-radius-md bg-gradient-primary text-center d-flex align-items-center justify-content-center">
													<i
														className="fa-solid fa-language text-lg opacity-10"
														aria-hidden="true"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-8 position-relative z-index-2">
						<div className="card card-plain mb-4">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-lg-10">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Program Overview
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="m-3">
								<div
									className="alert successReport col-md-6 offset-md-6 col-12 d-none"
									id="successReport"
									role="alert">
									Chart successfully added to the report!
									<i
										className="fa fa-check"
										style={{ float: "right" }}
										aria-hidden="true"
									/>
								</div>
								<div className="card-header pb-0 p-3">
									<div className="d-flex align-items-center">
										<h6 className="mb-0">Program Overview</h6>
										<button
											type="button"
											className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title="PHASE PERFORMANCE
										The values below show the percentage of people who made it to the next phase out of the previous phase. 
										
										PROGRAM FUNNEL
										The funnel represents the percentage of users who signed up and made it to each phase within a given time period.">
											<i className="fas fa-info" aria-hidden="true" />
										</button>
										<div className="ms-auto">
											<div className="dropdown pe-2">
												<a
													// href="javascript:;"
													className="text-white ps-4"
													id="dropdownCard"
													data-bs-toggle="dropdown"
													aria-expanded="false">
													<i className="fas fa-ellipsis-v" aria-hidden="true" />
												</a>
												<ul
													className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
													aria-labelledby="dropdownCard">
													<li>
														<a
															className="dropdown-item border-radius-md"
															// href="javascript:;"
														>
															<i className="fa-regular fa-share me-2" /> Share
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															// href="javascript:;"
															id="addReport">
															<i className="fa-regular fa-add me-2" /> Add to
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															id="toPng">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															// href="javascript:;"
															id="toPdf">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PDF
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<FunnelChart
									id="funnel"
									direction="horizontal"
									data={funnelData}
								/>
								{/* <div id="f1" className="funnel funnel-container mt-4 mb-6" />
								<div id="f2" className="d-none" /> */}
							</div>
						</div>
					</div>
				</div>
				{/* Hierarchy Chart */}
				<div className="row m-3">
					<div
						className="alert successReport col-md-6 offset-md-6 col-12 d-none"
						id="successReport1"
						role="alert">
						Chart successfully added to the report!
						<i
							className="fa fa-check"
							style={{ float: "right" }}
							aria-hidden="true"
						/>
					</div>
					<div className="col-12">
						<div className="card p-3">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Drop Contribution</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="This metric shows the reasons for Dropping">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												// href="javascript:;"
												className="text-white ps-4"
												id="dropdownCard"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												<i className="fas fa-ellipsis-v" aria-hidden="true" />
											</a>
											<ul
												className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
												aria-labelledby="dropdownCard">
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
														id="addReport1">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="drop-container ms-5 mb-4">
								<TreeGraph id="hcontainer"/>
								{/* <AnimatedTree data={treeData} height={400} width={400} /> */}
								{/* <div id="hcontainer" className="h-svg-container" /> */}
							</div>
						</div>
					</div>
				</div>
				{/* End Hierarchy */}
				<div className="row m-3">
					<div className="col-5">
						<div className="card p-3 height-600">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Enrollment % of NBRx</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="This metric is calculated by dividing the number of patients enrolled into the program by the number of patients who have a new Tremfya prescription for a given time period. 
								Source: Ashfield and claims data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									{/* <div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												// href="javascript:;"
												className="text-white ps-4"
												id="dropdownCard"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												<i className="fas fa-ellipsis-v" aria-hidden="true" />
											</a>
											<ul
												className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
												aria-labelledby="dropdownCard">
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
														onClick="enrollChartPng()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
														onClick="enrollChartPdf()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div> */}
									<div className="ms-auto">
										<div id="exportmeterchart"></div>
									</div>
								</div>
							</div>
							<MeterChart
								total_nbrx_enrollment={52}
								id="enroll-nbrx"
								interval={true}
							/>
						</div>
					</div>
					<div className="col-7">
						<div className="card z-index-2 p-3 height-600">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Weekly Enrollments</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title>
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												// href="javascript:;"
												className="text-white ps-4"
												id="dropdownCard"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												<i className="fas fa-ellipsis-v" aria-hidden="true" />
											</a>
											<ul
												className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
												aria-labelledby="dropdownCard">
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
													>
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
														onClick="downloadPNGChart();">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														// href="javascript:;"
														onClick="downloadPDFChart();">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body p-3">
								<div className="chart min-height-300">
									{/* <canvas
										id="chart-line"
										className="chart-canvas"
										height={500}
									/> */}
									{lineChartData && (
										<LineChart
											id="line-chart"
											// config={LineChartData}
											config={lineChartData}
											height="500"
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<footer className="footer pt-3">
					<div className="container-fluid">
						<div className="row align-items-center justify-content-lg-between">
							<div className="col-lg-6 mb-lg-0 mb-4">
								<div className="copyright text-center text-sm text-muted text-lg-start">
									© ,
									<a
										href="https://ipghealth.com/network/90north"
										className="font-weight-bold"
										target="_blank">
										90NORTH
									</a>
									An IPG Health Company
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</React.Fragment>
	);
}

export default HomeOverview;
