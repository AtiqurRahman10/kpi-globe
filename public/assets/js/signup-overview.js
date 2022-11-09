var funnelGraph, chartDevice, chartSignupTime;
am5.ready(function () {
	am5.addLicense("AM5C329334656");

	//device type start

	// Apple chart start

	var root = am5.Root.new("apple1");

	var doyleTheme = am5.Theme.new(root);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});

	root.setThemes([am5themes_Animated.new(root), doyleTheme]);
	// Create chart
	// https://www.amcharts.com/docs/v5/charts/radar-chart/
	var chart = root.container.children.push(
		am5radar.RadarChart.new(root, {
			panX: false,
			panY: false,
			wheelX: "panX",
			wheelY: "zoomX",
			innerRadius: am5.percent(20),
			startAngle: -90,
			endAngle: 180,
		})
	);

	// Data
	var data = [
		{
			category: "Paid Ads",
			value: 800,
			full: 900,
			columnSettings: {
				fill: am5.color(0x38d6ae),
			},
		},
		{
			category: "Campaigns",
			value: 835,
			full: 1200,
			columnSettings: {
				fill: am5.color(0xf82c91),
			},
		},
		{
			category: "Website",
			value: 792,
			full: 1000,
			columnSettings: {
				fill: am5.color(0x0dbeff),
			},
		},
		{
			category: "HCP Microsite",
			value: 708,
			full: 750,
			columnSettings: {
				fill: am5.color(0x611bff),
			},
		},
	];

	// Add cursor
	// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
	var cursor = chart.set(
		"cursor",
		am5radar.RadarCursor.new(root, {
			behavior: "zoomX",
		})
	);

	cursor.lineY.set("visible", false);

	// Create axes and their renderers
	// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
	var xRenderer = am5radar.AxisRendererCircular.new(root, {
		//minGridDistance: 50
	});

	xRenderer.labels.template.setAll({
		radius: 10,
	});

	xRenderer.grid.template.setAll({
		forceHidden: true,
	});

	var xAxis = chart.xAxes.push(
		am5xy.ValueAxis.new(root, {
			renderer: xRenderer,
			min: 0,
			max: 1000,
			strictMinMax: true,
			numberFormat: "'$'#",
			tooltip: am5.Tooltip.new(root, {}),
		})
	);

	var yRenderer = am5radar.AxisRendererRadial.new(root, {
		minGridDistance: 20,
	});

	yRenderer.labels.template.setAll({
		centerX: am5.p100,
		fontWeight: "500",
		fontSize: 18,
		templateField: "columnSettings",
	});

	yRenderer.grid.template.setAll({
		forceHidden: true,
	});

	var yAxis = chart.yAxes.push(
		am5xy.CategoryAxis.new(root, {
			categoryField: "category",
			renderer: yRenderer,
		})
	);

	yAxis.data.setAll(data);

	// Create series
	// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
	var series1 = chart.series.push(
		am5radar.RadarColumnSeries.new(root, {
			xAxis: xAxis,
			yAxis: yAxis,
			clustered: false,
			valueXField: "full",
			categoryYField: "category",
			fill: am5.color(0xf8f8f8),
		})
	);

	series1.columns.template.setAll({
		width: am5.p100,
		fillOpacity: 0.08,
		strokeOpacity: 0,
		cornerRadius: 20,
	});

	series1.data.setAll(data);

	var series2 = chart.series.push(
		am5radar.RadarColumnSeries.new(root, {
			xAxis: xAxis,
			yAxis: yAxis,
			clustered: false,
			valueXField: "value",
			categoryYField: "category",
		})
	);

	series2.columns.template.setAll({
		width: am5.p100,
		strokeOpacity: 0,
		tooltipText: "{category}: ${valueX}",
		cornerRadius: 20,
		templateField: "columnSettings",
	});

	series2.data.setAll(data);
	// Add an HTML-enabled title
	chart.children.unshift(
		am5.Label.new(root, {
			html: '<div style="text-align: center;"><p style="font-size: 30px; color: #ffffff;">$51</p></d>',
			x: am5.percent(50),
			centerX: am5.percent(50),
			y: am5.percent(50),
			centerY: am5.percent(50),
			paddingTop: 0,
			paddingBottom: 0,
		})
	);

	// Animate chart and series in
	// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
	series1.appear(1000);
	series2.appear(1000);

	// Add export menu
	exporting = am5plugins_exporting.Exporting.new(root, {
		filePrefix: "Acquisition Cost by Channel",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});

	chart.appear(1000, 100);

	// Apple chart start

	add_data_to_chart();
	// funnelGraph starts

	var funnelData = {
		displayPercent: true,
		subLabelValue: "raw",
		labels: [
			"Patient Visits and Sign Ups",
			"Sign Up Page Visits",
			"Forms Submitted",
		],
		subLabels: ["Patient Site", "HCP Site", "Patient Text"],
		colors: [
			["#fa9567", "#f971b4", "#f82c91"],
			["#ceb4ff", "#925aff"],
			["#83deff", "#7795FF"],
		],
		values: [],
	};
	funnelGraph = new FunnelGraph({
		container: ".funnel",
		gradientDirection: "horizontal",
		data: funnelData,
		displayPercent: true,
		direction: "horizontal",
		subLabelValue: "raw",
	});
	funnelGraph.draw();

	//Add event listener
	document.getElementById("toPdf").addEventListener("click", getPdf);
	document.getElementById("toPng").addEventListener("click", getPng);

	// funnelGraph end

	// signup time start

	var ctx = document.getElementById("chart-bars").getContext("2d");
	chartSignupTime = new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			datasets: [
				{
					label: "Patient Microsite",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#0dbeff",
					data: [650, 350, 500, 330, 550, 300, 200, 320, 600],
					maxBarThickness: 8,
				},
				{
					label: "HCP Microsite",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#b2b9bf",
					data: [320, 650, 350, 500, 550, 300, 200, 330, 600],
					maxBarThickness: 8,
				},
				{
					label: "Patient Text",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#38d6ae",
					data: [550, 300, 200, 320, 650, 350, 550, 300, 200],
					maxBarThickness: 8,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
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
			interaction: {
				intersect: false,
				mode: "index",
			},
			scales: {
				y: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 800,
						beginAtZero: true,
						color: "#b2b9bf",
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
					},
				},
				x: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 800,
						beginAtZero: true,
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
		},
	});

	// signup time end

	//device type start

	var ctx2 = document.getElementById("chart-line").getContext("2d");
	var gradientStroke1 = ctx2.createLinearGradient(56, 214, 174, 50);
	gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
	gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
	gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
	var gradientStroke2 = ctx2.createLinearGradient(233, 236, 239, 50);
	gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
	gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
	gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
	chartDevice = new Chart(ctx2, {
		type: "line",
		data: {
			labels: [],
			datasets: [
				{
					label: "Mobile",
					tension: 0.4,
					borderWidth: 0,
					pointRadius: 0,
					borderColor: "#38d6ae",
					borderWidth: 3,
					backgroundColor: gradientStroke1,
					fill: true,
					data: [],
					maxBarThickness: 6,
				},
				{
					label: "Desktop",
					tension: 0.4,
					borderWidth: 0,
					pointRadius: 0,
					borderColor: "#e9ecef",
					borderWidth: 3,
					backgroundColor: gradientStroke2,
					fill: true,
					data: [],
					maxBarThickness: 6,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
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
			interaction: {
				intersect: false,
				mode: "index",
			},
			scales: {
				y: {
					grid: {
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
						suggestedMax: 800,
						beginAtZero: true,
						color: "#b2b9bf",
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
					},
				},
				x: {
					grid: {
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
						suggestedMax: 800,
						beginAtZero: true,
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
		},
	});
});

//download funnel chart

function gethtml2canvasPng() {
	html2canvas(document.querySelector("#f1")).then((canvas) => {
		document.querySelector("#f2").append(canvas);
		let cvs = document.querySelector("#f2 canvas");
		let toPng = document.querySelector("#toPng");
		toPng.href = cvs.toDataURL();
		toPng.download = "Sign Up Overview.png";
	});
}
function getPng() {
	$("#f2 canvas").remove();
}
function getPdf() {
	html2canvas(document.querySelector("#f1"), {
		backgroundColor: "#1A202C",
	}).then((canvas) => {
		let base64image = canvas.toDataURL("image/jpeg");
		let pdf = new jsPDF("landscape");
		pdf.addImage(base64image, "PNG", 30, 30, 230, 130);
		pdf.save("Sign Up Overview.pdf");
	});
}
//download funnel chart End

//download chart graph

function downloadPNGChart(a, title) {
	a.update({
		duration: 0,
	});
	var link = document.createElement("a");
	link.href = a.toBase64Image();
	link.download = title + ".png";
	link.click();
	a.update({
		duration: 0,
	});
}

function downloadPDFChart(a, title) {
	const canvas = document.getElementById(a);
	const canvasImage = canvas.toDataURL("image/jpeg", 1.0);
	let pdf = new jsPDF("landscape");
	pdf.setFontSize(200);
	pdf.addImage(canvasImage, "JPEG", 30, 15, 230, 150);
	pdf.save(title);
}

//download chart graph

//download amchart graph

function apple1ChartPng() {
	exporting.download("png");
}

function apple1ChartPdf() {
	exporting.download("pdf");
}
//download amchart graph end

function add_data_to_chart() {
	var filters = localStorage.getItem("filters");
	$.getJSON(
		"https://kpi-tool.psglobalgroup.com/api/signup-overview.php",
		{ key: filters },
		function (data111) {
			var funnelData = {
				displayPercent: true,
				subLabelValue: "raw",
				labels: [
					"Patient Visits and Sign Ups",
					"Sign Up Page Visits",
					"Forms Submitted",
				],
				subLabels: data111.signup_method,
				colors: [
					["#fa9567", "#f971b4", "#f82c91"],
					["#ceb4ff", "#925aff"],
					["#83deff", "#7795FF"],
				],
				values: data111.signup_overview,
			};
			funnelGraph.updateData(funnelData);
			funnelGraph.update(funnelData);
			gethtml2canvasPng();

			$("#signup_reject_percent").html(data111.signuppge_reject_page);
			$("#signup_reject_percent_progress").css(
				"width",
				data111.signuppge_reject_page + "%"
			);

			$("#signup_reject_percent_drop").html(data111.signuppge_reject);
			$("#signup_reject_percent_drop_progress").css(
				"width",
				data111.signuppge_reject + "%"
			);

			chartDevice.data.labels = data111.device_type_month;
			chartDevice.data.datasets[0].data = data111.device_type.mobile;
			chartDevice.data.datasets[1].data = data111.device_type.desktop;
			chartDevice.update();

			chartSignupTime.data.labels = data111.signup_time_month;
			chartSignupTime.data.datasets[0].data = data111.signup_time.PatientSite;
			chartSignupTime.data.datasets[1].data = data111.signup_time.HCPSite;
			chartSignupTime.data.datasets[2].data = data111.signup_time.PatientText;
			chartSignupTime.update();
		}
	);
}
