let funnelGraph, chartDevice, chartSignupTime;
$(document).ready(function () {
  var dataExample1 = {
    labels: [
      "Fulfillment Support Request",
      "Benefits/Sample Verified",
      "Medication Shipped",
    ],
    subLabels: ["Patient Site"],
    colors: [["#92ebd7", "#78c2b7", "#5e9a98", "#447178", "#3f6971"]],
    values: [[4500], [3200], [900]],
  };
  var dataExample2 = {
    labels: [
      "Fulfillment Support Request",
      "Benefits/Sample Verified",
      "Medication Shipped",
    ],
    subLabels: ["Patient Site"],
    colors: [["#92ebd7", "#78c2b7", "#5e9a98", "#447178", "#3f6971"]],
    values: [[450], [210], [30]],
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
  document.querySelector("#useData2").addEventListener("click", function () {
    graph.updateData(dataExample2);
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
    toPng.download = "Program Overview.png";
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
    pdf.save("Program Overview.pdf");
  });
}

//download funnel chart End

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
