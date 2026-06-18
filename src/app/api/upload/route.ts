import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';
import { parseCSVData } from '@/lib/csvParser';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadedBy = formData.get('uploadedBy') as string || 'System';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const text = await file.text();
    const parsedData = parseCSVData(text);

    const db = getDB();

    // Create log entry
    const now = new Date();
    const logEntry = {
      id: `log-${Date.now()}`,
      filename: file.name,
      uploadDate: now.toLocaleDateString(),
      uploadTime: now.toLocaleTimeString(),
      recordsParsed: parsedData.parsedCount,
      uploadedBy
    };

    db.logs.unshift(logEntry);

    // Update latest data
    db.latestData = {
      oemData: parsedData.oemData,
      materialData: parsedData.materialData,
      lowStockItems: parsedData.lowStockItems,
      sqftData: parsedData.sqftData,
      pcsData: parsedData.pcsData,
      lastUpdated: new Date().toISOString()
    };

    saveDB(db);

    return NextResponse.json({ success: true, log: logEntry });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
