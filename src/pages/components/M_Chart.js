import React, { useEffect, useState } from "react";
// import Chart from "chart.js";
// import Chart from "chart.js";
// import "./styles.css";

import Chart from "chart.js";
// import { getRelativePosition } from "chart.js/helpers";
function M_Chart(props) {
	var myLineChart;
	useEffect(() => {
		// myLineChart.destroy();
		const ctx = document.getElementById(props.id).getContext("2d");
		// myLineChart.destroy();

		new Chart(ctx, props.config);
		// myLineChart.update({ duration: 800, easing: "easeOutBounce" });
	}, [props]);

	const addData = (testData) => {
		myLineChart.toBase64Image();
		// console.log("PROPS Data", props.data);
		// myLineChart.data.datasets[0].data[2] = 350;
		// myLineChart.update({ duration: 8000, easing: "easeOutBounce" });
		// myLineChart.destroy();
	};

	return (
		<>
			{/* <a onClick={addData}>click</a> */}
			<canvas id={props.id} className="chart-canvas" height={props.height} />
		</>
	);
}

export default M_Chart;
