let rootSankey,
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
  chartPageView;
am5.ready(function () {
  am5.addLicense("AM5C329334656");
  var dataExample1 = {
    labels: ["Started Treatment", "Refill Reminder", "Refilled Rx"],
    subLabels: ["Patient Site", "HCP Site", "Patient Text"],
    colors: [
      ["#fa9567", "#f971b4", "#f82c91"],
      ["#ceb4ff", "#925aff"],
      ["#83deff", "#7795FF"],
    ],
    values: [
      [4500, 3500, 4000],
      [3200, 2200, 2700],
      [2200, 1200, 2100],
    ],
  };
  var dataExample3 = {
    labels: ["Started Treatment", "1st Refill", "2nd Refill", "3rd Refill"],
    subLabels: ["Patient Site", "HCP Site", "Patient Text"],
    colors: [
      ["#fa9567", "#f971b4", "#f82c91"],
      ["#ceb4ff", "#925aff"],
      ["#83deff", "#0dbeff"],
    ],
    values: [
      [2500, 1500, 2000],
      [1200, 800, 1200],
      [600, 500, 800],
      [300, 200, 500],
    ],
  };
  var graph = new FunnelGraph({
    container: ".funnel",
    gradientDirection: "horizontal",
    data: dataExample1,
    displayPercent: true,
    direction: "horizontal",
    subLabelValue: "raw",
  });
  graph.draw();
  gethtml2canvasPng();

  // direction methods
  document.querySelector("#useData1").addEventListener("click", function () {
    graph.updateData(dataExample1);
    $("#f2 canvas").remove();
    gethtml2canvasPng();
  });
  document.querySelector("#useData3").addEventListener("click", function () {
    graph.updateData(dataExample3);
    $("#f2 canvas").remove();
    gethtml2canvasPng();
  });
  document.getElementById("toPdf").addEventListener("click", getPdf);
  document.getElementById("toPng").addEventListener("click", getPng);
});

//download funnel chart

function gethtml2canvasPng() {
  html2canvas(document.querySelector("#funnel_chart")).then((canvas) => {
    document.querySelector("#f2").append(canvas);
    let cvs = document.querySelector("#f2 canvas");
    let toPng = document.querySelector("#toPng");
    toPng.href = cvs.toDataURL();
    toPng.download = "Keep Momentum Overview.png";
  });
}
function getPng() {
  $("#f2 canvas").remove();
}

function getPdf() {
  html2canvas(document.querySelector("#funnel_chart"), {
    backgroundColor: "#1A202C",
  }).then((canvas) => {
    let base64image = canvas.toDataURL("image/jpeg");
    let pdf = new jsPDF("landscape");
    pdf.addImage(base64image, "PNG", 30, 30, 230, 130);
    pdf.save("Keep Momentum Overview.pdf");
  });
}

//download funnel chart End

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/momentum-overview.php",
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
      gethtml2canvasPng();
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
