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

	//enroll nbrx

	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	var root = am5.Root.new("enroll-nbrx");

	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	var doyleTheme = am5.Theme.new(root);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});
	doyleTheme.rule("ColorSet").set("colors", [am5.color(0x38d6ae)]);

	root.setThemes([am5themes_Animated.new(root), doyleTheme]);

	// Create chart
	// https://www.amcharts.com/docs/v5/charts/radar-chart/
	var chart = root.container.children.push(
		am5radar.RadarChart.new(root, {
			panX: false,
			panY: false,
			startAngle: 180,
			endAngle: 360,
		})
	);

	chart.getNumberFormatter().set("numberFormat", "#'%'");

	// Create axis and its renderer
	// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
	var axisRenderer = am5radar.AxisRendererCircular.new(root, {
		innerRadius: -40,
	});

	axisRenderer.grid.template.setAll({
		stroke: root.interfaceColors.get("background"),
		visible: true,
		strokeOpacity: 0.8,
	});

	var xAxis = chart.xAxes.push(
		am5xy.ValueAxis.new(root, {
			maxDeviation: 0,
			min: 0,
			max: 100,
			strictMinMax: true,
			renderer: axisRenderer,
		})
	);

	// Add clock hand
	// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
	var axisDataItem = xAxis.makeDataItem({});

	var clockHand = am5radar.ClockHand.new(root, {
		pinRadius: 50,
		radius: am5.percent(100),
		innerRadius: 50,
		bottomWidth: 0,
		topWidth: 0,
	});

	clockHand.pin.setAll({
		fillOpacity: 0,
		strokeOpacity: 0.5,
		stroke: am5.color(0xb2b9bf),
		strokeWidth: 1.5,
		strokeDasharray: [2, 2],
	});
	clockHand.hand.setAll({
		fillOpacity: 0,
		strokeOpacity: 0.5,
		stroke: am5.color(0xb2b9bf),
		strokeWidth: 2,
	});

	var bullet = axisDataItem.set(
		"bullet",
		am5xy.AxisBullet.new(root, {
			sprite: clockHand,
		})
	);

	xAxis.createAxisRange(axisDataItem);

	var label = chart.radarContainer.children.push(
		am5.Label.new(root, {
			centerX: am5.percent(50),
			textAlign: "center",
			centerY: am5.percent(50),
			fontSize: "1.5em",
		})
	);

	axisDataItem.set("value", 50);
	bullet.get("sprite").on("rotation", function () {
		var value = axisDataItem.get("value");
		label.set("text", Math.round(value).toString() + "%");
	});

	setInterval(function () {
		var value = Math.round(Math.random() * 100);

		axisDataItem.animate({
			key: "value",
			to: value,
			duration: 500,
			easing: am5.ease.out(am5.ease.cubic),
		});

		axisRange0.animate({
			key: "endValue",
			to: value,
			duration: 500,
			easing: am5.ease.out(am5.ease.cubic),
		});

		axisRange1.animate({
			key: "value",
			to: value,
			duration: 500,
			easing: am5.ease.out(am5.ease.cubic),
		});
	}, 2000);

	chart.bulletsContainer.set("mask", undefined);

	var colorSet = am5.ColorSet.new(root, {});

	var axisRange0 = xAxis.createAxisRange(
		xAxis.makeDataItem({
			above: true,
			value: 0,
			endValue: 50,
		})
	);

	axisRange0.get("axisFill").setAll({
		visible: true,
		fill: colorSet.getIndex(0),
	});

	axisRange0.get("label").setAll({
		forceHidden: true,
	});

	var axisRange1 = xAxis.createAxisRange(
		xAxis.makeDataItem({
			above: true,
			value: 50,
			endValue: 100,
		})
	);

	axisRange1.get("axisFill").setAll({
		visible: true,
		fill: colorSet.getIndex(4),
	});

	axisRange1.get("label").setAll({
		forceHidden: true,
	});
	// Add export menu

	exporting = am5plugins_exporting.Exporting.new(root, {
		filePrefix: "Enrollment % of NBRx",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});

	// Make stuff animate on load
	chart.appear(1000, 100);

	// line and area chart
	var ctx2 = document.getElementById("chart-line").getContext("2d");
	var gradientStroke1 = ctx2.createLinearGradient(56, 214, 174, 50);
	gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
	gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
	gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
	var gradientStroke2 = ctx2.createLinearGradient(233, 236, 239, 50);
	gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
	gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
	gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
	chartPageView = new Chart(ctx2, {
		type: "line",
		data: {
			labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			datasets: [
				{
					label: "Patients Assisted",
					tension: 0.4,
					borderWidth: 0,
					pointRadius: 0,
					borderColor: "#38d6ae",
					borderWidth: 3,
					backgroundColor: gradientStroke1,
					fill: true,
					data: [50, 40, 300, 220, 500, 250, 400, 230, 505],
					maxBarThickness: 6,
				},
				{
					label: "Patients Referred",
					tension: 0.4,
					borderWidth: 0,
					pointRadius: 0,
					borderColor: "#e9ecef",
					borderWidth: 3,
					backgroundColor: gradientStroke2,
					fill: true,
					data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
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

	// line and area chart End

	// tree chart
	var treeData = {
		name: "200 Signed Up",
		children: [
			{
				name: "150 Enrolled",
				children: [
					{
						name: "R1",
					},
					{
						name: "R2",
					},
					{
						name: "R3",
					},
					{
						name: "R4",
					},
					{
						name: "R5",
					},
					{
						name: "R6",
					},
					{
						name: "100 Fulfilled",
						children: [
							{
								name: "R1",
							},
							{
								name: "R2",
							},
							{
								name: "R3",
							},
							{
								name: "R4",
							},
							{
								name: "R5",
							},
							{
								name: "R6",
							},
							{
								name: "75 Treated",
								children: [
									{
										name: "50 Momentum",
										children: [
											{
												name: "Ongoing",
											},
										],
									},
									{
										name: "R1",
									},
									{
										name: "R2",
									},
									{
										name: "R3",
									},
									{
										name: "R4",
									},
									{
										name: "R5",
									},
									{
										name: "R6",
									},
								],
							},
						],
					},
				],
			},
			{
				name: "R1",
			},
			{
				name: "R2",
			},
			{
				name: "R3",
			},
			{
				name: "R4",
			},
			{
				name: "R5",
			},
			{
				name: "R6",
			},
		],
	};
	var margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
	var svg = d3
		.select("div#hcontainer")
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 960 500")
		.classed("hsvg-content", true);
	//.attr("width", width + margin.right + margin.left)
	//.attr("height", height + margin.top + margin.bottom)
	//.append("g")
	//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var i = 0,
		duration = 750,
		root;
	var treemap = d3.tree().size([height, width]);
	root = d3.hierarchy(treeData, function (d) {
		return d.children;
	});
	root.x0 = height / 2;
	root.y0 = 0;
	root.children.forEach(collapse);
	update(root);

	function collapse(d) {
		if (d.children) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
		}
	}

	function update(source) {
		var treeData = treemap(root);
		var nodes = treeData.descendants(),
			links = treeData.descendants().slice(1);
		nodes.forEach(function (d) {
			d.y = d.depth * 160;
		});
		var node = svg.selectAll("g.hnode").data(nodes, function (d) {
			return d.id || (d.id = ++i);
		});
		var nodeEnter = node
			.enter()
			.append("g")
			.attr("class", "hnode")
			.attr("transform", function (d) {
				return "translate(" + source.y0 + "," + source.x0 + ")";
			})
			.on("click", click);
		nodeEnter
			.attr("class", "hnode")
			.attr("r", 1e-6)
			.style("fill", function (d) {
				return d.parent ? "rgba(0, 0, 0, 0)" : "#f82c91";
			});
		nodeEnter
			.append("rect")
			.attr("rx", function (d) {
				if (d.parent) return d.children || d._children ? 6 : 6;
				return 10;
			})
			.attr("ry", function (d) {
				if (d.parent) return d.children || d._children ? 6 : 6;
				return 10;
			})
			.attr("stroke-width", function (d) {
				return d.parent ? 1 : 0;
			})
			.attr("stroke", function (d) {
				return d.children || d._children ? "#38d6ae" : "#f82c91";
			})
			.attr("stroke-dasharray", function (d) {
				return d.children || d._children ? "0" : "0";
			})
			.attr("stroke-opacity", function (d) {
				return d.children || d._children ? "1" : "1";
			})
			.attr("x", 0)
			.attr("y", -15)
			.attr("width", function (d) {
				return d.parent ? 80 : 80;
			})
			.attr("height", 30);
		nodeEnter
			.append("text")
			.style("fill", function (d) {
				if (d.parent) {
					return d.children || d._children ? "#38d6ae" : "#f82c91";
				}
				return "#ffffff";
			})
			.attr("dy", ".35em")
			.attr("x", function (d) {
				return d.parent ? 40 : 40;
			})
			.attr("text-anchor", function (d) {
				return "middle";
			})
			.text(function (d) {
				return d.data.name;
			});
		var nodeUpdate = nodeEnter.merge(node);
		nodeUpdate
			.transition()
			.duration(duration)
			.attr("transform", function (d) {
				return "translate(" + d.y + "," + d.x + ")";
			});
		var nodeExit = node
			.exit()
			.transition()
			.duration(duration)
			.attr("transform", function (d) {
				return "translate(" + source.y + "," + source.x + ")";
			})
			.remove();
		nodeExit.select("rect").style("opacity", 1e-6);
		nodeExit.select("rect").attr("stroke-opacity", 1e-6);
		nodeExit.select("text").style("fill-opacity", 1e-6);
		var link = svg.selectAll("path.hlink").data(links, function (d) {
			return d.id;
		});
		var linkEnter = link
			.enter()
			.insert("path", "g")
			.attr("class", "hlink")
			.attr("d", function (d) {
				var o = {
					x: source.x0,
					y: source.y0,
				};
				return diagonal(o, o);
			});
		var linkUpdate = linkEnter.merge(link);
		linkUpdate
			.transition()
			.duration(duration)
			.attr("d", function (d) {
				return diagonal(d, d.parent);
			});
		var linkExit = link
			.exit()
			.transition()
			.duration(duration)
			.attr("d", function (d) {
				var o = {
					x: source.x,
					y: source.y,
				};
				return diagonal(o, o);
			})
			.remove();
		nodes.forEach(function (d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});

		function diagonal(s, d) {
			path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`;
			return path;
		}

		function click(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			update(d);
		}
	}

	// tree chart End

	// funnel chart
	var dataExample1 = {
		displayPercent: true,
		subLabelValue: "raw",
		labels: [
			"Sign Up",
			"Enrollment",
			"Fulfilment",
			"Start Treatment",
			"Keeping The Momentum",
		],
		subLabels: ["Patients"],
		colors: [["#66e2c7", "#38d6ae", "#279c7f"]],
		values: [[450], [320], [230], [150], [120]],
	};
	graph = new FunnelGraph({
		container: ".funnel",
		gradientDirection: "horizontal",
		data: dataExample1,
		direction: "horizontal",
	});
	graph.draw();

	//Add event listener
	document.getElementById("toPdf").addEventListener("click", getPdf);
	document.getElementById("toPng").addEventListener("click", getPng);
	document.getElementById("addReport").addEventListener("click", addReport);
	document.getElementById("addReport1").addEventListener("click", addReport1);

	html2canvas(document.querySelector("#f1")).then((canvas) => {
		document.querySelector("#f2").append(canvas);
		let cvs = document.querySelector("canvas");
		let toPng = document.querySelector("#toPng");
		toPng.href = cvs.toDataURL();
		toPng.download = "Program-Overview.png";
	});

	// funnel chart End
});

function addReport() {
	$("#successReport").removeClass("d-none").fadeTo(50, 100);
	$(".alert").fadeTo(1500, 0).slideUp(1500, 0);
}
function addReport1() {
	$("#successReport1").removeClass("d-none").fadeTo(50, 100);
	$(".alert")
		// .animate({left: '250px'})
		.fadeTo(1500, 0)
		.slideUp(1500, 0);
}

//download funnel chart
function getPdf() {
	html2canvas(document.querySelector("#f1"), {
		backgroundColor: "#1A202C",
	}).then((canvas) => {
		let base64image = canvas.toDataURL("image/jpeg");
		let pdf = new jsPDF("landscape");
		pdf.addImage(base64image, "PNG", 30, 30, 230, 130);
		pdf.save("Program-Overview.pdf");
	});
}
function getPng() {
	$("canvas").remove();
	html2canvas(document.querySelector("#f1")).then((canvas) => {
		document.querySelector("#f2").append(canvas);
		let cvs = document.querySelector("canvas");
		let toPng = document.querySelector("#toPng");
		toPng.href = cvs.toDataURL();
		toPng.download = "Program-Overview.png";
	});
}
//download funnel chart End

//download chart graph

function downloadPNGChart() {
	chartPageView.update({
		duration: 0,
	});
	var link = document.createElement("a");
	link.href = chartPageView.toBase64Image();
	link.download = "weekly-Enrollments.png";
	link.click();
	chartPageView.update({
		duration: 0,
	});
}

function downloadPDFChart() {
	const canvas = document.getElementById("chart-line");

	const canvasImage = canvas.toDataURL("image/jpeg", 1.0);
	let pdf = new jsPDF("landscape");
	pdf.setFontSize(200);
	pdf.addImage(canvasImage, "JPEG", 30, 15, 230, 150);
	pdf.save("weekly-Enrollments.pdf");
}

//download chart graph

//download amchart graph

function enrollChartPng() {
	// exporting.download("png");
	exporting.download("png", {
		minWidth: 1000,
		maxWidth: 2000,
	});
}
function enrollChartPdf() {
	exporting.download("pdf", {
		minWidth: 1000,
		maxWidth: 2000,
	});
}

//download amchart graph ends

function add_data_to_chart() {
	var filters = localStorage.getItem("filters");
	$.getJSON(
		"https://kpi-tool.psglobalgroup.com/api/home-overview.php",
		{ key: filters },
		function (data111) {
			// bar chart

			console.log(chartjsBar.data);
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

			SeriesSankey.data.setAll(data111.journey_data);

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
