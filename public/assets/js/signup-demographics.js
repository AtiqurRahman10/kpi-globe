// let rootMap,
// 	chartMap,
// 	polygonSeriesMap,
// 	heatLegendMap,
// 	mapWidth,
// 	mapHeight,
// 	xAxisRadar,
// 	labelRadar,
// 	clockHandRadar,
// 	bulletRadar,
// 	axisDataItemRadar,
// 	axisRange1Radar,
// 	axisRange0Radar,
// 	rootRadar,
// 	chartjsBarAge,
// 	chartjsRadarAge;

am5.ready(function () {
	am5.addLicense("AM5C329334656");

	// Create root
	rootMap = am5.Root.new("us-heatmap1");

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

	// chart radar

	// Radar chart begins

	rootRadar = am5.Root.new("enroll-total-rx");

	var doyleTheme = am5.Theme.new(rootRadar);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});
	doyleTheme.rule("ColorSet").set("colors", [am5.color(0x38d6ae)]);

	rootRadar.setThemes([am5themes_Animated.new(rootRadar), doyleTheme]);

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
			endValue: 100,
		})
	);
	axisRange1Radar = xAxisRadar.createAxisRange(
		xAxisRadar.makeDataItem({
			above: true,
			value: 0,
			endValue: 0,
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
		filePrefix: "Enrollment/Total RX",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});

	exporting1 = am5plugins_exporting.Exporting.new(rootMap, {
		filePrefix: "Program Reach By State",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});

	// Make stuff animate on load
	chartRadar.appear(1000, 100);

	// age group bar chart

	var ctx = document.getElementById("chart-bars").getContext("2d");
	chartjsBarAge = new Chart(ctx, {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					label: "Male",
					tension: 0.4,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#0dbeff",
					data: [],
					maxBarThickness: 10,
				},
				{
					label: "Female",
					tension: 0.8,
					borderWidth: 0,
					borderRadius: 4,
					borderSkipped: false,
					backgroundColor: "#f82c91",
					data: [],
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
					},
					ticks: {
						display: true,
						padding: 15,
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

	// age group radar

	var ctx = document.getElementById("radar-chart").getContext("2d");
	chartjsRadarAge = new Chart(ctx, {
		type: "radar",
		data: {
			labels: [],
			datasets: [
				{
					label: "Enrolled Patients",
					data: [],
					backgroundColor: "rgba(102,226,199,0.3)",
					borderColor: "rgba(102,226,199, 0.7)",
				},
				{
					label: "Total Rx Population",
					data: [],
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
		},
	});

	// radar-chart2
	var ctx2 = document.getElementById("radar-chart2").getContext("2d");
	radarChart2 = new Chart(ctx2, {
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
		},
	});

	//   radar-chart3
	var ctx3 = document.getElementById("radar-chart3").getContext("2d");
	radarChart3 = new Chart(ctx3, {
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
		},
	});

	add_data_to_chart();
}); // end am5.ready()

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
function enrollChartPng() {
	exporting.download("png");
}
function enrollChartPdf() {
	exporting.download("pdf");
}

function heatChartPng() {
	exporting1.download("png");
}
function heatChartPdf() {
	exporting1.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
	var filters = localStorage.getItem("filters");
	$.getJSON(
		"https://kpi-tool.psglobalgroup.com/api/signup-demographics.php",
		{ key: filters },
		function (data) {
			$("#sex_at_birth_male").html(data.sex_assigned_at_birth.male);
			$("#sex_at_birth_female").html(data.sex_assigned_at_birth.female);
			$("#insurance_government").html(data.insurance_type.government);
			$("#insurance_commercial").html(data.insurance_type.commercial);
			$("#guide_spanish").html(data.guide.spanish);
			$("#guide_english").html(data.guide.english);

			chartjsBarAge.data.labels = data.range;
			chartjsBarAge.data.datasets[0].data = data.sex_assigned_at_birth.male;
			chartjsBarAge.data.datasets[1].data = data.sex_assigned_at_birth.female;
			chartjsBarAge.update();

			chartjsRadarAge.data.labels = data.radar_range;
			chartjsRadarAge.data.datasets[0].data =
				data.radar_enrolled_vs_rx.enrolled;
			chartjsRadarAge.data.datasets[1].data = data.radar_enrolled_vs_rx.rx;
			chartjsRadarAge.update();

			polygonSeriesMap.data.setAll(data.state);

			polygonSeriesMap.events.on("datavalidated", function () {
				heatLegendMap.set(
					"startValue",
					polygonSeriesMap.getPrivate("valueLow")
				);
				heatLegendMap.set("endValue", polygonSeriesMap.getPrivate("valueHigh"));
			});

			xAxisRadar.axisRanges.removeValue(axisRange0Radar);
			xAxisRadar.axisRanges.removeValue(axisRange1Radar);

			axisRange0Radar = xAxisRadar.createAxisRange(
				xAxisRadar.makeDataItem({
					above: true,
					value: 0,
					endValue: data.enrollment_rxcount,
				})
			);
			axisRange1Radar = xAxisRadar.createAxisRange(
				xAxisRadar.makeDataItem({
					above: true,
					value: data.enrollment_rxcount,
					endValue: 100,
				})
			);
			axisDataItemRadar.set("value", data.enrollment_rxcount);

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
