const fs = require('fs');

async function upload() {
  const filePath = 'd:/Antigravity_projects/Final Dashboard/Products Report.csv';
  const fileContent = fs.readFileSync(filePath);
  const blob = new Blob([fileContent], { type: 'text/csv' });
  const formData = new FormData();
  formData.append('file', blob, 'Products Report.csv');
  formData.append('uploadedBy', 'Agent Auto-Upload');

  try {
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    console.log("Upload Success:", data);
  } catch(e) {
    console.error("Upload Error:", e);
  }
}
upload();
