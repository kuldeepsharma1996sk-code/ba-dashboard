import Papa from 'papaparse';

interface CsvRow {
  name: string;
  category_type: string;
  product_type: string;
  product_subtype: string;
  product_name: string;
  product_number: string;
  product_alias: string;
  product_code: string;
  hsn_code: string;
  description: string;
  mrp: string;
  rate: string;
  gst: string;
  qty: string;
  created_by: string;
  date: string;
  time: string;
}

export function parseCSVData(csvString: string) {
  const result = Papa.parse<CsvRow>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  const records = result.data;
  
  // Aggregate data for OEM
  const oemMap = new Map<string, any>();
  const materialMap = new Map<string, any>();
  const lowStockItems: any[] = [];
  
  let totalSqft = 0;
  let totalPcs = 0;

  records.forEach(row => {
    const brandName = row.name || row['OEM Name'] || row['oem_name'] || 'Unknown Brand';
    const pType = row.product_type || row['Product Type'] || row['product type'] || 'Unknown Product Type';
    const pSubtype = row.product_subtype || row['Product Subtype'] || row['product subtype'] || '';
    const pName = row.product_name || row['Product Name'] || row['product name'] || '';
    
    const skuName = pSubtype || pType || pName || 'Unknown Material';
    const productType = pType;
    const skuCode = row.product_code || row['Code'] || row['code'] || `SKU-${Math.floor(Math.random()*10000)}`;
    const category = row.category_type || row['Category'] || row['category'] || 'Unknown';
    
    let uom = 'Pcs';
    if (category.toLowerCase() === 'media') {
      uom = 'Sqft';
    } else if (category.toLowerCase() === 'electricals') {
      uom = 'Pcs';
    } else {
      uom = (pName?.toLowerCase().includes('sqft') || row.description?.toLowerCase().includes('sqft') || pType === 'Vinyl' || pType === 'Flex' || pType === 'Glass Film') ? 'Sqft' : 'Pcs';
    }
    const qty = parseFloat(row.qty || row['Qty'] || row['qty']) || 0;

    if (uom === 'Sqft') totalSqft += qty;
    if (uom === 'Pcs') totalPcs += qty;

    // --- Build OEM Data ---
    if (!oemMap.has(brandName)) {
      oemMap.set(brandName, {
        id: `oem-${brandName.replace(/\s+/g, '-')}`,
        brand: brandName,
        skuCount: 0,
        available: 0,
        inQueue: 0,
        netAvailable: 0,
        status: 'Healthy',
        skus: []
      });
    }
    const oemEntry = oemMap.get(brandName);
    oemEntry.skuCount += 1;
    oemEntry.available += qty;
    oemEntry.netAvailable += qty;
    oemEntry.skus.push({
      id: skuCode,
      name: skuName,
      productType: productType,
      uom: uom,
      available: qty,
      inQueue: 0,
      netAvailable: qty,
      category: category,
      status: qty > 0 ? 'Healthy' : 'Out of Stock'
    });
    
    // --- Build Material Data ---
    if (!materialMap.has(productType)) {
      materialMap.set(productType, {
        id: `mat-${productType.replace(/\s+/g, '-')}`,
        name: productType,
        uom: uom,
        category: category,
        available: 0,
        inQueue: 0,
        netAvailable: 0,
        status: 'Healthy',
        brands: []
      });
    }
    const matEntry = materialMap.get(productType);
    matEntry.available += qty;
    matEntry.netAvailable += qty;
    
    // check if brand already in this material's brands list
    let bEntry = matEntry.brands.find((b: any) => b.name === brandName);
    if (!bEntry) {
      bEntry = { name: brandName, available: 0, inQueue: 0, netAvailable: 0, status: 'Healthy' };
      matEntry.brands.push(bEntry);
    }
    bEntry.available += qty;
    bEntry.netAvailable += qty;

    // --- Low Stock Items ---
    if (qty <= 0) {
      lowStockItems.push({
        id: skuCode,
        name: skuName,
        uom: uom,
        category: category,
        available: qty,
        minLevel: 100, // Dummy min level
        leftPct: 0,
        status: 'Out of Stock'
      });
    }
  });

  const oemData = Array.from(oemMap.values());
  const materialData = Array.from(materialMap.values());
  
  const sqftData = [{ name: 'Graphics', value: totalSqft, fill: '#3b82f6' }];
  const pcsData = [{ name: 'Lighting', value: totalPcs, fill: '#10b981' }];

  return {
    parsedCount: records.length,
    oemData,
    materialData,
    lowStockItems: lowStockItems.slice(0, 50), // cap it so UI doesn't lag
    sqftData,
    pcsData
  };
}
