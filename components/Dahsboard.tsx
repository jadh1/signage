"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";

// Chart Data
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartData2 = [
  { browser: "Chrome", visitors: 275, fill: "#FF6384" },
  { browser: "Safari", visitors: 200, fill: "#36A2EB" },
  { browser: "Firefox", visitors: 287, fill: "#FFCE56" },
  { browser: "Edge", visitors: 173, fill: "#4BC0C0" },
  { browser: "Other", visitors: 190, fill: "#9966FF" },
];

const chartData3 = [
  { device: "Desktop", users: 150, fill: "#8884d8" },
  { device: "Mobile", users: 250, fill: "#82ca9d" },
  { device: "Tablet", users: 100, fill: "#ffc658" },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#8884d8",
  },
  mobile: {
    label: "Mobile",
    color: "#82ca9d",
  },
};

const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
};

const chartConfig3 = {
  users: {
    label: "Users",
    color: "#ffc658",
  },
};

export function Component() {
  const totalVisitors = useMemo(() => {
    return chartData2.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Bar Chart - Desktop vs Mobile */}
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart width={400} height={300} data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
              <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Donut</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig2} className="mx-auto aspect-square max-h-[250px]">
            <PieChart width={400} height={300}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={chartData2} dataKey="visitors" nameKey="browser" innerRadius={60} outerRadius={80}>
                {chartData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  position="outside"
                  //formatter={(value) => `${value} visitors`}
                  fontSize={10}
                  fill="#333"
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Total Visitors: {totalVisitors} <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>

      {/* Bar Chart - Device Users */}
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Devices</CardTitle>
          <CardDescription>Device User Distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig3}>
            <BarChart width={400} height={300} data={chartData3}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="device" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="users" fill={chartConfig3.users.color} radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Users segmented by device type <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
