import React, { useEffect, useLayoutEffect,useState } from "react";
import LineChart from "../components/LineChart";
import M_Chart from "../components/M_Chart";
var filters = localStorage.getItem("filters");
function HomeDriver(props) {
	const [filter, setFilter] = useState(filters);
	const[lineChartData,setLineChartData] =useState(null);
	const[mixChartData,setMixChartData] =useState(null);
	useLayoutEffect(() => {
		// const fetchHomeDriverData = async () => {
		// 	const res = await fetch(
		// 		"https://kpi-tool.psglobalgroup.com/api/home-driver.php",
		// 		{ key: filter }
		// 	);
		// 	const data = await res.json();
		// 	console.log("data ==== ", data);
		setMixChartData({
			type: "bar",
			data: {
				labels: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP7", "SP8"],
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
					data: [50, 40, 300, 220, 500, 250, 400, 230],
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
					data: [50, 40, 300, 220, 500, 250, 400, 230],
					fill: true,
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
								suggestedMax: 500,
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
			setLineChartData({
				type: "line",
				data: {
				  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				  datasets: [
					{
					  label: "Mobile apps",
					  tension: 0.4,
					  borderWidth: 0,
					  pointRadius: 0,
					  borderColor: "#38d6ae",
					  borderWidth: 3,
					  backgroundColor:`rgba(56, 214, 174, 0.2)`,
					  fill: true,
					  data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
					  maxBarThickness: 6,
					},
					{
					  label: "Websites",
					  tension: 0.4,
					  borderWidth: 0,
					  pointRadius: 0,
					  borderColor: "#e9ecef",
					  borderWidth: 3,
					  backgroundColor: `rgba(233, 236, 239, 0.2)`,
					  fill: true,
					  data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
					  maxBarThickness: 6,
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
									suggestedMax: 500,
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
		// };
		// fetchHomeDriverData();
	}, [filters]);
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
												Program Satisfaction and Perception
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
						<a href="../../pages/dashboards/satisfaction.html">
							<div className="card z-index-2">
								<div className="card-body p-3">
									<div className="row">
										<div className="col-8">
											<p className="text-2xl mt-0 mb-0 text-align-center text-capitalize font-weight-bold">
												Launch Hate Audit Tool
											</p>
										</div>
										<div className="col-4 text-end">
											<div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
												<i
													className="ni ni-button-power text-lg opacity-10"
													aria-hidden="true"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-6">
						<div className="card z-index-2 height-600">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">
										Patient Program Satisfaction by Phase
									</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="PATIENT SATISFACTION
											Track patients satisfaction at each phase of the treatment experience.
											Source: Ashfield Health Survey">
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
														onclick="downloadPNGChart(chartPageView1,'Patient Program Satisfaction by Phase');">
														<i className="fa-regular fa-file-arrow-down me-2"></i>
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;"
														onclick="downloadPDFChart('mixed-chart','Patient Program Satisfaction by Phase')">
														<i className="fa-regular fa-file-arrow-down me-2"></i>
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body p-3">
								<div className="chart">
									{/* No Access to chart
                  <div className="outerdiv mt-6">
                    <img className="lock" src="../../assets/img/lock.png" />
                    <p className="msg mt-3">
                      The page you're trying to access has restricted access.<br />
                      Please refer to your system administrator.
                    </p>
                    <a className="btn bg-gradient-primary text-doyle mt-8"
                      >Request access</a>
                  </div>
                  No Access to chart */}

									<M_Chart
										id="mixed-chart"
										config={mixChartData}
										height="320"
									/>

									{/* <canvas
										id="mixed-chart"
										className="chart-canvas"
										height="500"></canvas> */}
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="card z-index-2 height-600">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Patient Brand Perception</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="PATIENT BRAND PERCEPTION
											Understand patient sentiment toward TREMFYA as a brand, based on their treatment experience.">
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
														onclick="downloadPNGChart(chartPageView,'Patient Brand Perception');">
														<i className="fa-regular fa-file-arrow-down me-2"></i>
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;"
														onclick="downloadPDFChart('chart-line','Patient Brand Perception')">
														<i className="fa-regular fa-file-arrow-down me-2"></i>
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body p-3">
								<div className="chart">
									{lineChartData && <LineChart id="chart-line-1" config={lineChartData} height="500" />}
									{/* <canvas
										id="chart-line"
										className="chart-canvas"
										height="500"></canvas> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--   Bubble Chart   --> */}
				<div className="row mt-4">
					<div className="col-12">
						<div className="card z-index-2 p-3 height-700">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">HCP Brand Perception</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="HCP BRAND PERCEPTION
									Compare the sentiment around TREMFYA as a brand, including the withME support program for patients.
									Source: Qualitative and quantitative research results.">
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
														href="javascript:;">
														<i className="fa-regular fa-file-arrow-down me-2"></i>
														Download PNG
													</a>
												</li>
												<li>
													<a
														className="dropdown-item border-radius-md"
														href="javascript:;">
														<i className="fa-regular fa-file-arrow-down me-2"></i>
														Download PDF
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body">
								<figure className="bubble-chart">
									<figure className="bubble-chart">
										<div className="bubblerow header">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel"></span>
												</div>
												<div className="bubblecell">
													<span className="bubblelabel">January</span>
												</div>
												<div className="bubblecell">
													<span className="bubblelabel">February</span>
												</div>
												<div className="bubblecell">
													<span className="bubblelabel">March</span>
												</div>
												<div className="bubblecell">
													<span className="bubblelabel">April</span>
												</div>
												<div className="bubblecell">
													<span className="bubblelabel">May</span>
												</div>
											</div>
										</div>
										<div className="bubblerow one">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel">Patient Direct</span>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">25</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">16</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">15</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">35</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">21</span>
													</div>
												</div>
											</div>
										</div>
										<div className="bubblerow two">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel">NCP Direct</span>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">34</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">20</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">22</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">14</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">24</span>
													</div>
												</div>
											</div>
										</div>
										<div className="bubblerow three">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel">Paid Search</span>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">22</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">18</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">20</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">30</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">24</span>
													</div>
												</div>
											</div>
										</div>
										<div className="bubblerow four">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel">Organic Search</span>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">23</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">20</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">22</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">35</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">26</span>
													</div>
												</div>
											</div>
										</div>
										<div className="bubblerow five">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel">Refferals</span>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">24</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">23</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">28</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">28</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">21</span>
													</div>
												</div>
											</div>
										</div>
										<div className="bubblerow six">
											<div className="as-table">
												<div className="bubblecell">
													<span className="bubblelabel">Other</span>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">24</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">28</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">23</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">28</span>
													</div>
												</div>
												<div className="bubblecell">
													<div className="bubble">
														<span className="value">24</span>
													</div>
												</div>
											</div>
										</div>
									</figure>
								</figure>
							</div>
						</div>
					</div>
				</div>
				<footer className="footer pt-3">
					<div className="container-fluid">
						<div className="row align-items-center justify-content-lg-between">
							<div className="col-lg-6 mb-lg-0 mb-4">
								<div className="copyright text-center text-sm text-muted text-lg-start">
									©<script>document.write(new Date().getFullYear());</script>,
									<a
										href="https://ipghealth.com/network/90north"
										className="font-weight-bold"
										// target="_blank"
									>
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

export default HomeDriver;
