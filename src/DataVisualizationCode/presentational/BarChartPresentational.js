import React from "react";
import Plot from "react-plotly.js";

const BarChartPresentational = (props) => {

    const {reqData} = props;

    const xAxisData = [];
    const yAxisData = [];
    for (let i=0;i<reqData.length;i++) {
      if (reqData[i].checkBox) {
        xAxisData.push(reqData[i].id);
        yAxisData.push(reqData[i].price);
      }
    }

    return (

      <Plot
        data={[
          { type: "bar", x: xAxisData, y: yAxisData }
        ]}
        layout={{ width: 500, height: 500, title: "Bar Chart" }}
      />

    );

}

export default BarChartPresentational;