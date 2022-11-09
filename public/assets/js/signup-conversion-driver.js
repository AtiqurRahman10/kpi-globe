var bubbleChart,
	bubbleCats,
	bubbleDates,
	rootBubbles,
	chartBubbles,
	xAxisBubbles,
	yAxisBubbles,
	yRendererBubbles,
	xRendererBubbles,
	seriesBubbles1,
	circleTemplate,
	bulletBubbles,
	categories;

am5.ready(function () {
	am5.addLicense("AM5C329334656");
	circleTemplate = am5.Template.new({});
	circleTemplateLabel = am5.Template.new({});

	rootBubbles = am5.Root.new("view_daily_chart");
	var doyleTheme = am5.Theme.new(rootBubbles);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});

	rootBubbles.setThemes([am5themes_Animated.new(rootBubbles), doyleTheme]);
	chartBubbles = rootBubbles.container.children.push(
		am5xy.XYChart.new(rootBubbles, {
			panX: false,
			panY: false,
			wheelX: false,
			wheelY: false,
			layout: rootBubbles.verticalLayout,
		})
	);

	yAxisBubbles = chartBubbles.yAxes.push(
		am5xy.CategoryAxis.new(rootBubbles, {
			categoryField: "position",
			renderer: am5xy.AxisRendererY.new(rootBubbles, {
				cellStartLocation: 0.1,
				cellEndLocation: 0.9,
				inversed: true,
			}),
		})
	);

	yRendererBubbles = yAxisBubbles.get("renderer");
	yRendererBubbles.labels.template.setAll({
		paddingRight: 40,
		fontSize: 14,
	});
	yRendererBubbles.grid.template.setAll({
		location: 0.5,
		stroke: am5.color(0xffffff),
		strokeOpacity: 1,
	});
	// yAxisBubbles.data.setAll(daily);

	xAxisBubbles = chartBubbles.xAxes.push(
		am5xy.CategoryAxis.new(rootBubbles, {
			categoryField: "category",
			renderer: am5xy.AxisRendererX.new(rootBubbles, {
				cellStartLocation: 0.1,
				cellEndLocation: 0.9,
				inversed: false,
				opposite: true,
			}),
		})
	);

	xRendererBubbles = xAxisBubbles.get("renderer");

	xRendererBubbles.labels.template.setAll({
		// forceHidden: false
		fontSize: 14,
	});

	xRendererBubbles.grid.template.setAll({
		forceHidden: true,
	});
	// xAxisBubbles.data.setAll(categories);

	seriesBubbles1 = chartBubbles.series.push(
		am5xy.LineSeries.new(rootBubbles, {
			xAxis: xAxisBubbles,
			yAxis: yAxisBubbles,
			// baseAxis: yAxisBubbles,
			// valueXField: "position",
			// valueField: "value",
			categoryXField: "category",
			categoryYField: "position",
			calculateAggregates: true,
		})
	);

	seriesBubbles1.strokes.template.setAll({
		strokeOpacity: 0,
	});

	seriesBubbles1.bullets.push(function (root, series, dataItem) {
		var value = dataItem.dataContext.value;
		var container = am5.Container.new(root, {
			centerX: am5.p50,
			centerY: am5.p50,
		});
		var color = am5.color(0xffffff);

		container.children.push(
			am5.Circle.new(root, {
				templateField: "circleTemplate",
				tooltipText: "{categoryY}\n{categoryX}: [bold]{value}[/]",
			})
		);

		container.children.push(
			am5.Picture.new(
				root,
				{
					centerX: am5.p50,
					centerY: am5.p50,
					templateField: "circleTemplate",
				},
				circleTemplate
			)
		);
		var label = container.children.push(
			am5.Label.new(
				root,
				{
					fill: am5.color(0xffffff),
					fontWeight: "500",
					fontSize: ".8em",
					centerX: am5.p50,
					centerY: am5.p50,
					textAlign: "center",

					// dx: am5.p20,
					templateField: "circleTemplate",
				},
				circleTemplate
			)
		);

		return am5.Bullet.new(root, {
			sprite: container,
		});
	});

	// Add heat rules to bullets
	// seriesBubbles1.set("heatRules", [{
	//     target: circleTemplate,
	//     min: 20,
	//     max: 40,
	//     dataField: "radius",
	//     key: "value"
	// }]);

	seriesBubbles1.appear();

	chartBubbles.appear(1000, 100);

	seriesBubbles1.events.on("datavalidated", function (ev) {
		var series = ev.target;
		var chart = seriesBubbles1.chart;
		var xAxis = chart.xAxes.getIndex(0);
		var view = localStorage.getItem("vieew");
		if (typeof view !== "undefined") {
			if (view == "Daily") {
				var cellSize = 75;
			} else if (view == "Weekly") {
				var cellSize = 38;
			} else if (view == "Monthly" || view == "Quarterly" || view == "Yearly") {
				var cellSize = 25;
			}
		}
		// Calculate how we need to adjust chart height
		var chartHeight =
			series.data.length * cellSize +
			xAxis.height() +
			chart.get("paddingTop", 0) +
			chart.get("paddingBottom", 0);

		// Set it on chart's container
		chart.root.dom.style.height = chartHeight + "px";
	});

	// Add export menu

	exporting = am5plugins_exporting.Exporting.new(rootBubbles, {
		filePrefix: "Sign Ups By Source",
		pngOptions: {
			maintainPixelRatio: true,
		},
		jpgOptions: {
			maintainPixelRatio: true,
		},
		pdfOptions: {
			maintainPixelRatio: true,
		},
	});
	add_data_to_chart();
}); // end am5.ready()

