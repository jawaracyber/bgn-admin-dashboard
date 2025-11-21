export interface Province {
  id: string;
  name: string;
}

export interface Regency {
  id: string;
  province_id: string;
  name: string;
}

const API_BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';

export const regionApi = {
  async getProvinces(): Promise<Province[]> {
    const response = await fetch(`${API_BASE_URL}/provinces.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    return response.json();
  },

  async getRegencies(provinceId: string): Promise<Regency[]> {
    const response = await fetch(`${API_BASE_URL}/regencies/${provinceId}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch regencies');
    }
    return response.json();
  },
};
