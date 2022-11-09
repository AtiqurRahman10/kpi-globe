am5.ready(function () {
  am5.addLicense("AM5C329334656");

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("fulfill-rx");

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
    filePrefix: "Total Fulfillment VS NBRx",
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

  //Start bar-chart
  var ctx = document.getElementById("chart-bars").getContext("2d");
  chartAfterEnrollment = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Days",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#b2b9bf",
          data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
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
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
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
  //End bar-chart

  //Start line-chart

  var ctx2 = document.getElementById("chart-line").getContext("2d");
  var gradientStroke1 = ctx2.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  var gradientStroke2 = ctx2.createLinearGradient(233, 236, 239, 50);
  gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
  gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
  gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
  chartWeeklyFulfillment = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Enrolled",
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
          label: "Fulfilled",
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
  //End line-chart

  //start Polar chart
  var ctx3 = document.getElementById("polar-chart").getContext("2d");
  ctx3.canvas.width = 300;
  ctx3.canvas.height = 300;
  chartGuideReferrals = new Chart(ctx3, {
    type: "polarArea",
    data: {
      labels: ["JCP Care", "So Simple", "Janssen Link", "JCP Savings"],
      datasets: [
        {
          label: "My First Dataset",
          data: [7, 4, 7, 3],
          backgroundColor: ["#38d6ae", "#3A416F", "#a8b8d8", "#e9ecef"],
        },
      ],
    },
    options: {
      scale: {
        ticks: {
          display: false,
          maxTicksLimit: 1,
        },
        title: {
          color: "#b2b9bf",
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
    },
  });
  //end Polar chart

  //Start line-chart-2

  var ctx4 = document.getElementById("chart-line2").getContext("2d");
  var gradientStroke1 = ctx4.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  chartCostAnalysis = new Chart(ctx4, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Samples",
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: "#38d6ae",
          borderColor: "#38d6ae",
          borderWidth: 2,
          backgroundColor: gradientStroke1,
          data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
          maxBarThickness: 6,
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
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
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
        y: {
          grid: {
            drawBorder: false,
            display: false,
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
  //End line-chart-2

  //start line-chart-3
  var ctx5 = document.getElementById("chart-line3").getContext("2d");
  var gradientStroke1 = ctx5.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)");
  var gradientStroke2 = ctx5.createLinearGradient(233, 236, 239, 50);
  gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
  gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
  gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
  chartProgramConversion = new Chart(ctx5, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Converted",
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: "#38d6ae",
          borderColor: "#38d6ae",
          borderWidth: 2,
          backgroundColor: gradientStroke1,
          data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
          maxBarThickness: 6,
          fill: true,
        },
        {
          label: "Did Not Convert",
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: "#e9ecef",
          borderColor: "#e9ecef",
          borderWidth: 2,
          backgroundColor: gradientStroke2,
          data: [30, 25, 32, 41, 30, 33, 30, 12, 29],
          maxBarThickness: 6,
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
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
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
        y: {
          grid: {
            drawBorder: false,
            display: false,
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
  //end line-chart-3
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
  pdf.addImage(canvasImage, "JPEG", 90, 15, 130, 150);
  pdf.save(title);
}
//download chart graph pdf end

//download amchart

$("#radarChartPng").on("click", function () {
  exporting.download("png");
});
$("#radarChartPdf").on("click", function () {
  exporting.download("pdf");
});

//download amchart end

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/fulfillment-overview.php",
    { key: filters },
    function (data111) {
      var funnelData = {
        displayPercent: true,
        subLabelValue: "raw",
        labels: [
          "Sign Up Form Completion",
          "Enrollment Calls Completed",
          "Patients Enrolled",
        ],
        subLabels: data111.enrollment_method,
        colors: [
          ["#fa9567", "#f971b4", "#f82c91"],
          ["#ceb4ff", "#925aff"],
          ["#83deff", "#7795FF"],
        ],
        values: data111.enrollment_overview,
      };
      funnelGraph.updateData(funnelData);
      funnelGraph.update(funnelData);

      $("#signup_welcome_percent").html(data111.signup_welcome);
      $("#signup_welcome_percent_progress").css(
        "width",
        data111.signup_welcome + "%"
      );

      $("#welcome_enrollment_percent").html(data111.welcome_enrollment);
      $("#welcome_enrollment_percent_progress").css(
        "width",
        data111.welcome_enrollment + "%"
      );
    }
  );
}
