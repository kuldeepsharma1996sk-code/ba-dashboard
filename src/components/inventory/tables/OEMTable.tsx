import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function OEMTable({ oemData }: { oemData: any[] }) {
  const sortedOemData = [...oemData].sort((a, b) => b.netAvailable - a.netAvailable);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-full flex flex-col">
      <div className="overflow-auto flex-1 no-scrollbar rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="sticky top-0 bg-slate-50 z-10">
            <tr className="border-b border-slate-200">
              <th className="p-3 font-semibold text-slate-600">Brand Name</th>
              <th className="p-3 font-semibold text-slate-600 text-center">No. of SKU</th>
              <th className="p-3 font-semibold text-slate-600 text-right">Total Sqft</th>
              <th className="p-3 font-semibold text-slate-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOemData.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-slate-500">No data available</td></tr>
            ) : sortedOemData.map((oem) => {
              const isExpanded = expandedRow === oem.id;
              const hasZero = oem.netAvailable === 0;
              return (
                <React.Fragment key={oem.id}>
                  <tr 
                    className="border-b border-slate-100 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => setExpandedRow(isExpanded ? null : oem.id)}
                  >
                    <td className="p-3 font-medium text-slate-800">{oem.brand}</td>
                    <td className="p-3 text-center text-slate-600">{oem.skuCount}</td>
                    <td className={`p-3 text-right font-bold ${hasZero ? 'text-red-500' : 'text-emerald-500'}`}>
                      {oem.netAvailable.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-600 mx-auto" /> : <ChevronDown className="w-4 h-4 text-slate-400 mx-auto" />}
                    </td>
                  </tr>
                  
                  {isExpanded && oem.skus.length > 0 && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={4} className="p-0 border-b border-slate-200">
                        <table className="w-full text-xs">
                          <thead className="bg-white">
                            <tr className="border-b border-slate-200">
                              <th className="px-6 py-2 font-semibold text-slate-500">Product Type</th>
                              <th className="px-3 py-2 font-semibold text-slate-500">Material Name</th>
                              <th className="px-3 py-2 font-semibold text-slate-500 text-right">Available Qty</th>
                              <th className="px-3 py-2 font-semibold text-slate-500 text-center">UOM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...oem.skus].sort((a: any, b: any) => b.netAvailable - a.netAvailable).map((sku: any, i: number) => {
                              const skuZero = sku.netAvailable <= 0;
                              return (
                                <tr key={`${sku.id}-${i}`} className="border-b border-slate-100 hover:bg-white transition-colors">
                                  <td className="px-6 py-2.5 text-slate-600 font-medium">{sku.productType}</td>
                                  <td className="px-3 py-2.5 text-slate-600 font-medium">{sku.name}</td>
                                  <td className={`px-3 py-2.5 text-right font-bold ${skuZero ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {sku.netAvailable.toLocaleString()}
                                  </td>
                                  <td className="px-3 py-2.5 text-center text-slate-500">{sku.uom}</td>
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
