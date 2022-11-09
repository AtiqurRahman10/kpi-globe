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

export let barChartData = {
	type: "bar",
	data: {
		labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "Patient Microsite",
				tension: 0.4,
				borderWidth: 0,
				borderRadius: 4,
				borderSkipped: false,
				backgroundColor: "#0dbeff",
				data: [650, 350, 500, 330, 550, 300, 200, 320, 600],
				maxBarThickness: 8,
			},
			{
				label: "HCP Microsite",
				tension: 0.4,
				borderWidth: 0,
				borderRadius: 4,
				borderSkipped: false,
				backgroundColor: "#b2b9bf",
				data: [320, 650, 350, 500, 550, 300, 200, 330, 600],
				maxBarThickness: 8,
			},
			{
				label: "Patient Text",
				tension: 0.4,
				borderWidth: 0,
				borderRadius: 4,
				borderSkipped: false,
				backgroundColor: "#38d6ae",
				data: [550, 300, 200, 320, 650, 350, 550, 300, 200],
				maxBarThickness: 8,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "bottom",
				labels: {
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
		interaction: {
			intersect: false,
			mode: "index",
		},
		scales: {
			y: {
				grid: {
					drawBorder: false,
					display: false,
					drawOnChartArea: false,
					drawTicks: false,
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
