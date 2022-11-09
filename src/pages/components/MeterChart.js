import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useLayoutEffect, useEffect } from "react";

function MeterChart({
	total_nbrx_enrollment = 25,
	id,
	// id = "gague1",
	interval = false,
}) {
	// Create root
	useLayoutEffect(() => {
		// Radar chart begins
		let rootRadar = am5.Root.new(`${id}`);
			// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	let doyleTheme = am5.Theme.new(rootRadar);

	doyleTheme.rule("Label").setAll({
		fill: am5.color(0xb2b9bf),
		fontSize: "1.5em",
	});
	doyleTheme.rule("ColorSet").set("colors", [am5.color(0x38d6ae)]);
		rootRadar.setThemes([
			am5themes_Animated.new(rootRadar),doyleTheme]);
		  
		  // Create chart
		  // https://www.amcharts.com/docs/v5/charts/radar-chart/
		  var chart = rootRadar.container.children.push(
			am5radar.RadarChart.new(rootRadar, {
			  panX: false,
			  panY: false,
			  startAngle: 180,
			  endAngle: 360
			})
		  );
		  
		  chart.getNumberFormatter().set("numberFormat", "#'%'");
		  
		  // Create axis and its renderer
		  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
		  var axisRenderer = am5radar.AxisRendererCircular.new(rootRadar, {
			innerRadius: -40
		  });
		  
		  axisRenderer.grid.template.setAll({
			stroke: rootRadar.interfaceColors.get("background"),
			visible: true,
			strokeOpacity: 0.8
		  });
		  
		  var xAxis = chart.xAxes.push(
			am5xy.ValueAxis.new(rootRadar, {
			  maxDeviation: 0,
			  min: 0,
			  max: 100,
			  strictMinMax: true,
			  renderer: axisRenderer
			})
		  );
		  
		  // Add clock hand
		  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
		  var axisDataItem = xAxis.makeDataItem({});
		  
		  var clockHand = am5radar.ClockHand.new(rootRadar, {
			pinRadius: 50,
			radius: am5.percent(100),
			innerRadius: 50,
			bottomWidth: 0,
			topWidth: 0
		  });
		  
		  clockHand.pin.setAll({
			fillOpacity: 0,
			strokeOpacity: 0.5,
			stroke: am5.color(0xb2b9bf),
			strokeWidth: 1.5,
			strokeDasharray: [2, 2]
		  });
		  clockHand.hand.setAll({
			fillOpacity: 0,
			strokeOpacity: 0.5,
			stroke: am5.color(0xb2b9bf),
			strokeWidth: 2,
		  });
		  
		  var bullet = axisDataItem.set(
			"bullet",
			am5xy.AxisBullet.new(rootRadar, {
			  sprite: clockHand
			})
		  );
		  
		  xAxis.createAxisRange(axisDataItem);
		  
		  var label = chart.radarContainer.children.push(
			am5.Label.new(rootRadar, {
			  centerX: am5.percent(50),
			  textAlign: "center",
			  centerY: am5.percent(50),
			  fontSize: "1.5em"
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
			  easing: am5.ease.out(am5.ease.cubic)
			});
		  
			axisRange0.animate({
			  key: "endValue",
			  to: value,
			  duration: 500,
			  easing: am5.ease.out(am5.ease.cubic)
			});
		  
			axisRange1.animate({
			  key: "value",
			  to: value,
			  duration: 500,
			  easing: am5.ease.out(am5.ease.cubic)
			});
		  }, 2000);
		  
		  chart.bulletsContainer.set("mask", undefined);
		  
		  var colorSet = am5.ColorSet.new(rootRadar, {});
		  
		  var axisRange0 = xAxis.createAxisRange(
			xAxis.makeDataItem({
			  above: true,
			  value: 0,
			  endValue: 50
			})
		  );
		  
		  axisRange0.get("axisFill").setAll({
			visible: true,
			fill: colorSet.getIndex(0)
		  });
		  
		  axisRange0.get("label").setAll({
			forceHidden: true
		  });
		  
		  var axisRange1 = xAxis.createAxisRange(
			xAxis.makeDataItem({
			  above: true,
			  value: 50,
			  endValue: 100
			})
		  );
		  
		  axisRange1.get("axisFill").setAll({
			visible: true,
			fill: colorSet.getIndex(4)
		  });
		  
		  axisRange1.get("label").setAll({
			forceHidden: true
		  });
		  
		  // Make stuff animate on load
		  chart.appear(1000, 100);

		return () => {
			rootRadar.dispose();
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

export default MeterChart;
