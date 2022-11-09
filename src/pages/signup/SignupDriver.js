import React, { useLayoutEffect,useState } from "react";
var filters = localStorage.getItem("filters");
function SignupDriver(props) {
	
	const [data,setData] = useState(null);
	const [xAxisdata,setXAxisdata] = useState(null);
	const [yAxisdata,setYAxisdata] = useState(null);
	const [filter, setFilter] = useState(filters);
	useLayoutEffect(() => {
		const fetchSignupDriverData = async () => {
			const res = await fetch(
				"https://kpi-tool.psglobalgroup.com/api/signup-conversion-drivers.php",
				{ key: filter }
			);
			const data = await res.json();
			console.log("data ==== ", data);
			setData(data.data);
			setXAxisdata(data.xAxis);
			setYAxisdata(data.yAxis);
		};
		fetchSignupDriverData();
	}, [filters]);

	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-lg-7 position-relative z-index-2">
						<div className="card card-plain mb-2">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-lg-12">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Sign Up Conversion Drivers
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row"></div>
			</div>
			{/* <!--   Bubble Chart   --> */}
			<div className="row mx-3">
				<div className="col-12">
					<div className="card z-index-2 height-700">
						<div className="card-header pb-0 p-3">
							<div className="d-flex align-items-center">
								<h6 className="mb-0">Sign Ups By Source</h6>

								<button
									type="button"
									className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="DRIVER PERFORMANCE
								Track which channels are driving the most signups each month through the patient or HCP microsites.
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
													//   onclick="viewDailyChartPng()"
												>
													<i className="fa-regular fa-file-arrow-down me-2"></i>
													Download PNG
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													//   onclick="viewDailyChartPdf()"
												>
													<i className="fa-regular fa-file-arrow-down me-2"></i>
													Download PDF
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div
							className="d-flex align-items-center justify-content-center"
							id="view_swtich">
							<a
								href="javascript:;"
								className="nav-link"
								id="chartView"
								aria-expanded="false"></a>
							<div>
								<ul className="nav justify-content-center">
									<li className="nav-item">
										<a
											className="nav-link"
											href="javascript:;"
											data-filter-value="Daily"
											data-filter-type="region">
											Daily
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="javascript:;"
											data-filter-value="Weekly"
											data-filter-type="region">
											Weekly
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="javascript:;"
											data-filter-value="Monthly"
											data-filter-type="region">
											Monthly
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="javascript:;"
											data-filter-value="Quarterly"
											data-filter-type="region">
											Quarterly
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="javascript:;"
											data-filter-value="Yearly"
											data-filter-type="region">
											Yearly
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="card-body">
							<div id="view_daily">

								{/* <BubbleChart 
								id="view_daily_chart"
								style={{ width: "100%", height: "1700px" }} /> */}
								<div
									id="view_daily_chart"
									style={{ width: "100%", height: "1700px" }}></div>
							</div> 
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SignupDriver;
