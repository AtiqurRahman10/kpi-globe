import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useLayoutEffect, useEffect } from "react";

function AppleChart({
	total_nbrx_enrollment = 25,
	id = "gague1",
	interval = false,
}) {
	// Create root
	useLayoutEffect(() => {
		// Radar chart begins
		let root = am5.Root.new(`${id}`);
		let doyleTheme = am5.Theme.new(root);
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
		// let exporting = am5plugins_exporting.Exporting.new(root, {
		// 	menu: am5plugins_exporting.ExportingMenu.new(root, {
		// 		container: document.getElementById("exportmeterchart"),
		// 	}),
		// 	pngOptions: {
		// 		quality: 0.8,
		// 		maintainPixelRatio: true,
		// 	},
		// 	filePrefix: "Acquisition Cost by channel",
		// });

		chart.appear(1000, 100);
		return () => {
			root.dispose();
		};
	}, []);
	return (
		<>
			<div id={id} className="chartdiv" />
			{/* <div className="chartdiv-legend" id="chartdiv-legend" /> */}
			{/* <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div> */}
		</>
	);
}

export default AppleChart;
