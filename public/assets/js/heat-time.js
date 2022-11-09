am5.ready(function () {
  am5.addLicense("AM5C329334656");
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("heattime");
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/

  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.percent(95),
      height: am5.percent(95),
      layout: root.verticalLayout,
      x: am5.percent(50),
      centerX: am5.percent(50),
      y: am5.percent(50),
      centerY: am5.percent(50),
      // marginRight:am5.percent(5),
      // centerX:am5.percent(50)
    })
  );
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/

  var chart = container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.verticalLayout,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      // paddingBottom:0
    })
  );

  // Create axes and their renderers
  var yRenderer = am5xy.AxisRendererY.new(root, {
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

  var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      renderer: yRenderer,
      categoryField: "weekday",
    })
  );

  var xRenderer = am5xy.AxisRendererX.new(root, {
    visible: false,
    minGridDistance: 30,
    opposite: true,
  });

  xRenderer.grid.template.set("visible", false);

  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: xRenderer,
      categoryField: "hour",
    })
  );

  var tooltip = am5.Tooltip.new(root, {
    autoTextColor: false,
    labelText: "{value}",
  });

  tooltip.label.setAll({
    fontSize: ".875rem",
    fontFamily: "Nunito Sans",
    fontWeight: 700,
  });
  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      calculateAggregates: true,
      stroke: am5.color(0x1f2733),
      clustered: false,
      xAxis: xAxis,
      yAxis: yAxis,
      categoryXField: "hour",
      categoryYField: "weekday",
      valueField: "value",
      tooltip,
    })
  );

  series.columns.template.setAll({
    tooltipText: "{value}",
    strokeOpacity: 1,
    strokeWidth: 2,
    width: am5.percent(100),
    height: am5.percent(100),
  });

  // Set up heat rules
  // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
  series.set("heatRules", [
    {
      target: series.columns.template,
      min: am5.color(0x92ebd7),
      max: am5.color(0x30098b),
      dataField: "value",
      key: "fill",
    },
  ]);

  // Set data
  // https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
  var data = [
    {
      hour: "MORNING",
      weekday: "SUN",
      value: 2990,
    },
    {
      hour: "AFTERNOON",
      weekday: "SUN",
      value: 2520,
    },
    {
      hour: "EVENING",
      weekday: "SUN",
      value: 2334,
    },
    {
      hour: "MORNING",
      weekday: "MON",
      value: 3346,
    },
    {
      hour: "AFTERNOON",
      weekday: "MON",
      value: 2725,
    },
    {
      hour: "EVENING",
      weekday: "MON",
      value: 3052,
    },
    {
      hour: "MORNING",
      weekday: "TUE",
      value: 4468,
    },
    {
      hour: "AFTERNOON",
      weekday: "TUE",
      value: 3306,
    },
    {
      hour: "EVENING",
      weekday: "TUE",
      value: 3906,
    },
    {
      hour: "MORNING",
      weekday: "WED",
      value: 8145,
    },
    {
      hour: "AFTERNOON",
      weekday: "WED",
      value: 7177,
    },
    {
      hour: "EVENING",
      weekday: "WED",
      value: 5657,
    },
    {
      hour: "MORNING",
      weekday: "THU",
      value: 3689,
    },
    {
      hour: "AFTERNOON",
      weekday: "THU",
      value: 3081,
    },
    {
      hour: "EVENING",
      weekday: "THU",
      value: 6525,
    },
    {
      hour: "MORNING",
      weekday: "FRI",
      value: 4022,
    },
    {
      hour: "AFTERNOON",
      weekday: "FRI",
      value: 3063,
    },
    {
      hour: "EVENING",
      weekday: "FRI",
      value: 3638,
    },
    {
      hour: "MORNING",
      weekday: "SAT",
      value: 3503,
    },
    {
      hour: "AFTERNOON",
      weekday: "SAT",
      value: 2842,
    },
    {
      hour: "EVENING",
      weekday: "SAT",
      value: 2808,
    },
  ];

  series.data.setAll(data);

  yAxis.data.setAll([
    { weekday: "SUN" },
    { weekday: "MON" },
    { weekday: "TUE" },
    { weekday: "WED" },
    { weekday: "THU" },
    { weekday: "FRI" },
    { weekday: "SAT" },
  ]);

  xAxis.data.setAll([
    { hour: "MORNING" },
    { hour: "AFTERNOON" },
    { hour: "EVENING" },
  ]);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  chart.appear(1000, 100);

  root.events.on("frameended", exportChart);

  function exportChart() {
    var width = jQuery(window).width() / 1512;
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

    var xRenderer = xAxis.get("renderer");
    var yRenderer = yAxis.get("renderer");

    yRenderer.minGridDistance = 1;
    xRenderer.labels.template.setAll({
      fontSize: ff + "rem",
      paddingBottom: 10 * ff,
    });

    yRenderer.labels.template.setAll({
      fontSize: ff + "rem",
      paddingRight: 10 * ff,
    });

    tooltip.label.setAll({
      fontSize: ff + "rem",
    });
  }
}); // end am5.ready()
