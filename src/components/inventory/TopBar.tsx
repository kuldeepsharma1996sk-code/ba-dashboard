import { Search, Bell, Menu, Calendar } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="flex flex-col border-b border-slate-200 bg-white">
      {/* Top Header Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Menu className="w-5 h-5 text-slate-500 cursor-pointer" onClick={onMenuClick} />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Inventory Dashboard</h1>
            <p className="text-xs text-slate-500 mt-0.5">Real-time stock availability, in queue, and material requirement tracking</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm cursor-pointer">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-slate-500" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">5</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
