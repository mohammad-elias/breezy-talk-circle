
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, currentUser } from "@/data/sampleData";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("chatUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("chatUser");
      }
    }
  }, []);

  const login = async (userId: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Basic validation for demo purposes
        if (userId === "1" && password === "user1password") {
          const loggedInUser = { ...currentUser, id: "1", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1" };
          setUser(loggedInUser);
          setIsAuthenticated(true);
          localStorage.setItem("chatUser", JSON.stringify(loggedInUser));
          toast.success("Logged in successfully");
          resolve(true);
        } else if (userId === "2" && password === "user2password") {
          const loggedInUser = { ...currentUser, id: "2", name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=8" };
          setUser(loggedInUser);
          setIsAuthenticated(true);
          localStorage.setItem("chatUser", JSON.stringify(loggedInUser));
          toast.success("Logged in successfully");
          resolve(true);
        } else {
          toast.error("Invalid credentials");
          resolve(false);
        }
      }, 1000); // Simulate network request
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would register a new user in the backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a new user with a random ID
        const userId = `user-${Date.now()}`;
        const newUser = { 
          ...currentUser, 
          id: userId, 
          name: name,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` 
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("chatUser", JSON.stringify(newUser));
        
        resolve(true);
      }, 1500); // Simulate network request
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("chatUser");
    toast("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ currentUser: user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
