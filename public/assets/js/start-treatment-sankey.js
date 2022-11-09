am5.ready(function () {
  am5.addLicense("AM5C329334656");

  var root = am5.Root.new("startcontentflow");

  // Set themes
  //
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);
  // Create series
  //
  var series = root.container.children.push(
    am5flow.Sankey.new(root, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value",
      paddingLeft: 14,
      nodePadding: 7,
      nodeAlign: "right",
      idField: "id",
      nodeWidth: 10,
    })
  );
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
  var series = container.children.push(
    am5flow.Sankey.new(root, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value",
      paddingLeft: 14,
      nodePadding: 7,
      nodeAlign: "right",
      idField: "id",
      nodeWidth: 10,
    })
  );
  series.nodes
    .get("colors")
    .set("colors", [
      am5.color(0x38d6ae),
      am5.color(0x576877),
      am5.color(0xbfbfbf),
      am5.color(0x061a32),
      am5.color(0x92ebd7),
      am5.color(0xb61d69),
    ]);
  series.nodes.labels.template.setAll({
    fontSize: ".875rem",
    // maxWidth: 150,
    wrap: true,
    x: am5.percent(50),
    centerX: am5.percent(50),
    y: am5.percent(50),
    centerY: am5.percent(100),
    paddingLeft: 0,
    paddingRight: 0,
    rotation: -90,
  });

  // Set data
  //
  series.data.setAll([
    {
      from: "Patient Fulfilled",
      to: "Requested\nInjection Training",
      value: 1,
    },
    {
      from: "Requested\nInjection Training",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Requested\nInjection Training",
      value: 1,
    },
    {
      from: "Requested\nInjection Training",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Requested\nInjection Training",
      value: 1,
    },
    {
      from: "Requested\nInjection Training",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Requested\nInjection Training",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Requested\nInjection Training",
      value: 1,
    },
    {
      from: "Requested\nInjection Training",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Requested\nInjection Training",
      value: 1,
    },
    {
      from: "Requested\nInjection Training",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
    {
      from: "Patient Fulfilled",
      to: "Started Treatment",
      value: 1,
    },
  ]);

  // Add export menu
  exporting = am5plugins_exporting.Exporting.new(root, {
    filePrefix: "Program Overview",
    pngOptions: {
      quality: 0.7,
    },
    jpgOptions: {
      quality: 0.7,
    },
  });

  // Make stuff animate on load
  series.appear(1000, 100);
});

//download amchart graph
function contentflowChartPng() {
  exporting.download("png");
}
function contentflowChartPdf() {
  exporting.download("pdf");
}
//download amchart graph end

function add_data_to_chart() {
  var filters = localStorage.getItem("filters");
  $.getJSON(
    "https://kpi-tool.psglobalgroup.com/api/signup-drivers.php",
    { key: filters },
    function (data111) {
      // bar chart

      // console.log(chartjsBar.data);
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

      seriesSankey.data.setAll(data111.journey_data);

      // SeriesSankey.data.setAll(data111.journey_data);

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
