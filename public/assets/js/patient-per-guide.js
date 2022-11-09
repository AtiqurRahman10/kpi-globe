const BASE_WIDTH = 1512;

am5.ready(function () {
  am5.addLicense("AM5C329334656");
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("patient-per-guide");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  const myTheme = am5.Theme.new(root);

  myTheme.rule("Grid").setAll({
    strokeOpacity: 0,
  });

  myTheme.rule("AxisTick").setAll({
    // stroke: am5.color(0xFFFFFFF),
    visible: false,
  });

  myTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  var container = root.container.children.push(
    am5.Container.new(root, {
      layout: root.verticalLayout,
      width: am5.percent(95),
      height: am5.percent(98),
      x: am5.percent(50),
      centerX: am5.percent(50),
      y: am5.percent(50),
      centerY: am5.percent(50),
    })
  );
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  // Fix the  left padding
  chart.leftAxesContainer.setAll({
    width: 0,
  });
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      behavior: "zoomX",
    })
  );
  cursor.lineY.set("visible", false);

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  var xRenderer = xAxis.get("renderer");
  xRenderer.labels.template.setAll({
    fill: am5.color(0x061a32),
    fontSize: "0.875rem",
    fontFamily: "Nunito Sans",
    fontWeight: 700,
  });

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  var yRenderer = yAxis.get("renderer");
  yRenderer.labels.template.setAll({
    visible: false,
  });

  var tooltip = am5.Tooltip.new(root, {
    autoTextColor: false,
    labelText: "{categoryX}: {valueY}",
  });

  tooltip.label.setAll({
    fontSize: ".875rem",
    fontFamily: "Nunito Sans",
    fontWeight: 700,
  });

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category",
      tooltip,
    })
  );

  series.set("fill", am5.color(0x38d6ae));
  series.set("stroke", am5.color(0x38d6ae));

  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  var scrollbarX = am5.Scrollbar.new(root, {
    orientation: "horizontal",
    paddingLeft: 0,
    marginTop: 5,
    minHeight: 8,
    marginBottom: 5,
  });

  scrollbarX.thumb.setAll({
    fill: am5.color(0x38d6ae),
    height: "0.5rem",
  });

  scrollbarX.startGrip.setAll({
    scale: 0.7,
    fill: am5.color(0x6dd3b0),
    bgColor: am5.color(0x6dd3b0),
  });

  scrollbarX.endGrip.setAll({
    scale: 0.7,
  });

  scrollbarX.get("background").setAll({
    fill: am5.color(0xa3a3a3),
    fillOpacity: 0.7,
  });

  scrollbarX
    .get("background")
    .states.create("hover", {})
    .setAll({
      fill: am5.color(0x6dd3b0),
      // fillOpacity: 0.7
    });

  scrollbarX
    .get("background")
    .states.create("down", {})
    .setAll({
      fill: am5.color(0x6dd3b0),
      // fillOpacity: 0.7
    });

  scrollbarX.startGrip.get("background").setAll({
    fill: am5.color(0x6dd3b0),
    // fillOpacity: 0.7
  });
  scrollbarX.startGrip
    .get("background")
    .states.create("hover", {})
    .setAll({
      fill: am5.color(0x6dd3b0),
      fillOpacity: 0.8,
    });
  scrollbarX.startGrip
    .get("background")
    .states.create("down", {})
    .setAll({
      fill: am5.color(0x6dd3b0),
      fillOpacity: 0.8,
    });

  scrollbarX.endGrip.get("background").setAll({
    fill: am5.color(0x6dd3b0),
    // fillOpacity: 0.7
  });
  scrollbarX.endGrip
    .get("background")
    .states.create("hover", {})
    .setAll({
      fill: am5.color(0x6dd3b0),
      fillOpacity: 0.8,
    });
  scrollbarX.endGrip
    .get("background")
    .states.create("down", {})
    .setAll({
      fill: am5.color(0x6dd3b0),
      fillOpacity: 0.8,
    });

  chart.set("scrollbarX", scrollbarX);
  chart.chartContainer.children.push(scrollbarX);

  var data = [
    {
      category: "G1",
      value: 8,
    },
    {
      category: "G2",
      value: 10,
    },
    {
      category: "G3",
      value: 12,
    },
    {
      category: "G4",
      value: 11,
    },
    {
      category: "G5",
      value: 10,
    },
    {
      category: "G6",
      value: 11,
    },
    {
      category: "G7",
      value: 5,
    },
    {
      category: "G8",
      value: 10,
    },
  ];

  xAxis.data.setAll(data);
  series.data.setAll(data);

  // var categoryLabel = series.bullets.push(function () {
  //     return am5.Bullet.new(root, {
  //         sprite: am5.Label.new(root, {
  //             text: "{valueX}",
  //             fill: root.interfaceColors.get("alternativeText"),
  //             centerY: am5.p50,
  //             centerX: am5.p50,
  //             populateText: true
  //         })
  //     });
  // });

  series.columns.template.setAll({
    tooltipText: "{categoryX}: {valueY}",
    tooltipY: am5.percent(10),
    cornerRadiusTL: 2,
    cornerRadiusTR: 2,
  });

  var bullet = series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 1,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        centerY: am5.p10,
        centerX: am5.p50,
        populateText: true,
        templateField: "bulletSettings",
        fontSize: 12,
        fontFamily: "Nunito Sans",
        fontWeight: 700,
      }),
    });
  });

  series.columns.template.onPrivate("height", function (height, target) {
    am5.array.each(target.dataItem.bullets, function (bullet) {
      if (height > 20) {
        bullet.set("locationY", 0.5);
        bullet.get("sprite").set("centerY", am5.p50);
      } else {
        bullet.set("locationY", 1);
        bullet.get("sprite").set("centerY", am5.p100);
      }
    });
  });

  root.setThemes([
    am5themes_Animated.new(root),
    am5themes_Responsive.new(root),
    myTheme,
  ]);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);

  root.events.on("frameended", sizeFix);

  function sizeFix() {
    var width = jQuery(window).width() / BASE_WIDTH;
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

    chart.bottomAxesContainer.setAll({
      paddingTop: 10 * width,
    });

    // xRenderer = xAxis.get("renderer");
    // yRenderer = yAxis.get("renderer");

    yRenderer.minGridDistance = 1;
    xRenderer.labels.template.setAll({
      fontSize: ff + "rem",
    });

    yRenderer.labels.template.setAll({
      fontSize: ff + "rem",
    });

    // series?.strokes?.template?.setAll({
    //     strokeWidth: 1 * ff,
    // });

    scrollbarX.endGrip.setAll({
      scale: 0.7 * ff,
    });
    scrollbarX.startGrip.setAll({
      scale: 0.7 * ff,
    });
    scrollbarX.thumb.setAll({
      height: 8 * ff,
      // fillOpacity: 0.1
    });

    if (jQuery(window).width() > 5000) {
      scrollbarX.endGrip.setAll({
        scale: 0.7 * ff * 2,
      });
      scrollbarX.startGrip.setAll({
        scale: 0.7 * ff * 2,
      });
      scrollbarX.thumb.setAll({
        height: 8 * ff * 2,
        // fillOpacity: 0.1
      });

      //    console.log(chart);
    }

    if (jQuery(window).width() > 2000) {
      scrollbarX.setAll({
        minHeight: 8 * ff,
        marginTop: 8 * ff,
        marginBottom: 8 * ff,
      });
    } else {
      scrollbarX.setAll({
        minHeight: 8,
        marginTop: 5,
        marginBottom: 5,
      });
    }

    tooltip.label.setAll({
      fontSize: ff + "rem",
    });
  }

  var previousBulletSprites = [];
  xAxis.events.on("boundschanged", cursorMoved);

  function cursorMoved() {
    var width = jQuery(window).width() / BASE_WIDTH;
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
    // for(var i = 0; i < previousBulletSprites.length; i++) {
    //   previousBulletSprites[i].unhover();
    // }
    previousBulletSprites = [];
    chart.series.each(function (series) {
      jQuery.each(series._dataItems, function (index, dataItem) {
        // series._dataItems.each(function(dataitem){
        // console.log(dataItem);
        if (dataItem) {
          if (typeof dataItem.bullets !== "undefined") {
            // console.log(dataItem.bullets);
            // var bulletSprite = dataItem.bullets[0].get('sprite');
            // bulletSprite.adapters.add("radius", function (radius, target) {
            //     if (series.get('name') == 'series') {
            //         radius = width * 25;
            //     }
            //     else {
            //         radius = width * 40;
            //     }
            //     return radius;
            // });

            var bulletSprite = dataItem.bullets[0].get("sprite");
            bulletSprite.adapters.add("fontSize", function (radius, target) {
              radius = ff + "rem";
              return radius;
            });
          }
          // 	// console.log(radius);
        }
      });
    });
  }
});
