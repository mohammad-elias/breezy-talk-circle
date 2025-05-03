
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
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
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-10 border-b border-gray-200 flex items-center justify-between p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <h1 className="font-bold text-xl">Chatter</h1>
        <UserAvatar 
          src={currentUser?.avatar}
          alt={currentUser?.name || "User"}
          isOnline={true}
          className="w-8 h-8"
        />
      </div>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col",
          "lg:w-64 lg:static lg:translate-x-0 lg:h-screen",
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "pt-16 lg:pt-0"
        )}
      >
        {/* User profile section */}
        <div className="p-4 border-b border-gray-200">
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
        
        {/* Logout button */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-red-500 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen pt-14 lg:pt-0 overflow-hidden">
        {children}
      </div>
      
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
