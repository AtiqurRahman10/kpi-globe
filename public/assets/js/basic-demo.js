am5.ready(function () {
  am5.addLicense("AM5C329334656");
  var root = am5.Root.new("basicdemo");

  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout,
      arrangeTooltips: false,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingTop: 20,
    })
  );

  // Use only absolute numbers
  chart.getNumberFormatter().set("numberFormat", "#.#s");
  chart
    .get("colors")
    .set("colors", [
      am5.color(0x38d6ae),
      am5.color(0x576877),
      am5.color(0xbfbfbf),
      am5.color(0x061a32),
      am5.color(0x92ebd7),
      am5.color(0xb61d69),
    ]);

  // Add legend
  // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
  var legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
    })
  );

  // Data
  var data = [
    {
      age: "85+",
      male: -10,
      female: 5,
    },
    {
      age: "75-84",
      male: -5,
      female: 10,
    },
    {
      age: "65-74",
      male: -18,
      female: 18,
    },
    {
      age: "55-64",
      male: -18,
      female: 15,
    },
    {
      age: "45-54",
      male: -10,
      female: 5,
    },
    {
      age: "35-44",
      male: 0,
      female: 0,
    },
    {
      age: "25-34",
      male: -10,
      female: 5,
    },
    {
      age: "18-24",
      male: -5,
      female: 10,
    },
    {
      age: "10-17",
      male: -6,
      female: 18,
    },
    {
      age: "0-9",
      male: -0,
      female: 5,
    },
  ];

  var yRenderer2 = am5xy.AxisRendererY.new(root, {
    minGridDistance: 20,
    inversed: true,
    cellStartLocation: 0.3,
    cellEndLocation: 0.7,
  });
  yRenderer2.labels.template.setAll({
    fontSize: ".775rem",
    fontWeight: 700,
    paddingRight: 10,
    fontFamily: "Nunito Sans",
  });
  yRenderer2.grid.template.setAll({
    stroke: am5.color(0xbfbfbf),
    fillOpacity: 1,
  });
  var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "age",
      renderer: yRenderer2,
    })
  );
  yAxis.data.setAll(data);
  var yRenderer11 = am5xy.AxisRendererY.new(root, {
    minGridDistance: 20,
    inversed: true,
    cellStartLocation: 0.3,
    cellEndLocation: 0.7,
    opposite: true,
  });
  yRenderer11.labels.template.setAll({
    fontSize: ".775rem",
    fontWeight: 700,
    fontFamily: "Nunito Sans",
    paddingLeft: 10,
  });
  yRenderer11.grid.template.setAll({
    stroke: am5.color(0xbfbfbf),
    fillOpacity: 1,
  });
  var yAxis1 = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "age",
      renderer: yRenderer11,
    })
  );
  yAxis1.data.setAll(data);
  var xRenderer1 = am5xy.AxisRendererX.new(root, {});
  xRenderer1.labels.template.setAll({
    fontSize: ".775rem",
    fontWeight: 700,
    paddingTop: 10,
    fontFamily: "Nunito Sans",
  });
  xRenderer1.grid.template.setAll({
    stroke: am5.color(0xbfbfbf),
    fillOpacity: 1,
  });
  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      // min: -20,
      // max: 20,
      renderer: xRenderer1,
    })
  );
  var labelmale, labelfemale;
  function createSeries(
    field,
    labelCenterX,
    pointerOrientation,
    rangeValue,
    yaxisss
  ) {
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yaxisss,
        valueXField: field,
        categoryYField: "age",
        sequencedInterpolation: true,
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: pointerOrientation,
          labelText: "{categoryY} years : {valueX}",
        }),
      })
    );
    series.columns.template.setAll({
      height: am5.percent(100),
    });
    series.data.setAll(data);
    series.appear();
    var rangeDataItem = xAxis.makeDataItem({
      value: rangeValue,
    });
    xAxis.createAxisRange(rangeDataItem);
    if (field == "male")
      labelmale = chart.plotContainer.children.push(
        am5.Label.new(root, {
          text: field.toUpperCase(),
          fontSize: ".875rem",
          fontWeight: "700",
          fill: series.get("fill"),
          y: -30,
          dx: -3,
          paddingTop: 10,
          isMeasured: false,
          x: am5.percent(30),
          centerX: am5.percent(30),
          fontFamily: "Nunito Sans",
        })
      );
    if (field == "female")
      labelfemale = chart.plotContainer.children.push(
        am5.Label.new(root, {
          text: field.toUpperCase(),
          fontSize: ".875rem",
          fontWeight: "700",
          fill: am5.color(0x000000),
          y: -30,
          dx: 3,
          paddingTop: 10,
          isMeasured: false,
          x: am5.percent(60),
          centerX: am5.percent(60),
          fontFamily: "Nunito Sans",
        })
      );
    return series;
  }
  createSeries("male", am5.p100, "right", -20, yAxis);
  createSeries("female", 0, "left", 20, yAxis1);
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      behavior: "zoomY",
    })
  );
  cursor.lineY.set("forceHidden", true);
  cursor.lineX.set("forceHidden", true);
  chart.zoomOutButton.set("forceHidden", true);
  chart.appear(1000, 100);
  // root.events.on("frameended", exportChart);
  var xRenderer = xAxis.get("renderer");
  var yRenderer = yAxis.get("renderer");
  var yRenderer1 = yAxis1.get("renderer");
  yRenderer.minGridDistance = width * 20;
  yRenderer1.minGridDistance = width * 20;
  xRenderer.minGridDistance = width * 50;
  xRenderer.labels.template.setAll({
    fontSize: dd + "rem",
    paddingBottom: 10 * width,
  });
  yRenderer1.labels.template.setAll({
    fontSize: dd + "rem",
    paddingLeft: 10 * width,
  });
  yRenderer.labels.template.setAll({
    fontSize: dd + "rem",
    paddingRight: 10 * width,
  });
  labelmale.set("fontSize", ff + "rem");
  labelfemale.set("fontSize", ff + "rem");
  if (width > 1.5) {
    labelmale.set("y", width * -15);
    labelfemale.set("y", width * -15);
  }
});
