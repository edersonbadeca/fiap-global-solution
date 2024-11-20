import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const Graph = ({ data }) => {
    if (data.length !== 0) {
        data.map((d) => {
            console.log(d);
        })
    }
    const series = [
  {
    name: "devices",
    data: data
  },
];
  return (
    <VictoryChart
      theme={VictoryTheme.clean}
    >
      <VictoryLine
        data={series[0].data.map(
          (d, i) => ({
            x: i,
            y: d
          }),
        )}
      />
    </VictoryChart>
  );
};

export default Graph;
