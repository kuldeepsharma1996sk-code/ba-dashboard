"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function QueueSummaryCharts({ sqftData, pcsData }: { sqftData: any[], pcsData: any[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase">QUEUE SUMMARY</h2>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Detailed Report</button>
      </div>
      
      <div className="flex-1 p-4 flex gap-4 h-full">
        {/* Sqft Chart */}
        <div className="flex-1 flex flex-col bg-slate-50 rounded-lg p-3 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-600 mb-2 text-center uppercase">Square Feet</h3>
          <div className="flex-1 relative min-h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sqftData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sqftData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-700">
                {sqftData.reduce((acc: number, curr: any) => acc + curr.value, 0).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex flex-col gap-1 text-[10px]">
            {sqftData.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pcs Chart */}
        <div className="flex-1 flex flex-col bg-slate-50 rounded-lg p-3 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-600 mb-2 text-center uppercase">Pieces (Pcs)</h3>
          <div className="flex-1 relative min-h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pcsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pcsData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-700">
                {pcsData.reduce((acc: number, curr: any) => acc + curr.value, 0).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex flex-col gap-1 text-[10px]">
            {pcsData.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
