import DataTable from "@/components/DataTable";
import sppgData from "@/data/sppg.json";

const SPPG = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Data SPPG</h1>
        <p className="text-muted-foreground">Sistem Pengelolaan dan Pemantauan SPPG Nasional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Total SPPG</p>
          <h3 className="text-3xl font-bold text-foreground">15.328</h3>
        </div>
        
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">Penerima Manfaat</p>
          <h3 className="text-3xl font-bold text-foreground">41,9 Juta</h3>
        </div>
        
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-sm text-muted-foreground mb-2">SPPG Beroperasi</p>
          <h3 className="text-3xl font-bold text-foreground">15.433</h3>
          <p className="text-xs text-muted-foreground mt-2">Per 21 November 2025</p>
        </div>
      </div>

      <DataTable data={sppgData} />
    </div>
  );
};

export default SPPG;
