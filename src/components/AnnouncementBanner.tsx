import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';

interface Announcement {
  id: string;
  title: string;
  short_description: string;
  full_content: string;
  is_active: boolean;
  priority: number;
}

export const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsOpen(true);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const formatContent = (content: string) => {
    return content.split('**').map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-red-900">{part}</strong>;
      }
      return part;
    });
  };

  if (isLoading || announcements.length === 0 || isDismissed) {
    return null;
  }

  const announcement = announcements[0];

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/20 via-red-600/20 to-orange-500/20 backdrop-blur-xl border border-red-400/30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />

            <div className="relative p-6 md:p-8">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-white/20 p-4 rounded-full backdrop-blur-sm">
                      <Megaphone className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <AlertTriangle className="w-3 h-3" />
                      {announcement.title}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                    {announcement.short_description}
                  </h3>

                  <p className="text-sm text-white/80">
                    Klik tombol di bawah untuk melihat detail lengkap perubahan jadwal
                  </p>
                </div>

                <Button
                  onClick={() => handleViewDetails(announcement)}
                  className="flex-shrink-0 bg-white text-red-600 hover:bg-red-50 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-red-600">
                {selectedAnnouncement?.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-lg font-semibold text-gray-900 pt-2">
              {selectedAnnouncement?.short_description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {selectedAnnouncement && formatContent(selectedAnnouncement.full_content)}
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 border-l-4 border-red-600">
              <div className="flex-shrink-0 pt-1">
                <div className="w-2 h-2 rounded-full bg-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">KEPALA PENGAWASAN SATUAN</p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Tutup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
