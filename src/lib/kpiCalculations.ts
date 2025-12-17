import { supabase } from './supabase';

export interface KPIBaseline {
  sppg_baseline: number;
  penerima_baseline: number;
  avg_penerima_per_sppg: number;
}

export interface KPICalculations {
  totalSPPG: number;
  totalSPPGBeroperasi: number;
  totalPenerimaManfaat: number;
  approvedCount: number;
  pendingCount: number;
}

export const fetchKPIBaseline = async (): Promise<KPIBaseline> => {
  const { data, error } = await supabase
    .from('kpi_baseline')
    .select('key, value');

  if (error) throw error;

  const baseline: KPIBaseline = {
    sppg_baseline: 19311,
    penerima_baseline: 55000000,
    avg_penerima_per_sppg: 2848,
  };

  if (data) {
    data.forEach((item) => {
      if (item.key === 'sppg_baseline') {
        baseline.sppg_baseline = Number(item.value);
      } else if (item.key === 'penerima_baseline') {
        baseline.penerima_baseline = Number(item.value);
      } else if (item.key === 'avg_penerima_per_sppg') {
        baseline.avg_penerima_per_sppg = Number(item.value);
      }
    });
  }

  return baseline;
};

export const calculateKPIs = async (): Promise<KPICalculations> => {
  const baseline = await fetchKPIBaseline();

  const { data: sppgData, error } = await supabase
    .from('sppg')
    .select('id, prog_stat');

  if (error) throw error;

  const totalSPPG = sppgData?.length || 0;

  const approvedCount = sppgData?.filter(item =>
    item.prog_stat === "APPROVED" || item.prog_stat === "APPROVED KUOTA"
  ).length || 0;

  const pendingCount = sppgData?.filter(item =>
    item.prog_stat === "PENDING UPDATE"
  ).length || 0;

  const totalSPPGBeroperasi = baseline.sppg_baseline + approvedCount;

  const totalPenerimaManfaat = baseline.penerima_baseline +
    (approvedCount * baseline.avg_penerima_per_sppg);

  return {
    totalSPPG,
    totalSPPGBeroperasi,
    totalPenerimaManfaat,
    approvedCount,
    pendingCount,
  };
};

export const formatPenerimaManfaat = (value: number): string => {
  const millions = value / 1000000;

  if (millions >= 1) {
    return `${millions.toFixed(1)} Juta`;
  }

  return value.toLocaleString('id-ID');
};

export const formatSPPGNumber = (value: number): string => {
  return value.toLocaleString('id-ID');
};
