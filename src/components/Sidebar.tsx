import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, FileText, BarChart3, Settings, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { title: "General", path: "/general", icon: LayoutDashboard },
  { title: "SPPG", path: "/sppg", icon: FileText },
  { title: "Reports", path: "/reports", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings },
];

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Sidebar = () => {
  const { isReadOnly } = useAuth();

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col shadow-xl h-screen"
    >
      <motion.div
        variants={itemVariants}
        className="p-6 border-b border-sidebar-border/50"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 flex items-center justify-center"
          >
            <img
              src="/garudapancasila.svg"
              alt="Garuda Pancasila"
              className="w-12 h-12 object-contain"
            />
          </motion.div>
          <div>
            <h2 className="font-bold text-sidebar-foreground text-sm leading-tight">PROGRAM STRATEGIS NASIONAL</h2>
            <p className="text-[10px] text-sidebar-foreground/70 flex items-center gap-1 mt-0.5">
              REPUBLIK INDONESIA
              <img
                src="/merahputih.png"
                alt="Bendera Indonesia"
                className="w-4 h-3 object-cover"
              />
            </p>
          </div>
        </div>
      </motion.div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground smooth-transition group relative overflow-hidden"
                activeClassName="bg-gradient-to-r from-sidebar-primary to-accent text-white font-semibold shadow-lg"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <item.icon className="w-5 h-5 relative z-10" />
                </motion.div>
                <span className="relative z-10">{item.title}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 smooth-transition"
                  layoutId="sidebar-hover"
                />
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        variants={itemVariants}
        className="p-4 border-t border-sidebar-border/50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xs text-sidebar-foreground/60 text-center p-3 rounded-lg bg-sidebar-accent/30"
        >
          <p className="font-semibold">Portal Data Strategis Nasional</p>
          <p className="text-[10px] mt-1">Kementerian Pertahanan</p>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
