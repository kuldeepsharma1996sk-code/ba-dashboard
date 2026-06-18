export const oemData = [
  {
    id: 'oem-1',
    brand: 'Avery Dennison',
    skuCount: 210,
    available: 78000,
    inQueue: 25000,
    netAvailable: 53000,
    status: 'Healthy',
    skus: [
      { id: 'AV-001', name: 'Gloss White Vinyl', uom: 'Sqft', available: 5000, inQueue: 2500, netAvailable: 2500, status: 'Healthy' },
      { id: 'AV-002', name: 'Frost Film', uom: 'Sqft', available: 1000, inQueue: 1500, netAvailable: -500, status: 'Order Required' },
      { id: 'AV-003', name: 'Reflective Film', uom: 'Sqft', available: 800, inQueue: 600, netAvailable: 200, status: 'Low Stock' },
      { id: 'AV-004', name: 'Printable Vinyl', uom: 'Sqft', available: 8500, inQueue: 4200, netAvailable: 4300, status: 'Healthy' },
    ]
  },
  {
    id: 'oem-2',
    brand: '3M',
    skuCount: 145,
    available: 45000,
    inQueue: 12000,
    netAvailable: 33000,
    status: 'Healthy',
    skus: []
  },
  {
    id: 'oem-3',
    brand: 'LX Hausys',
    skuCount: 88,
    available: 22000,
    inQueue: 5000,
    netAvailable: 17000,
    status: 'Healthy',
    skus: []
  }
];

export const materialData = [
  {
    id: 'mat-1',
    name: 'Frost Film',
    uom: 'Sqft',
    available: 5000,
    inQueue: 6500,
    netAvailable: -1500,
    status: 'Order Required',
    brands: [
      { name: 'Avery Dennison', available: 1000, inQueue: 1500, netAvailable: -500, status: 'Order Required' },
      { name: '3M', available: 2500, inQueue: 2000, netAvailable: 500, status: 'Healthy' },
      { name: 'LX Hausys', available: 1500, inQueue: 1000, netAvailable: 500, status: 'Healthy' }
    ]
  },
  { id: 'mat-2', name: 'Gloss White Vinyl', uom: 'Sqft', available: 12000, inQueue: 8000, netAvailable: 4000, status: 'Healthy', brands: [] },
  { id: 'mat-3', name: 'One Way Vision', uom: 'Sqft', available: 4600, inQueue: 3200, netAvailable: 1400, status: 'Low Stock', brands: [] },
  { id: 'mat-4', name: 'LED Module White', uom: 'Pcs', available: 15000, inQueue: 8000, netAvailable: 7000, status: 'Healthy', brands: [] },
  { id: 'mat-5', name: '12V Power Supply', uom: 'Pcs', available: 2400, inQueue: 2900, netAvailable: -500, status: 'Order Required', brands: [] },
  { id: 'mat-6', name: 'LED Strip 12V', uom: 'Pcs', available: 6000, inQueue: 4700, netAvailable: 1300, status: 'Low Stock', brands: [] },
  { id: 'mat-7', name: 'Acrylic 3mm Clear', uom: 'Sqft', available: 1800, inQueue: 1200, netAvailable: 600, status: 'Low Stock', brands: [] },
  { id: 'mat-8', name: 'Sunboard 3mm', uom: 'Sqft', available: 2000, inQueue: 1000, netAvailable: 1000, status: 'Healthy', brands: [] }
];

export const jobCards = [
  { id: 'JC-2501', client: 'TATA Motors Showroom', qty: 500, date: '25 May 2025' },
  { id: 'JC-2508', client: 'Reliance Digital', qty: 700, date: '26 May 2025' },
  { id: 'JC-2510', client: 'Axis Bank Signage', qty: 300, date: '27 May 2025' }
];

export const lowStockItems = [
  { id: 'AV-003', name: 'Reflective Film', uom: 'Sqft', available: 800, minLevel: 1000, leftPct: 16, status: 'Low Stock' },
  { id: 'LX-101', name: 'One Way Vision', uom: 'Sqft', available: 1400, minLevel: 2000, leftPct: 14, status: 'Low Stock' },
  { id: 'LED-STRIP-12V', name: 'LED Strip 12V', uom: 'Pcs', available: 600, minLevel: 1000, leftPct: 12, status: 'Low Stock' }
];

export const shortfallItems = [
  { id: 'AV-002', name: 'Frost Film', uom: 'Sqft', netAvailable: -500, shortage: 500, jobs: 3 },
  { id: 'PS-12V-20A', name: '12V Power Supply', uom: 'Pcs', netAvailable: -500, shortage: 500, jobs: 2 },
  { id: 'LED-MOD-WH', name: 'LED Module White', uom: 'Pcs', netAvailable: -1500, shortage: 1500, jobs: 2 }
];

export const sqftData = [
  { name: 'Graphics', value: 42560, fill: '#3b82f6' }
];
export const pcsData = [
  { name: 'Lighting', value: 28140, fill: '#10b981' }
];
