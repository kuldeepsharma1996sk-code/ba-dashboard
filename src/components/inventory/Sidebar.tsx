import { Home, Package, X, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile/when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-[240px] flex-shrink-0 bg-[#0f172a] text-white flex flex-col h-full overflow-hidden border-r border-slate-800`}>
        <div className="p-4 flex items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white">
            <LayoutDashboard className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg tracking-tight">Inventory<span className="text-blue-500">Pro</span></span>
          </div>
          <X className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" onClick={() => setIsOpen(false)} />
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
              <Home className="w-4 h-4" />
              Dashboard
            </a>
            
            <div className="pt-2 pb-1">
              <div className="flex items-center justify-between px-3 py-2 text-sm text-blue-500 bg-blue-500/10 rounded-lg font-medium cursor-pointer">
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  Inventory
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              
              <div className="mt-1 ml-6 pl-4 border-l border-slate-800 space-y-1">
                <a href="#" className="block px-3 py-2 text-sm text-blue-400 font-medium bg-blue-500/10 rounded-lg">
                  Overview
                </a>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="p-4 text-[10px] text-slate-600 border-t border-slate-800">
          © 2025 BrandX. All rights reserved.
        </div>
      </div>
    </>
  );
}
