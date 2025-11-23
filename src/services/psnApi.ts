interface PSNProgramData {
  target: number;
  realisasi: number;
  persentase: number;
  provinsi: Array<{ prov: string; value: number }>;
  timeseries: Array<{ date: string; value: number }>;
}

interface PSNResponse {
  [key: string]: PSNProgramData;
}

const PROVINSI = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten',
  'Sumatera Utara', 'Sumatera Barat', 'Sumatera Selatan', 'Lampung',
  'Kalimantan Timur', 'Kalimantan Selatan', 'Sulawesi Selatan', 'Sulawesi Utara',
  'Bali', 'NTB', 'NTT', 'Papua', 'Papua Barat', 'Maluku', 'Maluku Utara'
];

const generateProvinsiData = (baseValue: number, variance: number) => {
  return PROVINSI.map(prov => ({
    prov,
    value: Math.round(baseValue + (Math.random() - 0.5) * variance)
  })).sort((a, b) => b.value - a.value);
};

const generateTimeseries = (baseValue: number, trend: number, months: number = 12) => {
  const data = [];
  const startDate = new Date(2024, 0, 1);

  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    const value = Math.round(baseValue + (trend * i) + (Math.random() - 0.5) * 5);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, Math.min(100, value))
    });
  }
  return data;
};

export const getMBGData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 68.5;
  const target = 82000000;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(70, 30),
    timeseries: generateTimeseries(45, 2.2, 12)
  };
};

export const getSekolahData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 72.3;
  const target = 3000;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(68, 25),
    timeseries: generateTimeseries(50, 2.0, 12)
  };
};

export const getKoperasiData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 45.8;
  const target = 1000;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(42, 35),
    timeseries: generateTimeseries(20, 2.5, 12)
  };
};

export const getDigitalisasiData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 81.2;
  const target: number = 15000;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(78, 20),
    timeseries: generateTimeseries(60, 1.8, 12)
  };
};

export const getKesejahteraanData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 76.5;
  const target = 10000000;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(73, 22),
    timeseries: generateTimeseries(55, 1.9, 12)
  };
};

export const getUMKMData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 52.7;
  const target = 500000;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(48, 30),
    timeseries: generateTimeseries(30, 2.3, 12)
  };
};

export const getSampahData = async (): Promise<PSNProgramData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const realisasi = 38.4;
  const target = 514;

  return {
    target,
    realisasi,
    persentase: realisasi,
    provinsi: generateProvinsiData(35, 40),
    timeseries: generateTimeseries(15, 2.1, 12)
  };
};

export const getAllPSNData = async (): Promise<PSNResponse> => {
  const [mbg, sekolah, koperasi, digitalisasi, kesejahteraan, umkm, sampah] = await Promise.all([
    getMBGData(),
    getSekolahData(),
    getKoperasiData(),
    getDigitalisasiData(),
    getKesejahteraanData(),
    getUMKMData(),
    getSampahData()
  ]);

  return {
    mbg,
    sekolah,
    koperasi,
    digitalisasi,
    kesejahteraan,
    umkm,
    sampah
  };
};

export const getStuntingData = async () => {
  try {
    const response = await fetch('https://sigiziterpadu.kemkes.go.id/api/stunting');
    return await response.json();
  } catch (error) {
    console.warn('Stunting API unavailable, using mock data');
    return { prevalensi: 21.6, tahun: 2024 };
  }
};
