am5.ready(function () {
  am5.addLicense("AM5C329334656");

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
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

  // Make stuff animate on load
  series.appear(1000, 100);
}); // end am5.ready()
