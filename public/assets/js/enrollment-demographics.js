let rootMap,
  chart,
  chartMap,
  polygonSeriesMap,
  heatLegendMap,
  mapWidth,
  mapHeight,
  xAxisRadar,
  labelRadar,
  clockHandRadar,
  bulletRadar,
  axisDataItemRadar,
  axisRange1Radar,
  axisRange0Radar,
  rootRadar,
  chartjsBarAge,
  chartjsRadarAge;

am5.ready(function () {
  am5.addLicense("AM5C329334656");
  am5.addLicense("AM5M329334656");

  // Create root
  rootMap = am5.Root.new("us-heatmap3");

  // Set themes

  var responsive = am5themes_Responsive.newEmpty(rootMap);

  responsive.addRule({
    relevant: am5themes_Responsive.widthM,
    applying: function () {
      chart.set("layout", rootMap.verticalLayout);
      legend.setAll({
        y: null,
        centerY: null,
        x: am5.p0,
        centerX: am5.p0,
      });
    },
    removing: function () {
      chart.set("layout", root.horizontalLayout);
      legend.setAll({
        y: am5.p50,
        centerY: am5.p50,
        x: null,
        centerX: null,
      });
    },
  });

  var doyleTheme = am5.Theme.new(rootMap);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  rootMap.setThemes([am5themes_Animated.new(rootMap), responsive, doyleTheme]);

  // Create chart
  chartMap = rootMap.container.children.push(
    am5map.MapChart.new(rootMap, {
      panX: "rotateX",
      panY: "none",
      projection: am5map.geoAlbersUsa(),
      layout: rootMap.horizontalLayout,
      // maxHeight: mapHeight,
      // maxWidth: mapWidth,
    })
  );

  // Create polygon series
  polygonSeriesMap = chartMap.series.push(
    am5map.MapPolygonSeries.new(rootMap, {
      geoJSON: am5geodata_usaLow,
      valueField: "value",
      calculateAggregates: true,
      fill: am5.color(0xeeeeee),
    })
  );

  polygonSeriesMap.mapPolygons.template.setAll({
    tooltipText: "{name}: {value}",
  });

  polygonSeriesMap.set("heatRules", [
    {
      target: polygonSeriesMap.mapPolygons.template,
      dataField: "value",
      min: am5.color(0x66e2c7),
      max: am5.color(0x4410bc),
      key: "fill",
    },
  ]);

  polygonSeriesMap.mapPolygons.template.events.on("pointerover", function (ev) {
    heatLegendMap.showValue(ev.target.dataItem.get("value"));
  });

  heatLegendMap = chartMap.children.push(
    am5.HeatLegend.new(rootMap, {
      orientation: "vertical",
      startColor: am5.color(0x66e2c7),
      endColor: am5.color(0x4410bc),
      startText: "Lowest",
      endText: "Highest",
      stepCount: 5,
    })
  );

  heatLegendMap.startLabel.setAll({
    fontSize: 12,
    fill: heatLegendMap.get("startColor"),
  });

  heatLegendMap.endLabel.setAll({
    fontSize: 12,
    fill: heatLegendMap.get("endColor"),
  });

  // chart radar

  // Radar chart begins

  rootRadar = am5.Root.new("enroll-total-rx");

  var doyleTheme = am5.Theme.new(rootRadar);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });
  doyleTheme.rule("ColorSet").set("colors", [am5.color(0x38d6ae)]);

  rootRadar.setThemes([am5themes_Animated.new(rootRadar), doyleTheme]);

  chartRadar = rootRadar.container.children.push(
    am5radar.RadarChart.new(rootRadar, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360,
    })
  );

  chartRadar.getNumberFormatter().set("numberFormat", "#'%'");

  // Create axis and its renderer
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
  var axisRenderer = am5radar.AxisRendererCircular.new(rootRadar, {
    innerRadius: -40,
  });

  axisRenderer.grid.template.setAll({
    stroke: rootRadar.interfaceColors.get("background"),
    visible: true,
    strokeOpacity: 0.8,
  });

  xAxisRadar = chartRadar.xAxes.push(
    am5xy.ValueAxis.new(rootRadar, {
      maxDeviation: 0,
      min: 0,
      max: 100,
      strictMinMax: true,
      renderer: axisRenderer,
    })
  );

  axisDataItemRadar = xAxisRadar.makeDataItem({});

  clockHandRadar = am5radar.ClockHand.new(rootRadar, {
    pinRadius: 50,
    radius: am5.percent(100),
    innerRadius: 50,
    bottomWidth: 0,
    topWidth: 0,
  });

  clockHandRadar.pin.setAll({
    fillOpacity: 0,
    strokeOpacity: 0.5,
    stroke: am5.color(0xb2b9bf),
    strokeWidth: 1.5,
    strokeDasharray: [2, 2],
  });
  clockHandRadar.hand.setAll({
    fillOpacity: 0,
    strokeOpacity: 0.5,
    stroke: am5.color(0xb2b9bf),
    strokeWidth: 2,
  });

  bulletRadar = axisDataItemRadar.set(
    "bullet",
    am5xy.AxisBullet.new(rootRadar, {
      sprite: clockHandRadar,
    })
  );

  xAxisRadar.createAxisRange(axisDataItemRadar);

  labelRadar = chartRadar.radarContainer.children.push(
    am5.Label.new(rootRadar, {
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em",
    })
  );

  axisRange0Radar = xAxisRadar.createAxisRange(
    xAxisRadar.makeDataItem({
      above: true,
      value: 0,
      endValue: 100,
    })
  );
  axisRange1Radar = xAxisRadar.createAxisRange(
    xAxisRadar.makeDataItem({
      above: true,
      value: 0,
      endValue: 0,
    })
  );
  axisDataItemRadar.set("value", 90);

  bulletRadar.get("sprite").on("rotation", function () {
    var value = axisDataItemRadar.get("value");
    labelRadar.set("text", Math.round(value).toString() + "%");
  });

  chartRadar.bulletsContainer.set("mask", undefined);

  var colorSet = am5.ColorSet.new(rootRadar, {});

  axisRange0Radar.get("axisFill").setAll({
    visible: true,
    fill: colorSet.getIndex(0),
  });

  axisRange0Radar.get("label").setAll({
    forceHidden: true,
  });

  axisRange1Radar.get("axisFill").setAll({
    visible: true,
    fill: colorSet.getIndex(4),
  });

  axisRange1Radar.get("label").setAll({
    forceHidden: true,
  });

  // Add export menu
  exporting = am5plugins_exporting.Exporting.new(rootRadar, {
    filePrefix: "Enrollment/Total RX",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  // Add export menu
  exporting1 = am5plugins_exporting.Exporting.new(rootMap, {
    filePrefix: "Program Reach By State",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });

  //Add export menu

  // Make stuff animate on load
  chartRadar.appear(1000, 100);

  // age group bar chart

  var ctx = document.getElementById("chart-bars").getContext("2d");
  chartjsBarAge = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Male",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#0dbeff",
          data: [],
          maxBarThickness: 10,
        },
        {
          label: "Female",
          tension: 0.8,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#f82c91",
          data: [],
          maxBarThickness: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: "#b2b9bf",
            font: {
              size: 14,
              family: "Nunito Sans",
              style: "bold",
              lineHeight: 2,
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 500,
            beginAtZero: true,
            padding: 10,
            font: {
              size: 14,
              family: "Nunito Sans",
              style: "bold",
              lineHeight: 2,
            },
            color: "#b2b9bf",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: true,
            padding: 15,
            font: {
              size: 14,
              family: "Nunito Sans",
              style: "bold",
              lineHeight: 2,
            },
            color: "#b2b9bf",
          },
        },
      },
    },
  });
  // chartjsBarAge.show();
}); // end am5.ready()

