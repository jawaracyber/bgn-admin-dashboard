import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Settings as SettingsIcon, Lock } from "lucide-react";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const Settings = () => {
  const { isSuperUser, fullName } = useAuth();
  const { settings, isLoading, updateSetting, isUpdating } = useSystemSettings();
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; settingId: string; newValue: boolean } | null>(null);

  if (!isSuperUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <Lock className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Akses Ditolak</CardTitle>
            <CardDescription className="text-base">
              Halaman pengaturan hanya dapat diakses oleh SUPER_USER.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
      </div>
    );
  }

  const sppgSetting = settings.find(s => s.setting_key === 'sppg_page_enabled');

  const handleToggleChange = (settingId: string, currentValue: boolean) => {
    setConfirmDialog({ open: true, settingId, newValue: !currentValue });
  };

  const confirmToggle = () => {
    if (confirmDialog) {
      updateSetting({ id: confirmDialog.settingId, value: confirmDialog.newValue });
      setConfirmDialog(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Pengaturan Sistem</h1>
            <p className="text-slate-600">Kelola akses dan konfigurasi aplikasi</p>
          </div>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Kontrol Akses Halaman</span>
              <Badge variant="secondary" className="font-normal">
                Super User Only
              </Badge>
            </CardTitle>
            <CardDescription>
              Kelola akses pengguna ke berbagai halaman dalam aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sppgSetting && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="sppg-toggle" className="text-base font-semibold text-slate-900 cursor-pointer">
                      Akses Halaman SPPG
                    </Label>
                    <p className="text-sm text-slate-600">
                      {sppgSetting.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={sppgSetting.setting_value ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {sppgSetting.setting_value ? "AKTIF" : "NONAKTIF"}
                      </Badge>
                      {sppgSetting.setting_value ? (
                        <span className="text-xs text-green-600 font-medium">
                          ✓ Semua user dapat mengakses halaman SPPG
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 font-medium">
                          ✗ Tidak ada user yang dapat mengakses halaman SPPG
                        </span>
                      )}
                    </div>
                  </div>
                  <Switch
                    id="sppg-toggle"
                    checked={sppgSetting.setting_value}
                    onCheckedChange={() => handleToggleChange(sppgSetting.id, sppgSetting.setting_value)}
                    disabled={isUpdating}
                    className="ml-4"
                  />
                </div>

                <Separator />

                <div className="text-xs text-slate-500 space-y-1">
                  <p>
                    <span className="font-medium">Terakhir diperbarui:</span>{" "}
                    {new Date(sppgSetting.updated_at).toLocaleString('id-ID')}
                  </p>
                  <p>
                    <span className="font-medium">Oleh:</span> {fullName}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <div className="text-blue-600 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Informasi Penting</h3>
              <p className="text-sm text-blue-800">
                Ketika akses halaman SPPG dinonaktifkan, <strong>tidak ada pengguna yang dapat mengakses halaman tersebut</strong>,
                termasuk Super User. Gunakan fitur ini saat melakukan maintenance atau update data.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AlertDialog open={confirmDialog?.open ?? false} onOpenChange={(open) => !open && setConfirmDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Perubahan</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog?.newValue ? (
                <>
                  Anda akan <strong>mengaktifkan</strong> akses halaman SPPG.
                  Semua pengguna akan dapat mengakses halaman tersebut.
                </>
              ) : (
                <>
                  Anda akan <strong>menonaktifkan</strong> akses halaman SPPG.
                  <strong className="text-red-600"> Tidak ada pengguna yang dapat mengakses halaman tersebut</strong>,
                  termasuk Super User.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle}>
              Ya, Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
