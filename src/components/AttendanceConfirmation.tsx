import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Upload, X, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  nama_lengkap: z.string().min(3, {
    message: "Nama lengkap minimal 3 karakter",
  }),
  nik: z.string().regex(/^\d{16}$/, {
    message: "NIK harus berisi 16 digit angka",
  }),
  nomor_handphone: z.string().regex(/^(08|\+62)\d{8,12}$/, {
    message: "Format nomor handphone tidak valid (contoh: 08123456789)",
  }),
  email: z.string().email({
    message: "Format email tidak valid",
  }),
  foto: z.any().refine((file) => file !== null, {
    message: "Foto wajib diunggah",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function AttendanceConfirmation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_lengkap: "",
      nik: "",
      nomor_handphone: "",
      email: "",
      foto: null,
    },
  });

  useEffect(() => {
    const confirmed = localStorage.getItem("attendance_confirmed");
    if (confirmed === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar (jpg, jpeg, png)");
        return;
      }

      setSelectedFile(file);
      form.setValue("foto", file);
      setUploadProgress(0);
      setUploadComplete(false);
      setIsUploading(true);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            toast.success("Foto berhasil diunggah");
          }, 300);
        }
      }, 200);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    setIsUploading(false);
    form.setValue("foto", null);
  };

  const checkNikExists = async (nik: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("attendance_confirmations")
        .select("nik")
        .eq("nik", nik)
        .maybeSingle();

      if (error) {
        console.error("Error checking NIK:", error);
        return false;
      }

      return data !== null;
    } catch (error) {
      console.error("Error checking NIK:", error);
      return false;
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const nikExists = await checkNikExists(values.nik);

      if (nikExists) {
        toast.error("NIK ini sudah terdaftar sebelumnya");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from("attendance_confirmations").insert({
        nama_lengkap: values.nama_lengkap,
        nik: values.nik,
        nomor_handphone: values.nomor_handphone,
        email: values.email,
        foto_filename: selectedFile?.name || "",
      });

      if (error) {
        throw error;
      }

      localStorage.setItem("attendance_confirmed", "true");
      setIsSubmitted(true);
      setIsDialogOpen(false);
      setIsSuccessDialogOpen(true);

      form.reset();
      removeFile();

      toast.success("Konfirmasi kehadiran berhasil!");
    } catch (error: any) {
      console.error("Error submitting confirmation:", error);
      toast.error("Gagal menyimpan konfirmasi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500 p-8 shadow-2xl"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg">
              <CalendarCheck className="w-12 h-12 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Konfirmasi Kehadiran BIMTEK Dan Pengukuhan SATSUS
              </h2>
              <p className="text-lg md:text-xl text-white/90 font-medium">
                Program Strategis Nasional
              </p>
              <p className="text-base text-white/80 max-w-2xl mx-auto">
                Pastikan kehadiran Anda dengan mengisi formulir konfirmasi di bawah ini.
                Informasi lebih lanjut akan dikirimkan melalui email.
              </p>
            </div>

            <Button
              onClick={() => setIsDialogOpen(true)}
              size="lg"
              className="mt-4 bg-white text-blue-600 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl font-bold text-lg px-8 py-6 h-auto rounded-xl"
            >
              <CalendarCheck className="mr-2 h-6 w-6" />
              SAYA HADIR
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Formulir Konfirmasi Kehadiran
            </DialogTitle>
            <DialogDescription>
              Mohon lengkapi data di bawah ini untuk konfirmasi kehadiran Anda
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nama_lengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK (16 Digit)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan NIK 16 digit"
                        maxLength={16}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nomor_handphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Handphone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="08123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foto"
                render={() => (
                  <FormItem>
                    <FormLabel>Upload Foto</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {!selectedFile ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <input
                              type="file"
                              id="foto-upload"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <label
                              htmlFor="foto-upload"
                              className="cursor-pointer flex flex-col items-center space-y-2"
                            >
                              <Upload className="w-12 h-12 text-gray-400" />
                              <div className="text-sm text-gray-600">
                                <span className="font-semibold text-blue-600">
                                  Klik untuk upload
                                </span>{" "}
                                atau drag and drop
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, JPEG (maks. 2MB)
                              </p>
                            </label>
                          </div>
                        ) : (
                          <div className="border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={URL.createObjectURL(selectedFile)}
                                  alt="Preview"
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {selectedFile.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={removeFile}
                                className="flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            {isUploading && (
                              <div className="space-y-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-600 flex items-center">
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                  Mengupload... {uploadProgress}%
                                </p>
                              </div>
                            )}

                            {uploadComplete && (
                              <div className="flex items-center text-green-600 text-sm">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Upload berhasil
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !uploadComplete}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Konfirmasi Kehadiran"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-2xl">
              Konfirmasi Berhasil!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              Anda sudah terdaftar sebagai peserta pelatihan dan pengukuhan,
              mohon periksa pesan email secara berkala. Terimakasih
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsSuccessDialogOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
