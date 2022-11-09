let funnelGraph, chartDevice, chartSignupTime;
am5.ready(function () {
  am5.addLicense("AM5C329334656");

  //treat-rx- chart
  var root = am5.Root.new("treat-rx");

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
  exporting = am5plugins_exporting.Exporting.new(root, {
    filePrefix: "Total Start Treatment/NBRx",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });

  // Make stuff animate on load
  chart.appear(1000, 100);

  //treat-rx-chart

  var ctx = document.getElementById("chart-line").getContext("2d");
  var gradientStroke1 = ctx.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  var gradientStroke2 = ctx.createLinearGradient(233, 236, 239, 50);
  gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
  gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
  gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)");
  var gradientStroke3 = ctx.createLinearGradient(233, 236, 239, 50);
  gradientStroke3.addColorStop(1, "rgba(97, 27, 255, 0.3)");
  gradientStroke3.addColorStop(0.2, "rgba(97, 27, 255, 0.2)");
  gradientStroke3.addColorStop(0, "rgba(97, 27, 255, 0.1)");
  //purple colors
  safeReturnsEngagement = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Patient Portal Signup",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#38d6ae",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          maxBarThickness: 6,
        },
        {
          label: "Sharp Containers Shipped",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#611bff",
          borderWidth: 3,
          backgroundColor: gradientStroke3,
          fill: true,
          data: [290, 290, 340, 90, 40, 140, 290, 230, 400],
          maxBarThickness: 6,
        },
        {
          label: "Guide Refferal",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#e9ecef",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
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
            color: "#b2b9bf",
            font: {
              size: 15,
              family: "Nunito Sans",
              style: "normal",
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
            suggestedMin: 1000,
            suggestedMax: 2000,
            beginAtZero: true,
            padding: 10,
            font: {
              size: 15,
              family: "Nunito Sans",
              style: "normal",
              lineHeight: 2,
            },
            color: "#b2b9bf",
          },
        },
      },
    },
  });

  var ctx2 = document.getElementById("chart-line2").getContext("2d");
  var gradientStroke1 = ctx2.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  var gradientStroke2 = ctx2.createLinearGradient(233, 236, 239, 50);
  gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
  gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
  gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
  traningChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Fulfilled",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#38d6ae",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          maxBarThickness: 6,
        },
        {
          label: "Injection Training",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#e9ecef",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
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
            color: "#b2b9bf",
            font: {
              size: 15,
              family: "Nunito Sans",
              style: "normal",
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
            suggestedMin: 1000,
            suggestedMax: 2000,
            beginAtZero: true,
            padding: 10,
            font: {
              size: 15,
              family: "Nunito Sans",
              style: "normal",
              lineHeight: 2,
            },
            color: "#b2b9bf",
          },
        },
      },
    },
  });

  //Fulfillment To Start Treatment Content
  var root = am5.Root.new("enrollsankey");
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);

  // Set themes
  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.percent(95),
      height: am5.percent(95),
      layout: root.horizontalLayout,
      centerX: am5.percent(50),
      x: am5.percent(50),
      centerY: am5.percent(50),
      y: am5.percent(50),
    })
  );

  // Create series
  //
  var series = container.children.push(
    am5flow.Sankey.new(root, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value",
      paddingLeft: 14,
      nodePadding: 7,
      nodeAlign: "right",
      nodeWidth: 10,
    })
  );
  var series = root.container.children.push(
    am5flow.Sankey.new(root, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value",
      paddingLeft: 30,
      nodePadding: 7,
      nodeAlign: "right",
      idField: "id",
      nodeWidth: 10,
    })
  );
  series.nodes.setAll({
    idField: "id",
    nameField: "name",
    fillField: "color",
  });

  series.nodes
    .get("colors")
    .set("colors", [
      am5.color(0x38d6ae),
      am5.color(0xf82c91),
      am5.color(0x611bff),
      am5.color(0x0dbeff),
      am5.color(0xf94902),
      am5.color(0xf2e403),
    ]);
  series.nodes.labels.template.setAll({
    fontSize: ".875rem",
    // maxWidth: 150,
    wrap: true,
    x: am5.percent(50),
    centerX: am5.percent(50),
    y: am5.percent(50),
    centerY: am5.percent(100),
    paddingLeft: 00,
    paddingRight: 0,
    rotation: -90,
  });
  series.nodes.data.setAll([
    { id: "A", name: "Patient Fulfilled" },
    { id: "B", name: "Patient Not Fulfilled" },
    { id: "C", name: "Injection training Requested" },
    { id: "D", name: "Content 1" },
    { id: "E", name: "Content 2" },
    { id: "F", name: "Content 3" },
    { id: "G", name: "Injection training Requested" },
    { id: "H", name: "Content 1" },
    { id: "I", name: "Content 2" },
    { id: "J", name: "Content 3" },
    { id: "K", name: "Injection training Requested" },
    { id: "L", name: "Injection training not requested" },
  ]);

  // Set data
  //
  series.data.setAll([
    { from: "A", to: "C", value: 10 },
    { from: "A", to: "L", value: 10 },
    { from: "B", to: "C", value: 10 },
    { from: "B", to: "L", value: 3 },
    { from: "C", to: "D", value: 3 },
    { from: "C", to: "E", value: 3 },
    { from: "C", to: "F", value: 3 },
    { from: "C", to: "L", value: 3 },
    { from: "D", to: "G", value: 3 },
    { from: "D", to: "L", value: 1 },
    { from: "E", to: "G", value: 3 },
    { from: "E", to: "L", value: 1 },
    { from: "F", to: "L", value: 1 },
    { from: "F", to: "G", value: 3 },
    { from: "G", to: "L", value: 1 },
    { from: "G", to: "H", value: 6 },
    { from: "G", to: "I", value: 6 },
    { from: "G", to: "J", value: 6 },
    { from: "G", to: "K", value: 3 },
  ]);

  // Add export menu
  exporting1 = am5plugins_exporting.Exporting.new(root, {
    filePrefix: "Fulfillment To Start Treatment Content",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  //Add export menu

  // Make stuff animate on load
  series.appear(1000, 100);

  root.events.on("frameended", exportChart4);
  function exportChart4() {
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

    series.nodes.labels.template.setAll({
      fontSize: ff + "rem",
    });
    if (jQuery(window).width() > 1512) {
      series.nodes.rectangles.template.setAll({
        minWidth: width * 10,
      });
    } else {
      series.nodes.rectangles.template.setAll({
        minWidth: width * 10,
      });
    }
  }
});

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
  pdf.addImage(canvasImage, "JPEG", 30, 15, 230, 150);
  pdf.save(title);
}
//download chart graph pdf end

