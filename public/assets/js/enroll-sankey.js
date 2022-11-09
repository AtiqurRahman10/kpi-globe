am5.ready(function () {
  am5.addLicense("AM5C329334656");

  var root = am5.Root.new("enrollsankey");
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);

  // Set themes
  //
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