//download chart graph

function downloadPNGChart(a, title) {
  a.update({
    duration: 0,
  });
  var link = document.createElement("a");
  link.href = a.toBase64Image();
  link.download = title + ".png";
  link.click();
  a.update({
    duration: 0,
  });
}

function downloadPDFChart(a, title) {
  const canvas = document.getElementById(a);
  const canvasImage = canvas.toDataURL("image/jpeg", 1.0);
  let pdf = new jsPDF("landscape");
  pdf.setFontSize(200);
  pdf.addImage(canvasImage, "JPEG", 30, 15, 230, 150);
  pdf.save(title);
}

//download chart graph

//download amchart graph

function enrollChartPng() {
  exporting.download("png");
}

function enrollChartPdf() {
  exporting.download("pdf");
}

function heatMapChartPng() {
  exporting1.download("png");
}

function heatMapChartPdf() {
  exporting1.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/enrollment-demographics.php",
    { key: filters },
    function (data) {
      // $('#sex_at_birth_male').html(data.sex_assigned_at_birth.male);
      // $('#sex_at_birth_female').html(data.sex_assigned_at_birth.female);

      $("#insurance_government").html(
        Math.round(
          (data.insurance_type.government /
            (data.insurance_type.government + data.insurance_type.commercial)) *
            100
        ),
        1
      );
      $("#insurance_commercial").html(
        Math.round(
          (data.insurance_type.commercial /
            (data.insurance_type.government + data.insurance_type.commercial)) *
            100
        ),
        1
      );

      $("#speaking_spanish").html(
        Math.round(
          (data.speaking.spanish /
            (data.speaking.spanish + data.speaking.english)) *
            100
        ),
        1
      );
      $("#speaking_english").html(
        Math.round(
          (data.speaking.english /
            (data.speaking.spanish + data.speaking.english)) *
            100
        ),
        1
      );

      chartjsBarAge.data.labels = data.range;
      chartjsBarAge.data.datasets[0].data = data.sex_assigned_at_birth.male;
      chartjsBarAge.data.datasets[1].data = data.sex_assigned_at_birth.female;
      chartjsBarAge.update();

      polygonSeriesMap.data.setAll(data.state);

      polygonSeriesMap.events.on("datavalidated", function () {
        heatLegendMap.set(
          "startValue",
          polygonSeriesMap.getPrivate("valueLow")
        );
        heatLegendMap.set("endValue", polygonSeriesMap.getPrivate("valueHigh"));
      });

      xAxisRadar.axisRanges.removeValue(axisRange0Radar);
      xAxisRadar.axisRanges.removeValue(axisRange1Radar);

      axisRange0Radar = xAxisRadar.createAxisRange(
        xAxisRadar.makeDataItem({
          above: true,
          value: 0,
          endValue: data.total_enrollment_rx,
        })
      );
      axisRange1Radar = xAxisRadar.createAxisRange(
        xAxisRadar.makeDataItem({
          above: true,
          value: data.total_enrollment_rx,
          endValue: 100,
        })
      );
      axisDataItemRadar.set("value", data.total_enrollment_rx);

      bulletRadar.get("sprite").on("rotation", function () {
        value = axisDataItemRadar.get("value");
        labelRadar.set("text", Math.round(value).toString() + "%");
      });

      var colorSet = am5.ColorSet.new(rootRadar, {});

      axisRange0Radar.get("axisFill").setAll({
        visible: true,
        fill: colorSet.getIndex(0),
      });

      axisRange0Radar.get("label").setAll({
        forceHidden: true,
      });

      axisRange1Radar.get("axisFill").setAll({
        visible: true,
        fill: colorSet.getIndex(4),
      });

      axisRange1Radar.get("label").setAll({
        forceHidden: true,
      });
    }
  );
}
