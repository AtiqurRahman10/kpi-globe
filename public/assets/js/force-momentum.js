am5.ready(function () {
  am5.addLicense("AM5C329334656");

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("force-momentum");

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
    filePrefix: "Portal Interactions By Topic",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });
  // Make stuff animate on load
  series.appear(1000, 100);
}); // end am5.ready()

//download amchart graph
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
