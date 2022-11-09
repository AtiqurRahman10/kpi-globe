import React, { useEffect, useLayoutEffect, useState } from "react";
import JcpVenn from "../components/JcpVenn";
import LineChart from "../components/LineChart";
import M_Chart from "../components/M_Chart";
import * as am5 from "@amcharts/amcharts5";
var filters = localStorage.getItem("filters");
function EnrollmentOverview(props) {
	const [linechartData1,setLineChartData1] = useState(null);
	const [linechartData2,setLineChartData2] = useState(null);
	const [linechartData3,setLineChartData3] = useState(null);
	const [vennData, setVennData] = useState(null);
	const [spReferral,setSpReferral] = useState(null);
	const [totalReferral,setTotalReferral] = useState(null);
	const [totalJcp,setTotalJcp] = useState(null);
	const [filter, setFilter] = useState(filters);

	useEffect(() => {
		const fetchEnrollmentDriverData = async () => {
			const res = await fetch(
				"https://kpi-tool.psglobalgroup.com/api/enrollment-drivers.php",
				{ key: filter }
			);
			const data = await res.json();
			console.log("data-enrollDriver ==== ", data);
			setSpReferral(data.total_sp);
			setTotalReferral(data.total_referral);
			setTotalJcp(data.total_jcp);
		setVennData(
			[
				{
					name: "JCP Patients",
					value: 100,
					color: am5.color(0x095256),
					sliceSettings: {
						fill: am5.color(0x611bff),
						stroke: am5.color(0x611bff),
						fillOpacity: 0.8,
					},
				},
				{
					name: "WithMe Patients",
					value: 100,
					sliceSettings: {
						fill: am5.color(0xf82c91),
						fillOpacity: 0.8,
					},
				},
				{
					name: "JCP and With Me Patients",
					value: 30,
					sets: ["JCP Patients", "WithMe Patients"],
					sliceSettings: {
						// fillPattern: pattern,
						stroke: am5.color(0xb2b9bf),
						strokeOpacity: "0",
						fill: am5.color(0xb2b9bf),
						fillOpacity: "0",
					},
				},
			],
		);
		setLineChartData1({
			type: "bar",
			data: {
				labels: data.spReferrals.label,
				datasets: [
				  {
					
					label: "Partners",
					weight: 5,
					tension: 0.5,
					borderWidth: 0,
					pointBackgroundColor: "#fa9cca",
					borderColor: "#fa9cca",
					backgroundColor: "#fa9cca",
					borderRadius: 4,
					borderSkipped: false,
					data: data.spReferrals.data,
					maxBarThickness: 10,
				  },
				  {
					type: "line",
					label: "Partners",
					tension: 0.5,
					borderWidth: 0,
					pointRadius: 0,
					pointBackgroundColor: "#fa9cca",
					borderColor: "#fa9cca",
					borderWidth: 3,
					backgroundColor:`rgba(248, 44, 145, 0.3)`,
					data: data.spReferrals.data,
					fill: true,
				  },
				],
			  },
			  options:{
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
								suggestedMin: 0,
								suggestedMax: 0,
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
								suggestedMax: 0,
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
  setLineChartData2({
	type: "line",
	data: {
		labels:data.jcpReferralTypeRange,
		datasets: [
			{
				label: "Warm Call Transfer",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f82c91",
				borderWidth: 3,
				// backgroundColor: gradientStroke3,
				backgroundColor: [
					"rgba(248, 44, 145, 0.3)",
					"rgba(248, 44, 145, 0.2)",
					"rgba(248, 44, 145, 0.1)",
				],

				fill: true,
				data:data.jcpReferralType.warmcalltransfer,
				maxBarThickness: 6,
			},
			{
				label: "Text",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#38d6ae",
				borderWidth: 3,
				// backgroundColor: gradientStroke1,
				backgroundColor: [
					"rgba(56, 214, 174,0.3)",
					"rgba(56, 214, 174, 0.2)",
					"rgba(56, 214, 174, 0.1)",
				],

				fill: true,
				data:data.jcpReferralType.text,
				maxBarThickness: 6,
			},
			{
				label: "Website",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#611bff",
				borderWidth: 3,
				// backgroundColor: gradientStroke2,
				backgroundColor: [
					"rgba(97, 27, 255, 0.2)",
					"rgba(97, 27, 255, 0.1)",
					"rgba(97, 27, 255, 0.05)",
				],

				fill: true,
				data:data.jcpReferralType.website,
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
						suggestedMin: 0,
						suggestedMax: 0,
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
						suggestedMax: 0,
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
  setLineChartData3({
	type: "line",
	data: {
		labels:data.enrollmentReferralSourceRange,
		datasets: [
			{
				label: "1-833-WITHME",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f82c91",
				borderWidth: 3,
				backgroundColor: [
					"rgba(248, 44, 145, 0.3)",
					"rgba(248, 44, 145, 0.2)",
					"rgba(248, 44, 145, 0.1)",
				],
				fill: true,
				data:data.enrollmentReferralSource.withme1,
				maxBarThickness: 6,
			},
			{
				label: "JCP",
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
				data:data.enrollmentReferralSource.jcp,
				maxBarThickness: 6,
			},
			{
				label: "MicroSiteHCP",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#611bff",
				borderWidth: 3,
				backgroundColor: [
					"rgba(97, 27, 255, 0.2)",
					"rgba(97, 27, 255, 0.1)",
					"rgba(97, 27, 255, 0.05)",
				],
				fill: true,
				data:data.enrollmentReferralSource.hcpmicrosite,
				maxBarThickness: 6,
			},
			{
				label: "MicroSitePat",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f94902",
				borderWidth: 3,
				backgroundColor: [
					"rgba(249, 73, 2, 0.2)",
					"rgba(249, 73, 2, 0.1)",
					"rgba(249, 73, 2, 0.05)",
				],
				fill: true,
				data:data.enrollmentReferralSource.patientmicrosite,
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
						suggestedMin: 0,
						suggestedMax: 0,
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
						suggestedMax: 600,
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
		fetchEnrollmentDriverData();
			},[filter]);
	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				{/* <button onClick={() => setMixData(mixChartData1)}>click</button> */}
				<div className="row">
					<div className="col-8 position-relative z-index-2">
						<div className="card card-plain mb-4">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-lg-10">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Enrollment Drivers
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-4">
							<div className="card z-index-2 mb-2">
								<div className="card-body p-3">
									<div className="row">
										<div className="col-8">
											<div className="numbers">
												<p className="text-sm mb-0 text-capitalize font-weight-bold">
													SP Referrals
												</p>
												<h5 className="font-weight-bolder mb-0">
													+{spReferral}
													<span className="text-success text-sm font-weight-bolder">
														+55%
													</span>
												</h5>
											</div>
										</div>
										<div className="col-4 text-end">
											<div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
												<i
													className="ni ni-money-coins text-lg opacity-10"
													aria-hidden="true"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-4">
							<div className="card z-index-2 mb-2">
								<div className="card-body p-3">
									<div className="row">
										<div className="col-8">
											<div className="numbers">
												<p className="text-sm mb-0 text-capitalize font-weight-bold">
													Other Referrals
												</p>
												<h5 className="font-weight-bolder mb-0">
													+{totalReferral}
													<span className="text-danger text-sm font-weight-bolder">
														-2%
													</span>
												</h5>
											</div>
										</div>
										<div className="col-4 text-end">
											<div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
												<i
													className="ni ni-paper-diploma text-lg opacity-10"
													aria-hidden="true"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-4">
							<div className="card z-index-2 mb-2">
								<div className="card-body p-3">
									<div className="row">
										<div className="col-8">
											<div className="numbers">
												<p className="text-sm mb-0 text-capitalize font-weight-bold">
													JCP Referrals
												</p>
												<h5 className="font-weight-bolder mb-0">
													+{totalJcp}
													<span className="text-danger text-sm font-weight-bolder">
														-2%
													</span>
												</h5>
											</div>
										</div>
										<div className="col-4 text-end">
											<div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
												<i
													className="ni ni-paper-diploma text-lg opacity-10"
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
				<div className="row mt-4">
					<div className="col-7">
						<div className="card height-600 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Enrollment Overlap</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="Compare the overlap between JCP patients who are registered as TREMFYA patients and withMe Program enrollees to ensure a seamless transition to services.
											Source: JCP and Form Assembly">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div id="exportdiv"></div>
									</div>

									{/* <div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												href="javascript:;"
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
														href="javascript:;">
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;"
														onclick="jcpvennChartPng()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;"
														onclick="jcpvennChartPdf()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div> */}
								</div>
							</div>
						{vennData &&	<JcpVenn data={vennData} />}
							{/* <div id="jcpvenn" />
							<div className="chartdiv-legend" id="chartdiv-legend" /> */}
						</div>
					</div>
					<div className="col-5">
						<div className="card height-600 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">SP Referrals</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="SP Partner Performance
											See which specialty pharmacy partners are driving enrollment in the program. To see which pharmacies are filling scripts, visit the fulfillment demographics section.
											Sources: Specialty Pharmacy Data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="ms-auto">
											<div className="dropdown pe-2">
												<a
													href="javascript:;"
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
															href="javascript:;">
															<i className="fa-regular fa-share me-2" /> Share
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;">
															<i className="fa-regular fa-add me-2" /> Add to
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPNGChart(mixed_chart,'SP Referrals');">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPDFChart('mixed-chart','SP Referrals')">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PDF
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body p-3">
								<div className="chart">
									{/* <canvas
										id="mixed-chart"
										className="chart-canvas"
										height={500}
									/> */}
									{linechartData1 &&<LineChart
										id="mixed-chart1"
										config={linechartData1}
										className="chart-canvas"
										height={500}
									/>}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-6">
						<div className="card z-index-2 height-600">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">JCP Referral Type</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="JCP Channel Preferences
									JCP can refer patients to the withMe program in 3 ways:
									1) Warm transfer over the phone
									2) Via Text with the microsite link
									3) Clicking the link on the JCP website
									See which channel is driving the most signups week by week to make sure all channels are optimized.
									Sources: JCP and Google Analytics">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="ms-auto">
											<div className="dropdown pe-2">
												<a
													href="javascript:;"
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
															href="javascript:;">
															<i className="fa-regular fa-share me-2" /> Share
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;">
															<i className="fa-regular fa-add me-2" /> Add to
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPNGChart(chartJCPReferral,'JCP Referral Type');">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPDFChart('chart-line','JCP Referral Type')">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PDF
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body p-3">
								<div className="chart">
								{/* <LineChart id="chart-line" config={linechartData1} /> */}
								{linechartData2 &&	<LineChart id="chart-line-1"  config={linechartData2} />}
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="card z-index-2 height-600">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">
										Patients Assisted By Referral Channel
									</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="JCP Referral Type">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="ms-auto">
											<div className="dropdown pe-2">
												<a
													href="javascript:;"
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
															href="javascript:;">
															<i className="fa-regular fa-share me-2" /> Share
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;">
															<i className="fa-regular fa-add me-2" /> Add to
															Report
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPNGChart(chartPatientsAssisted,'Patients Assisted By Referral Channel');">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPDFChart('chart-line-2','Patients Assisted By Referral Channel')">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PDF
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body p-3">
								<div className="chart">
									{/* <canvas
										id="chart-line-2"
										className="chart-canvas"
										height={500}
									/> */}
								{linechartData3 &&	<LineChart id="chart-line-2" config={linechartData3} />}
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

export default EnrollmentOverview;
