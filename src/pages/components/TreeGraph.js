import React from "react";
import * as d3 from 'd3';
export default function TreeGraph(props) {
	var treeData = {
		name: "200 Signed Up",
		children: [
			{
				name: "150 Enrolled",
				children: [
					{
						name: "R1",
					},
					{
						name: "R2",
					},
					{
						name: "R3",
					},
					{
						name: "R4",
					},
					{
						name: "R5",
					},
					{
						name: "R6",
					},
					{
						name: "100 Fulfilled",
						children: [
							{
								name: "R1",
							},
							{
								name: "R2",
							},
							{
								name: "R3",
							},
							{
								name: "R4",
							},
							{
								name: "R5",
							},
							{
								name: "R6",
							},
							{
								name: "75 Treated",
								children: [
									{
										name: "50 Momentum",
										children: [
											{
												name: "Ongoing",
											},
										],
									},
									{
										name: "R1",
									},
									{
										name: "R2",
									},
									{
										name: "R3",
									},
									{
										name: "R4",
									},
									{
										name: "R5",
									},
									{
										name: "R6",
									},
								],
							},
						],
					},
				],
			},
			{
				name: "R1",
			},
			{
				name: "R2",
			},
			{
				name: "R3",
			},
			{
				name: "R4",
			},
			{
				name: "R5",
			},
			{
				name: "R6",
			},
		],
	};
	var margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
	var svg = d3
		.select("div#hcontainer")
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 960 500")
		.classed("hsvg-content", true);
	//.attr("width", width + margin.right + margin.left)
	//.attr("height", height + margin.top + margin.bottom)
	//.append("g")
	//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var i = 0,
		duration = 750,
		root;
	var treemap = d3.tree().size([height, width]);
	root = d3.hierarchy(treeData, function (d) {
		return d.children;
	});
	root.x0 = height / 2;
	root.y0 = 0;
	root.children.forEach(collapse);
	update(root);

	function collapse(d) {
		if (d.children) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
		}
	}

	function update(source) {
		var treeData = treemap(root);
		var nodes = treeData.descendants(),
			links = treeData.descendants().slice(1);
		nodes.forEach(function (d) {
			d.y = d.depth * 160;
		});
		var node = svg.selectAll("g.hnode").data(nodes, function (d) {
			return d.id || (d.id = ++i);
		});
		var nodeEnter = node
			.enter()
			.append("g")
			.attr("class", "hnode")
			.attr("transform", function (d) {
				return "translate(" + source.y0 + "," + source.x0 + ")";
			})
			.on("click", click);
		nodeEnter
			.attr("class", "hnode")
			.attr("r", 1e-6)
			.style("fill", function (d) {
				return d.parent ? "rgba(0, 0, 0, 0)" : "#f82c91";
			});
		nodeEnter
			.append("rect")
			.attr("rx", function (d) {
				if (d.parent) return d.children || d._children ? 6 : 6;
				return 10;
			})
			.attr("ry", function (d) {
				if (d.parent) return d.children || d._children ? 6 : 6;
				return 10;
			})
			.attr("stroke-width", function (d) {
				return d.parent ? 1 : 0;
			})
			.attr("stroke", function (d) {
				return d.children || d._children ? "#38d6ae" : "#f82c91";
			})
			.attr("stroke-dasharray", function (d) {
				return d.children || d._children ? "0" : "0";
			})
			.attr("stroke-opacity", function (d) {
				return d.children || d._children ? "1" : "1";
			})
			.attr("x", 0)
			.attr("y", -15)
			.attr("width", function (d) {
				return d.parent ? 80 : 80;
			})
			.attr("height", 30);
		nodeEnter
			.append("text")
			.style("fill", function (d) {
				if (d.parent) {
					return d.children || d._children ? "#38d6ae" : "#f82c91";
				}
				return "#ffffff";
			})
			.attr("dy", ".35em")
			.attr("x", function (d) {
				return d.parent ? 40 : 40;
			})
			.attr("text-anchor", function (d) {
				return "middle";
			})
			.text(function (d) {
				return d.data.name;
			});
		var nodeUpdate = nodeEnter.merge(node);
		nodeUpdate
			.transition()
			.duration(duration)
			.attr("transform", function (d) {
				return "translate(" + d.y + "," + d.x + ")";
			});
		var nodeExit = node
			.exit()
			.transition()
			.duration(duration)
			.attr("transform", function (d) {
				return "translate(" + source.y + "," + source.x + ")";
			})
			.remove();
		nodeExit.select("rect").style("opacity", 1e-6);
		nodeExit.select("rect").attr("stroke-opacity", 1e-6);
		nodeExit.select("text").style("fill-opacity", 1e-6);
		var link = svg.selectAll("path.hlink").data(links, function (d) {
			return d.id;
		});
		var linkEnter = link
			.enter()
			.insert("path", "g")
			.attr("class", "hlink")
			.attr("d", function (d) {
				var o = {
					x: source.x0,
					y: source.y0,
				};
				return diagonal(o, o);
			});
		var linkUpdate = linkEnter.merge(link);
		linkUpdate
			.transition()
			.duration(duration)
			.attr("d", function (d) {
				return diagonal(d, d.parent);
			});
		var linkExit = link
			.exit()
			.transition()
			.duration(duration)
			.attr("d", function (d) {
				var o = {
					x: source.x,
					y: source.y,
				};
				return diagonal(o, o);
			})
			.remove();
		nodes.forEach(function (d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});

		function diagonal(s, d) {
			var path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`;
			return path;
		}

		function click(d) {
			console.log("tree graph")
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			update(d);
		}
	}
	return (
		// `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
		<div id={props.id} className="h-svg-container" />
	);
}
