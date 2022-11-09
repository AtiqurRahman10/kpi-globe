import React, { useEffect, useState,useLayoutEffect } from "react";
import { appendScript } from "../utils/appendScript";
import { removeScript } from "../utils/removeScript";

import UsHeatMapChart from "../components/UsHeatMapChart";
// import {
// 	signup_demographics,
// 	signup_demographics_map,
// 	signup_demographics_geodata,
// 	signup_demographics_themes,
// 	signup_demographics_chartjs,
// } from "../comman/Constant";
import { heatmapData1 } from "./data";
import LineChart from "../components/LineChart";
import MeterChart from "../components/MeterChart";
var filters = localStorage.getItem("filters");
function SignupDemographics(props) {
	const [filter, setFilter] = useState(filters);
	const [barChartData, setBarChartData] = useState(null);
	const [heatMapData, setHeatMapData] = useState(null);
	const [radarChart1,setRadarChart1] =useState(null);
	const [radarChart2,setRadarChart2] =useState(null);
	const [radarChart3,setRadarChart3] =useState(null);
	const [nbrx,setNbrx] = useState(null);
	useEffect(() => {
		const fetchSignupDemographic = async () => {
		  const res = await fetch(
			"https://kpi-tool.psglobalgroup.com/api/signup-demographics.php",
			{ key: filter }
		  );
		  const data = await res.json();
		  console.log("data ==== ", data);
			setNbrx(data.enrollment_rxcount)
			console.log("nbrx",nbrx)
		  setBarChartData({
			type: "bar",
			data:  {
				labels: data.range,
				datasets: [
					{
						label: "Male",
						tension: 0.4,
						borderWidth: 0,
						borderRadius: 4,
						borderSkipped: false,
						backgroundColor: "#0dbeff",
						data: data.sex_assigned_at_birth.male,
						maxBarThickness: 10,
					},
					{
						label: "Female",
						tension: 0.8,
						borderWidth: 0,
						borderRadius: 4,
						borderSkipped: false,
						backgroundColor: "#f82c91",
						data: data.sex_assigned_at_birth.female,
						maxBarThickness: 10,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				elements: {
					line: {
						borderWidth: 3,
					},
				},
				title: {
					display: false,
					text: "Chart.js bar Chart!",
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
								display: false,
								drawOnChartArea: false,
								drawTicks: false,
							},
							ticks: {
								display: true,
								padding: 10,
								suggestedMin: 0,
								suggestedMax: 10,
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
							},
							ticks: {
								display: true,
								padding: 15,
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
 setRadarChart1({
	type: "radar",
		data: {
			labels:data.radar_range,
			datasets: [
				{
					label: "Enrolled Patients",
					data: data.radar_enrolled_vs_rx.enrolled,
					backgroundColor: "rgba(102,226,199,0.3)",
					borderColor: "rgba(102,226,199, 0.7)",
				},
				{
					label: "Total Rx Population",
					data: data.radar_enrolled_vs_rx.rx,
					backgroundColor: "rgba(13, 190, 255, 0.5)",
					borderColor: "rgba(13, 190, 255, 0.7)",
				},
			],
		},
		options: {
			scale: {
				ticks: {
					display: false,
					maxTicksLimit: 1,
				},
				title: {
					color: "#ffffff",
				},
			},
			plugins: {
				legend: {
					display: true,
					position: "bottom",
					labels: {
						color: "#b2b9bf",
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
					},
				},
			},
		}
 });
 setRadarChart2({
	type: "radar",
		data: {
			labels: [
				"0-9",
				"10-19",
				"20-29",
				"30-39",
				"40-49",
				"50-59",
				"60-69",
				"70-79",
			],
			datasets: [
				{
					label: "Signed Up Patients",
					data: [3, 7, 6, 4, 7, 5, 4, 7],
					backgroundColor: "rgba(102,226,199,0.3)",
					borderColor: "rgba(102,226,199, 0.7)",
				},
				{
					label: "Total Rx Population",
					data: [7, 3, 4, 6, 4, 7, 5, 3],
					backgroundColor: "rgba(13, 190, 255, 0.5)",
					borderColor: "rgba(13, 190, 255, 0.7)",
				},
			],
		},
		options: {
			scale: {
				ticks: {
					display: false,
					maxTicksLimit: 1,
				},
				title: {
					color: "#ffffff",
				},
			},
			plugins: {
				legend: {
					display: true,
					position: "bottom",
					labels: {
						color: "#b2b9bf",
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
					},
				},
			},
		}
 });
 setRadarChart3({
	type: "radar",
		data: {
			labels: [
				"0-9",
				"10-19",
				"20-29",
				"30-39",
				"40-49",
				"50-59",
				"60-69",
				"70-79",
				"0-9",
				"10-19",
				"20-29",
				"30-39",
				"40-49",
				"50-59",
				"60-69",
				"70-79",
			],
			datasets: [
				{
					label: "Enrolled Patients",
					data: [3, 7, 6, 4, 7, 5, 4, 7, 3, 7, 6, 4, 7, 5, 4, 7],
					backgroundColor: "rgba(102,226,199,0.3)",
					borderColor: "rgba(102,226,199, 0.7)",
				},
				{
					label: "Total Rx Population",
					data: [7, 3, 4, 6, 4, 7, 5, 3, 7, 3, 4, 6, 4, 7, 5, 3],
					backgroundColor: "rgba(13, 190, 255, 0.5)",
					borderColor: "rgba(13, 190, 255, 0.7)",
				},
			],
		},
		options: {
			scale: {
				ticks: {
					display: false,
					maxTicksLimit: 1,
				},
				title: {
					color: "#ffffff",
				},
			},
			plugins: {
				legend: {
					display: true,
					position: "bottom",
					labels: {
						color: "#b2b9bf",
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
					},
				},
			},
		}
 });
		  setHeatMapData(data.state)
		//   console.log(heatmapData)
		};
	
	  	fetchSignupDemographic();
		
	},[filter]);

	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-10 position-relative z-index-2">
						<div className="card card-plain mb-4">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-12">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Signup Demographics
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h4 className="true">Insurance Type</h4>
					</div>
					<div className="col-6">
						<h4 className="true">Preferred Language</h4>
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
														Commercial
													</p>
													<h5 className="font-weight-bolder mb-0">
														<span id="insurance_commercial" />
														<span
															className="text-success text-sm font-weight-bolder"
															id="insurance_commercial_diff">
															+3%
														</span>
													</h5>
												</div>
											</div>
											<div className="col-3 text-end">
												<div className="icon icon-shape shadow border-radius-md bg-gradient-primary text-center d-flex align-items-center justify-content-center">
													<i
														className="fa-solid fa-money-bill text-lg opacity-10"
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
														Government
													</p>
													<h5 className="font-weight-bolder mb-0">
														<span id="insurance_government" />
														<span
															className="text-success text-sm font-weight-bolder"
															id="insurance_government_figg">
															+3%
														</span>
													</h5>
												</div>
											</div>
											<div className="col-3 text-end">
												<div className="icon icon-shape shadow border-radius-md bg-gradient-primary text-center d-flex align-items-center justify-content-center">
													<i
														className="fa-solid fa-university text-lg opacity-10"
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
														Spanish
													</p>
													<h5 className="font-weight-bolder mb-0">
														<span id="guide_spanish" />
														<span
															className="text-success text-sm font-weight-bolder"
															id="guide_spanish_diff">
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
														English
													</p>
													<h5 className="font-weight-bolder mb-0">
														<span id="guide_english" />
														<span
															className="text-success text-sm font-weight-bolder"
															id="guide_english_diff">
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
				<div className="row my-4">
					<div className="col-7">
						<div className="card z-index-2 p-3">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Basic Demographics</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="See the makeup of the population in terms of age groups and gender assigned at birth. Hover over each bar to compare our reach against the total Tremfya population. Source: Ashfield and Claims data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												href="#javascript"
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
														href="#javascript">
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPNGChart(chartjsBarAge,'Basic Demographics');">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPDFChart('chart-bars','Basic Demographics')">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="chart height-500">
									{barChartData && (
							<LineChart
								id="chart-bars"
								config={barChartData}
							/>
							)}
										{/* <LineChart
								 config={barChart}
									id="chart-bars"
									className="chart-canvas"
									// height="400px"
								/> */}
							</div>
						</div>
					</div>
					<div className="col-5">
						<div className="card z-index-2 p-3">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Enrollment/Total RX</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="PROGRAM REACH (Total Rx)
										Track our reach across the entire population of patients who have a new or existing Tremfya prescription for a given time period. See the change from the prior period. To see reach over NBRx, visit the engagement screen.
										Source: Ashfield and claims data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												href="#javascript"
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
														href="#javascript">
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="enrollChartPng()">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
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
							 <MeterChart id="enroll-total-rx" total_nbrx_enrollment={nbrx}
							interval={false} />
							{/* {nbrx && <MeterChart
							id="enroll-total-rx"
							total_nbrx_enrollment={nbrx}
							interval={true}
						/>} */}
							{/* <div className="chartdiv" id="enroll-total-rx" /> */}
						</div>
					</div>
				</div>
				<div className="row mt-4">
          <div className="col-12">
            <div className="card px-5 pb-6">
              <div className="card-header mt-3 px-0">
                <div className="d-flex align-items-center">
                  <h6 className="mb-0">Program reached By State</h6>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="true"
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="#javascript"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="#javascript"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="#javascript"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="#javascript"
                            onclick="heatChartPng()"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="#javascript"
                            onclick="heatChartPdf()"
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
              {/* {heatMapData && (
                <HeatMapChart id="us-heatmap" heatmap={heatMapData} height={500}/>
              )} */}
             {heatMapData && <UsHeatMapChart  id="us-heatmap" heatdata={heatMapData} height={500} />}
              {/* <div className="chartdiv" id="us-heatmap" /> */}
            </div>
          </div>
        </div>
				<div className="row mt-4">
					<div className="col-4">
						<div className="card p-3 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Age Groups</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="See the age groups of both the Total Rx population and Enrolled patients over a period of time. Hover over each age group to compare signups against the total prescription population.
									Source: Ashfield and Claims data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												href="#javascript"
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
														href="#javascript">
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPNGChart(chartjsRadarAge,'radar-chart');">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPDFChart('radar-chart','Age Groups')">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="chart">
								{radarChart1 && (
							<LineChart
								
								config={radarChart1}
								id="radar-chart"
										className="chart-canvas"
										height="400px"
							/>
							)}
							
									{/* <canvas
										id="radar-chart"
										className="chart-canvas"
										height="400px"
									/> */}
								</div>
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="card p-3 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Income Level</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="See the age groups of both the Total Rx population and Enrolled patients over a period of time. Hover over each age group to compare signups against the total prescription population.
									Source: Ashfield and Claims data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												href="#javascript"
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
														href="#javascript">
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPNGChart(radarChart2,'radar-chart2');">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPDFChart('radar-chart2','Age Groups')">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="chart">
							 {radarChart2 && (
							<LineChart
								config={radarChart2}
								id="radar-chart2"
										className="chart-canvas"
										height="400px"
							/>
							)}
								
								</div>
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="card p-3 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Ethnicity</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="See the age groups of both the Total Rx population and Enrolled patients over a period of time. Hover over each age group to compare signups against the total prescription population.
									Source: Ashfield and Claims data">
										<i className="fas fa-info" aria-hidden="true" />
									</button>
									<div className="ms-auto">
										<div className="dropdown pe-2">
											<a
												href="#javascript"
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
														href="#javascript">
														<i className="fa-regular fa-share me-2" /> Share
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript">
														<i className="fa-regular fa-add me-2" /> Add to
														Report
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPNGChart(radarChart3,'radar-chart3');">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="#javascript"
														onclick="downloadPDFChart('radar-chart3','Age Groups')">
														<i className="fa-regular fa-file-arrow-down me-2" />
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="chart">
								{radarChart3 && (
							<LineChart
								id="radar-chart3"
								config={radarChart3}
								height="400px"
								className="chart-canvas"
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

export default SignupDemographics;
