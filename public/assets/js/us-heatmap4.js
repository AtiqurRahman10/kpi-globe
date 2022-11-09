am5.ready(function () {
  am5.addLicense("AM5C329334656");
  am5.addLicense("AM5M329334656");

  // Create root
  var root = am5.Root.new("us-heatmap4");

  // Set themes
  var responsive = am5themes_Responsive.newEmpty(root);

  responsive.addRule({
    relevant: am5themes_Responsive.widthM,
    applying: function () {
      chart.set("layout", root.verticalLayout);
      legend.setAll({
        y: null,
        centerY: null,
        x: am5.p0,
        centerX: am5.p0,
      });
    },
    removing: function () {
      chart.set("layout", root.horizontalLayout);
      legend.setAll({
        y: am5.p50,
        centerY: am5.p50,
        x: null,
        centerX: null,
      });
    },
  });

  var doyleTheme = am5.Theme.new(root);

  doyleTheme.rule("Label").setAll({
    fill: am5.color(0xb2b9bf),
    fontSize: "1.5em",
  });

  root.setThemes([am5themes_Animated.new(root), responsive, doyleTheme]);

  // Create chart
  var chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "none",
      projection: am5map.geoAlbersUsa(),
      layout: root.horizontalLayout,
    })
  );

  // Create polygon series
  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_usaLow,
      valueField: "value",
      calculateAggregates: true,
    })
  );

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}: {value}",
  });

  polygonSeries.set("heatRules", [
    {
      target: polygonSeries.mapPolygons.template,
      dataField: "value",
      min: am5.color(0x66e2c7),
      max: am5.color(0x4410bc),
      key: "fill",
    },
  ]);

  polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
    heatLegend.showValue(ev.target.dataItem.get("value"));
  });

  polygonSeries.data.setAll([
    { id: "US-AL", value: 4447110 },
    { id: "US-AK", value: 6206932 },
    { id: "US-AZ", value: 5130632 },
    { id: "US-AR", value: 2673400 },
    { id: "US-CA", value: 3387164 },
    { id: "US-CO", value: 4301261 },
    { id: "US-CT", value: 3405565 },
    { id: "US-DE", value: 7830600 },
    { id: "US-FL", value: 1598237 },
    { id: "US-GA", value: 8186453 },
    { id: "US-HI", value: 12110537 },
    { id: "US-ID", value: 1293953 },
    { id: "US-IL", value: 2419293 },
    { id: "US-IN", value: 6080485 },
    { id: "US-IA", value: 2926324 },
    { id: "US-KS", value: 2688418 },
    { id: "US-KY", value: 4041769 },
    { id: "US-LA", value: 4468976 },
    { id: "US-ME", value: 1274923 },
    { id: "US-MD", value: 5296486 },
    { id: "US-MA", value: 3490097 },
    { id: "US-MI", value: 9938444 },
    { id: "US-MN", value: 4919479 },
    { id: "US-MS", value: 2844658 },
    { id: "US-MO", value: 5595211 },
    { id: "US-MT", value: 9020195 },
    { id: "US-NE", value: 1711263 },
    { id: "US-NV", value: 1998257 },
    { id: "US-NH", value: 1235786 },
    { id: "US-NJ", value: 8414350 },
    { id: "US-NM", value: 1819046 },
    { id: "US-NY", value: 8976457 },
    { id: "US-NC", value: 8049313 },
    { id: "US-ND", value: 6422000 },
    { id: "US-OH", value: 1353140 },
    { id: "US-OK", value: 3450654 },
    { id: "US-OR", value: 3421399 },
    { id: "US-PA", value: 2281054 },
    { id: "US-RI", value: 2048319 },
    { id: "US-SC", value: 4012012 },
    { id: "US-SD", value: 7524844 },
    { id: "US-TN", value: 5689283 },
    { id: "US-TX", value: 2851820 },
    { id: "US-UT", value: 2233169 },
    { id: "US-VT", value: 6108827 },
    { id: "US-VA", value: 7078515 },
    { id: "US-WA", value: 5894121 },
    { id: "US-WV", value: 1808344 },
    { id: "US-WI", value: 5363675 },
    { id: "US-WY", value: 4937082 },
  ]);

  var heatLegend = chart.children.push(
    am5.HeatLegend.new(root, {
      orientation: "vertical",
      startColor: am5.color(0x66e2c7),
      endColor: am5.color(0x4410bc),
      startText: "Lowest",
      endText: "Highest",
      stepCount: 5,
    })
  );

  heatLegend.startLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("startColor"),
  });

  heatLegend.endLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("endColor"),
  });

  // change this to template when possible
  polygonSeries.events.on("datavalidated", function () {
    heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
    heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
  });
}); // end am5.ready()
