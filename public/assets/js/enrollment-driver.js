const BASE_WIDTH = 1512;
am5.ready(function () {
  am5.addLicense("AM5C329334656");

  //jcp venn start
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

  // root.events.on("frameended", exportChart);

  // function exportChart() {
  //   var width = jQuery(window).width() / BASE_WIDTH;
  //   var ff = 0.875 * width;

  //   if (jQuery(window).width() > 1920) {
  //     ff = 0.7 * width;
  //   }
  //   if (jQuery(window).width() > 3000) {
  //     ff = 0.5 * width;
  //   }
  //   if (jQuery(window).width() > 5000) {
  //     ff = 0.3 * width;
  //   }

  //   chart.labels.template.setAll({
  //     text: "{value}",
  //     fontSize: ff + "rem",
  //     fill: am5.color(0xb2b9bf),
  //   });
  //   legend2.labels.template.setAll({
  //     fontSize: ff + "rem",
  //     fontWeight: "500",
  //   });

  //   legend2.markers.template.setAll({
  //     width: 12 * width,
  //     height: 12 * width,
  //   });

  //   legend2.markers.template.setAll({
  //     width: 12 * ff,
  //     height: 12 * ff,
  //   });
  // }

  // Add export menu
  exporting = am5plugins_exporting.Exporting.new(root, {
    filePrefix: "Enrollment Overlap",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  //Add export menu

  // chart.appear(1000, 100);

  //jcp venn end
  var ctx = document.getElementById("chart-line").getContext("2d");
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
  chartJCPReferral = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Warm Call Transfer",
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
          label: "Text",
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
        {
          label: "Website",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#611bff",
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
  // Mixed chart
  var ctx2 = document.getElementById("mixed-chart").getContext("2d");
  mixed_chart = new Chart(ctx2, {
    data: {
      labels: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP7", "SP8"],
      datasets: [
        {
          type: "bar",
          label: "Partners",
          weight: 5,
          tension: 0.5,
          borderWidth: 0,
          pointBackgroundColor: "#fa9cca",
          borderColor: "#fa9cca",
          backgroundColor: "#fa9cca",
          borderRadius: 4,
          borderSkipped: false,
          data: [50, 40, 300, 220, 500, 250, 400, 230],
          maxBarThickness: 10,
        },
        {
          type: "line",
          label: "Partners",
          tension: 0.5,
          borderWidth: 0,
          pointRadius: 0,
          pointBackgroundColor: "#fa9cca",
          borderColor: "#fa9cca",
          borderWidth: 3,
          backgroundColor: gradientStroke3,
          data: [50, 40, 300, 220, 500, 250, 400, 230],
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
  var ctx3 = document.getElementById("chart-line-2").getContext("2d");
  var gradientStroke1 = ctx3.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  var gradientStroke3 = ctx3.createLinearGradient(233, 236, 239, 50);
  gradientStroke3.addColorStop(1, "rgba(248, 44, 145, 0.3)");
  gradientStroke3.addColorStop(0.2, "rgba(248, 44, 145, 0.2)");
  gradientStroke3.addColorStop(0, "rgba(248, 44, 145, 0.1)");
  var gradientStroke2 = ctx3.createLinearGradient(56, 214, 174, 50);
  gradientStroke2.addColorStop(1, "rgba(97, 27, 255, 0.2)");
  gradientStroke2.addColorStop(0.2, "rgba(97, 27, 255, 0.1)");
  gradientStroke2.addColorStop(0, "rgba(97, 27, 255, 0.05)");
  var gradientStroke4 = ctx3.createLinearGradient(56, 214, 174, 50);
  gradientStroke4.addColorStop(1, "rgba(249, 73, 2, 0.2)");
  gradientStroke4.addColorStop(0.2, "rgba(249, 73, 2, 0.1)");
  gradientStroke4.addColorStop(0, "rgba(249, 73, 2, 0.05)"); //purple colors
  chartPatientsAssisted = new Chart(ctx3, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "1-833-WITHME",
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
          label: "JCP",
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
        {
          label: "MicroSiteHCP",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#611bff",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          data: [30, 90, 40, 140, 290, 290, 340, 250, 400],
          maxBarThickness: 6,
        },
        {
          label: "MicroSitePat",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#f94902",
          borderWidth: 3,
          backgroundColor: gradientStroke4,
          fill: true,
          data: [35, 70, 200, 100, 190, 390, 370, 240, 450],
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
});

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

//download amchart graph

function jcpvennChartPng() {
  exporting.download("png");
}

function jcpvennChartPdf() {
  exporting.download("pdf");
}
//download amchart graph

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/enrollment-driver.php",
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