//download amchart graph
function treatChartPng() {
  exporting.download("png");
}
function treatChartPdf() {
  exporting.download("pdf");
}

function enrollsankeyChartPng() {
  exporting1.download("png");
}
function enrollsankeyChartPdf() {
  exporting1.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/treatment-engagement.php",
    { key: filters },
    function (data111) {
      var funnelData = {
        displayPercent: true,
        subLabelValue: "raw",
        labels: [
          "Patient Visits and Sign Ups",
          "Sign Up Page Visits",
          "Forms Submitted",
        ],
        subLabels: data111.signup_method,
        colors: [
          ["#fa9567", "#f971b4", "#f82c91"],
          ["#ceb4ff", "#925aff"],
          ["#83deff", "#7795FF"],
        ],
        values: data111.signup_overview,
      };
      funnelGraph.updateData(funnelData);
      funnelGraph.update(funnelData);

      $("#signup_reject_percent").html(data111.signuppge_reject_page);
      $("#signup_reject_percent_progress").css(
        "width",
        data111.signuppge_reject_page + "%"
      );

      $("#signup_reject_percent_drop").html(data111.signuppge_reject);
      $("#signup_reject_percent_drop_progress").css(
        "width",
        data111.signuppge_reject + "%"
      );

      chartDevice.data.labels = data111.device_type_month;
      chartDevice.data.datasets[0].data = data111.device_type.mobile;
      chartDevice.data.datasets[1].data = data111.device_type.desktop;
      chartDevice.update();

      chartSignupTime.data.labels = data111.signup_time_month;
      chartSignupTime.data.datasets[0].data = data111.signup_time.PatientSite;
      chartSignupTime.data.datasets[1].data = data111.signup_time.HCPSite;
      chartSignupTime.data.datasets[2].data = data111.signup_time.PatientText;
      chartSignupTime.update();
    }
  );
}
