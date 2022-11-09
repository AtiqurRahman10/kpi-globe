let funnelGraph, chartDevice, chartSignupTime;
$(document).ready(function () {
  var funnelData = {
    displayPercent: true,
    subLabelValue: "raw",
    labels: ["Microsite Visits", "Sign Up Page Visits", "Form Completion"],
    subLabels: ["Patient Site", "HCP Site", "Patient Text"],
    colors: [
      ["#fa9567", "#f971b4", "#f82c91"],
      ["#ceb4ff", "#925aff"],
      ["#83deff", "#7795FF"],
    ],
    values: [],
  };
  funnelGraph = new FunnelGraph({
    container: "#funnel_chart",
    gradientDirection: "horizontal",
    data: funnelData,
    displayPercent: true,
    direction: "horizontal",
    subLabelValue: "raw",
  });
  funnelGraph.draw();
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
    toPng.download = "Enrollment Overview.png";
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
    pdf.save("Enrollment-Overview.pdf");
  });
}

//download funnel chart End

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/enrollment-overview.php",
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
