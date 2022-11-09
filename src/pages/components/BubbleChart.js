import React, { useEffect } from 'react'
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5flow from "@amcharts/amcharts5/flow";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
const BubbleChart = (props) => {
  useEffect(() => {

    var rootDtree= am5.Root.new("chartdiv");
 
    var doyleTheme = am5.Theme.new(rootDtree);
    
       doyleTheme.rule("Label").setAll({
         fill: am5.color(0xb2b9bf),
         fontSize: "1.5em",
       });
       doyleTheme
         .rule("ColorSet")
         .set("colors", [
           am5.color(0xffd51c),
           am5.color(0x611bff),
           am5.color(0xf82c91),
           am5.color(0xf94902),
           am5.color(0xf94902),
           am5.color(0x0dbeff),
           am5.color(0x279c7f),
           am5.color(0x66e2c7),
           am5.color(0x611bff),
         ]);
       rootDtree.setThemes([ am5themes_Animated.new(rootDtree), doyleTheme]);
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    // rootDtree.setThemes([
    //  am5themes_Animated.new(rootDtree)
    // ]);
    
    var data =props.bubbleData;
    
    // Create wrapper container
    var container = rootDtree.container.children.push(am5.Container.new(rootDtree, {
     width: am5.percent(100),
     height: am5.percent(100),
     layout: rootDtree.verticalLayout
    }));
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    var series = container.children.push(am5hierarchy.ForceDirected.new(rootDtree, {
          singleBranchOnly: false,
          downDepth: 1,
          topDepth: 1,
          maxRadius: 60,
          minRadius: 35,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          idField: "name",
          linkWithStrength: 0.4,
          linkWithField: "linkWith",
          manyBodyStrength: -5,
          centerStrength: 0.4,
       })
      );
    
    series.get("colors").setAll({
     step: 2
    });
    
    series.links.template.set("strength", 0.5);
    
    series.data.setAll([data]);
    
    series.set("selectedDataItem", series.dataItems[0]);
    
    // var exporting = am5plugins_exporting.Exporting.new(rootDtree, {
    //     filePrefix: "Portal Content Performance",
    //     pngOptions: {
    //       quality: 0.7,
    //     },
    //     jpgOptions: {
    //       quality: 0.7,
    //     },
    //   });
    // Make stuff animate on load
    series.appear(1000, 100);
    return () => {
      rootDtree.dispose();
    };
  }, []);
  return (
    <div id="chartdiv" height='450'/>
  )
}

export default BubbleChart;
