import { Package, Shapes, Lightbulb, AlertTriangle, ShoppingCart } from 'lucide-react';

export default function KPIGrid({ lowStockItems = [] }: { lowStockItems?: any[] }) {
  const outOfStockMedia = lowStockItems.filter(item => item.category === 'Media').length;
  const outOfStockElectrical = lowStockItems.filter(item => item.category === 'Electricals').length;
  const totalOutOfStock = lowStockItems.length;

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Total SKUs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">TOTAL SKUS</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-800">1,248</div>
            <div className="text-[10px] text-slate-500 mt-1">across all materials</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* SQFT Items */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">SQFT ITEMS</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-800">125,430.50</div>
            <div className="text-[10px] text-slate-500 mt-1">vinyl, wraps, films</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <Shapes className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* PCS Items */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">PCS ITEMS</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-800">58,752</div>
            <div className="text-[10px] text-slate-500 mt-1">LED, modules, hardware</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="text-[10px] uppercase font-bold text-red-500 mb-1">OUT OF STOCK</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-800">{totalOutOfStock}</div>
            <div className="text-[10px] text-slate-500 mt-1">
              <span className="font-semibold">{outOfStockMedia}</span> Media • <span className="font-semibold">{outOfStockElectrical}</span> Electrical
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
