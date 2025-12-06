import CardKPI from "@/components/CardKPI";
import ChartBar from "@/components/ChartBar";
import ChartStacked from "@/components/ChartStacked";
import ChartPie from "@/components/ChartPie";
import ChartLine from "@/components/ChartLine";
import { Shield, Users, Package, TrendingUp, Calendar, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const seizureData = [
  { name: "Jan", value: 850000000 },
  { name: "Feb", value: 1200000000 },
  { name: "Mar", value: 980000000 },
  { name: "Apr", value: 1450000000 },
  { name: "Mei", value: 1680000000 },
  { name: "Jun", value: 1320000000 },
];

const rehabilitationData = [
  { month: "Jan", value: 1245, target: 1200 },
  { month: "Feb", value: 1389, target: 1300 },
  { month: "Mar", value: 1567, target: 1500 },
  { month: "Apr", value: 1823, target: 1700 },
  { month: "Mei", value: 2145, target: 2000 },
  { month: "Jun", value: 2567, target: 2400 },
];

const drugTypeData = [
  { name: "Sabu", value: 3245 },
  { name: "Ganja", value: 2187 },
  { name: "Ekstasi", value: 1456 },
  { name: "Kokain", value: 892 },
  { name: "Lainnya", value: 1124 },
];

const provinceCasesData = [
  { month: "Jan", jakarta: 145, jawaBarat: 198, jawaTengah: 165, jawaTimur: 187, sumatera: 142 },
  { month: "Feb", jakarta: 167, jawaBarat: 212, jawaTengah: 178, jawaTimur: 201, sumatera: 156 },
  { month: "Mar", jakarta: 189, jawaBarat: 235, jawaTengah: 192, jawaTimur: 215, sumatera: 168 },
  { month: "Apr", jakarta: 201, jawaBarat: 248, jawaTengah: 205, jawaTimur: 228, sumatera: 181 },
  { month: "Mei", jakarta: 218, jawaBarat: 267, jawaTengah: 221, jawaTimur: 245, sumatera: 195 },
  { month: "Jun", jakarta: 234, jawaBarat: 289, jawaTengah: 238, jawaTimur: 267, sumatera: 212 },
];

const newsData = [
  {
    id: 1,
    title: "Penangkapan Jaringan Narkoba Internasional",
    description: "BNN berhasil mengungkap jaringan narkoba internasional dengan barang bukti 500 kg sabu",
    date: "5 Desember 2025",
    location: "Jakarta",
    category: "Operasi"
  },
  {
    id: 2,
    title: "Program Rehabilitasi Mencapai Target 85%",
    description: "Keberhasilan program rehabilitasi mencapai 85% dengan 2,567 pengguna berhasil direhabilitasi",
    date: "3 Desember 2025",
    location: "Nasional",
    category: "Rehabilitasi"
  },
  {
    id: 3,
    title: "Kerjasama dengan Bea Cukai Diperkuat",
    description: "MoU dengan Bea Cukai untuk memperkuat pencegahan masuknya narkoba melalui jalur laut dan udara",
    date: "1 Desember 2025",
    location: "Jakarta",
    category: "Kerjasama"
  },
  {
    id: 4,
    title: "Kampanye Anti Narkoba di Sekolah",
    description: "BNN meluncurkan kampanye nasional anti narkoba yang menjangkau 5,000 sekolah di seluruh Indonesia",
    date: "28 November 2025",
    location: "Nasional",
    category: "Edukasi"
  }
];

const BNN = () => {
  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center shadow-2xl border-4 border-white">
            <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>
        </motion.div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-2 md:mb-3">
            Badan Narkotika Nasional
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            Pusat Data dan Informasi Pemberantasan Penyalahgunaan dan Peredaran Gelap Narkoba
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Indonesia Bersih Narkoba 2030
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Zero Tolerance
            </Badge>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <CardKPI
          title="Total Kasus 2025"
          value="8,942"
          icon={Shield}
          trend="-15.3%"
          trendUp={false}
          gradient="primary"
          delay={0.1}
        />
        <CardKPI
          title="Pengguna Direhabilitasi"
          value="12,456"
          icon={Users}
          trend="+22.8%"
          trendUp={true}
          gradient="secondary"
          delay={0.2}
        />
        <CardKPI
          title="Barang Bukti Disita"
          value="8.5 Ton"
          icon={Package}
          trend="+18.5%"
          trendUp={true}
          gradient="accent"
          delay={0.3}
        />
        <CardKPI
          title="Tingkat Keberhasilan"
          value="87.6%"
          icon={TrendingUp}
          trend="+9.2%"
          trendUp={true}
          gradient="warm"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" />
          Berita dan Informasi Terkini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {newsData.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="glass card-hover border-l-4 border-l-blue-600 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={`
                      ${news.category === 'Operasi' ? 'bg-red-600' : ''}
                      ${news.category === 'Rehabilitasi' ? 'bg-green-600' : ''}
                      ${news.category === 'Kerjasama' ? 'bg-blue-600' : ''}
                      ${news.category === 'Edukasi' ? 'bg-purple-600' : ''}
                      text-white
                    `}>
                      {news.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {news.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {news.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ChartBar
            data={seizureData}
            title="Nilai Barang Bukti Disita per Bulan"
            subtitle="Total nilai barang bukti narkoba yang berhasil disita (dalam Rupiah)"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ChartLine
            data={rehabilitationData}
            title="Program Rehabilitasi Pengguna"
            subtitle="Jumlah pengguna narkoba yang berhasil direhabilitasi vs target"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ChartPie
            data={drugTypeData}
            title="Distribusi Jenis Narkoba yang Disita"
            subtitle="Berdasarkan jumlah kasus tahun 2025"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ChartStacked
            data={provinceCasesData}
            title="Distribusi Kasus per Provinsi"
            subtitle="5 provinsi dengan kasus terbanyak per bulan"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="glass rounded-2xl p-6 md:p-8 shadow-xl border border-white/20"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
            Bersama Berantas Narkoba
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Mari bersama-sama mewujudkan Indonesia bebas dari ancaman narkoba.
            Laporkan setiap aktivitas mencurigakan terkait narkoba ke hotline BNN: <strong>184</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">184</div>
              <div className="text-xs text-muted-foreground">Hotline BNN</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-xs text-muted-foreground">Layanan Darurat</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">100%</div>
              <div className="text-xs text-muted-foreground">Kerahasiaan Terjaga</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BNN;
