import React from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useEffect } from "react";
const FlowChart = (props) => {
  useEffect(() => {
    let rootSankey = am5.Root.new(`${props.id}`);
	var doyleTheme = am5.Theme.new(rootSankey);

	doyleTheme.rule("Label").setAll({
	  fill: am5.color(0xb2b9bf),
	  fontSize: "1.5em",
	});
    rootSankey.setThemes([am5themes_Animated.new(rootSankey), doyleTheme]);

    // Create series
    // https://www.amcharts.com/docs/v5/charts/flow-charts/
    var series = rootSankey.container.children.push(
      am5flow.Sankey.new(rootSankey, {
		sourceIdField: "from",
		targetIdField: "to",
		valueField: "value",
		paddingRight: 90,
		paddingBottom: 10,
	  })
    );

    series.nodes.setAll({
		idField: "id",
      nameField: "name",
    });
	series.nodes
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
		]); //nodeColor setting
  // series.nodes.rectangles.template.set("templateField", "nodeSettings");
		series.nodes.labels.template.setAll({
			fontSize: ".875rem",
			maxWidth: 100,
			wrap: true,
			fontFamily: "Nunito Sans",
			paddingBottom:2,
			 rotation: props.rotate,
			
		});
 
    // series.links.template.set("templateField", "linkSettings");

    series.nodes.data.setAll(props.nodeData);  //nodeflow data

    // Set data
    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data

    series.data.setAll(props.flowData);    //setting data

	 am5plugins_exporting.Exporting.new(rootSankey, {
		filePrefix: "Content Flow",
		pngOptions: {
			quality: 0.7,
		},
		jpgOptions: {
			quality: 0.7,
		},
	});
    // Make stuff animate on load
    series.appear(1000, 100);
    return () => {
      rootSankey.dispose();
    };
  }, []);
  return <div id={props.id} width={props.width}/>;
};

export default FlowChart;
