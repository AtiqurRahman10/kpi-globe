import * as am5 from "@amcharts/amcharts5";

export var bubbleData = {
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

export var funnelData = {
	displayPercent: true,
	subLabelValue: "raw",
	labels: [
		"Sign Up Form Completion",
		"Enrollment Calls Completed",
		"Patients Enrolled",
	],
	subLabels: ["Patient Site", "HCP Site", "Patient Text"],
	colors: [
		["#fa9567", "#f971b4", "#f82c91"],
		["#ceb4ff", "#925aff"],
		["#83deff", "#7795FF"],
	],
	values: [
		[15, 9, 7],
		[11, 7, 7],
		[7, 6, 4],
	],
};

// export var funnelData = {
// 	displayPercent: true,
// 	subLabelValue: "raw",
// 	labels: [
// 		"Sign Up",
// 		"Enrollment",
// 		"Fulfilment",
// 		"Start Treatment",
// 		"Keeping The Momentum",
// 	],
// 	subLabels: ["Patients"],
// 	colors: [["#66e2c7", "#38d6ae", "#279c7f"]],
// 	values: [[450], [320], [230], [150], [120]],
// };

export const funnelData1 = {
	displayPercent: true,
	labels: ["Call Attempts", "Calls Completed", "Patients Enrolled"],
	colors: [["#f6ec70", "#f971b4", "#f82c91"]],
	values: [[49], [25], [17]],
};

export let vennData = [
	{
		name: "JCP Patients",
		value: 100,
		color: am5.color(0x095256),
		sliceSettings: {
			fill: am5.color(0x611bff),
			stroke: am5.color(0x611bff),
			fillOpacity: 0.8,
		},
	},
	{
		name: "WithMe Patients",
		value: 100,
		sliceSettings: {
			fill: am5.color(0xf82c91),
			fillOpacity: 0.8,
		},
	},
	{
		name: "JCP and With Me Patients",
		value: 30,
		sets: ["JCP Patients", "WithMe Patients"],
		sliceSettings: {
			// fillPattern: pattern,
			stroke: am5.color(0xb2b9bf),
			strokeOpacity: "0",
			fill: am5.color(0xb2b9bf),
			fillOpacity: "0",
		},
	},
];

export let vennData1 = [
	{
		name: "JCP Patients",
		value: 100,
		color: am5.color(0x095256),
		sliceSettings: {
			fill: am5.color(0x611bff),
			stroke: am5.color(0x611bff),
			fillOpacity: 0.8,
		},
	},
	{
		name: "WithMe Patients",
		value: 10000,
		sliceSettings: {
			fill: am5.color(0xf82c91),
			fillOpacity: 0.8,
		},
	},
	{
		name: "JCP and With Me Patients",
		value: 30,
		sets: ["JCP Patients", "WithMe Patients"],
		sliceSettings: {
			// fillPattern: pattern,
			stroke: am5.color(0xb2b9bf),
			strokeOpacity: "0",
			fill: am5.color(0xb2b9bf),
			fillOpacity: "0",
		},
	},
];
export const configChartLine = {
	type: "line",
	data: {
		labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "Warm Call Transfer",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f82c91",
				borderWidth: 3,
				// backgroundColor: gradientStroke3,
				backgroundColor: [
					"rgba(248, 44, 145, 0.3)",
					"rgba(248, 44, 145, 0.2)",
					"rgba(248, 44, 145, 0.1)",
				],

				fill: true,
				data: [55, 60, 200, 280, 300, 450, 380, 280, 527],
				maxBarThickness: 6,
			},
			{
				label: "Text",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#38d6ae",
				borderWidth: 3,
				// backgroundColor: gradientStroke1,
				backgroundColor: [
					"rgba(56, 214, 174,0.3)",
					"rgba(56, 214, 174, 0.2)",
					"rgba(56, 214, 174, 0.1)",
				],

				fill: true,
				data: [50, 40, 300, 220, 500, 250, 400, 230, 505],
				maxBarThickness: 6,
			},
			{
				label: "Website",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#611bff",
				borderWidth: 3,
				// backgroundColor: gradientStroke2,
				backgroundColor: [
					"rgba(97, 27, 255, 0.2)",
					"rgba(97, 27, 255, 0.1)",
					"rgba(97, 27, 255, 0.05)",
				],

				fill: true,
				data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
				maxBarThickness: 6,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: false,
			text: "Chart.js line Chart - Multi Axis",
		},
		tooltips: {
			intersect: false,
			mode: "index",
		},

		legend: {
			display: true,
			position: "bottom",
			labels: {
				fontSize: 14,
				fontColor: "#b2b9bf",
				fontFamily: "Nunito Sans",
				fontStyle: "bold",
				lineHeight: 2,
			},
		},
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						min: 0,
						max: 600, // Your absolute max value
						callback: function (value) {
							// console.log("value", value);
							return ((value / 600) * 100).toFixed(0) + "%"; // convert it to percentage
						},
						beginAtZero: true,
						fontSize: 14,
						fontColor: "#b2b9bf",
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
					scaleLabel: {
						display: false,
						labelString: "Percentage",
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 800,
						beginAtZero: true,
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
				},
			],
		},
	},
};
export const configChartLine2 = {
	type: "line",
	data: {
		labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "1-833-WITHME",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f82c91",
				borderWidth: 3,
				backgroundColor: [
					"rgba(248, 44, 145, 0.3)",
					"rgba(248, 44, 145, 0.2)",
					"rgba(248, 44, 145, 0.1)",
				],
				fill: true,
				data: [55, 60, 200, 280, 300, 450, 380, 280, 527],
				maxBarThickness: 6,
			},
			{
				label: "JCP",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#38d6ae",
				borderWidth: 3,
				backgroundColor: [
					"rgba(56, 214, 174,0.3)",
					"rgba(56, 214, 174, 0.2)",
					"rgba(56, 214, 174, 0.1)",
				],
				fill: true,
				data: [50, 40, 300, 220, 500, 250, 400, 230, 505],
				maxBarThickness: 6,
			},
			{
				label: "MicroSiteHCP",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#611bff",
				borderWidth: 3,
				backgroundColor: [
					"rgba(97, 27, 255, 0.2)",
					"rgba(97, 27, 255, 0.1)",
					"rgba(97, 27, 255, 0.05)",
				],
				fill: true,
				data: [30, 90, 40, 140, 290, 290, 340, 250, 400],
				maxBarThickness: 6,
			},
			{
				label: "MicroSitePat",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f94902",
				borderWidth: 3,
				backgroundColor: [
					"rgba(249, 73, 2, 0.2)",
					"rgba(249, 73, 2, 0.1)",
					"rgba(249, 73, 2, 0.05)",
				],
				fill: true,
				data: [35, 70, 200, 100, 190, 390, 370, 240, 450],
				maxBarThickness: 6,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: false,
			text: "Chart.js line Chart - Multi Axis",
		},
		tooltips: {
			intersect: false,
			mode: "index",
		},
		legend: {
			display: true,
			position: "bottom",
			labels: {
				fontSize: 14,
				fontColor: "#b2b9bf",
				fontFamily: "Nunito Sans",
				fontStyle: "bold",
				lineHeight: 2,
			},
		},

		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 600,
						beginAtZero: true,
						fontSize: 14,
						fontColor: "#b2b9bf",
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 600,
						beginAtZero: true,
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
				},
			],
		},
	},
};
export const mixChartData = {
	type: "bar",
	data: {
		labels: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP7", "SP8"],
		datasets: [
			{
				type: "bar",
				label: "Partners",
				weight: 5,
				tension: 0.5,
				borderWidth: 0,
				pointBackgroundColor: "#fa9cca",
				borderColor: "#fa9cca",
				backgroundColor: "#fa9cca",
				borderRadius: 4,
				borderSkipped: false,
				data: [50, 45, 300, 220, 500, 250, 400, 230],
				maxBarThickness: 10,
				order: 2,
			},
			{
				type: "line",
				label: "Partners",
				tension: 0.5,
				borderWidth: 0,
				pointRadius: 0,
				pointBackgroundColor: "#fa9cca",
				borderColor: "#fa9cca",
				borderWidth: 3,
				backgroundColor: `rgba(248, 44, 145, 0.3)`,
				data: [50, 40, 300, 220, 500, 250, 400, 230],
				fill: true,
				order: 1,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: false,
			text: "Chart.js mixed Chart - Multi Axis",
		},
		tooltips: {
			intersect: false,
			mode: "index",
		},
		legend: {
			display: true,
			position: "bottom",
			labels: {
				fontSize: 14,
				fontColor: "#b2b9bf",
				fontFamily: "Nunito Sans",
				fontStyle: "bold",
				lineHeight: 2,
			},
		},
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						min: 0,
						max: 500, // Your absolute max value
						callback: function (value) {
							return ((value / 500) * 100).toFixed(0) + "%"; // convert it to percentage
						},
						position: "bottom",
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},

					scaleLabel: {
						display: false,
						labelString: "Percentage",
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 800,
						beginAtZero: true,
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
				},
			],
		},
	},
};

