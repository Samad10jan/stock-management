"use client";

import { GET_All_PROD } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { Product } from "../../../generated/prisma";
import { Heading, Text } from "@radix-ui/themes";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57"
];

export default function PieChartHero() {
  const renderActiveShape = (props: any) => {
    const {
      cx, cy, midAngle, innerRadius, outerRadius,
      startAngle, endAngle, fill, payload
    } = props;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 15) * cos;
    const sy = cy + (outerRadius + 15) * sin;
    const mx = cx + (outerRadius + 40) * cos;
    const my = cy + (outerRadius + 40) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    // Clip text if too long
    const maxChars = 16;
    const displayTitle =
      payload.title.length > maxChars
        ? payload.title.slice(0, maxChars) + "…"
        : payload.title;

    return (
      <g>

        <text
          x={cx}
          y={cy}
          dy={4}
          textAnchor="middle"
          fill={fill}
          fontSize={14}
          fontWeight="bold"
        >
          Stock: {payload.stock}

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
          innerRadius={outerRadius + 8}
          outerRadius={outerRadius + 15}
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
          {displayTitle}
        </text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getAllPorducts: Product[] } = await gqlClient.request(GET_All_PROD);
        console.log(data.getAllPorducts);

        if (data.getAllPorducts) {
          setProducts(data.getAllPorducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, []);

  console.log("productsales :", products);

  const Data = products?.map((p) => {
    return {
      title: p.title,
      stock: p.stock
    };
  }) || [];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex rounded-full relative ">
      
      <div className="absolute top-0 mb-6">
        <h2 className="text-4xl font-bold"> <div>
          <Heading size="4">
            Stock Distribution
          </Heading>
          <Text size="2" color="gray">
            Visual breakdown of inventory
          </Text>
        </div></h2>
      </div>


      <div className="flex flex-col min-h-96 grow  " >
        <ResponsiveContainer >
          <PieChart>
            <Pie
            //@ts-ignore
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={Data}
              cx="60%"
              cy="50%"
              innerRadius={60}
              outerRadius={130}
              fill="#8884d8"
              dataKey="stock"
              
              onMouseEnter={onPieEnter}
            >
              {Data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}