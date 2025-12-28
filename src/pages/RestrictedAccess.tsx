import { motion } from "framer-motion";
import { ShieldX, ArrowLeft, Mail, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const RestrictedAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-destructive/10 flex items-center justify-center border-4 border-destructive/20">
            <ShieldX className="w-16 h-16 text-destructive" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold text-sm">Akses Tidak Tersedia</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        >
          Halaman Tidak Dapat Diakses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-muted-foreground mb-8 leading-relaxed"
        >
          Akses ke halaman ini sementara tidak tersedia. Silakan hubungi administrator untuk informasi lebih lanjut.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-2">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Hubungi Administrator
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:admin@example.com" className="text-base hover:underline">
                    admin@system.id
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+6281234567890" className="text-base hover:underline">
                    +62 812-3456-7890
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={() => navigate("/general")}
            className="gap-2"
            size="lg"
            variant="default"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/50"
        >
          <p className="text-sm text-muted-foreground">
            Pastikan Anda memiliki izin akses yang sesuai atau hubungi tim IT untuk bantuan lebih lanjut.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RestrictedAccess;
