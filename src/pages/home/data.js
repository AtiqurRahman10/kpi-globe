export var funnelData = {
	displayPercent: true,
	subLabelValue: "raw",
	labels: [
		"Sign Up",
		"Enrollment",
		"Fulfilment",
		"Start Treatment",
		"Keeping The Momentum",
	],
	subLabels: ["Patients"],
	colors: [["#66e2c7", "#38d6ae", "#279c7f"]],
	values: [[450], [320], [230], [150], [120]],
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
				data: [50, 40, 300, 220, 500, 250, 400, 230],
				maxBarThickness: 10,
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
				backgroundColor: [
					"rgba(233, 236, 239, 0.3)",
					"rgba(233, 236, 239, 0.2)",
					"rgba(233, 236, 239, 0.1)",
				],
				data: [50, 40, 300, 220, 500, 250, 400, 230],
				fill: true,
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
						suggestedMin: 0,
						suggestedMax: 500,
						// min: 0,
						// max: 500, // Your absolute max value
						// callback: function (value) {
						// 	return ((value / 500) * 100).toFixed(0) + "%"; // convert it to percentage
						// },
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
						display: true,
						drawOnChartArea: true,
						drawTicks: true,
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
export const lineChartData = {
	type: "line",
	data: {
		labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "Mobile apps",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#38d6ae",
				borderWidth: 3,
				backgroundColor: [
					"rgba(56, 214, 174,0.3)",
					"rgba(56, 214, 174,0.2)",
					"rgba(56, 214, 174,0.1)",
				],
				fill: true,
				data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
				maxBarThickness: 6,
			},
			{
				label: "Websites",
				tension: 0.4,
				borderWidth: 0,
				pointRadius: 0,
				borderColor: "#e9ecef",
				borderWidth: 3,
				backgroundColor: [
					"rgba(233, 236, 239, 0.3)",
					"rgba(233, 236, 239, 0.2)",
					"rgba(233, 236, 239, 0.1)",
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
						suggestedMin: 0,
						suggestedMax: 500,
						// min: 0,
						// max: 500, // Your absolute max value
						// callback: function (value) {
						// 	return ((value / 500) * 100).toFixed(0) + "%"; // convert it to percentage
						// },
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
						display: true,
						drawOnChartArea: true,
						drawTicks: true,
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
