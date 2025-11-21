import DataTable from "@/components/DataTable";
import sppgData from "@/data/sppg.json";

const SPPG = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Data SPPG</h1>
        <p className="text-muted-foreground">Sistem Pengelolaan dan Pemantauan SPPG Nasional</p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border inline-block">
        <p className="text-sm text-muted-foreground mb-2">Total SPPG</p>
        <h3 className="text-3xl font-bold text-foreground">{sppgData.length.toLocaleString()}</h3>
      </div>

      <DataTable data={sppgData} />
    </div>
  );
};

export default SPPG;
