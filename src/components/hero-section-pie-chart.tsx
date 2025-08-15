"use client";

import { Heading } from "@radix-ui/themes";
import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { title: "Leather Keychain", stock: 150 },
  { title: "Cotton T-Shirt", stock: 100 },
  { title: "Ergonomic Office Chair", stock: 40 },
  { title: "Ceramic Vase", stock: 60 },
  { title: "Smart LED Bulb", stock: 300 },
  { title: "Reusable Water Bottle", stock: 90 },
  { title: "Wooden Desk Organizer", stock: 70 }
];

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57"
];

const renderActiveShape = (props: any) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle, fill, payload, stock
  } = props;

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

  // Clip text if too long
  const maxChars = 14;
  const displayTitle =
    payload.title.length > maxChars
      ? payload.title.slice(0, maxChars) + "…"
      : payload.title;

  return (
    <g>
      {/* Center Title - clipped to fit */}
      <text
        x={cx}
        y={cy}
        dy={4}
        textAnchor="middle"
        fill={fill}
        fontSize={14}
        fontWeight="bold"
      >
        {displayTitle}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        Stock: {stock}
      </text>
    </g>
  );
};

export default function ProductPieChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    
    <ResponsiveContainer width={"90%"} height={"90%"} >
      
      
      <PieChart>
        
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          width={"120%"}
          height={"120%"}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="stock"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
