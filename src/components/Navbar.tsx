import { User, Bell, Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Sidebar from "./Sidebar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { user, userRole, isSuperUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal logout");
    } else {
      toast.success("Berhasil logout");
      navigate("/login");
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-16 md:h-20 glass sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 shadow-lg border-b border-white/10"
    >
      <div className="flex items-center gap-2 md:gap-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <h1 className="text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PORTAL DATA NASIONAL
          </h1>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-white/10 smooth-transition w-9 h-9 md:w-10 md:h-10"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 md:gap-4 pl-2 md:pl-4 border-l border-border/50"
        >
          <div className="text-right hidden md:block">
            <p className="text-xs md:text-sm font-semibold text-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground font-medium">
              {isSuperUser ? 'Super User' : userRole === 'USER_GRANTED' ? 'User Granted' : 'User'}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg cursor-pointer ring-2 ring-primary/20 ring-offset-2"
              >
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