$(document).ready(function () {
	$("#view_swtich a.nav-link").click(function (e) {
		e.preventDefault();
		var ll = $(this).attr("data-filter-value");
		localStorage.removeItem("vieew");
		localStorage.setItem("vieew", ll);

		add_data_to_chart();
	});
});

//download amchart graph
function viewDailyChartPng() {
	exporting.download("png");
}
function viewDailyChartPdf() {
	exporting.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
	var data1 = [];

	categories = [
		{
			category: "JCP",
			color: "../../assets/img/bubble1.png",
			color1: am5.color(0xf971b4),
		},
		{
			category: "HCP Direct",
			color: "../../assets/img/bubble2.png",
			color1: am5.color(0xfa9567),
		},
		{
			category: "Paid Search",
			color: "../../assets/img/bubble3.png",
			color1: am5.color(0xf2e403),
		},
		{
			category: "Organic Search",
			color: "../../assets/img/bubble4.png",
			color1: am5.color(0x38d6ae),
		},
		{
			category: "Brand.com",
			color: "../../assets/img/bubble5.png",
			color1: am5.color(0x0dbeff),
		},
		{
			category: "Other",
			color: "../../assets/img/bubble6.png",
			color1: am5.color(0x925aff),
		},
	];

	// console.log(categories);
	var filters = localStorage.getItem("filters");
	var vieew = localStorage.getItem("vieew");
	$.getJSON(
		"https://kpi-tool.psglobalgroup.com/api/signup-conversion-drivers.php",
		{ key: filters, view: vieew },
		function (data111) {
			if (typeof seriesBubbles1 !== "undefined") {
				data111.data.forEach((element) => {
					var ff = "";
					var gg = "";
					categories.forEach((element1) => {
						if (element1.category == element.category) {
							ff = element1.color;
							gg = element1.color1;
						}
					});
					if (element.circleTemplate.radius <= 10) {
						radius = 25;
					} else if (
						element.circleTemplate.radius <= 20 &&
						element.circleTemplate.radius > 10
					) {
						radius = 30;
					} else if (
						element.circleTemplate.radius <= 30 &&
						element.circleTemplate.radius > 20
					) {
						radius = 35;
					} else if (
						element.circleTemplate.radius <= 40 &&
						element.circleTemplate.radius > 30
					) {
						radius = 40;
					} else if (
						element.circleTemplate.radius <= 50 &&
						element.circleTemplate.radius > 40
					) {
						radius = 45;
					} else if (
						element.circleTemplate.radius <= 60 &&
						element.circleTemplate.radius > 50
					) {
						radius = 50;
					} else if (
						element.circleTemplate.radius <= 70 &&
						element.circleTemplate.radius > 60
					) {
						radius = 55;
					} else if (
						element.circleTemplate.radius <= 80 &&
						element.circleTemplate.radius > 70
					) {
						radius = 60;
					} else if (
						element.circleTemplate.radius <= 90 &&
						element.circleTemplate.radius > 80
					) {
						radius = 65;
					} else if (
						element.circleTemplate.radius <= 100 &&
						element.circleTemplate.radius > 90
					) {
						radius = 70;
					}
					data1.push({
						category: element.category,
						position: element.position,
						value: element.value,
						circleTemplate: {
							src: ff,
							fill: gg,
							width: radius * 1.1,
							heightL: radius * 1.1,
							text: element.circleTemplate.radius + "%",
							radius: radius * 0.4,
						},
					});
				});
				seriesBubbles1.data.setAll(data1);
				xAxisBubbles.data.setAll(data111.xAxis);
				yAxisBubbles.data.setAll(data111.yAxis);
			}
		}
	);
}
