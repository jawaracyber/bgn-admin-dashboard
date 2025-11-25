import * as XLSX from 'xlsx';
import { SPPGData } from '../lib/supabase';

export function exportSPPGToExcel(data: SPPGData[], filename?: string) {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const exportData = data.map(item => ({
    'ID': item.id,
    'Nama SPPG': item.nama_sppg,
    'Kota/Kabupaten': item.kota_kabupaten,
    'Kecamatan': item.kecamatan,
    'Provinsi': item.provinsi,
    'Alamat': item.alamat || '',
    'Status': item.status || '',
    'Program Status': item.prog_stat || '',
    'Reference/Attention': item.reff_attention || '',
    'Created At': item.created_at || '',
    'Updated At': item.updated_at || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const colWidths = [
    { wch: 12 },
    { wch: 35 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 40 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 }
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data SPPG');

  const fileName = filename || `data_sppg_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
