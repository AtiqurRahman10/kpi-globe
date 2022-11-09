var rootSankey,
	rootRadar,
	chartRadar,
	containerSankey,
	SeriesSankey,
	xAxisRadar,
	labelRadar,
	clockHandRadar,
	bulletRadar,
	axisDataItemRadar,
	axisRange1Radar,
	axisRange0Radar,
	chartjsBar,
	rootWord,
	containerWord,
	seriesWord,
	chartPageView;
am5.ready(function () {
	am5.addLicense("AM5C329334656");

	// Sankey Chart Begins

	rootSankey = am5.Root.new("contentflow");

	var doyleTheme = am5.Theme.new(rootSankey);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});

	rootSankey.setThemes([am5themes_Animated.new(rootSankey), doyleTheme]);

	// containerSankey = rootSankey.container.children.push(
	//     am5.Container.new(rootSankey, {
	//         width: am5.percent(95),
	//         height: am5.percent(95),
	//         layout: rootSankey.horizontalLayout,
	//         centerX: am5.percent(50),
	//         x: am5.percent(50),
	//         centerY: am5.percent(50),
	//         y: am5.percent(50),
	//     })
	// );
	// SeriesSankey = containerSankey.children.push(
	//     am5flow.Sankey.new(rootSankey, {
	//         sourceIdField: "from",
	//         targetIdField: "to",
	//         valueField: "value",
	//         paddingLeft: 14,
	//         nodePadding: 7,
	//         nodeAlign: "right",
	//         idField: "id",
	//         nodeWidth: 10,
	//     })
	// );
	// SeriesSankey.nodes
	//     .get("colors")
	//     .set("colors", [
	//         am5.color(0x38d6ae),
	//         am5.color(0x576877),
	//         am5.color(0xbfbfbf),
	//         am5.color(0x061a32),
	//         am5.color(0x92ebd7),
	//         am5.color(0xb61d69),
	//     ]);
	// SeriesSankey.nodes.labels.template.setAll({
	//     fontSize: ".875rem",
	//     // maxWidth: 150,
	//     wrap: true,
	//     x: am5.percent(50),
	//     centerX: am5.percent(50),
	//     y: am5.percent(50),
	//     centerY: am5.percent(100),
	//     paddingLeft: 0,
	//     paddingRight: 0,
	//     rotation: -90,
	// });

	// // Make stuff animate on load
	// SeriesSankey.appear(1000, 100);

	containerSankey = rootSankey.container.children.push(
		am5.Container.new(rootSankey, {
			width: am5.percent(95),
			height: am5.percent(95),
			layout: rootSankey.horizontalLayout,
			centerX: am5.percent(50),
			x: am5.percent(50),
			centerY: am5.percent(50),
			y: am5.percent(50),
		})
	);
	seriesSankey = containerSankey.children.push(
		am5flow.Sankey.new(rootSankey, {
			sourceIdField: "from",
			targetIdField: "to",
			valueField: "value",
			paddingRight: 90,
			paddingBottom: 20,
		})
	);
	seriesSankey.nodes.setAll({
		idField: "id",
		nameField: "name",
		// fillField: "color"
	});

	seriesSankey.nodes
		.get("colors")
		.set("colors", [
			am5.color(0x38d6ae),
			am5.color(0x576877),
			am5.color(0xbfbfbf),
			am5.color(0x061a32),
			am5.color(0x92ebd7),
			am5.color(0xb61d69),
			am5.color(0x81d9c5),
			am5.color(0x92ebd7),
		]);

	seriesSankey.nodes.data.setAll([
		{ id: "A", name: "HomePage", color: am5.color(0x54a0ff) },
		{ id: "B", name: "US Patients", color: am5.color(0x54a0ff) },
		{ id: "C", name: "Healthcare Professionals", color: am5.color(0x10ac84) },
		{ id: "D", name: "Patient Sign-Up Form", color: am5.color(0x54a0ff) },
		{ id: "E", name: "HCP Form", color: am5.color(0x10ac84) },
	]);
	seriesSankey.nodes.get("colors").set("step", 2);

	seriesSankey.nodes.labels.template.setAll({
		fontSize: ".875rem",
		maxWidth: 100,
		wrap: true,
		fontFamily: "Nunito Sans",
		rotation: -90,
		x: am5.percent(50),
		centerX: am5.percent(50),
		y: am5.percent(50),
		centerY: am5.percent(100),
		paddingLeft: 0,
		paddingRight: 0,
	});

	// SeriesSankey.nodes.labels.template.setAll({
	//     fontSize: ".875rem",
	//     // maxWidth: 150,
	//     wrap: true,
	//     x: am5.percent(50),
	//     centerX: am5.percent(50),
	//     y: am5.percent(50),
	//     centerY: am5.percent(100),
	//     paddingLeft: 0,
	//     paddingRight: 0,
	//     rotation: -90,
	// });

	// Add export menu

	exporting1 = am5plugins_exporting.Exporting.new(rootSankey, {
		filePrefix: "Content Flow",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});

	// SeriesSankey.appear(1000, 100);

	// Sankey Chart Ends

	// Radar chart begins

	rootRadar = am5.Root.new("user-retention");

	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	var doyleTheme = am5.Theme.new(rootRadar);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});
	doyleTheme.rule("ColorSet").set("colors", [am5.color(0x38d6ae)]);

	rootRadar.setThemes([am5themes_Animated.new(rootRadar), doyleTheme]);

	// Create chart
	// https://www.amcharts.com/docs/v5/charts/radar-chart/
	chartRadar = rootRadar.container.children.push(
		am5radar.RadarChart.new(rootRadar, {
			panX: false,
			panY: false,
			startAngle: 180,
			endAngle: 360,
		})
	);

	chartRadar.getNumberFormatter().set("numberFormat", "#'%'");

	// Create axis and its renderer
	// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
	var axisRenderer = am5radar.AxisRendererCircular.new(rootRadar, {
		innerRadius: -40,
	});

	axisRenderer.grid.template.setAll({
		stroke: rootRadar.interfaceColors.get("background"),
		visible: true,
		strokeOpacity: 0.8,
	});

	xAxisRadar = chartRadar.xAxes.push(
		am5xy.ValueAxis.new(rootRadar, {
			maxDeviation: 0,
			min: 0,
			max: 100,
			strictMinMax: true,
			renderer: axisRenderer,
		})
	);

	// Add clock hand
	// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
	axisDataItemRadar = xAxisRadar.makeDataItem({});

	clockHandRadar = am5radar.ClockHand.new(rootRadar, {
		pinRadius: 50,
		radius: am5.percent(100),
		innerRadius: 50,
		bottomWidth: 0,
		topWidth: 0,
	});

	clockHandRadar.pin.setAll({
		fillOpacity: 0,
		strokeOpacity: 0.5,
		stroke: am5.color(0xb2b9bf),
		strokeWidth: 1.5,
		strokeDasharray: [2, 2],
	});
	clockHandRadar.hand.setAll({
		fillOpacity: 0,
		strokeOpacity: 0.5,
		stroke: am5.color(0xb2b9bf),
		strokeWidth: 2,
	});

	bulletRadar = axisDataItemRadar.set(
		"bullet",
		am5xy.AxisBullet.new(rootRadar, {
			sprite: clockHandRadar,
		})
	);

	xAxisRadar.createAxisRange(axisDataItemRadar);

	labelRadar = chartRadar.radarContainer.children.push(
		am5.Label.new(rootRadar, {
			centerX: am5.percent(50),
			textAlign: "center",
			centerY: am5.percent(50),
			fontSize: "1.5em",
		})
	);

	axisRange0Radar = xAxisRadar.createAxisRange(
		xAxisRadar.makeDataItem({
			above: true,
			value: 0,
			endValue: 90,
		})
	);
	axisRange1Radar = xAxisRadar.createAxisRange(
		xAxisRadar.makeDataItem({
			above: true,
			value: 90,
			endValue: 100,
		})
	);
	axisDataItemRadar.set("value", 90);

	bulletRadar.get("sprite").on("rotation", function () {
		var value = axisDataItemRadar.get("value");
		labelRadar.set("text", Math.round(value).toString() + "%");
	});

	chartRadar.bulletsContainer.set("mask", undefined);

	var colorSet = am5.ColorSet.new(rootRadar, {});

	axisRange0Radar.get("axisFill").setAll({
		visible: true,
		fill: colorSet.getIndex(0),
	});

	axisRange0Radar.get("label").setAll({
		forceHidden: true,
	});

	axisRange1Radar.get("axisFill").setAll({
		visible: true,
		fill: colorSet.getIndex(4),
	});

	axisRange1Radar.get("label").setAll({
		forceHidden: true,
	});

	// Add export menu
	exporting = am5plugins_exporting.Exporting.new(rootRadar, {
		filePrefix: "User Bounce Rate",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});

	// Make stuff animate on load
	chartRadar.appear(1000, 100);

	// word cloud

	var rootWord = am5.Root.new("wordcloud");

	rootWord.setThemes([am5themes_Animated.new(rootWord)]);

	containerWord = rootWord.container.children.push(
		am5.Container.new(rootWord, {
			width: am5.percent(100),
			height: am5.percent(100),
			layout: rootWord.verticalLayout,
		})
	);

	seriesWord = containerWord.children.push(
		am5wc.WordCloud.new(rootWord, {
			categoryField: "tag",
			valueField: "weight",
			calculateAggregates: true, // this is needed for heat rules to work
		})
	);

	seriesWord.set("heatRules", [
		{
			target: seriesWord.labels.template,
			dataField: "value",
			min: am5.color(0x082445),
			max: am5.color(0x38d6ae),
			key: "fill",
		},
	]);

	seriesWord.labels.template.setAll({
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 5,
		paddingRight: 5,
		fontFamily: "Courier New",
		// cursorOverStyle: "pointer"
	});

	// time bar chart

	var ctx = document.getElementById("chart-bars").getContext("2d");
	chartjsBar = new Chart(ctx, {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					label: "Time",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#b2b9bf",
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
					display: false,
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
						suggestedMin: 0,
						suggestedMax: 500,
						beginAtZero: true,
						padding: 15,
						font: {
							size: 11,
							family: "Nunito Sans",
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
					},
					ticks: {
						display: true,
						padding: 15,
						font: {
							size: 11,
							family: "Nunito Sans",
							lineHeight: 2,
						},
						color: "#b2b9bf",
					},
				},
			},
		},
	});

	// line and area chart
	var ctx2 = document.getElementById("chart-line").getContext("2d");
	var gradientStroke1 = ctx2.createLinearGradient(56, 214, 174, 50);
	gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
	gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
	gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
	var gradientStroke3 = ctx2.createLinearGradient(233, 236, 239, 50);
	gradientStroke3.addColorStop(1, "rgba(248, 44, 145, 0.3)");
	gradientStroke3.addColorStop(0.2, "rgba(248, 44, 145, 0.2)");
	gradientStroke3.addColorStop(0, "rgba(248, 44, 145, 0.1)");
	var gradientStroke2 = ctx2.createLinearGradient(56, 214, 174, 50);
	gradientStroke2.addColorStop(1, "rgba(97, 27, 255, 0.2)");
	gradientStroke2.addColorStop(0.2, "rgba(97, 27, 255, 0.1)");
	gradientStroke2.addColorStop(0, "rgba(97, 27, 255, 0.05)"); //purple colors
	chartPageView = new Chart(ctx2, {
		type: "line",
		data: {
			labels: [],
			datasets: [
				{
					label: "Page Views",
					tension: 0.4,
					borderWidth: 0,
					pointRadius: 0,
					borderColor: "#f82c91",
					borderWidth: 3,
					backgroundColor: gradientStroke3,
					fill: true,
					data: [],
					maxBarThickness: 6,
				},
				{
					label: "Total Visitors",
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
					label: "Unique Visitors",
					tension: 0.4,
					borderWidth: 0,
					pointRadius: 0,
					borderColor: "#611bff",
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
							size: 11,
							family: "Nunito Sans",
							style: "normal",
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
						color: "#b2b9bf",
						padding: 20,
						font: {
							size: 11,
							family: "Nunito Sans",
							style: "normal",
							lineHeight: 2,
						},
					},
				},
			},
		},
	});

	add_data_to_chart();
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