// export const guideChartData = {
// 	type: "bar",
// 	data: {
// 		labels: ["G1", "G2", "G3", "G4", "G5", "G6"],
// 		datasets: [
// 			{
// 				type: "bar",
// 				label: "Patients",
// 				weight: 5,
// 				tension: 0.5,
// 				borderWidth: 0,
// 				pointBackgroundColor: "#fa9cca",
// 				borderColor: "#fa9cca",
// 				backgroundColor: "#fa9cca",
// 				borderRadius: 4,
// 				borderSkipped: false,
// 				data: [3, 4, 3, 3, 3, 1],
// 				maxBarThickness: 10,
// 			},
// 			{
// 				type: "line",
// 				label: "Patients",
// 				tension: 0.5,
// 				borderWidth: 0,
// 				pointRadius: 0,
// 				pointBackgroundColor: "#fa9cca",
// 				borderColor: "#fa9cca",
// 				borderWidth: 3,
// 				// backgroundColor: gradientStroke3,
// 				data: [3, 4, 3, 3, 3, 1],
// 				fill: true,
// 			},
// 		],
// 	},
// 	options: {
// 		responsive: true,
// 		maintainAspectRatio: false,
// 		legend: {
// 			display: true,
// 			position: "bottom",
// 			labels: {
// 				color: "#b2b9bf",
// 				font: {
// 					size: 14,
// 					family: "Nunito Sans",
// 					style: "bold",
// 					lineHeight: 2,
// 				},
// 			},
// 		},
// 		plugins: {
// 			// legend: {
// 			// 	display: true,
// 			// 	position: "bottom",
// 			// 	labels: {
// 			// 		color: "#b2b9bf",
// 			// 		font: {
// 			// 			size: 14,
// 			// 			family: "Nunito Sans",
// 			// 			style: "bold",
// 			// 			lineHeight: 2,
// 			// 		},
// 			// 	},
// 			// },
// 		},
// 		interaction: {
// 			intersect: false,
// 			mode: "index",
// 		},
// 		scales: {
// 			y: {
// 				grid: {
// 					drawBorder: false,
// 					display: true,
// 					drawOnChartArea: true,
// 					drawTicks: false,
// 					borderDash: [5, 5],
// 				},
// 				ticks: {
// 					display: true,
// 					padding: 10,
// 					suggestedMin: 0,
// 					suggestedMax: 800,
// 					beginAtZero: true,
// 					color: "#b2b9bf",
// 					font: {
// 						size: 14,
// 						family: "Nunito Sans",
// 						style: "bold",
// 						lineHeight: 2,
// 					},
// 				},
// 			},
// 			x: {
// 				grid: {
// 					drawBorder: false,
// 					display: true,
// 					drawOnChartArea: true,
// 					drawTicks: true,
// 					borderDash: [5, 5],
// 				},
// 				ticks: {
// 					display: true,
// 					padding: 10,
// 					suggestedMin: 0,
// 					suggestedMax: 800,
// 					beginAtZero: true,
// 					color: "#b2b9bf",
// 					font: {
// 						size: 14,
// 						family: "Nunito Sans",
// 						style: "bold",
// 						lineHeight: 2,
// 					},
// 				},
// 			},
// 		},
// 	},
// };

