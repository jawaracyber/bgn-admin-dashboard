import { motion } from "framer-motion";
import { ShieldX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RestrictedAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="w-12 h-12 text-destructive" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Akses Terbatas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-8"
        >
          Anda tidak memiliki akses untuk memasuki halaman ini
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/general")}
            className="gap-2"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 rounded-lg bg-muted/50 border border-border"
        >
          <p className="text-sm text-muted-foreground">
            Jika Anda merasa ini adalah kesalahan, silakan hubungi administrator sistem.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RestrictedAccess;
