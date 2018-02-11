
import React from 'react'
import { connect } from 'react-redux'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
const Chart = (props) => {
  { console.log(props) }
  return (
    <ResponsiveContainer minHeight={400}>

      <BarChart
        layout="vertical"
        width={800} height={400} data={props.data}
        margin={{ top: 20, right: 50, left: 70, bottom: 5 }}>
        <XAxis type="number" />
        <YAxis dx={-20} type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" stackId="a" fill="#134972" />
        <Bar dataKey="expense" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>





  );
}

export default connect(
  ({ browser }) => ({ browser }),
  {},
)(Chart)
