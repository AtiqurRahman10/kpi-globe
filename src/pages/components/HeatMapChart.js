import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5venn from "@amcharts/amcharts5/venn";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useLayoutEffect } from "react";

function HeatMapChart(props) {
	// Create root
	useLayoutEffect(() => {
		let rootHeatmap = am5.Root.new("heattime");
		var doyleTheme = am5.Theme.new(rootHeatmap);

		doyleTheme.rule("Label").setAll({
			fill: am5.color(0xb2b9bf),
			fontSize: "1.5em",
		});
		rootHeatmap.setThemes([am5themes_Animated.new(rootHeatmap), doyleTheme]);
		var containerHeatmap = rootHeatmap.container.children.push(
			am5.Container.new(rootHeatmap, {
				width: am5.percent(95),
				height: am5.percent(95),
				layout: rootHeatmap.verticalLayout,
				x: am5.percent(50),
				centerX: am5.percent(50),
				y: am5.percent(50),
				centerY: am5.percent(50),
				// marginRight:am5.percent(5),
				// centerX:am5.percent(50)
			})
		);
		const chartHeatmap = containerHeatmap.children.push(
			am5xy.XYChart.new(rootHeatmap, {
				panX: false,
				panY: false,
				wheelX: "none",
				wheelY: "none",
				layout: rootHeatmap.verticalLayout,
				paddingLeft: 0,
				paddingRight: 0,
				paddingTop: 0,
				// paddingBottom:0
			})
		);
		// Create axes and their renderers
		var yRenderer = am5xy.AxisRendererY.new(rootHeatmap, {
			visible: false,
			minGridDistance: 20,
			inversed: true,
		});
		yRenderer.labels.template.setAll({
			fontSize: ".875rem",
			fontWeight: 600,
			paddingRight: 10,
		});
		yRenderer.grid.template.set("visible", false);
		let yAxisHeatmap = chartHeatmap.yAxes.push(
			am5xy.CategoryAxis.new(rootHeatmap, {
				maxDeviation: 0,
				renderer: yRenderer,
				categoryField: "weekday",
			})
		);

		var xRenderer = am5xy.AxisRendererX.new(rootHeatmap, {
			visible: false,
			minGridDistance: 30,
			opposite: true,
		});
		xRenderer.grid.template.set("visible", false);

		let xAxisHeatmap = chartHeatmap.xAxes.push(
			am5xy.CategoryAxis.new(rootHeatmap, {
				renderer: xRenderer,
				categoryField: "hour",
			})
		);

		var tooltip = am5.Tooltip.new(rootHeatmap, {
			autoTextColor: false,
			labelText: "{value}",
		});
		tooltip.label.setAll({
			fontSize: ".875rem",
			fontFamily: "Nunito Sans",
			fontWeight: 700,
		});
		let seriesHeatmap = chartHeatmap.series.push(
			am5xy.ColumnSeries.new(rootHeatmap, {
				calculateAggregates: true,
				stroke: am5.color(0x1f2733),
				clustered: false,
				xAxis: xAxisHeatmap,
				yAxis: yAxisHeatmap,
				categoryXField: "hour",
				categoryYField: "weekday",
				valueField: "value",
				tooltip,
			})
		);
		seriesHeatmap.columns.template.setAll({
			tooltipText: "{value}",
			strokeOpacity: 1,
			strokeWidth: 2,
			width: am5.percent(100),
			height: am5.percent(100),
		});
		seriesHeatmap.set("heatRules", [
			{
				target: seriesHeatmap.columns.template,
				min: am5.color(0x92ebd7),
				max: am5.color(0x30098b),
				dataField: "value",
				key: "fill",
			},
		]);

		// Set data
		yAxisHeatmap.data.setAll(props.heatmap_yaxis);
		xAxisHeatmap.data.setAll(props.heatmap_xaxis);
		seriesHeatmap.data.setAll(props.heatmap);

		// Set up hover appearance

		// let exporting = am5plugins_exporting.Exporting.new(rootHeatmap, {
		// 	menu: am5plugins_exporting.ExportingMenu.new(rootHeatmap, {
		// 		container: document.getElementById("exportdiv"),
		// 	}),
		// 	pngOptions: {
		// 		quality: 0.8,
		// 		maintainPixelRatio: true,
		// 	},
		// 	filePrefix: "Actual Enrolled Time of the Day",
		// });

		return () => {
			rootHeatmap.dispose();
		};
	}, []);
	return (
		<>
			<div id="heattime" />
			{/* <div className="chartdiv-legend" id="chartdiv-legend" /> */}
			{/* <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div> */}
		</>
	);
}

export default HeatMapChart;
