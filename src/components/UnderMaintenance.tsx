import { Construction } from "lucide-react";

const UnderMaintenance = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center">
          <Construction className="w-12 h-12 text-warning" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Halaman Dalam Pengembangan</h2>
        <p className="text-muted-foreground text-lg mb-2">Fitur ini sedang dalam tahap pengembangan.</p>
        <p className="text-muted-foreground">Silakan kembali lagi nanti.</p>
      </div>
    </div>
  );
};

export default UnderMaintenance;
