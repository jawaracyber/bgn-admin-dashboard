import { motion } from "framer-motion";
import { AlertTriangle, Mail, Phone } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <img
              src="/ChatGPT_Image_22_Nov_2025__08.33.24-removebg-preview.png"
              alt="SATSUS PROSNAS Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl"
                />
                <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 relative" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Website Sedang Maintenance
              </h1>
              <p className="text-lg md:text-xl text-slate-300">
                Sementara website tidak bisa diakses
              </p>
              <div className="pt-4">
                <p className="text-base md:text-lg text-slate-400 font-medium">
                  Harap hubungi administrator untuk informasi lebih lanjut
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8 space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-slate-300">admin@satsusprosnas.id</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-slate-300">+62 21 1234 5678</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <p className="text-sm text-slate-500">
                Terima kasih atas pengertian Anda
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Maintenance;
