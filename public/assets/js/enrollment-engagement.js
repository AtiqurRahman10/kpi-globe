let funnelGraphc,
  rootHeatmap,
  rootRadar,
  chartRadar,
  containerHeatmap,
  chartHeatmap,
  seriesHeatmap,
  xAxisHeatmap,
  yAxisHeatmap,
  chartPieCHart,
  chartGuideChart,
  engagementChart,
  xAxisRadar,
  labelRadar,
  clockHandRadar,
  bulletRadar,
  axisDataItemRadar,
  axisRange1Radar,
  axisRange0Radar;

am5.ready(function () {
  am5.addLicense("AM5C329334656");
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element

  rootHeatmap = am5.Root.new("heattime");
  var doyleTheme = am5.Theme.new(rootHeatmap);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  rootHeatmap.setThemes([am5themes_Animated.new(rootHeatmap), doyleTheme]);

  var containerHeatmap = rootHeatmap.container.children.push(
    am5.Container.new(rootHeatmap, {
      width: am5.percent(95),
      height: am5.percent(95),
      layout: rootHeatmap.verticalLayout,
      x: am5.percent(50),
      centerX: am5.percent(50),
      y: am5.percent(50),
      centerY: am5.percent(50),
      // marginRight:am5.percent(5),
      // centerX:am5.percent(50)
    })
  );

  chartHeatmap = containerHeatmap.children.push(
    am5xy.XYChart.new(rootHeatmap, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: rootHeatmap.verticalLayout,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      // paddingBottom:0
    })
  );

  // Create axes and their renderers
  var yRenderer = am5xy.AxisRendererY.new(rootHeatmap, {
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

  yAxisHeatmap = chartHeatmap.yAxes.push(
    am5xy.CategoryAxis.new(rootHeatmap, {
      maxDeviation: 0,
      renderer: yRenderer,
      categoryField: "weekday",
    })
  );

  var xRenderer = am5xy.AxisRendererX.new(rootHeatmap, {
    visible: false,
    minGridDistance: 30,
    opposite: true,
  });

  xRenderer.grid.template.set("visible", false);

  xAxisHeatmap = chartHeatmap.xAxes.push(
    am5xy.CategoryAxis.new(rootHeatmap, {
      renderer: xRenderer,
      categoryField: "hour",
    })
  );

  var tooltip = am5.Tooltip.new(rootHeatmap, {
    autoTextColor: false,
    labelText: "{value}",
  });

  tooltip.label.setAll({
    fontSize: ".875rem",
    fontFamily: "Nunito Sans",
    fontWeight: 700,
  });

  seriesHeatmap = chartHeatmap.series.push(
    am5xy.ColumnSeries.new(rootHeatmap, {
      calculateAggregates: true,
      stroke: am5.color(0x1f2733),
      clustered: false,
      xAxis: xAxisHeatmap,
      yAxis: yAxisHeatmap,
      categoryXField: "hour",
      categoryYField: "weekday",
      valueField: "value",
      tooltip,
    })
  );

  seriesHeatmap.columns.template.setAll({
    tooltipText: "{value}",
    strokeOpacity: 1,
    strokeWidth: 2,
    width: am5.percent(100),
    height: am5.percent(100),
  });

  seriesHeatmap.set("heatRules", [
    {
      target: seriesHeatmap.columns.template,
      min: am5.color(0x92ebd7),
      max: am5.color(0x30098b),
      dataField: "value",
      key: "fill",
    },
  ]);

  yAxisHeatmap.data.setAll([]);
  xAxisHeatmap.data.setAll([]);
  seriesHeatmap.data.setAll([]);

  // Add export menu
  exporting1 = am5plugins_exporting.Exporting.new(rootHeatmap, {
    filePrefix: "Actual Enrolled Time of the Day",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  //Add export menu

  chartHeatmap.appear(1000, 100);

  rootHeatmap.events.on("frameended", exportChart);

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

    var xRenderer = xAxisHeatmap.get("renderer");
    var yRenderer = yAxisHeatmap.get("renderer");

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

  // pie chart
  var ctx4 = document.getElementById("pie-chart").getContext("2d");
  chartPieCHart = new Chart(ctx4, {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          label: "Time",
          weight: 9,
          cutout: 0,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 0,
          backgroundColor: ["#611bff", "#38d6ae", "#f82c91"],
          data: [],
          fill: false,
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
            display: false,
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
            display: false,
          },
        },
      },
    },
  });

  // guide chart

  var ctx2 = document.getElementById("mixed-chart").getContext("2d");
  chartGuideChart = new Chart(ctx2, {
    data: {
      labels: [],
      datasets: [
        {
          type: "bar",
          label: "Patients",
          weight: 5,
          tension: 0.5,
          borderWidth: 0,
          pointBackgroundColor: "#fa9cca",
          borderColor: "#fa9cca",
          backgroundColor: "#fa9cca",
          borderRadius: 4,
          borderSkipped: false,
          data: [],
          maxBarThickness: 10,
        },
        {
          type: "line",
          label: "Patients",
          tension: 0.5,
          borderWidth: 0,
          pointRadius: 0,
          pointBackgroundColor: "#fa9cca",
          borderColor: "#fa9cca",
          borderWidth: 3,
          backgroundColor: gradientStroke3,
          data: [],
          fill: true,
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
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            suggestedMin: 0,
            suggestedMax: 800,
            beginAtZero: true,
            color: "#b2b9bf",
            font: {
              size: 14,
              family: "Nunito Sans",
              style: "bold",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            suggestedMin: 0,
            suggestedMax: 800,
            beginAtZero: true,
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
    },
  });

  // engagment Preferences
  var ctx = document.getElementById("line-chart").getContext("2d");

  var gradientStroke1 = ctx.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  var gradientStroke3 = ctx.createLinearGradient(233, 236, 239, 50);
  gradientStroke3.addColorStop(1, "rgba(248, 44, 145, 0.3)");
  gradientStroke3.addColorStop(0.2, "rgba(248, 44, 145, 0.2)");
  gradientStroke3.addColorStop(0, "rgba(248, 44, 145, 0.1)");
  var gradientStroke2 = ctx.createLinearGradient(56, 214, 174, 50);
  gradientStroke2.addColorStop(1, "rgba(97, 27, 255, 0.2)");
  gradientStroke2.addColorStop(0.2, "rgba(97, 27, 255, 0.1)");
  gradientStroke2.addColorStop(0, "rgba(97, 27, 255, 0.05)"); //purple colors

  engagementChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Phone",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#f82c91",
          borderWidth: 3,
          backgroundColor: gradientStroke3,
          fill: true,
          data: [],
          maxBarThickness: 6,
        },
        {
          label: "Email",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#38d6ae",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          data: [],
          maxBarThickness: 6,
        },
        {
          label: "Text",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#611bff",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          data: [],
          maxBarThickness: 6,
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
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            suggestedMin: 0,
            suggestedMax: 800,
            beginAtZero: true,
            color: "#b2b9bf",
            font: {
              size: 14,
              family: "Nunito Sans",
              style: "bold",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            suggestedMin: 0,
            suggestedMax: 800,
            beginAtZero: true,
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
    },
  });

  // chart radar

  // Radar chart begins

  rootRadar = am5.Root.new("gague1");

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
    filePrefix: "Program Reach (NBRx)",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  //Add export menu

  chartRadar.appear(1000, 100);

  let ctx3 = document.getElementById("conversion-chart").getContext("2d");
  chartConversion = new Chart(ctx3, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Active",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#f82c91",
          borderWidth: 3,
          backgroundColor: gradientStroke3,
          fill: true,
          data: [55, 60, 200, 280, 300, 450, 380, 280, 527],
          maxBarThickness: 6,
        },
        {
          label: "Referred",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#38d6ae",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 505],
          maxBarThickness: 6,
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
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            min: 0,
            max: this.max, // Your absolute max value
            callback: function (value) {
              return ((value / this.max) * 100).toFixed(0) + "%"; // convert it to percentage
            },
            color: "#b2b9bf",
            font: {
              size: 14,
              family: "Nunito Sans",
              style: "bold",
              lineHeight: 2,
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Percentage",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            suggestedMin: 0,
            suggestedMax: 800,
            beginAtZero: true,
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
    },
  });

  var funnelData = {
    displayPercent: true,
    labels: ["Call Attempts", "Calls Completed", "Patients Enrolled"],
    colors: [["#f6ec70", "#f971b4", "#f82c91"]],
    values: [[1], [1], [1]],
  };
  funnelGraphc = new FunnelGraph({
    container: "#funnel_chart",
    gradientDirection: "vertical",
    data: funnelData,
    displayPercent: true,
    direction: "vertical",
    // subLabelValue: "raw",
  });
  funnelGraphc.draw();
  document.getElementById("toPdf").addEventListener("click", getPdf);
  document.getElementById("changetoPng").addEventListener("click", getPng);
}); // end am5.ready()

