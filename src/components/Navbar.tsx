import { User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">BGN Administrator Portal</h1>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">Administrator</p>
          <p className="text-xs text-muted-foreground">admin@bgn.go.id</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
