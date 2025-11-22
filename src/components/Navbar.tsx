import { User, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-20 glass sticky top-0 z-50 flex items-center justify-between px-8 shadow-lg border-b border-white/10"
    >
      <div className="flex items-center gap-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PORTAL DATA NASIONAL
          </h1>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-white/10 smooth-transition"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 pl-4 border-l border-border/50"
        >
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Okky Septian P. S.KOM, Mo.E, CSIIS</p>
            <p className="text-xs text-muted-foreground font-medium">DANWIL INDONESIA BARAT</p>
            <p className="text-xs text-muted-foreground">okky.pradana@bgn.co.id</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg cursor-pointer ring-2 ring-primary/20 ring-offset-2"
          >
            <User className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
