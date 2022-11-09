// $("#login-form").Submit(function () {
// 	var formdata = new FormData($("#login-form")[0]);
// 	$.ajax({
// 		url: "https://kpi-tool.psglobalgroup.com/api/action-user-login.php",
// 		method: "POST",
// 		data: formdata,
// 		cache: false,
// 		processData: false,
// 		contentType: false,
// 		// beforeSend: function () {
// 		//   jQuery('#submit-button-btn').attr('disabled', true).val('Form is submitting, please wait.');
// 		//   // alert("Please don't close the window, while form is submitting");
// 		// },
// 		success: function (data) {
// 			if (parseInt(data) != 0) {
// 				alert("login successful");
// 				localStorage.setItem("userID", data);
// 				window.location = "../../dashboards/crm.html";
// 			} else {
// 				alert("Invalid username or password. Please try again");
// 			}
// 		},
// 	});

// 	return false;
// });
