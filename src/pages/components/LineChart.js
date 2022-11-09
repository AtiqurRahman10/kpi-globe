import React, { useEffect } from "react";
// import Chart from "chart.js";
import Chart from "chart.js";
// import "./styles.css";
export default function LineChart({ id, config, height = "500" }) {
	useEffect(() => {
		var ctx3 = document.getElementById(`${id}`).getContext("2d");
		var myLineChart = new Chart(
			ctx3,
			// {
			// 	type: "line",
			// 	data: props.data,
			// 	options: props.options,
			// }
			config
		);
		myLineChart.update();
	}, []);

	return <canvas id={id} className="chart-canvas" height={height} />;
}
