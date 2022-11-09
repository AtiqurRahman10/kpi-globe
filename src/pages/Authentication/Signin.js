import React, { useLayoutEffect } from "react";
import { appendScript } from "../utils/appendScript";
import { removeScript } from "../utils/removeScript";
import { signin } from "../utils/signinApi";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
function Signin() {
	const navitage = useNavigate();
	// useLayoutEffect(() => {
	// 	appendScript(signin);
	// 	return () => {
	// 		removeScript(signin);
	// 	};
	// }, []);

	const handleSubmit = (event) => {
		// POST request using fetch inside useEffect React hook
		event.preventDefault();
		var { email, password } = document.forms[0];
		fetch("https://kpi-tool.psglobalgroup.com/api/action-user-login.php", {
			method: "POST",
			contentType: false,
			processData: false,
			body: JSON.stringify({ email: email.value, password: password.value }),
		})
			.then((response) => {
				if (response != 0) {
					alert("login successful");
					// localStorage.setItem("userID", response);
					localStorage.setItem("userID", 2);
					console.log("response", response);
					// window.location = "/dashboards/crm.html";
					navitage("/home/overview");
				} else {
					alert("Invalid username or password. Please try again");
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	return (
		<main className="main-content  mt-0">
			<section>
				<div className="page-header min-vh-100">
					<div className="container">
						<div className="row">
							<div className="col-xl-4 col-6 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
								<div className="card">
									<div className="card-header pb-0 text-start">
										<h4 className="font-weight-bolder">Sign In</h4>
										<p className="mb-0">
											Enter your email and password to sign in
										</p>
									</div>
									<div className="card-body">
										<form role="form" id="login-form" onSubmit={handleSubmit}>
											<div className="mb-3">
												<input
													type="email"
													className="form-control form-control-lg bg-gradient-dark"
													placeholder="Email"
													aria-label="Email"
													name="email"
												/>
											</div>
											<div className="mb-3">
												<input
													type="password"
													className="form-control form-control-lg bg-gradient-dark"
													placeholder="Password"
													aria-label="Password"
													name="password"
												/>
											</div>
											<div className="form-check form-switch">
												<input
													className="form-check-input"
													type="checkbox"
													id="rememberMe"
												/>
												<label
													className="form-check-label"
													htmlFor="rememberMe">
													Remember me
												</label>
											</div>
											<div className="text-center">
												{/* <a class="text-doyle" href="../../dashboards/crm.html"> */}
												{/* <button
													type="submit"
													className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">
													Sign In
												</button> */}

												<input
													type="submit"
													className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
												/>
												{/* </a> */}
											</div>
										</form>
										{/* <div class="card-footer text-center pt-0 px-lg-2 px-1">
                        <p class="mt-4 text-sm mx-auto"> Don't have an account? <a href="../../authentication/signup/illustration.html" class="text-primary text-gradient font-weight-bold">Sign up</a>
                        </p>
                      </div> */}
									</div>
								</div>
							</div>
							<div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
								<div className="position-relative align-items-center justify-content-center bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column">
									<img
										src="../../../assets/img/shapes/pattern-lines.svg"
										alt="pattern-lines"
										className="position-absolute opacity-4 start-0"
									/>
									<div className="spherearea p-3">
										<div className="spherecontainer">
											<div className="sphereloader" />
										</div>
									</div>
									<h4 className="mt-5 text-white font-weight-bolder">
										"Welcome!"
									</h4>
									<p className="text-white">I'm Morphy, Your Data AI!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Signin;