//download funnel chart start

function gethtml2canvasPng() {
  html2canvas(document.querySelector("#funnel_chart")).then((canvas) => {
    document.querySelector("#f11").append(canvas);
    let cvs = document.querySelector("#f11 canvas");
    let changetoPng = document.querySelector("#changetoPng");
    changetoPng.href = cvs.toDataURL();
    changetoPng.download = "Welcome Call Performance.png";
  });
}

function getPdf() {
  html2canvas(document.querySelector("#funnel_chart"), {
    backgroundColor: "#1A202C",
  }).then((canvas) => {
    let base64image = canvas.toDataURL("image/jpeg");
    let pdf = new jsPDF("landscape");
    pdf.addImage(base64image, "PNG", 80, 10, 150, 150);
    pdf.save("Welcome Call Performance.pdf");
  });
}
function getPng() {
  $("#f11 canvas").remove();
}
//download funnel chart End

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

function heattimeChartPng() {
  exporting1.download("png");
}

function heattimeChartPdf() {
  exporting1.download("pdf");
}

function gague1ChartPng() {
  exporting.download("png");
}

function gague1ChartPdf() {
  exporting.download("pdf");
}
//download amchart graph

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/enrollment-engagement.php",
    { key: filters },
    function (data111) {
      yAxisHeatmap.data.setAll(data111.heatmap_yaxis);
      xAxisHeatmap.data.setAll(data111.heatmap_xaxis);
      seriesHeatmap.data.setAll(data111.heatmap);

      // pie chart
      chartPieCHart.data.labels = data111.piechartLabel;
      chartPieCHart.data.datasets[0].data = data111.piechartValued;
      chartPieCHart.update();

      // guide chart
      chartGuideChart.data.labels = data111.guidechartLabel;
      chartGuideChart.data.datasets[0].data = data111.guidechartValued;
      chartGuideChart.data.datasets[1].data = data111.guidechartValued;
      chartGuideChart.update();

      engagementChart.data.labels = data111.preferenceMonth;
      engagementChart.data.datasets[0].data = data111.preferences.Phone;
      engagementChart.data.datasets[1].data = data111.preferences.Email;
      engagementChart.data.datasets[2].data = data111.preferences.Text;
      engagementChart.update();

      xAxisRadar.axisRanges.removeValue(axisRange0Radar);
      xAxisRadar.axisRanges.removeValue(axisRange1Radar);

      axisRange0Radar = xAxisRadar.createAxisRange(
        xAxisRadar.makeDataItem({
          above: true,
          value: 0,
          endValue: data111.total_nbrx_enrollment,
        })
      );
      axisRange1Radar = xAxisRadar.createAxisRange(
        xAxisRadar.makeDataItem({
          above: true,
          value: data111.total_nbrx_enrollment,
          endValue: 100,
        })
      );
      axisDataItemRadar.set("value", data111.total_nbrx_enrollment);

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

      $("#total_enrollment_num").html(data111.total_enrollment);
      $("#top_engagement_num").html(data111.top_engagement);

      var funnelData = {
        // displayPercent: true,
        // subLabelValue: "raw",
        labels: ["Call Attempts", "Calls Completed", "Patients Enrolled"],
        // subLabels: [' '],
        colors: ["#f6ec70", "#f971b4", "#f82c91"],
        values: data111.funnedata,
      };
      funnelGraphc.updateData(funnelData);
      funnelGraphc.updateData(funnelData);
      funnelGraphc.update(funnelData);
      funnelGraphc.update(funnelData);
      funnelGraphc.draw();
      gethtml2canvasPng();
    }
  );
}
