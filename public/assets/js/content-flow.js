am5.ready(function () {
  am5.addLicense("AM5C329334656");

  var root = am5.Root.new("contentflow");

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
    { from: "Homepage", to: "US Patients", value: 1, id: "10000-0" },
    { from: "US Patients", to: "Patient Form", value: 1, id: "10000-1" },
    {
      from: "Healthcare\nProfessionals",
      to: "HCP Form",
      value: 1,
      id: "10001-0",
    },
    { from: "Homepage", to: "US Patients", value: 1, id: "10002-0" },
    { from: "US Patients", to: "Patient Form", value: 1, id: "10002-1" },
    { from: "Homepage", to: "Patient Form", value: 1, id: "10003-0" },
    { from: "Homepage", to: "US Patients", value: 1, id: "10004-0" },
    { from: "US Patients", to: "Patient Form", value: 1, id: "10004-1" },
    { from: "Homepage", to: "US Patients", value: 1, id: "10006-0" },
    {
      from: "Homepage",
      to: "Healthcare\nProfessionals",
      value: 1,
      id: "10009-0",
    },
    {
      from: "Healthcare\nProfessionals",
      to: "HCP Form",
      value: 1,
      id: "10009-1",
    },
    { from: "Homepage", to: "US Patients", value: 1, id: "10010-0" },
    { from: "US Patients", to: "Patient Form", value: 1, id: "10010-1" },
    { from: "Homepage", to: "US Patients", value: 1, id: "10011-0" },
    { from: "US Patients", to: "Patient Form", value: 1, id: "10011-1" },
    {
      from: "Healthcare\nProfessionals",
      to: "HCP Form",
      value: 1,
      id: "10013-0",
    },
    { from: "Homepage", to: "Patient Form", value: 1, id: "10014-0" },
    { from: "Homepage", to: "HCP Form", value: 1, id: "10017-0" },
    {
      from: "Healthcare\nProfessionals",
      to: "HCP Form",
      value: 1,
      id: "10020-0",
    },
  ]);

  // Make stuff animate on load
  series.appear(1000, 100);
});
