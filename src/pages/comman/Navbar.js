import React, { useEffect, useState, useLayoutEffect } from "react";
import { appendScript } from "../utils/appendScript";
import { removeScript } from "../utils/removeScript";
import { filter, soft_ui__ } from "./Constant";
import $ from "jquery";
function Navbar() {
	useLayoutEffect(() => {
		appendScript(filter);
		// appendScript(soft_ui__);

		return () => {
			removeScript(filter);
			// removeScript(soft_ui__);
		};
	}, []);

	const [theme, setTheme] = useState("g-sidenav-show bg-gray-100 dark-version");
	const [nav, setNav] = useState(false);
	const darkMode = () => {
		if (theme === "g-sidenav-show bg-gray-100 dark-version") {
			setTheme("g-sidenav-show bg-gray-100 light-version");
		} else {
			setTheme("g-sidenav-show bg-gray-100 dark-version");
		}
	};
	const hideNav = () => {
		nav ? setNav(nav) : setNav(!nav);
		alert(nav);
	};
	// $(".rotate").on("click
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
		<React.Fragment>
			{/* <!-- Navbar --> */}
			<nav
				className="navbar navbar-main navbar-expand-lg position-sticky mt-2 top-1 px-0 me-4 shadow-none border-radius-xl z-index-sticky"
				id="navbarBlur"
				data-scroll="true">
				<div className="container-fluid py-1 px-3">
					<div
						className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
						id="navbar">
						<div className="md-auto pe-md-3 justify-content-start">
							<div className="d-flex">
								<div className="dropdown d-inline">
									<li className="nav-item d-flex align-items-center">
										<div className="sidenav-toggler sidenav-toggler-inner d-xl-block d-none">
											<a
												href="javascript:;"
												className="nav-link text-body p-0 mt-2">
												<div className="sidenav-toggler-inner">
													<i className="fas fa-chevron-circle-left rotate"></i>
												</div>
											</a>
										</div>
									</li>
								</div>
								<div className="dropdown d-inline" data-cat="date-range">
									<a
										href="javascript:;"
										className="btn bg-gradient-primary dropdown-toggle text-doyle"
										data-bs-toggle="dropdown"
										id="navbarDropdownMenuLink2"
										aria-expanded="false">
										Time Range
									</a>
									<div>
										<ul
											className="dropdown-menu dropdown-menu-lg-start px-2 py-3"
											aria-labelledby="navbarDropdownMenuLink2">
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="Last 30 days"
													data-filter-type="date-range">
													Last 30 days
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="Last 60 days"
													data-filter-type="date-range">
													Last 60 days
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="Last 90 days"
													data-filter-type="date-range">
													Last 90 days
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="Last 180 days"
													data-filter-type="date-range">
													Last 180 days
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="custom"
													data-filter-type="date-range"
													id="daterangepicker">
													Date Range
												</a>
											</li>
											<li>
												<hr className="horizontal my-2 light" />
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md text-danger"
													href="javascript:;"
													data-remove-filter="remove-filter">
													Remove Filter
												</a>
											</li>
										</ul>
									</div>
									<div className="filter-active d-none">
										<a href="javascript:;" className="btn bg-gradient-light">
											<span className="filter-value"></span>
											<i className="fas fa-times"></i>
										</a>
									</div>
								</div>

								{/* <!-- region --> */}

								<div className="dropdown d-inline" data-cat="region">
									<a
										href="javascript:;"
										className="btn bg-gradient-primary dropdown-toggle text-doyle"
										data-bs-toggle="dropdown"
										id="navbarDropdownMenuLink2"
										aria-expanded="false"
										// onClick="myFunction()"
									>
										Region
									</a>
									<div id="myDropdown">
										<ul
											className="dropdown-menu dropdown-menu-lg-start px-2 py-3"
											aria-labelledby="navbarDropdownMenuLink2"
											style={{ border: "1px solid #2c2b59" }}>
											<input
												type="text"
												placeholder="Select state or region"
												id="myInput"
												onKeyUp="filterFunction()"
												style={{
													backgroundColor: "#202634",
													border: "1px solid #2a2d50",
													color: "#fff",
													width: "100%",
												}}
											/>
											<li>
												<a
													className="dropdown-item border-radius-md region-region"
													href="javascript:;"
													data-filter-value-region="WEST"
													data-filter-type="regions"
													id="west">
													West
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md region-region"
													href="javascript:;"
													data-filter-value-region="MIDWEST"
													data-filter-type="regions"
													id="midwest">
													Mid West
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md region-region"
													href="javascript:;"
													data-filter-value-region="SOUTH"
													data-filter-type="regions"
													id="south">
													South
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md region-region"
													href="javascript:;"
													data-filter-value-region="NORTHEAST"
													data-filter-type="regions"
													id="northeast">
													North East
												</a>
											</li>
											<hr style={{ border: "2px solid grey" }} />
											<ul
												id="states"
												style={{
													maxHeight: "220px",
													width: "300px",
													overflowY: "scroll",
													paddingLeft: 0,
													marginLeft: 0,
													fontSize: "1em",
												}}>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="AL"
														className="region_options"
														id="select-option-AL"
													/>
													<label
														for="select-option-AL"
														className="state-option">
														Alabama
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="AK"
														className="region_options"
														id="select-option-AK"
													/>
													<label
														for="select-option-AK"
														className="state-option">
														Alaska
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="AZ"
														className="region_options"
														id="select-option-AZ"
													/>
													<label
														for="select-option-AZ"
														className="state-option">
														Arizona
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="AR"
														className="region_options"
														id="select-option-AR"
													/>
													<label
														for="select-option-AR"
														className="state-option">
														Arkansas
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="CA"
														className="region_options"
														id="select-option-CA"
													/>
													<label
														for="select-option-CA"
														className="state-option">
														California
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="CO"
														className="region_options"
														id="select-option-CO"
													/>
													<label
														for="select-option-CO"
														className="state-option">
														Colorado
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="CT"
														className="region_options"
														id="select-option-CT"
													/>
													<label
														for="select-option-CT"
														className="state-option">
														Connecticut
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="DE"
														className="region_options"
														id="select-option-DE"
													/>
													<label
														for="select-option-DE"
														className="state-option">
														Delaware
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="FL"
														className="region_options"
														id="select-option-FL"
													/>
													<label
														for="select-option-FL"
														className="state-option">
														Florida
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="GA"
														className="region_options"
														id="select-option-GA"
													/>
													<label
														for="select-option-GA"
														className="state-option">
														Georgia
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="HI"
														className="region_options"
														id="select-option-HI"
													/>
													<label
														for="select-option-HI"
														className="state-option">
														Hawaii
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="ID"
														className="region_options"
														id="select-option-ID"
													/>
													<label
														for="select-option-ID"
														className="state-option">
														Idaho
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="IL"
														className="region_options"
														id="select-option-IL"
													/>
													<label
														for="select-option-IL"
														className="state-option">
														Illinois
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="IN"
														className="region_options"
														id="select-option-IN"
													/>
													<label
														for="select-option-IN"
														className="state-option">
														Indiana
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="IA"
														className="region_options"
														id="select-option-IA"
													/>
													<label
														for="select-option-IA"
														className="state-option">
														Iowa
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="KS"
														className="region_options"
														id="select-option-KS"
													/>
													<label
														for="select-option-KS"
														className="state-option">
														Kansas
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="KY"
														className="region_options"
														id="select-option-KY"
													/>
													<label
														for="select-option-KY"
														className="state-option">
														Kentucky
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="LA"
														className="region_options"
														id="select-option-LA"
													/>
													<label
														for="select-option-LA"
														className="state-option">
														Louisiana
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="ME"
														className="region_options"
														id="select-option-ME"
													/>
													<label
														for="select-option-ME"
														className="state-option">
														Maine
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="MD"
														className="region_options"
														id="select-option-MD"
													/>
													<label
														for="select-option-MD"
														className="state-option">
														Maryland
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="MA"
														className="region_options"
														id="select-option-MA"
													/>
													<label
														for="select-option-MA"
														className="state-option">
														Massachusetts
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="MI"
														className="region_options"
														id="select-option-MI"
													/>
													<label
														for="select-option-MI"
														className="state-option">
														Michigan
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="MN"
														className="region_options"
														id="select-option-MN"
													/>
													<label
														for="select-option-MN"
														className="state-option">
														Minnesota
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="MS"
														className="region_options"
														id="select-option-MS"
													/>
													<label
														for="select-option-MS"
														className="state-option">
														Mississippi
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="MO"
														className="region_options"
														id="select-option-MO"
													/>
													<label
														for="select-option-MO"
														className="state-option">
														Missouri
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="MT"
														className="region_options"
														id="select-option-MT"
													/>
													<label
														for="select-option-MT"
														className="state-option">
														Montana
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="NE"
														className="region_options"
														id="select-option-NE"
													/>
													<label
														for="select-option-NE"
														className="state-option">
														Nebraska
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="NV"
														className="region_options"
														id="select-option-NV"
													/>
													<label
														for="select-option-NV"
														className="state-option">
														Nevada
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="NH"
														className="region_options"
														id="select-option-NH"
													/>
													<label
														for="select-option-NH"
														className="state-option">
														New Hampshire
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="NJ"
														className="region_options"
														id="select-option-NJ"
													/>
													<label
														for="select-option-NJ"
														className="state-option">
														New Jersey
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="NM"
														className="region_options"
														id="select-option-NM"
													/>
													<label
														for="select-option-NM"
														className="state-option">
														New Mexico
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="NY"
														className="region_options"
														id="select-option-NY"
													/>
													<label
														for="select-option-NY"
														className="state-option">
														New York
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="ND"
														className="region_options"
														id="select-option-ND"
													/>
													<label
														for="select-option-ND"
														className="state-option">
														North Dakota
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="OH"
														className="region_options"
														id="select-option-OH"
													/>
													<label
														for="select-option-OH"
														className="state-option">
														Ohio
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="OK"
														className="region_options"
														id="select-option-OK"
													/>
													<label
														for="select-option-OK"
														className="state-option">
														Oklahoma
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="OR"
														className="region_options"
														id="select-option-OR"
													/>
													<label
														for="select-option-OR"
														className="state-option">
														Oregon
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="PA"
														className="region_options"
														id="select-option-PA"
													/>
													<label
														for="select-option-PA"
														className="state-option">
														Pennsylvania
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="RI"
														className="region_options"
														id="select-option-RI"
													/>
													<label
														for="select-option-RI"
														className="state-option">
														Rhode Island
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="SC"
														className="region_options"
														id="select-option-SC"
													/>
													<label
														for="select-option-SC"
														className="state-option">
														South Carolina
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="SD"
														className="region_options"
														id="select-option-SD"
													/>
													<label
														for="select-option-SD"
														className="state-option">
														South Dakota
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="TN"
														className="region_options"
														id="select-option-TN"
													/>
													<label
														for="select-option-TN"
														className="state-option">
														Tennessee
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="TX"
														className="region_options"
														id="select-option-TX"
													/>
													<label
														for="select-option-TX"
														className="state-option">
														Texas
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="UT"
														className="region_options"
														id="select-option-UT"
													/>
													<label
														for="select-option-UT"
														className="state-option">
														Utah
													</label>
												</li>
												<li data-ragion="NORTHEAST" className="state-list">
													<input
														type="checkbox"
														value="VT"
														className="region_options"
														id="select-option-VT"
													/>
													<label
														for="select-option-VT"
														className="state-option">
														Vermont
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="VA"
														className="region_options"
														id="select-option-VA"
													/>
													<label
														for="select-option-VA"
														className="state-option">
														Virginia
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="WA"
														className="region_options"
														id="select-option-WA"
													/>
													<label
														for="select-option-WA"
														className="state-option">
														Washington
													</label>
												</li>
												<li data-ragion="SOUTH" className="state-list">
													<input
														type="checkbox"
														value="WV"
														className="region_options"
														id="select-option-WV"
													/>
													<label
														for="select-option-WV"
														className="state-option">
														West Virginia
													</label>
												</li>
												<li data-ragion="MIDWEST" className="state-list">
													<input
														type="checkbox"
														value="WI"
														className="region_options"
														id="select-option-WI"
													/>
													<label
														for="select-option-WI"
														className="state-option">
														Wisconsin
													</label>
												</li>
												<li data-ragion="WEST" className="state-list">
													<input
														type="checkbox"
														value="WY"
														className="region_options"
														id="select-option-WY"
													/>
													<label
														for="select-option-WY"
														className="state-option">
														Wyoming
													</label>
												</li>
											</ul>

											<br />
											<li
												className="d-flex"
												style={{ justifyContent: "space around" }}>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-remove-multi-filter="remove-filter">
													CLEAR ALL
												</a>

												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-remove-filter="remove-filter"
													style={{
														backgroundColor: "#40ddb9",
														color: "#000",
														textAlign: "center",
													}}
													id="apply-filter">
													Apply
												</a>
											</li>
										</ul>
									</div>

									<div
										className="filter-active d-none"
										style={{ display: "none" }}>
										<a
											href="javascript:;"
											className="btn bg-gradient-primary text-doyle">
											<span className="filter-value"></span>
											<i className="fas fa-times"></i>
										</a>
									</div>
									<div className="filter-activee d-none">
										<a href="javascript:;" className="btn bg-gradient-light">
											<span className="filter-value"></span>
											<i className="fas fa-times"></i>
										</a>
									</div>
								</div>

								{/* <!-- region --> */}

								<div className="dropdown d-inline" data-cat="segment">
									<a
										href="javascript:;"
										className="btn bg-gradient-primary dropdown-toggle text-doyle"
										data-bs-toggle="dropdown"
										id="navbarDropdownMenuLink2"
										aria-expanded="false">
										Segment
									</a>
									<div>
										<ul
											className="dropdown-menu dropdown-menu-lg-start px-2 py-3"
											aria-labelledby="navbarDropdownMenuLink2">
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="Bio-naive"
													data-filter-type="segment">
													Bio-naive patients
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="Bio-experienced"
													data-filter-type="segment">
													Bio-experienced patients
												</a>
											</li>
											<li>
												<hr className="horizontal my-2 light" />
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md text-danger"
													href="javascript:;"
													data-remove-filter="remove-filter">
													Remove Filter
												</a>
											</li>
										</ul>
									</div>
									<div className="filter-active d-none">
										<a href="javascript:;" className="btn bg-gradient-light">
											<span className="filter-value"></span>
											Patients
											<i className="fas fa-times"></i>
										</a>
									</div>
								</div>
								<div className="dropdown d-inline" data-cat="condition">
									<a
										href="javascript:;"
										className="btn bg-gradient-primary dropdown-toggle text-doyle"
										data-bs-toggle="dropdown"
										id="navbarDropdownMenuLink2"
										aria-expanded="false">
										Condition
									</a>
									<div>
										<ul
											className="dropdown-menu dropdown-menu-lg-start px-2 py-3"
											aria-labelledby="navbarDropdownMenuLink2">
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="PSO"
													data-filter-type="condition">
													PSO
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="PSA"
													data-filter-type="condition">
													PSA
												</a>
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md"
													href="javascript:;"
													data-filter-value="GI"
													data-filter-type="condition">
													GI
												</a>
											</li>
											<li>
												<hr className="horizontal my-2 light" />
											</li>
											<li>
												<a
													className="dropdown-item border-radius-md text-danger"
													href="javascript:;">
													Remove Filter
												</a>
											</li>
										</ul>
									</div>
									<div className="filter-active d-none">
										<a href="javascript:;" className="btn bg-gradient-light">
											<span className="filter-value"></span>
											<i className="fas fa-times"></i>
										</a>
									</div>
								</div>
								<div className="dropdown d-inline d-none hideall">
									<a
										href=" javascript:;"
										className="btn text-pink-50"
										data-bs-toggle="dropdown"
										id="navbarDropdownMenuLink2"
										aria-expanded="false">
										Remove Filters
									</a>
								</div>
							</div>
						</div>
						<ul className="navbar-nav ms-auto justify-content-end">
							<li className="nav-item d-flex align-items-center">
								<div className="form-check form-switch ps-0 d-xl-block d-none">
									<input
										className="form-check-input ms-3"
										type="checkbox"
										id="dark-version"
										// checked="true"
										// onClick="darkMode(this)"
										onClick={darkMode}
									/>
								</div>
								<span className="d-sm-inline ms-2 d-none">Light/Dark</span>
							</li>
							<li className="nav-item ms-3 d-flex align-items-center">
								<a
									href="../../pages/authentication/signin/illustration.html"
									className="nav-link text-white font-weight-bold px-0">
									<i className="fa fa-user me-1"></i>
									<span className="d-sm-inline d-none">Sign Out</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{/* <!-- End Navbar --> */}
		</React.Fragment>
	);
}

export default Navbar;
