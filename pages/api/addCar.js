import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { carNumber, ownerName } = req.body;

    const filePath = path.join(process.cwd(), 'public', 'car_registry.xlsx');
    let workbook;

    if (fs.existsSync(filePath)) {
      workbook = xlsx.readFile(filePath);
    } else {
      workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet([['Car Number', 'Owner Name']]), 'Cars');
    }

    const sheet = workbook.Sheets['Cars'];
    const data = xlsx.utils.sheet_to_json(sheet);

    data.push({ 'Car Number': carNumber, 'Owner Name': ownerName });

    const newSheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets['Cars'] = newSheet;

    xlsx.writeFile(workbook, filePath);

    res.status(200).json({ message: 'Car added successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
