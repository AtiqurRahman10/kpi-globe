let rootMap,
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

  // Create root
  rootMap = am5.Root.new("us-heatmap2");

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

  polygonSeriesMap.data.setAll([
    { id: "US-AL", value: 4447110 },
    { id: "US-AK", value: 6206932 },
    { id: "US-AZ", value: 5130632 },
    { id: "US-AR", value: 2673400 },
    { id: "US-CA", value: 3387164 },
    { id: "US-CO", value: 4301261 },
    { id: "US-CT", value: 3405565 },
    { id: "US-DE", value: 7830600 },
    { id: "US-FL", value: 1598237 },
    { id: "US-GA", value: 8186453 },
    { id: "US-HI", value: 12110537 },
    { id: "US-ID", value: 1293953 },
    { id: "US-IL", value: 2419293 },
    { id: "US-IN", value: 6080485 },
    { id: "US-IA", value: 2926324 },
    { id: "US-KS", value: 2688418 },
    { id: "US-KY", value: 4041769 },
    { id: "US-LA", value: 4468976 },
    { id: "US-ME", value: 1274923 },
    { id: "US-MD", value: 5296486 },
    { id: "US-MA", value: 3490097 },
    { id: "US-MI", value: 9938444 },
    { id: "US-MN", value: 4919479 },
    { id: "US-MS", value: 2844658 },
    { id: "US-MO", value: 5595211 },
    { id: "US-MT", value: 9020195 },
    { id: "US-NE", value: 1711263 },
    { id: "US-NV", value: 1998257 },
    { id: "US-NH", value: 1235786 },
    { id: "US-NJ", value: 8414350 },
    { id: "US-NM", value: 1819046 },
    { id: "US-NY", value: 8976457 },
    { id: "US-NC", value: 8049313 },
    { id: "US-ND", value: 6422000 },
    { id: "US-OH", value: 1353140 },
    { id: "US-OK", value: 3450654 },
    { id: "US-OR", value: 3421399 },
    { id: "US-PA", value: 2281054 },
    { id: "US-RI", value: 2048319 },
    { id: "US-SC", value: 4012012 },
    { id: "US-SD", value: 7524844 },
    { id: "US-TN", value: 5689283 },
    { id: "US-TX", value: 2851820 },
    { id: "US-UT", value: 2233169 },
    { id: "US-VT", value: 6108827 },
    { id: "US-VA", value: 7078515 },
    { id: "US-WA", value: 5894121 },
    { id: "US-WV", value: 1808344 },
    { id: "US-WI", value: 5363675 },
    { id: "US-WY", value: 4937082 },
  ]);

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

  var root = am5.Root.new("enroll-total-rx-2");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });
  doyleTheme.rule("ColorSet").set("colors", [am5.color(0x38d6ae)]);

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/radar-chart/
  var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360,
    })
  );

  chart.getNumberFormatter().set("numberFormat", "#'%'");

  // Create axis and its renderer
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
  var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    innerRadius: -40,
  });

  axisRenderer.grid.template.setAll({
    stroke: root.interfaceColors.get("background"),
    visible: true,
    strokeOpacity: 0.8,
  });

  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: 100,
      strictMinMax: true,
      renderer: axisRenderer,
    })
  );

  // Add clock hand
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
  var axisDataItem = xAxis.makeDataItem({});

  var clockHand = am5radar.ClockHand.new(root, {
    pinRadius: 50,
    radius: am5.percent(100),
    innerRadius: 50,
    bottomWidth: 0,
    topWidth: 0,
  });

  clockHand.pin.setAll({
    fillOpacity: 0,
    strokeOpacity: 0.5,
    stroke: am5.color(0xb2b9bf),
    strokeWidth: 1.5,
    strokeDasharray: [2, 2],
  });
  clockHand.hand.setAll({
    fillOpacity: 0,
    strokeOpacity: 0.5,
    stroke: am5.color(0xb2b9bf),
    strokeWidth: 2,
  });

  var bullet = axisDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: clockHand,
    })
  );

  xAxis.createAxisRange(axisDataItem);

  var label = chart.radarContainer.children.push(
    am5.Label.new(root, {
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em",
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
      easing: am5.ease.out(am5.ease.cubic),
    });

    axisRange0.animate({
      key: "endValue",
      to: value,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });

    axisRange1.animate({
      key: "value",
      to: value,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }, 2000);

  chart.bulletsContainer.set("mask", undefined);

  var colorSet = am5.ColorSet.new(root, {});

  var axisRange0 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      above: true,
      value: 0,
      endValue: 50,
    })
  );

  axisRange0.get("axisFill").setAll({
    visible: true,
    fill: colorSet.getIndex(0),
  });

  axisRange0.get("label").setAll({
    forceHidden: true,
  });

  var axisRange1 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      above: true,
      value: 50,
      endValue: 100,
    })
  );

  axisRange1.get("axisFill").setAll({
    visible: true,
    fill: colorSet.getIndex(4),
  });

  axisRange1.get("label").setAll({
    forceHidden: true,
  });

  // Add export menu
  exporting = am5plugins_exporting.Exporting.new(root, {
    filePrefix: "Total Fulfillment/Total RX",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });

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
  chart.appear(1000, 100);

  // age group bar chart

  var ctx = document.getElementById("chart-bars").getContext("2d");
  chartjsBarAge = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "0-9",
        "10-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70-79",
        "80+",
      ],
      datasets: [
        {
          label: "Male",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#0dbeff",
          data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
          maxBarThickness: 10,
        },
        {
          label: "Female",
          tension: 0.8,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#f82c91",
          data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
          maxBarThickness: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
  //   chartjsBarAge.show();
}); // end am5.ready()

//download chart graph png

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
//download chart graph png end

//download chart graph pdf

function downloadPDFChart(a, title) {
  const canvas = document.getElementById(a);
  const canvasImage = canvas.toDataURL("image/jpeg", 1.0);
  let pdf = new jsPDF("landscape");
  pdf.setFontSize(200);
  pdf.addImage(canvasImage, "JPEG", 70, 15, 170, 150);
  pdf.save(title);
}
//download chart graph pdf end

// download amchart
function enrollChartPng() {
  exporting.download("png");
}

function enrollChartPdf() {
  exporting.download("pdf");
}
function heatChartPng() {
  exporting1.download("png");
}

function heatChartPdf() {
  exporting1.download("pdf");
}

//download amchart end

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
