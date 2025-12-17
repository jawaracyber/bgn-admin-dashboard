import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: boolean;
  description: string;
  updated_at: string;
  updated_by: string | null;
  created_at: string;
}

export const useSystemSettings = () => {
  const queryClient = useQueryClient();

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('setting_key', { ascending: true });

      if (error) throw error;
      return data as SystemSetting[];
    },
    refetchOnWindowFocus: true,
  });

  const updateSetting = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: boolean }) => {
      const { data: userData } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('system_settings')
        .update({
          setting_value: value,
          updated_at: new Date().toISOString(),
          updated_by: userData.user?.id,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast.success('Pengaturan berhasil diperbarui');
    },
    onError: (error) => {
      console.error('Error updating setting:', error);
      toast.error('Gagal memperbarui pengaturan');
    },
  });

  const getSetting = (key: string): boolean => {
    const setting = settings.find(s => s.setting_key === key);
    return setting?.setting_value ?? true;
  };

  return {
    settings,
    isLoading,
    updateSetting: updateSetting.mutate,
    isUpdating: updateSetting.isPending,
    getSetting,
  };
};
