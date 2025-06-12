
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { NavBar } from "@/components/NavBar";
import { 
  MessageCircle, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast("Logged out successfully");
  };
  
  // Navigation items
  const navItems = [
    {
      name: "Chats",
      path: "/chats",
      icon: MessageCircle
    },
    {
      name: "Users",
      path: "/users",
      icon: Users
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <NavBar 
        variant="dashboard" 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />
      
      <div className="flex flex-1 overflow-hidden pt-16 lg:pt-0">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white shadow-md"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        {/* Sidebar */}
        <div 
          className={cn(
            "bg-white border-r border-gray-200 flex flex-col",
            "lg:w-64 lg:static lg:translate-x-0",
            "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "top-16 lg:top-16"
          )}
        >
          {/* User profile section */}
          <div className="p-4 border-b border-gray-200 mt-2 lg:mt-0">
            <div className="flex items-center gap-3">
              <UserAvatar 
                src={currentUser?.avatar}
                alt={currentUser?.name || "User"}
                isOnline={true}
                className="w-10 h-10"
              />
              <div>
                <h3 className="font-medium">{currentUser?.name || "User"}</h3>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-4 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      location.pathname === item.path 
                        ? "bg-chat-primary text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
        
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
