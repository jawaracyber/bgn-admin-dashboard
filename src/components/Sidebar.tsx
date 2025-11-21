import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, FileText, BarChart3, Settings } from "lucide-react";

const menuItems = [
  { title: "General", path: "/general", icon: LayoutDashboard },
  { title: "SPPG", path: "/sppg", icon: FileText },
  { title: "Reports", path: "/reports", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-lg">B</span>
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">BGN Portal</h2>
            <p className="text-xs text-sidebar-foreground/70">Dashboard v1.0</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/60 text-center">
          © 2024 BGN Indonesia
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
