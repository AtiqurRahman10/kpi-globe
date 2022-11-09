am5.ready(function () {
  am5.addLicense("AM5C329334656");
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("enroll-to-content");
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), doyleTheme]);
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
  // https://www.amcharts.com/docs/v5/charts/flow-charts/
  var series = root.container.children.push(
    am5flow.Sankey.new(root, {
      sourceIdField: "from",
      targetIdField: "to",
      valueField: "value",
      paddingRight: 90,
      paddingBottom: 20,
    })
  );
  series.nodes.setAll({
    idField: "id",
    nameField: "name",
    // fillField: "color"
  });

  series.nodes
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

  series.nodes.data.setAll([
    { id: "A", name: "Patient Enrolled", color: am5.color(0x54a0ff) },
    { id: "B", name: "Patient Not Enrolled", color: am5.color(0x54a0ff) },
    { id: "C", name: "Registered", color: am5.color(0x10ac84) },
    { id: "D", name: "Non Registered", color: am5.color(0x10ac84) },
    { id: "E", name: "Content 01", color: am5.color(0x54a0ff) },
    { id: "G", name: "Content 02", color: am5.color(0x54a0ff) },
    { id: "H", name: "Content 03", color: am5.color(0x54a0ff) },
    { id: "I", name: "Content 04", color: am5.color(0x54a0ff) },
    { id: "J", name: "Content 05", color: am5.color(0x54a0ff) },
    { id: "K", name: "Content 06", color: am5.color(0x54a0ff) },
  ]);
  series.nodes.get("colors").set("step", 2);

  series.nodes.labels.template.setAll({
    fontSize: ".875rem",
    maxWidth: 100,
    wrap: true,
    fontFamily: "Nunito Sans",
  });

  series.data.setAll([
    { from: "A", to: "D", value: 3 },
    { from: "A", to: "C", value: 2 },
    { from: "B", to: "C", value: 10 },
    {
      from: "C",
      to: "E",
      value: 6,
    },
    {
      from: "D",
      to: "E",
      value: 2,
    },
    { from: "C", to: "E", value: 1 },
    { from: "C", to: "G", value: 6 },
    { from: "D", to: "H", value: 1 },
    { from: "C", to: "J", value: 2 },
    { from: "C", to: "I", value: 1 },
    { from: "D", to: "K", value: 3 },
  ]);
  // Make stuff animate on load
  series.appear(1000, 100);
}); // end am5.ready()
