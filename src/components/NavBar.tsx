
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavBarProps {
  variant?: 'landing' | 'auth' | 'dashboard';
  onLogout?: () => void;
  currentUser?: { name?: string; avatar?: string } | null;
}

export function NavBar({ variant = 'landing', onLogout, currentUser }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MessageCircle className="h-8 w-8 text-chat-primary" />
            <span className="text-xl font-bold text-gray-900">GossipGo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {variant === 'landing' && (
              <>
                <Link 
                  to="/" 
                  className={cn(
                    "text-gray-600 hover:text-chat-primary transition-colors",
                    isActive('/') && "text-chat-primary font-medium"
                  )}
                >
                  Home
                </Link>
                <Link 
                  to="/features" 
                  className="text-gray-600 hover:text-chat-primary transition-colors"
                >
                  Features
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-chat-primary transition-colors"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-chat-primary transition-colors"
                >
                  Contact
                </Link>
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      className="border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-chat-primary hover:bg-chat-secondary">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {variant === 'auth' && (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button 
                    variant={isActive('/login') ? 'default' : 'outline'}
                    className={isActive('/login') 
                      ? "bg-chat-primary hover:bg-chat-secondary" 
                      : "border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white"
                    }
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant={isActive('/signup') ? 'default' : 'outline'}
                    className={isActive('/signup') 
                      ? "bg-chat-primary hover:bg-chat-secondary" 
                      : "border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white"
                    }
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {variant === 'dashboard' && currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {variant === 'landing' && (
                <>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-chat-primary transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/features" 
                    className="text-gray-600 hover:text-chat-primary transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-gray-600 hover:text-chat-primary transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-gray-600 hover:text-chat-primary transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <div className="flex flex-col space-y-2 px-4">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-chat-primary hover:bg-chat-secondary">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </>
              )}

              {variant === 'auth' && (
                <div className="flex flex-col space-y-2 px-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant={isActive('/login') ? 'default' : 'outline'}
                      className={cn(
                        "w-full",
                        isActive('/login') 
                          ? "bg-chat-primary hover:bg-chat-secondary" 
                          : "border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white"
                      )}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant={isActive('/signup') ? 'default' : 'outline'}
                      className={cn(
                        "w-full",
                        isActive('/signup') 
                          ? "bg-chat-primary hover:bg-chat-secondary" 
                          : "border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white"
                      )}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {variant === 'dashboard' && currentUser && (
                <div className="flex flex-col space-y-2 px-4">
                  <span className="text-sm text-gray-600 py-2">Welcome, {currentUser.name}</span>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      onLogout?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
