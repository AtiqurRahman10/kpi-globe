var chartAccountEducated,
	polygonSeriesMap,
	rootMap,
	chartMap,
	heatLegendMap,
	chartFlashCardUsed;
am5.ready(function () {
	am5.addLicense("AM5C329334656");

	// Create root
	rootMap = am5.Root.new("us-heatmap");

	// Set themes

	var responsive = am5themes_Responsive.newEmpty(rootMap);

	responsive.addRule({
		relevant: am5themes_Responsive.widthM,
		applying: function () {
			chart.set("layout", rootMap.verticalLayout);
			legend.setAll({
				y: null,
				centerY: null,
				x: am5.p0,
				centerX: am5.p0,
			});
		},
		removing: function () {
			chart.set("layout", root.horizontalLayout);
			legend.setAll({
				y: am5.p50,
				centerY: am5.p50,
				x: null,
				centerX: null,
			});
		},
	});

	var doyleTheme = am5.Theme.new(rootMap);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});

	rootMap.setThemes([am5themes_Animated.new(rootMap), responsive, doyleTheme]);

	// Create chart
	chartMap = rootMap.container.children.push(
		am5map.MapChart.new(rootMap, {
			panX: "rotateX",
			panY: "none",
			projection: am5map.geoAlbersUsa(),
			layout: rootMap.horizontalLayout,
			// maxHeight: mapHeight,
			// maxWidth: mapWidth,
		})
	);

	// Create polygon series
	polygonSeriesMap = chartMap.series.push(
		am5map.MapPolygonSeries.new(rootMap, {
			geoJSON: am5geodata_usaLow,
			valueField: "value",
			calculateAggregates: true,
			fill: am5.color(0xeeeeee),
		})
	);

	polygonSeriesMap.mapPolygons.template.setAll({
		tooltipText: "{name}: {value}",
	});

	polygonSeriesMap.set("heatRules", [
		{
			target: polygonSeriesMap.mapPolygons.template,
			dataField: "value",
			min: am5.color(0x66e2c7),
			max: am5.color(0x4410bc),
			key: "fill",
		},
	]);

	polygonSeriesMap.mapPolygons.template.events.on("pointerover", function (ev) {
		heatLegendMap.showValue(ev.target.dataItem.get("value"));
	});

	heatLegendMap = chartMap.children.push(
		am5.HeatLegend.new(rootMap, {
			orientation: "vertical",
			startColor: am5.color(0x66e2c7),
			endColor: am5.color(0x4410bc),
			startText: "Lowest",
			endText: "Highest",
			stepCount: 5,
		})
	);

	heatLegendMap.startLabel.setAll({
		fontSize: 12,
		fill: heatLegendMap.get("startColor"),
	});

	heatLegendMap.endLabel.setAll({
		fontSize: 12,
		fill: heatLegendMap.get("endColor"),
	});

	// hcp educted.
	var ctx2 = document.getElementById("chart-line").getContext("2d");
	var gradientStroke1 = ctx2.createLinearGradient(56, 214, 174, 50);
	gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
	gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
	gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
	var gradientStroke2 = ctx2.createLinearGradient(233, 236, 239, 50);
	gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
	gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
	gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
	chartAccountEducated = new Chart(ctx2, {
		type: "line",
		data: {
			labels: [],
			datasets: [
				{
					label: "FRAS Rheum",
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
					label: "FRAS Derm",
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
						suggestedMin: 0,
						suggestedMax: 500,
						beginAtZero: true,
						padding: 10,
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
						color: "#b2b9bf",
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
						suggestedMin: 0,
						suggestedMax: 500,
						beginAtZero: true,
						padding: 10,
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
						color: "#b2b9bf",
					},
				},
			},
		},
	});

	var ctx = document.getElementById("chart-bars").getContext("2d");
	chartFlashCardUsed = new Chart(ctx, {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					label: "Derm FRAS",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#611bff",
					data: [],
					maxBarThickness: 10,
				},
				{
					label: "Rheum FRAS",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#f82c91",
					data: [],
					maxBarThickness: 10,
				},
				{
					label: "Derm Demand",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#38d6ae",
					data: [],
					maxBarThickness: 10,
				},
				{
					label: "Rheum Demand",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#0dbeff",
					data: [],
					maxBarThickness: 10,
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
					stacked: true,
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						suggestedMin: 0,
						suggestedMax: 500,
						beginAtZero: true,
						padding: 10,
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
						color: "#b2b9bf",
					},
				},
				x: {
					stacked: true,
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						suggestedMin: 0,
						suggestedMax: 500,
						beginAtZero: true,
						padding: 10,
						font: {
							size: 14,
							family: "Nunito Sans",
							style: "bold",
							lineHeight: 2,
						},
						color: "#b2b9bf",
					},
				},
			},
		},
	});

	// Add export menu
	exporting = am5plugins_exporting.Exporting.new(rootMap, {
		filePrefix: "HCP Account Signups By State",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});
});

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
function heatChartPng() {
	exporting.download("png");
}
function heatChartPdf() {
	exporting.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
	var filters = localStorage.getItem("filters");
	$.getJSON(
		"https://kpi-tool.psglobalgroup.com/api/signup-hcp-performance.php",
		{ key: filters },
		function (data) {
			// $('#per_guide').html(data.guide.per_guide);

			$("#hcpSignUpEnglish").html(data.hcpSignUp.english);
			$("#hcpSignUpSpanish").html(data.hcpSignUp.spanish);
			$("#hcpSignUpTotal").html(data.hcpSignUp.total);

			$("#patientBrochureDownloadEnglish").html(
				data.patientBrochureDownload.english
			);
			$("#patientBrochureDownloadSpanish").html(
				data.patientBrochureDownload.spanish
			);
			$("#patientBrochureDownloadTotal").html(
				data.patientBrochureDownload.total
			);

			$("#spBrochureDownloadEnglish").html(data.spBrochureDownload.english);
			$("#spBrochureDownloadSpanish").html(data.spBrochureDownload.spanish);
			$("#spBrochureDownloadTotal").html(data.spBrochureDownload.total);

			chartAccountEducated.data.labels = data.accounts_educated_month;
			chartAccountEducated.data.datasets[0].data = data.accounts_educated.Rheum;
			chartAccountEducated.data.datasets[1].data = data.accounts_educated.Derm;
			chartAccountEducated.update();

			chartFlashCardUsed.data.labels = data.flashcard_month;
			chartFlashCardUsed.data.datasets[0].data = data.flashcard.Rheum;
			chartFlashCardUsed.data.datasets[1].data = data.flashcard.Derm;
			chartFlashCardUsed.update();

			polygonSeriesMap.data.setAll(data.state);
			polygonSeriesMap.events.on("datavalidated", function () {
				heatLegendMap.set(
					"startValue",
					polygonSeriesMap.getPrivate("valueLow")
				);
				heatLegendMap.set("endValue", polygonSeriesMap.getPrivate("valueHigh"));
			});
		}
	);
}
