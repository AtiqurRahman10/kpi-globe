import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useEffect, useLayoutEffect } from "react";

function UsHeatMapChart(props) {
	// // Create root
	useLayoutEffect(()=>{

    
var rootHeatmap = am5.Root.new(`${props.id}`); 

// Set themes
var doyleTheme = am5.Theme.new(rootHeatmap);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  rootHeatmap.setThemes([am5themes_Animated.new(rootHeatmap), doyleTheme]);

  // Create chart
  var chart = rootHeatmap.container.children.push(
    am5map.MapChart.new(rootHeatmap, {
      panX: "rotateX",
      panY: "none",
      projection: am5map.geoAlbersUsa(),
      layout: rootHeatmap.horizontalLayout,
    })
  );

  // Create polygon series
  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(rootHeatmap, {
      geoJSON: am5geodata_usaLow,
      valueField: "value",
      calculateAggregates: true,
    })
  );

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}: {value}",
  });

  polygonSeries.set("heatRules", [
    {
      target: polygonSeries.mapPolygons.template,
      dataField: "value",
      min: am5.color(0x66e2c7),
      max: am5.color(0x4410bc),
      key: "fill",
    },
  ]);

  polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
    heatLegend.showValue(ev.target.dataItem.get("value"));
  });

  polygonSeries.data.setAll(props.heatdata);

  var heatLegend = chart.children.push(
    am5.HeatLegend.new(rootHeatmap, {
      orientation: "vertical",
      startColor: am5.color(0x66e2c7),
      endColor: am5.color(0x4410bc),
      startText: "Lowest",
      endText: "Highest",
      stepCount: 5,
    })
  );

  heatLegend.startLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("startColor"),
  });

  heatLegend.endLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("endColor"),
  });

  // change this to template when possible
  polygonSeries.events.on("datavalidated", function () {
    heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
    heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
  });
  	return () => {
			rootHeatmap.dispose();
		};
	},[])
	return (
		<>
			<div id={props.id} height={props.height} />
			{/* <div className="chartdiv-legend" id="chartdiv-legend" /> */}
			{/* <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div> */}
		</>
	);
}

export default UsHeatMapChart;
