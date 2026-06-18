import fs from 'fs';
import path from 'path';

export interface FileLog {
  id: string;
  filename: string;
  uploadDate: string;
  uploadTime: string;
  recordsParsed: number;
  uploadedBy: string;
}

export interface InventoryDB {
  logs: FileLog[];
  latestData: {
    oemData: any[];
    materialData: any[];
    lowStockItems: any[];
    sqftData: any[];
    pcsData: any[];
    lastUpdated: string;
  } | null;
}

const dbPath = path.join(process.cwd(), 'src', 'data', 'inventory-db.json');

export function getDB(): InventoryDB {
  if (!fs.existsSync(dbPath)) {
    return {
      logs: [],
      latestData: null
    };
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

export function saveDB(db: InventoryDB) {
  // Ensure directory exists
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
}