export const mixChartData2 = {
	labels: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP7", "SP8"],
	datasets: [
		{
			type: "bar",
			label: "Partners",
			weight: 5,
			tension: 0.5,
			borderWidth: 0,
			pointBackgroundColor: "#fa9cca",
			borderColor: "#fa9cca",
			backgroundColor: "#fa9cca",
			borderRadius: 4,
			borderSkipped: false,
			data: [50, 45, 300, 220, 500, 250, 400, 230],
			maxBarThickness: 10,
			order: 2,
		},
		{
			type: "line",
			label: "Partners",
			tension: 0.5,
			borderWidth: 0,
			pointRadius: 0,
			pointBackgroundColor: "#fa9cca",
			borderColor: "#fa9cca",
			borderWidth: 3,
			backgroundColor: `rgba(248, 44, 145, 0.3)`,
			data: [50, 40, 300, 220, 500, 250, 400, 230],
			fill: true,
			order: 1,
		},
	],
};

export const configConversionChart = {
	type: "line",
	data: {
		labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "Active",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f82c91",
				borderWidth: 3,
				backgroundColor: `rgba(248, 44, 145, 0.3)`,
				fill: true,
				data: [55, 60, 200, 280, 300, 450, 380, 280, 527],
				maxBarThickness: 6,
			},
			{
				label: "Referred",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#38d6ae",
				borderWidth: 3,
				backgroundColor: `rgba(56, 214, 174,0.3)`,
				fill: true,
				data: [50, 40, 300, 220, 500, 250, 400, 230, 505],
				maxBarThickness: 6,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: false,
			text: "Chart.js Line Chart - Multi Axis",
		},
		tooltips: {
			intersect: false,
			mode: "index",
		},
		legend: {
			display: true,
			position: "bottom",
			labels: {
				fontSize: 14,
				fontColor: "#b2b9bf",
				fontFamily: "Nunito Sans",
				fontStyle: "bold",
				lineHeight: 2,
			},
		},
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						position: "bottom",
						// min: 0,
						// max: 600, // Your absolute max value
						// callback: function (value) {
						// 	return ((value / 600) * 100).toFixed(0) + "%"; // convert it to percentage
						// },
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
					scaleLabel: {
						display: false,
						labelString: "Percentage",
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 800,
						beginAtZero: true,
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
				},
			],
		},
	},
};

