import { User, Bell, Menu, LogOut, Crown, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Sidebar from "./Sidebar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { user, fullName, position, isSuperUser } = useAuth();
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
            <p className="text-xs md:text-sm font-semibold text-foreground flex items-center justify-end gap-2">
              {fullName || user?.email}
              {isSuperUser ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0 shadow-lg">
                  <Crown className="w-3 h-3 mr-1" />
                  GOLD
                </Badge>
              ) : (
                <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0 shadow-md">
                  <Shield className="w-3 h-3 mr-1" />
                  SILVER
                </Badge>
              )}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              {position || 'Staff'}
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
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{fullName || user?.email}</p>
                    {isSuperUser ? (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0 shadow-lg text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        GOLD
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0 shadow-md text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        SILVER
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-normal">{position || 'Staff'}</p>
                  <p className="text-xs text-muted-foreground font-normal">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
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
