import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { 
  oemData as mockOemData, 
  materialData as mockMaterialData,
  lowStockItems as mockLowStockItems,
  sqftData as mockSqftData,
  pcsData as mockPcsData
} from '@/data/mockInventoryData';

export async function GET() {
  try {
    const db = getDB();
    
    // If we have parsed data, return it
    if (db.latestData) {
      return NextResponse.json(db.latestData);
    }

    // Otherwise, return mock data as fallback
    return NextResponse.json({
      oemData: mockOemData,
      materialData: mockMaterialData,
      lowStockItems: mockLowStockItems,
      sqftData: mockSqftData,
      pcsData: mockPcsData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inventory data' }, { status: 500 });
  }
}
