import * as am5 from "@amcharts/amcharts5";
import * as am5venn from "@amcharts/amcharts5/venn";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useLayoutEffect } from "react";

function JcpVenn(props) {
	// Create root
	useLayoutEffect(() => {
		let root = am5.Root.new("jcpvenn");
		// let legendRoot = am5.Root.new("chartdiv-legend");
		var responsive = am5themes_Responsive.newEmpty(root);
		var doyleTheme = am5.Theme.new(root);
		doyleTheme.rule("Label").setAll({
			fill: am5.color(0xb2b9bf),
			fontSize: "1.5em",
		});
		// Set themes
		root.setThemes([am5themes_Animated.new(root), responsive, doyleTheme]);

		// Create wrapper container
		var container = root.container.children.push(
			am5.Container.new(root, {
				width: am5.percent(95),
				height: am5.percent(100),
				layout: root.verticalLayout,
				x: am5.percent(50),
				centerX: am5.percent(50),
			})
		);

		// Create venn series
		var series = container.children.push(
			am5venn.Venn.new(root, {
				categoryField: "name",
				valueField: "value",
				intersectionsField: "sets",
				paddingTop: 40,
				paddingBottom: 40,
			})
		);
		// series.children.unshift(
		// 	am5.Label.new(root, {
		// 		text: "This is a chart title",
		// 		fontSize: 25,
		// 		fontWeight: "500",
		// 		textAlign: "left",
		// 		x: am5.percent(50),
		// 		centerX: am5.percent(50),
		// 		padding: 3,
		// 		paddingBottom: 0,
		// 	})
		// );
		// Set tooltip content
		series.slices.template.set("tooltipText", "{category}: {value}");
		series.slices.template.setAll({
			templateField: "sliceSettings",
		});
		series.labels.template.setAll({
			text: "{value}",
			fontSize: "1rem",
			fill: am5.color(0xb2b9bf),
		});

		// Set data
		series.data.setAll(props.data);
		// Set up hover appearance
		series.hoverGraphics.setAll({
			strokeDasharray: [3, 3],
			stroke: am5.color(0xb2b9bf),
			strokeWidth: 2,
		});

		// Add legend
		var legend = container.children.push(
			am5.Legend.new(root, {
				centerX: am5.p50,
				x: am5.p50,
			})
		);

		legend.data.setAll(series.dataItems);

		legend.markers.template.setAll({
			width: 12,
			height: 12,
		});

		legend.labels.template.setAll({
			fontSize: ".775rem",
			fontWeight: "500",
		});

		legend.valueLabels.template.setAll({
			fontSize: "0",
			fontWeight: "400",
		});

		legend.markerRectangles.template.setAll({
			cornerRadiusTL: 100,
			cornerRadiusTR: 100,
			cornerRadiusBL: 100,
			cornerRadiusBR: 100,
		});

		// let exporting = am5plugins_exporting.Exporting.new(root, {
		// 	menu: am5plugins_exporting.ExportingMenu.new(root, {
		// 		container: document.getElementById(`${props.id}`),
		// 	}),
		// 	pngOptions: {
		// 		quality: 0.8,
		// 		maintainPixelRatio: true,
		// 	},
		// 	filePrefix: "Enrollment Overlap",
		// });

		return () => {
			root.dispose();
		};
	}, []);
	return (
		<>
			<div id="jcpvenn" />
			{/* <div className="chartdiv-legend" id="chartdiv-legend" /> */}
			{/* <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div> */}
		</>
	);
}

export default JcpVenn;
