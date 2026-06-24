import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ExpenseChart({ data }) {
  const chartData = useMemo(() => {
    const totals = data.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
      return acc;
    }, {});

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [data]);

  const COLORS = ['#D4AF37', '#B8860B', '#DAA520', '#F4A460', '#CD853F', '#8B4513'];

  if (data.length === 0) {
    return (
      <div className="bg-white border border-[#D4AF37] rounded-2xl p-6 h-72 flex items-center justify-center shadow-sm">
        <p className="text-gray-400 italic">No expenses logged for this date yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37] rounded-2xl p-6 h-80 shadow-sm flex flex-col">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Expense Breakdown</h2>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #D4AF37' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle"/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}