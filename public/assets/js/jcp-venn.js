const BASE_WIDTH = 1512;

am5.ready(function () {
  am5.addLicense("AM5C329334656");

  // Create root
  var root = am5.Root.new("jcpvenn");

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
  var chart = container.children.push(
    am5venn.Venn.new(root, {
      categoryField: "name",
      valueField: "value",
      intersectionsField: "sets",
      paddingTop: 40,
      paddingBottom: 40,
    })
  );
  // Set tooltip content
  chart.slices.template.set("tooltipText", "{category}: {value}");
  chart.slices.template.setAll({ templateField: "sliceSettings" });
  chart.labels.template.setAll({
    text: "{value}",
    fontSize: "1rem",
    fill: am5.color(0xb2b9bf),
  });

  // Set data
  chart.data.setAll([
    {
      name: "JCP Patients",
      value: 100,
      sliceSettings: {
        fill: am5.color(0x611bff),
        stroke: am5.color(0x611bff),
        fillOpacity: 0.8,
      },
    },
    {
      name: "WithMe Patients",
      value: 100,
      sliceSettings: {
        fill: am5.color(0xf82c91),
        fillOpacity: 0.8,
      },
    },
    {
      name: "JCP and With Me Patients",
      value: 30,
      sets: ["JCP Patients", "WithMe Patients"],
      sliceSettings: {
        // fillPattern: pattern,
        stroke: am5.color(0xb2b9bf),
        strokeOpacity: "0",
        fill: am5.color(0xb2b9bf),
        fillOpacity: "0",
      },
    },
  ]);

  var legendRoot = am5.Root.new("chartdiv-legend");
  // Set up hover appearance
  chart.hoverGraphics.setAll({
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
  var legend2 = legendRoot.container.children.push(
    am5.Legend.new(legendRoot, {
      width: am5.percent(80),
      height: am5.percent(100),
      x: am5.percent(50),
      centerX: am5.percent(50),
      y: am5.percent(50),
      centerY: am5.percent(10),
      layout: legendRoot.horizontalLayout,
      scale: 0.9,
    })
  );

  legend2.data.setAll(chart.dataItems);

  legend2.markers.template.setAll({
    width: 12,
    height: 12,
  });

  legend2.labels.template.setAll({
    fontSize: ".775rem",
    fontWeight: "500",
  });

  legend2.valueLabels.template.setAll({
    fontSize: "0",
    fontWeight: "400",
  });

  legend2.markerRectangles.template.setAll({
    cornerRadiusTL: 100,
    cornerRadiusTR: 100,
    cornerRadiusBL: 100,
    cornerRadiusBR: 100,
  });
  root.events.on("frameended", exportChart);

  function exportChart() {
    var width = jQuery(window).width() / BASE_WIDTH;
    var ff = 0.875 * width;

    if (jQuery(window).width() > 1920) {
      ff = 0.7 * width;
    }
    if (jQuery(window).width() > 3000) {
      ff = 0.5 * width;
    }
    if (jQuery(window).width() > 5000) {
      ff = 0.3 * width;
    }

    chart.labels.template.setAll({
      text: "{value}",
      fontSize: ff + "rem",
      fill: am5.color(0xb2b9bf),
    });
    legend2.labels.template.setAll({
      fontSize: ff + "rem",
      fontWeight: "500",
    });

    legend2.markers.template.setAll({
      width: 12 * width,
      height: 12 * width,
    });

    legend2.markers.template.setAll({
      width: 12 * ff,
      height: 12 * ff,
    });
  }
}); // end am5.ready()
