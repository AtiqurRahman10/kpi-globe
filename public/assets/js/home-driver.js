var rootSankey,
  rootRadar,
  chartRadar,
  containerSankey,
  SeriesSankey,
  xAxisRadar,
  labelRadar,
  clockHandRadar,
  bulletRadar,
  axisDataItemRadar,
  axisRange1Radar,
  axisRange0Radar,
  chartjsBar,
  rootWord,
  containerWord,
  seriesWord,
  chartPageView,
  chartPageView1;

am5.ready(function () {
  am5.addLicense("AM5C329334656");
  // line and area chart
  var ctx = document.getElementById("chart-line").getContext("2d");
  var gradientStroke1 = ctx.createLinearGradient(56, 214, 174, 50);
  gradientStroke1.addColorStop(1, "rgba(56, 214, 174,0.3)");
  gradientStroke1.addColorStop(0.2, "rgba(56, 214, 174, 0.2)");
  gradientStroke1.addColorStop(0, "rgba(56, 214, 174, 0.1)"); //purple colors
  var gradientStroke2 = ctx.createLinearGradient(233, 236, 239, 50);
  gradientStroke2.addColorStop(1, "rgba(233, 236, 239, 0.3)");
  gradientStroke2.addColorStop(0.2, "rgba(233, 236, 239, 0.2)");
  gradientStroke2.addColorStop(0, "rgba(233, 236, 239, 0.1)"); //purple colors
  chartPageView = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Mobile apps",
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
          label: "Websites",
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
  // Mixed chart
  var ctx2 = document.getElementById("mixed-chart").getContext("2d");
  chartPageView1 = new Chart(ctx2, {
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
          backgroundColor: gradientStroke2,
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

//download chart graph

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/home-driver.php",
    { key: filters },
    function (data111) {
      // bar chart

      console.log(chartjsBar.data);
      chartjsBar.data.labels = data111.signup_time.label;
      chartjsBar.data.datasets[0].data = data111.signup_time.data;
      // chartjsBar.data.datasets[0].data[2] = 50; // Would update the first dataset's value of 'March' to be 50
      chartjsBar.update(); // Calling update now animates the position of March from 90 to 50.

      chartPageView.data.labels = data111.date_range;
      chartPageView.data.datasets[0].data = data111.user_enggement.total_views;
      chartPageView.data.datasets[1].data =
        data111.user_enggement.total_visitor;
      chartPageView.data.datasets[2].data = data111.user_enggement.total_unique;
      chartPageView.update();

      // word cloud
      seriesWord.data.setAll(data111.wordcloud);

      SeriesSankey.data.setAll(data111.journey_data);

      xAxisRadar.axisRanges.removeValue(axisRange0Radar);
      xAxisRadar.axisRanges.removeValue(axisRange1Radar);

      axisRange0Radar = xAxisRadar.createAxisRange(
        xAxisRadar.makeDataItem({
          above: true,
          value: 0,
          endValue: data111.retention_data,
        })
      );
      axisRange1Radar = xAxisRadar.createAxisRange(
        xAxisRadar.makeDataItem({
          above: true,
          value: data111.retention_data,
          endValue: 100,
        })
      );
      axisDataItemRadar.set("value", data111.retention_data);

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
