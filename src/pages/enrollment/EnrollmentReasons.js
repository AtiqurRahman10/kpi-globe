import React, { useEffect, useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import LineChart from "../components/LineChart";
import FlowChart from "../components/FlowChart";
import BubbleChart from "../components/BubbleChart";
import { bubbleData } from "./data";
var filters = localStorage.getItem("filters");
function EnrollmentReasons(props) {
	//API
	const [barChartData1, setBarChartData1] = useState();
	const [barChartData2, setBarChartData2] = useState();
	const [flowChartData,setFlowChartData] = useState(null);
	const [nodeData,setNodedata] = useState(null);
	// const [bubbleData, setBubbleData] = useState();
	const [filter, setFilter] = useState(filters);
	useEffect(() => {
		const fetchEnrollReasonData = async () => {
			const res = await fetch(
				"https://kpi-tool.psglobalgroup.com/api/enrollment-reasons.php",
				{ key: filter }
			);
			const data = await res.json();
			console.log("data ==== ", data);
			// set api data
			setNodedata([
				{ id: "A", name: "Patient Enrolled", color: am5.color(0x54a0ff) },
				{ id: "B", name: "Patient Not Enrolled", color: am5.color(0x54a0ff) },
				{ id: "C", name: "Portal Account Setup", color: am5.color(0x10ac84) },
				{ id: "D", name: "Portal Account Not Setup", color: am5.color(0x10ac84) },
				{ id: "E", name: "Content 01", color: am5.color(0x54a0ff) },
				{ id: "G", name: "Content 02", color: am5.color(0x54a0ff) },
				{ id: "H", name: "Content 03", color: am5.color(0x54a0ff) },
				{ id: "I", name: "Content 04", color: am5.color(0x54a0ff) },
				{ id: "J", name: "Content 05", color: am5.color(0x54a0ff) },
				{ id: "K", name: "Content 06", color: am5.color(0x54a0ff) },
				{ id: "L", name: "Drop", color: am5.color(0x10ac84) },
			  ]);
			
			  setFlowChartData([
        { from: "A", to: "D", value: 0 },
        { from: "A", to: "C", value: 45 },
        { from: "B", to: "L", value: 5 },
        { from: "C", to: "E", value: 3 },
        { from: "D", to: "L", value: 0 },
        { from: "C", to: "E", value: 1 },
        { from: "C", to: "G", value: 3 },
        { from: "C", to: "H", value: 1 },
        { from: "C", to: "J", value: 2 },
        { from: "C", to: "I", value: 1 },
        { from: "C", to: "K", value: 3 },
      ]);

	setBarChartData1({
		type: "bar",
    data: {
      labels: data.reason_to_enroll,
      datasets: [
        {
          label: "Top Reasons To Enroll",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 16,
          borderSkipped: false,
          backgroundColor: "#b2b9bf",
          data: data.reason_to_enroll_values,
          maxBarThickness: 14,
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
			display: false,
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
	setBarChartData2({
		type: "bar",
		data: {
		  labels: data.reason_to_not_enroll,
		  datasets: [
			{
			  label: "Top Reasons To Abandon",
			  tension: 0.4,
			  borderWidth: 0,
			  borderRadius: 16,
			  borderSkipped: false,
			  backgroundColor: "#b2b9bf",
			  data: data.reason_to_not_enroll_values,
			  maxBarThickness: 14,
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
				display: false,
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
		fetchEnrollReasonData();
	}, [filters]);

	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-12 position-relative z-index-2">
						<div className="card card-plain mb-4">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-lg-6">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Enrollment Reasons
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-12">
						<div className="card p-3 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Portal Content Flow</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="Patient Portal Pathways See how patients are navigating to and through the portal. To see differences between bio-naive and bio-experienced patients, select the segment from the filters menu at the top. Source: Ashfield salesforce data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
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
														onclick="enrollChartPng()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;"
														onclick="enrollChartPdf()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							{flowChartData &&	<FlowChart flowData={flowChartData}  nodeData=
						{nodeData} id="contentflow" rotate="0"/>}
							{/* <div className="chartdiv" id="enroll-to-content" /> */}
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-12">
						<div className="card p-3 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Portal Content Performance</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="PORTAL CONTENT PERFORMANCE
									Compare page views and interaction with key content provided on the patient portal to see the information patients need most. Adjust content and portal navigation to ensure easy access to popular content.
									
									Source: Ashfield salesforce data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
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
														onclick="forcePerformanceChartPng()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;"
														onclick="forcePerformanceChartPdf()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									  </div>
								   </div>
							    </div>
						
							<div className="chartdiv height-600" id="chartdiv" >
									<BubbleChart bubbleData={bubbleData}/>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-6">
						<div className="card z-index-2 height-400">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Top Reasons To Enroll</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="PATIENT NEEDS
									Use this metric to track the needs of patients and why they need our support. Adjust content and services to ensure easy access to their greatest needs.
									Source: Ashfield survey">
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
															onclick="downloadPNGChart(chartReasonEnroll,'Top Reasons To Enroll');">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPDFChart('chart-bars','Top Reasons To Enroll')">
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
								<div className="border-radius-lg py-3 pe-1 min-height-250">
									<div className="chart min-height-250">
									{barChartData1 &&<LineChart config={barChartData1} id="chart-bars" height="100vh"/>}
										{/* <canvas
											id="chart-bars"
											className="chart-canvas"
											height="100vh"
										/> */}
									</div>
								</div>
								<div className="container border-radius-lg" />
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="card z-index-2 height-400">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Top Reasons To Abandon</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="PATIENT FRUSTRATIONS
									Find out why patients are dropping out of our program, and identify ways to address these pain points.
									Source: Ashfield survey">
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
															onclick="downloadPNGChart(chartReasonNotEnroll,'Top Reasons To Abandon');">
															<i className="fa-regular fa-file-arrow-down me-2" />
															Download PNG
														</a>
													</li>
													<li>
														<a
															className="dropdown-item border-radius-md"
															href="javascript:;"
															onclick="downloadPDFChart('chart-bars2','Top Reasons To Abandon')">
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
								<div className="border-radius-lg py-3 pe-1 min-height-250">
									<div className="chart min-height-250">
									{barChartData2 &&<LineChart config={barChartData2} id="chart-bars2" height="100vh"/>}
										{/* <canvas
											id="chart-bars2"
											className="chart-canvas"
											height="100vh"
										/> */}
									</div>
								</div>
								<div className="container border-radius-lg" />
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

export default EnrollmentReasons;