export const configLineChart = {
	type: "line",
	data: {
		labels: ["Apr 22", "May 22"],
		datasets: [
			{
				label: "Phone",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#f82c91",
				borderWidth: 3,
				backgroundColor: "rgba(248, 44, 145, 0.3)",
				fill: true,
				data: [5, 1],
				maxBarThickness: 6,
			},
			{
				label: "Email",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#38d6ae",
				borderWidth: 3,
				backgroundColor: `rgba(56, 214, 174,0.3)`,
				fill: true,
				data: [2, 4],
				maxBarThickness: 6,
			},
			{
				label: "Text",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#611bff",
				borderWidth: 3,
				backgroundColor: `rgba(97, 27, 255, 0.2)`,
				fill: true,
				data: [2, 3],
				maxBarThickness: 6,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: true,
			position: "bottom",
		},
		plugins: {
			legend: {
				color: "#b2b9bf",
				font: {
					size: 14,
					family: "Nunito Sans",
					style: "bold",
					lineHeight: 2,
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
					display: true,
					drawOnChartArea: true,
					drawTicks: false,
					borderDash: [5, 5],
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
					borderDash: [5, 5],
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
};

export const configPieChart = {
	type: "pie",
	data: {
		labels: ["AFTERNOON", "EVENING", "MORNING"],
		datasets: [
			{
				label: "Time",
				weight: 9,
				cutout: 0,
				tension: 0.9,
				pointRadius: 2,
				borderWidth: 0,
				backgroundColor: ["#611bff", "#38d6ae", "#f82c91"],
				data: ["5", "3", "9"],
				fill: false,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: false,
			text: "Chart.js pie Chart!",
		},
		tooltips: {
			intersect: false,
			mode: "index",
		},
		legend: {
			display: true,
			position: "bottom",
			labels: {
				fontSize: 14,
				fontColor: "#b2b9bf",
				fontFamily: "Nunito Sans",
				fontStyle: "bold",
				lineHeight: 2,
			},
		},

		interaction: {
			intersect: false,
			mode: "index",
		},
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: false,
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: false,
						padding: 10,
						suggestedMin: 0,
						suggestedMax: 800,
						beginAtZero: true,
						fontColor: "#b2b9bf",
						fontSize: 14,
						fontFamily: "Nunito Sans",
						fontStyle: "bold",
						lineHeight: 2,
					},
				},
			],
		},
	},
};

// export const heatMapData={

// };