//download amchart graph ends
function contentflowChartPng() {
	exporting1.download("png");
}
function contentflowChartPdf() {
	exporting1.download("pdf");
}
function retentionChartPng() {
	exporting.download("png");
}
function retentionChartPdf() {
	exporting.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
	var filters = localStorage.getItem("filters");
	$.getJSON(
		"https://kpi-tool.psglobalgroup.com/api/signup-drivers.php",
		{ key: filters },
		function (data111) {
			// bar chart

			// console.log(chartjsBar.data);
			chartjsBar.data.labels = data111.signup_time.label;
			chartjsBar.data.datasets[0].data = data111.signup_time.data;
			// chartjsBar.data.datasets[0].data[2] = 50; // Would update the first dataset's value of 'March' to be 50
			chartjsBar.update(); // Calling update now animates the position of March from 90 to 50.

			chartPageView.data.labels = data111.date_range;
			chartPageView.data.datasets[0].data = data111.user_enggement.total_views;
			chartPageView.data.datasets[1].data =
				data111.user_enggement.total_visitor;
			chartPageView.data.datasets[2].data = data111.user_enggement.total_unique;
			chartPageView.update();

			// word cloud
			seriesWord.data.setAll(data111.wordcloud);

			seriesSankey.data.setAll(data111.journey_data);

			// SeriesSankey.data.setAll(data111.journey_data);

			xAxisRadar.axisRanges.removeValue(axisRange0Radar);
			xAxisRadar.axisRanges.removeValue(axisRange1Radar);

			axisRange0Radar = xAxisRadar.createAxisRange(
				xAxisRadar.makeDataItem({
					above: true,
					value: 0,
					endValue: data111.retention_data,
				})
			);
			axisRange1Radar = xAxisRadar.createAxisRange(
				xAxisRadar.makeDataItem({
					above: true,
					value: data111.retention_data,
					endValue: 100,
				})
			);
			axisDataItemRadar.set("value", data111.retention_data);

			bulletRadar.get("sprite").on("rotation", function () {
				value = axisDataItemRadar.get("value");
				labelRadar.set("text", Math.round(value).toString() + "%");
			});

			var colorSet = am5.ColorSet.new(rootRadar, {});

			axisRange0Radar.get("axisFill").setAll({
				visible: true,
				fill: colorSet.getIndex(0),
			});

			axisRange0Radar.get("label").setAll({
				forceHidden: true,
			});

			axisRange1Radar.get("axisFill").setAll({
				visible: true,
				fill: colorSet.getIndex(4),
			});

			axisRange1Radar.get("label").setAll({
				forceHidden: true,
			});
		}
	);
}
