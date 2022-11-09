import React, { useLayoutEffect } from "react";
import { home_engagement, d3_min_engage } from "../comman/Constant";
import { appendScript } from "../utils/appendScript";
import { removeScript } from "../utils/removeScript";
// import $ from "jquery";

function HomeEngagement(props) {
	useLayoutEffect(() => {
		appendScript(home_engagement);
		appendScript(d3_min_engage);
		return () => {
			removeScript(home_engagement);
			removeScript(d3_min_engage);
		};
	}, []);
	return (
		<React.Fragment>
			<div className="container-fluid py-4">
				<div className="row">
					<div className="col-8 position-relative z-index-2">
						<div className="card card-plain mb-4">
							<div className="card-body p-3">
								<div className="row">
									<div className="col-lg-10">
										<div className="d-flex flex-column h-100">
											<h2 className="font-weight-bolder mb-0">
												Program Engagement
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Bubble Chart  */}
				<div className="row mb-4">
					<div className="col-12">
						<div className="card p-3 z-index-2">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Engagement By Topic and Touchpoint</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="CONTENT MIX
								See which content topics were most popular, and the breakdown of channel type used to engage about each topic.">
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
								<div className="border-radius-lg">
									<div id="circle-chart-container"></div>
								</div>
								<div className="container border-radius-lg"></div>
							</div>
						</div>
					</div>
				</div>

				<div className="row my-3">
					<div className="col-12">
						<div className="card z-index-2 p-3 height-700">
							<div className="card-header pb-0 p-3">
								<div className="d-flex align-items-center">
									<h6 className="mb-0">Engagement By Source</h6>
									<button
										type="button"
										className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
										data-bs-toggle="tooltip"
										data-bs-placement="bottom"
										title="CHANNEL MIX
									See the which channels performed the best in driving signup.">
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
													<span className="bubblelabel">HCP Direct</span>
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
					<footer className="footer pt-3">
						<div className="container-fluid">
							<div className="row align-items-center justify-content-lg-between">
								<div className="col-lg-6 mb-lg-0 mb-4">
									<div className="copyright text-center text-sm text-muted text-lg-start">
										©<script>document.write(new Date().getFullYear());</script>,
										<a
											href="https://ipghealth.com/network/90north"
											className="font-weight-bold"
											target="_blank">
											90NORTH
										</a>
										An IPG Health Company
									</div>
								</div>
								<div className="col-lg-6">
									<ul className="nav nav-footer justify-content-center justify-content-lg-end">
										<li className="nav-item">
											<a
												href="https://ipghealth.com/network/90north"
												className="nav-link text-muted"
												// target="_blank"
											>
												90NORTH
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</React.Fragment>
	);
}

export default HomeEngagement;
