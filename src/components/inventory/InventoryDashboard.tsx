"use client";

import { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import KPIGrid from './KPIGrid';
import OEMTable from './tables/OEMTable';
import MaterialTable from './tables/MaterialTable';

export default function InventoryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'oem' | 'material'>('oem');
  
  // Data State
  const [oemData, setOemData] = useState<any[]>([]);
  const [materialData, setMaterialData] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Filter States (applied to data)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedUOM, setSelectedUOM] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Polling for real-time updates
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const res = await fetch('/api/inventory/latest');
        if (res.ok) {
          const data = await res.json();
          setOemData(data.oemData || []);
          setMaterialData(data.materialData || []);
          setLowStockItems(data.lowStockItems || []);
        }
      } catch (error) {
        console.error('Failed to fetch inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
    const interval = setInterval(fetchInventoryData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute dynamic lists for dropdowns
  const categoryList = useMemo(() => {
    const categories = new Set<string>();
    oemData.forEach(oem => oem.skus.forEach((sku: any) => { if(sku.category && sku.category !== 'Unknown') categories.add(sku.category); }));
    return Array.from(categories).sort();
  }, [oemData]);

  const brandsList = useMemo(() => {
    const brands = new Set<string>();
    oemData.forEach(oem => brands.add(oem.brand));
    return Array.from(brands).sort();
  }, [oemData]);

  const uomList = useMemo(() => {
    const uoms = new Set<string>();
    oemData.forEach(oem => oem.skus.forEach((sku: any) => uoms.add(sku.uom)));
    return Array.from(uoms).sort();
  }, [oemData]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedUOM('All');
    setSelectedStatus('All');
  };

  // Filter Logic
  const filteredOemData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    
    return oemData.map(oem => {
      // Filter the SKUs inside the OEM
      const filteredSkus = oem.skus.filter((sku: any) => {
        const matchesSearch = sku.name.toLowerCase().includes(q) || sku.id.toLowerCase().includes(q) || oem.brand.toLowerCase().includes(q);
        const matchesCategory = selectedCategory === 'All' || sku.category === selectedCategory;
        const matchesUom = selectedUOM === 'All' || sku.uom === selectedUOM;
        const matchesStatus = selectedStatus === 'All' || 
          (selectedStatus === 'Healthy' && sku.netAvailable > 0) || 
          (selectedStatus === 'Out of Stock' && sku.netAvailable <= 0);
        return matchesSearch && matchesCategory && matchesUom && matchesStatus;
      });

      return {
        ...oem,
        skus: filteredSkus,
        // Update aggregated counts to reflect filtered inner items
        skuCount: filteredSkus.length,
        netAvailable: filteredSkus.reduce((acc: number, sku: any) => acc + sku.netAvailable, 0)
      };
    }).filter(oem => {
      // Filter out OEMs that don't match the selected brand or have no SKUs left after inner filtering
      const matchesBrand = selectedBrand === 'All' || oem.brand === selectedBrand;
      return matchesBrand && oem.skus.length > 0;
    });
  }, [oemData, searchQuery, selectedCategory, selectedBrand, selectedUOM, selectedStatus]);

  const filteredMaterialData = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return materialData.map(mat => {
      const filteredBrands = mat.brands.filter((b: any) => {
        const matchesSearch = mat.name.toLowerCase().includes(q) || b.name.toLowerCase().includes(q);
        const matchesCategory = selectedCategory === 'All' || mat.category === selectedCategory;
        const matchesBrand = selectedBrand === 'All' || b.name === selectedBrand;
        const matchesUom = selectedUOM === 'All' || mat.uom === selectedUOM;
        const matchesStatus = selectedStatus === 'All' || 
          (selectedStatus === 'Healthy' && b.netAvailable > 0) || 
          (selectedStatus === 'Out of Stock' && b.netAvailable <= 0);
        return matchesSearch && matchesCategory && matchesBrand && matchesUom && matchesStatus;
      });

      return {
        ...mat,
        brands: filteredBrands,
        netAvailable: filteredBrands.reduce((acc: number, b: any) => acc + b.netAvailable, 0)
      };
    }).filter(mat => mat.brands.length > 0);
  }, [materialData, searchQuery, selectedCategory, selectedBrand, selectedUOM, selectedStatus]);

  const filteredLowStock = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return lowStockItems.filter((item: any) => {
      const matchesSearch = item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      const matchesUom = selectedUOM === 'All' || item.uom === selectedUOM;
      return matchesSearch && matchesUom;
    });
  }, [lowStockItems, searchQuery, selectedUOM]);


  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-4">
            
            <KPIGrid lowStockItems={filteredLowStock} />
            
            {/* View Toggle and Filters */}
            <div className="flex flex-col gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveView('oem')}
                    className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${
                      activeView === 'oem' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    VIEW 1: OEM / BRAND WISE
                  </button>
                  <button 
                    onClick={() => setActiveView('material')}
                    className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${
                      activeView === 'material' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    VIEW 2: MATERIAL WISE (SKU WISE)
                  </button>
                </div>
                
                {loading && <div className="mr-4 text-xs font-semibold text-blue-500 animate-pulse">Syncing...</div>}
              </div>

              {/* Filters Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Category</span>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 min-w-[120px] outline-none hover:border-blue-300 transition-colors"
                    >
                      <option value="All">All Categories</option>
                      {categoryList.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">OEM / Brand</span>
                    <select 
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 min-w-[120px] outline-none hover:border-blue-300 transition-colors"
                    >
                      <option value="All">All Brands</option>
                      {brandsList.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">UOM</span>
                    <select 
                      value={selectedUOM}
                      onChange={(e) => setSelectedUOM(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 min-w-[80px] outline-none hover:border-blue-300 transition-colors"
                    >
                      <option value="All">All UOM</option>
                      {uomList.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Status</span>
                    <select 
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 min-w-[100px] outline-none hover:border-blue-300 transition-colors"
                    >
                      <option value="All">All Status</option>
                      <option value="Healthy">Healthy (&gt;0)</option>
                      <option value="Out of Stock">Out of Stock (=0)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search SKU / Material" 
                      className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm w-[200px] outline-none focus:border-blue-500 hover:border-blue-300 transition-colors bg-slate-50"
                    />
                  </div>
                  <button 
                    onClick={handleResetFilters}
                    className="px-4 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            
            <div className="h-[420px]">
              {activeView === 'oem' ? <OEMTable oemData={filteredOemData} /> : <MaterialTable materialData={filteredMaterialData} />}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
