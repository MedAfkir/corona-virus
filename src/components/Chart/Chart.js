import React, { useState, useContext, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { colors } from "./../../utils";
import { Context } from "./../../Context";

const Chart = ({ ...props }) => {
  // Max width for small devices
  const maxWidth = 560;
  const [activeIndex, setActiveIndex] = useState(0);
  const [smallDevice, setSmallDevice] = useState(window.innerWidth <= maxWidth);

  const {
    data: { confirmed, recovered, deaths },
  } = useContext(Context);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSmallDevice(window.innerWidth <= maxWidth);
    });
  }, []);

  // Pie Chart Data
  const active = confirmed.value - recovered.value - deaths.value;
  const pieData = [
    { name: "Active", value: active, fill: colors.main },
    { name: "Recovered", value: recovered.value, fill: colors.green },
    { name: "Deaths", value: deaths.value, fill: colors.red },
  ];

  const onPieEnter = (data, index) => setActiveIndex(index);

  const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={smallDevice ? cy - 23 : cy}
          dy={8}
          textAnchor="middle"
          fill="#252525"
          style={{ fontWeight: 700 }}
        >
          {payload.name}
        </text>
        {smallDevice && (
          <>
            <text
              x={cx}
              y={cy}
              dy={8}
              textAnchor="middle"
              fill={fill}
              style={{ fontWeight: 700, letterSpacing: 0.5 }}
            >
              {value}
            </text>
            <text
              x={cx}
              y={cy + 20}
              dy={8}
              textAnchor="middle"
              fill="#817c9b"
              style={{ fontSize: 14 }}
            >
              {`${(percent * 100).toFixed(2)}%`}
            </text>
          </>
        )}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        {!smallDevice && (
          <>
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 12}
              fill={fill}
            />
            <path
              d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
              stroke={fill}
              fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              y={ey}
              textAnchor={textAnchor}
              fill="#333"
              style={{ fontWeight: 700 }}
            >
              {value}
            </text>
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              y={ey}
              dy={18}
              textAnchor={textAnchor}
              fill="#817c9b"
            >{`${(percent * 100).toFixed(2)}%`}</text>
          </>
        )}
      </g>
    );
  };

  return (
    <div
      style={{
        marginTop: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PieChart width={600} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={pieData}
          cx={300}
          cy={200}
          innerRadius={110}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  );
};

export default Chart;
