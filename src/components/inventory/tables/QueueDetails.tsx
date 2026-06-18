import { X, FileText, AlertTriangle } from 'lucide-react';
import { jobCards } from '@/data/mockInventoryData';

export default function QueueDetails() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-full flex flex-col relative overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase">IN QUEUE DETAILS</h2>
        <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 text-left font-semibold text-slate-500">Material</th>
                <th className="py-2 text-left font-semibold text-slate-500">SKU</th>
                <th className="py-2 text-left font-semibold text-slate-500">UOM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 font-medium text-slate-800">Frost Film</td>
                <td className="py-2 text-slate-600">AV-002</td>
                <td className="py-2 text-slate-600">Sqft</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">AVAILABLE</div>
            <div className="text-sm font-bold text-emerald-600">1,000.00 <span className="text-[10px] font-normal">Sqft</span></div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-center">
            <div className="text-[10px] uppercase font-bold text-blue-600 mb-1">IN QUEUE</div>
            <div className="text-sm font-bold text-blue-600">1,500.00 <span className="text-[10px] font-normal">Sqft</span></div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-2 text-center">
            <div className="text-[10px] uppercase font-bold text-red-600 mb-1">SHORTAGE</div>
            <div className="text-sm font-bold text-red-600">500.00 <span className="text-[10px] font-normal">Sqft</span></div>
          </div>
        </div>
        
        <h3 className="text-sm font-bold text-slate-800 mb-3">Requested in Job Cards</h3>
        <div className="mb-6">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 font-semibold text-slate-500">Job Card No.</th>
                <th className="py-2 font-semibold text-slate-500">Client / Project</th>
                <th className="py-2 font-semibold text-slate-500 text-right">Qty Requested</th>
                <th className="py-2 font-semibold text-slate-500 text-right">Required Date</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.map(jc => (
                <tr key={jc.id} className="border-b border-slate-100">
                  <td className="py-2 font-medium text-slate-700">{jc.id}</td>
                  <td className="py-2 text-slate-600">{jc.client}</td>
                  <td className="py-2 text-right font-medium text-slate-700">{jc.qty}.00 Sqft</td>
                  <td className="py-2 text-right text-slate-600">{jc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6 border-t border-slate-200 pt-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">TOTAL DEMAND</div>
            <div className="text-sm font-bold text-slate-800">1,500.00 <span className="text-[10px] font-normal text-slate-500">Sqft</span></div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">AVAILABLE STOCK</div>
            <div className="text-sm font-bold text-blue-600">1,000.00 <span className="text-[10px] font-normal">Sqft</span></div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">SHORTAGE</div>
            <div className="text-sm font-bold text-red-600">500.00 <span className="text-[10px] font-normal">Sqft</span></div>
          </div>
        </div>
        
        <div className="bg-red-50/50 border border-red-200 rounded-lg p-3 mb-6">
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase mb-1">
            <AlertTriangle className="w-4 h-4" />
            ORDER REQUIRED
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Shortage of <span className="font-bold text-red-600">500.00 Sqft</span>. Please create purchase order.
          </p>
          <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 text-xs font-semibold rounded hover:bg-red-50 transition-colors">
            Create Purchase Request
          </button>
        </div>
        
        <h3 className="text-xs font-bold text-slate-800 mb-3">Quick Actions</h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm flex-1 justify-center">
            <FileText className="w-3.5 h-3.5" />
            View Material Card
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm flex-1 justify-center">
            <FileText className="w-3.5 h-3.5" />
            View All Job Cards
          </button>
        </div>
      </div>
    </div>
  );
}
