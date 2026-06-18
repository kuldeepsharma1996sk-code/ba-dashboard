export function LowStockTable({ lowStockItems }: { lowStockItems: any[] }) {
  // Filter for items with zero or less availability
  const outOfStockItems = lowStockItems.filter((item: any) => item.available <= 0 || item.leftPct <= 0);
  
  const displayItems = outOfStockItems;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-bold text-red-500 uppercase">OUT OF ITEM (QTY = ZERO)</h2>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
      </div>
      
      <div className="overflow-auto flex-1 no-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr className="border-b border-slate-200">
              <th className="p-3 font-semibold text-slate-500">SKU</th>
              <th className="p-3 font-semibold text-slate-500">Material Name</th>
              <th className="p-3 font-semibold text-slate-500">UOM</th>
              <th className="p-3 font-semibold text-slate-500 text-right">Available</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-slate-500">No out of stock items</td></tr>
            ) : displayItems.map((item: any, idx: number) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-3 text-slate-600">{item.id}</td>
                <td className="p-3 font-medium text-slate-700">{item.name}</td>
                <td className="p-3 text-slate-500">{item.uom}</td>
                <td className="p-3 text-right text-red-500 font-bold">{item.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
