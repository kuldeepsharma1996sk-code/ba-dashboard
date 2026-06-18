import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function MaterialTable({ materialData }: { materialData: any[] }) {
  const sortedMaterialData = [...materialData].sort((a, b) => b.netAvailable - a.netAvailable);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-full flex flex-col">
      <div className="overflow-auto flex-1 no-scrollbar rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="sticky top-0 bg-slate-50 z-10">
            <tr className="border-b border-slate-200">
              <th className="p-3 font-semibold text-slate-600">Product Type</th>
              <th className="p-3 font-semibold text-slate-600 text-center">No. of Brands</th>
              <th className="p-3 font-semibold text-slate-600 text-right">Total Sqft</th>
              <th className="p-3 font-semibold text-slate-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedMaterialData.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-slate-500">No data available</td></tr>
            ) : sortedMaterialData.map((mat) => {
              const isExpanded = expandedRow === mat.id;
              const hasZero = mat.netAvailable <= 0;
              return (
                <React.Fragment key={mat.id}>
                  <tr 
                    className="border-b border-slate-100 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => setExpandedRow(isExpanded ? null : mat.id)}
                  >
                    <td className="p-3 font-medium text-slate-800">{mat.name}</td>
                    <td className="p-3 text-center text-slate-600">{mat.brands.length > 0 ? mat.brands.length : 1}</td>
                    <td className={`p-3 text-right font-bold ${hasZero ? 'text-red-500' : 'text-emerald-500'}`}>
                      {mat.netAvailable.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-600 mx-auto" /> : <ChevronDown className="w-4 h-4 text-slate-400 mx-auto" />}
                    </td>
                  </tr>
                  
                  {isExpanded && mat.brands.length > 0 && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={4} className="p-0 border-b border-slate-200">
                        <table className="w-full text-xs">
                          <thead className="bg-white">
                            <tr className="border-b border-slate-200">
                              <th className="px-6 py-2 font-semibold text-slate-500">Brand Name</th>
                              <th className="px-3 py-2 font-semibold text-slate-500 text-right">Available Qty</th>
                              <th className="px-3 py-2 font-semibold text-slate-500 text-center">UOM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...mat.brands].sort((a: any, b: any) => b.netAvailable - a.netAvailable).map((b: any, bIdx: number) => {
                              const brandZero = b.netAvailable <= 0;
                              return (
                                <tr key={bIdx} className="border-b border-slate-100 hover:bg-white transition-colors">
                                  <td className="px-6 py-2.5 text-slate-600 font-medium">{b.name}</td>
                                  <td className={`px-3 py-2.5 text-right font-bold ${brandZero ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {b.netAvailable.toLocaleString()}
                                  </td>
                                  <td className="px-3 py-2.5 text-center text-slate-500">{mat.uom}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
