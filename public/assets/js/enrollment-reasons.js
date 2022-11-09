let chartReasonEnroll,
  chartReasonNotEnroll,
  rootSankey,
  rootRadar,
  chartRadar,
  containerSankey,
  seriesSankey,
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
  // Sankey Chart Begins

  rootSankey = am5.Root.new("enroll-to-content");

  var doyleTheme = am5.Theme.new(rootSankey);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  rootSankey.setThemes([am5themes_Animated.new(rootSankey), doyleTheme]);

  containerSankey = rootSankey.container.children.push(
    am5.Container.new(rootSankey, {
      width: am5.percent(95),
      height: am5.percent(95),
      layout: rootSankey.horizontalLayout,
      centerX: am5.percent(50),
      x: am5.percent(50),
      centerY: am5.percent(50),
      y: am5.percent(50),
    })
  );
  seriesSankey = containerSankey.children.push(
    am5flow.Sankey.new(rootSankey, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value",
      paddingRight: 90,
      paddingBottom: 20,
    })
  );
  seriesSankey.nodes.setAll({
    idField: "id",
    nameField: "name",
    // fillField: "color"
  });

  seriesSankey.nodes
    .get("colors")
    .set("colors", [
      am5.color(0x38d6ae),
      am5.color(0x576877),
      am5.color(0xbfbfbf),
      am5.color(0x061a32),
      am5.color(0x92ebd7),
      am5.color(0xb61d69),
      am5.color(0x81d9c5),
      am5.color(0x92ebd7),
    ]);

  seriesSankey.nodes.data.setAll([
    { id: "A", name: "Patient Enrolled", color: am5.color(0x54a0ff) },
    { id: "B", name: "Patient Not Enrolled", color: am5.color(0x54a0ff) },
    { id: "C", name: "Portal Account Setup", color: am5.color(0x10ac84) },
    { id: "D", name: "Portal Account Not Setup", color: am5.color(0x10ac84) },
    { id: "E", name: "Content 01", color: am5.color(0x54a0ff) },
    { id: "G", name: "Content 02", color: am5.color(0x54a0ff) },
    { id: "H", name: "Content 03", color: am5.color(0x54a0ff) },
    { id: "I", name: "Content 04", color: am5.color(0x54a0ff) },
    { id: "J", name: "Content 05", color: am5.color(0x54a0ff) },
    { id: "K", name: "Content 06", color: am5.color(0x54a0ff) },
    { id: "L", name: "Drop", color: am5.color(0x10ac84) },
  ]);
  seriesSankey.nodes.get("colors").set("step", 2);

  seriesSankey.nodes.labels.template.setAll({
    fontSize: ".875rem",
    maxWidth: 100,
    wrap: true,
    fontFamily: "Nunito Sans",
  });

  // rootSankey
  // Add export menu
  exporting1 = am5plugins_exporting.Exporting.new(rootSankey, {
    filePrefix: "Portal Content Flow",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });

  // Make stuff animate on load
  seriesSankey.appear(1000, 100);

  // Sankey Chart Ends

  //force-directed-performance

  var root = am5.Root.new("force-performance");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });
  doyleTheme
    .rule("ColorSet")
    .set("colors", [
      am5.color(0xffd51c),
      am5.color(0x611bff),
      am5.color(0xf82c91),
      am5.color(0xf94902),
      am5.color(0xf94902),
      am5.color(0x0dbeff),
      am5.color(0x279c7f),
      am5.color(0x66e2c7),
      am5.color(0x611bff),
    ]);

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);

  var data = {
    name: "Root",
    value: 0,
    children: [
      {
        name: "Cost Support",
        linkWith: ["5"],
        children: [
          {
            name: "Enrollment",
            value: 1,
          },
          {
            name: "Overview",
            value: 1,
          },
          {
            name: "Drivers",
            value: 1,
          },
          {
            name: "Demographics",
            value: 1,
          },
          {
            name: "Engagement",
            value: 1,
          },
        ],
      },

      {
        name: "Injection",
        linkWith: ["5"],
        children: [
          {
            name: "Enrollment",
            value: 1,
          },
          {
            name: "Overview",
            value: 1,
          },
          {
            name: "Drivers",
            value: 1,
          },
          {
            name: "Demographics",
            value: 1,
          },
          {
            name: "Engagement",
            value: 1,
          },
        ],
      },
      {
        name: "Side Effects",
        linkWith: ["5"],
        children: [
          {
            name: "Enrollment",
            value: 1,
          },
          {
            name: "Overview",
            value: 1,
          },
          {
            name: "Drivers",
            value: 1,
          },
          {
            name: "Demographics",
            value: 1,
          },
          {
            name: "Engagement",
            value: 1,
          },
        ],
      },
      {
        name: "Refills",
        linkWith: ["5"],
        children: [
          {
            name: "Enrollment",
            value: 1,
          },
          {
            name: "Overview",
            value: 1,
          },
          {
            name: "Drivers",
            value: 1,
          },
          {
            name: "Demographics",
            value: 1,
          },
          {
            name: "Engagement",
            value: 1,
          },
        ],
      },
      {
        name: "Mental Health",
        linkWith: ["5"],
        children: [
          {
            name: "Enrollment",
            value: 1,
          },
          {
            name: "Overview",
            value: 1,
          },
          {
            name: "Drivers",
            value: 1,
          },
          {
            name: "Demographics",
            value: 1,
          },
          {
            name: "Engagement",
            value: 1,
          },
        ],
      },
      {
        name: "Other",
        linkWith: ["5"],
        children: [
          {
            name: "Enrollment",
            value: 1,
          },
          {
            name: "Overview",
            value: 1,
          },
          {
            name: "Drivers",
            value: 1,
          },
          {
            name: "Demographics",
            value: 1,
          },
          {
            name: "Engagement",
            value: 1,
          },
        ],
      },
    ],
  };

  // Create wrapper container
  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      layout: root.verticalLayout,
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
  var series = container.children.push(
    am5hierarchy.ForceDirected.new(root, {
      singleBranchOnly: false,
      downDepth: 1,
      topDepth: 1,
      maxRadius: 60,
      minRadius: 35,
      valueField: "value",
      categoryField: "name",
      childDataField: "children",
      idField: "name",
      linkWithStrength: 0.4,
      linkWithField: "linkWith",
      manyBodyStrength: -5,
      centerStrength: 0.4,
    })
  );

  series.get("colors").set("step", 2);

  series.data.setAll([data]);
  series.set("selectedDataItem", series.dataItems[0]);

  // Add export menu
  exporting = am5plugins_exporting.Exporting.new(root, {
    filePrefix: "Portal Content Performance",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  // Make stuff animate on load
  series.appear(1000, 100);

  //force-direcded-performance

  // reason to enroll

  var ctx = document.getElementById("chart-bars").getContext("2d");
  chartReasonEnroll = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Top Reasons To Enroll",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 16,
          borderSkipped: false,
          backgroundColor: "#b2b9bf",
          data: [],
          maxBarThickness: 14,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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

  // reason to abandon

  var ctx2 = document.getElementById("chart-bars2").getContext("2d");
  chartReasonNotEnroll = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Top Reasons To Abandon",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 16,
          borderSkipped: false,
          backgroundColor: "#b2b9bf",
          data: [],
          maxBarThickness: 14,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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

//download amchart graph

function enrollChartPng() {
  exporting1.download("png");
}

function enrollChartPdf() {
  exporting1.download("pdf");
}

function forcePerformanceChartPng() {
  exporting.download("png");
}

function forcePerformanceChartPdf() {
  exporting.download("pdf");
}
//download amchart graph ends

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/enrollment-reasons.php",
    { key: filters },
    function (data111) {
      chartReasonEnroll.data.labels = data111.reason_to_enroll;
      chartReasonEnroll.data.datasets[0].data = data111.reason_to_enroll_values;
      chartReasonEnroll.update();

      chartReasonNotEnroll.data.labels = data111.reason_to_not_enroll;
      chartReasonNotEnroll.data.datasets[0].data =
        data111.reason_to_not_enroll_values;
      chartReasonNotEnroll.update();

      seriesSankey.data.setAll([
        { from: "A", to: "D", value: data111.sankey.portal_account_no },
        { from: "A", to: "C", value: data111.sankey.portal_account_yes },
        { from: "B", to: "L", value: data111.sankey.enroll_no },

        { from: "C", to: "E", value: 3 },
        { from: "D", to: "L", value: data111.sankey.portal_account_no },
        { from: "C", to: "E", value: 1 },
        { from: "C", to: "G", value: 3 },
        { from: "C", to: "H", value: 1 },
        { from: "C", to: "J", value: 2 },
        { from: "C", to: "I", value: 1 },
        { from: "C", to: "K", value: 3 },
      ]);

      // { id: "A", name: "Patient Enrolled", color: am5.color(0x54a0ff) },
      // { id: "B", name: "Patient Not Enrolled", color: am5.color(0x54a0ff) },
      // { id: "C", name: "Portal Account Setup", color: am5.color(0x10ac84) },
      // { id: "D", name: "Portal Account Not Setup", color: am5.color(0x10ac84) },
      // { id: "E", name: "Content 01", color: am5.color(0x54a0ff) },
      // { id: "G", name: "Content 02", color: am5.color(0x54a0ff) },
      // { id: "H", name: "Content 03", color: am5.color(0x54a0ff) },
      // { id: "I", name: "Content 04", color: am5.color(0x54a0ff) },
      // { id: "J", name: "Content 05", color: am5.color(0x54a0ff) },
      // { id: "K", name: "Content 06", color: am5.color(0x54a0ff) },
      // { id: "L", name: "Drop", color: am5.color(0x10ac84) },
    }
  );
}
