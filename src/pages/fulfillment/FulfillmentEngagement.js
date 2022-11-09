import React, { useEffect, useLayoutEffect, useState } from "react";
import LineChart from "../components/LineChart";
import MeterChart from "../components/MeterChart";
var filters = localStorage.getItem("filters");
function FulfillmentEngagement(props) {
  const [filter, setFilter] = useState(filters);
  const [areaChartData1, setAreaChartData1] = useState(null);
  const [areaChartData2, setAreaChartData2] = useState(null);
  const [areaChartData3, setAreaChartData3] = useState(null);
  const [barChartData,setBarChartData] = useState(null);
  const [polarChartData,setPolarChartData] = useState(null);
  const [conversionNum,setConversionNum] =useState(null);
  const [conversionPercentag,setConversionPercentag] =useState(null);
  const [nbrx, setNbrx] = useState(null);
  useEffect(() => {
    const fetchFulfillmentEngagementData = async () => {
      const res = await fetch(
        "https://kpi-tool.psglobalgroup.com/api/fulfillment-engagement.php",
        { key: filter }
      );
      const data = await res.json();
      console.log("fulfillEngagedata ==== ", data);
 setConversionNum(data.overall_conversion_num);
 setConversionPercentag(data.overall_conversion_prcentage);
	  setPolarChartData({
		type: "polarArea",
		data: {
		  labels: ["JCP Care", "So Simple", "Janssen Link", "JCP Savings"],
		  datasets: [
			{
			  label: "My First Dataset",
			  data: [7, 4, 7, 3],
			  backgroundColor: ["#38d6ae", "#3A416F", "#a8b8d8", "#e9ecef"],
			},
		  ],
		},
		options: {
		  scale: {
			ticks: {
			  display: false,
			  maxTicksLimit: 1,
			},
			title: {
        display: false,
        text: "Chart.js line Chart - Multi Axis",
			  color: "#b2b9bf",
			},
		  },
		  plugins: {
			legend:  {
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
		  },
		},
	  });
      setAreaChartData1({
        type: "line",
        data: {
          labels: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Samples",
              tension: 0.3,
              pointRadius: 2,
              pointBackgroundColor: "#38d6ae",
              borderColor: "#38d6ae",
              borderWidth: 2,
              backgroundColor: [
                "rgba(56, 214, 174,0.3)",
                "rgba(56, 214, 174,0.2)",
                "rgba(56, 214, 174,0.1)",
              ],
              data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
              maxBarThickness: 6,
              fill: true,
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
									suggestedMax: 0,
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
      });
      setAreaChartData2({
        type: "line",
        data: {
          labels: data.month_array,
          datasets: [
            {
              label: "Converted",
              tension: 0.3,
              pointRadius: 2,
              pointBackgroundColor: "#38d6ae",
              borderColor: "#38d6ae",
              borderWidth: 2,
              backgroundColor: [
                "rgba(56, 214, 174,0.3)",
                "rgba(56, 214, 174,0.2)",
                "rgba(56, 214, 174,0.1)",
              ],
              data: data.convertion_rate.converted,
              maxBarThickness: 6,
              fill: true,
            },
            {
              label: "Did Not Convert",
              tension: 0.3,
              pointRadius: 2,
              pointBackgroundColor: "#e9ecef",
              borderColor: "#e9ecef",
              borderWidth: 2,
              backgroundColor: [
                "rgba(233, 236, 239,0.3)",
                "rgba(233, 236, 239,0.2)",
                "rgba(233, 236, 239,0.1)",
              ],
              data: data.convertion_rate.notconverted,
              maxBarThickness: 6,
              fill: true,
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
									suggestedMax: 0,
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
      });
      setAreaChartData3({
				type: "line",
				data: {
				  labels:(data.week_array),
				  datasets: [
					{
					  label: "Enrolled",
					  tension: 0.4,
					  borderWidth: 0,
					  pointRadius: 0,
					  borderColor: "#38d6ae",
					  borderWidth: 3,
					  backgroundColor:`rgba(56, 214, 174, 0.2)`,
					  fill: true,
					  data: (data.weekly.enrollment),
					  maxBarThickness: 6,
					},
					{
					  label: "Fulfilled",
					  tension: 0.4,
					  borderWidth: 0,
					  pointRadius: 0,
					  borderColor: "#e9ecef",
					  borderWidth: 3,
					  backgroundColor: `rgba(233, 236, 239, 0.2)`,
					  fill: true,
            data: (data.weekly.fullfillment),
					  maxBarThickness: 6,
					},
				  ],
				},
				options:{
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
									suggestedMax: 0,
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
			});
	  setBarChartData({
		type: "bar",
    data: {
      labels: (data.month_array_timetaken),
      datasets: [
        {
          label: "Days",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#b2b9bf",
          data:(data.timetaken_series),
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
									suggestedMax: 0,
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
	  });
      setNbrx(data.total_enrollment_rx);
    };

    fetchFulfillmentEngagementData();
  }, [filters]);
  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-8">
            <div className="card card-plain mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-10">
                    <div className="d-flex flex-column h-100">
                      <h2 className="font-weight-bolder mb-0">
                        Fulfillment Engagement
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card p-2">
              <div className="card-header p-3 pb-0">
                <div className="d-flex align-items-center">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i
                      className="ni ni-money-coins text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ms-3">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                      Sample Program Cost Analysis
                    </p>
                    <h5 className="font-weight-bolder mb-0">$4,489</h5>
                  </div>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Monitor the number and cost of samples distributed to patients as trial therapy or bridge therapy until insurance coverage is determined."
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="javascript:;"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPNGChart(chartCostAnalysis,'Sample Program Cost Analysis');"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPDFChart('chart-line2','Sample Program Cost Analysis')"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PDF
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body mt-3">
                <div className="chart">
                  {areaChartData1 && (
                    <LineChart
                      id="chart-line2"
                      config={areaChartData1}
                      height={225}
                    />
                  )}
                  {/* <canvas
										id="chart-line2"
										className="chart-canvas"
										height={225}
									/> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card p-2">
              <div className="card-header p-3 pb-0">
                <div className="d-flex align-items-center">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i
                      className="ni ni-curved-next text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ms-3">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                      Sample Program Conversion
                    </p>
                    <h5 className="font-weight-bolder mb-0">
                      <span id="overall_conversion_num" />{conversionNum}
                    </h5>
                  </div>
                  <div className="progress-wrapper ms-auto w-30">
                    <div className="progress-info">
                      <div className="progress-percentage mb-2">
                        <span className="text-xs font-weight-bold">
                          Conversion Rate:
                          <span id="overall_conversion" />{conversionPercentag}%
                        </span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-gradient-primary w-60"
                        role="progressbar"
                        aria-valuenow={60}
                        aria-valuemin={0}
                        aria-valuemax={100}
						width={`${conversionPercentag}%`}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="See how many patients convert from these sample programs to paid prescription fulfillment, and monitor the conversion rate changes over a period a time."
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="javascript:;"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPNGChart(chartProgramConversion,'Sample Program Conversion');"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPDFChart('chart-line3','Sample Program Conversion')"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PDF
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body mt-3">
                <div className="chart">
                  {areaChartData2 && (
                    <LineChart
                      id="chart-line3"
                      config={areaChartData2}
                      height={200}
                    />
                  )}
                  {/* <canvas
										id="chart-line3"
										className="chart-canvas"
										height={200}
									/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-5">
            <div className="card height-600">
              <div className="card-header pb-0 p-3">
                <div className="d-flex align-items-center">
                  <h6 className="mb-0">Total Fulfillment VS NBRx</h6>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=" Track the number of new prescriptions filled with the support of our program out of the total number of new-to-brand prescriptions for a given time period.  Source: Ashfield patient reporting and claims data."
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="javascript:;"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            id="radarChartPng"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            id="radarChartPdf"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PDF
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {nbrx && (
                <MeterChart id="fulfill-rx" total_nbrx_enrollment={nbrx} />
              )}
              {/* <div className="chartdiv" id="fulfill-rx" /> */}
            </div>
          </div>
          <div className="col-7">
            <div className="card height-600">
              <div className="card-header pb-0 p-3">
                <div className="d-flex align-items-center">
                  <h6 className="mb-0">Weekly Fulfillment</h6>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=" Track the number of new prescriptions filled with the support of our program. Source: Ashfield patient reporting and claims data."
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="javascript:;"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPNGChart(chartWeeklyFulfillment,'Weekly Fulfillment');"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPDFChart('chart-line','Weekly Fulfillment')"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PDF
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="chart min-height-300">
				{areaChartData3 && (
                    <LineChart
                      id="chart-line"
                      config={areaChartData3}
                      height={500}
                    />
					)}
                  {/* <canvas
                    id="chart-line"
                    className="chart-canvas"
                    height={500}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-8">
            <div className="card height-600 p-3">
              <div className="card-header pb-0 p-3">
                <div className="d-flex align-items-center">
                  <h6 className="mb-0">
                    Average Time To Fill After Enrollment
                  </h6>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Track the number of new prescriptions filled with the support of our program out of the total number of new-to-brand prescriptions for a given time period. Source: Ashfield patient reporting and claims data."
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="javascript:;"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPNGChart(chartAfterEnrollment,'Average Time To Fill After Enrollment');"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPDFChart('chart-bars','Average Time To Fill After Enrollment')"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PDF
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="border-radius-lg py-3 pe-1">
                  <div className="chart mt-5 height-400">
				{barChartData &&	<LineChart id="chart-bars"config={barChartData}/>}
                    <canvas id="chart-bars" className="chart-canvas" />
                  </div>
                </div>
                <div className="container border-radius-lg" />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card height-600">
              <div className="card-header pb-0 p-3">
                <div className="d-flex align-items-center">
                  <h6 className="mb-0">With Me Guide Referrals</h6>
                  <button
                    type="button"
                    className="btn btn-icon-only btn-rounded btn-outline-secondary btn-sm d-flex align-items-center justify-content-center ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Track referrals to fulfillment resources available through Janssen by the withMe Guides. See which resources are most utilized, and which are underutilized to ensure patients are receiving the support they need. Sources: Ashfield and JCP"
                  >
                    <i className="fas fa-info" aria-hidden="true" />
                  </button>
                  <div className="ms-auto">
                    <div className="dropdown pe-2">
                      <a
                        href="javascript:;"
                        className="text-white ps-4"
                        id="dropdownCard"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v" aria-hidden="true" />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end me-sm-n4 px-2 py-3"
                        aria-labelledby="dropdownCard"
                      >
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-share me-2" /> Share
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                          >
                            <i className="fa-regular fa-add me-2" /> Add to
                            Report
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPNGChart(chartGuideReferrals,'With Me Guide Referrals');"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PNG
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item border-radius-md"
                            href="javascript:;"
                            onclick="downloadPDFChart('polar-chart','With Me Guide Referrals')"
                          >
                            <i className="fa-regular fa-file-arrow-down me-2" />
                            Download PDF
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">
				{polarChartData &&	<LineChart 
					  id="polar-chart"
					config={polarChartData}
                    width={250}
                    height={300} />}
                  {/* <canvas
                    id="polar-chart"
                    width={200}
                    height={200}
                    className="chart-canvas"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer pt-3">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                  © ,
                  <a
                    href="https://ipghealth.com/network/90north"
                    className="font-weight-bold"
                    target="_blank"
                  >
                    90NORTH
                  </a>
                  An IPG Health Company
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default FulfillmentEngagement;
