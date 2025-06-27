
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, currentUser } from "@/data/sampleData";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("chatUser");
    const storedToken = localStorage.getItem("userToken");
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("chatUser");
        localStorage.removeItem("userToken");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // API Integration: Login user
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const { user: userData, token } = data;

      setUser(userData);
      setUserToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("chatUser", JSON.stringify(userData));
      localStorage.setItem("userToken", token);
      toast.success("Logged in successfully");
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : "Login failed");
      
      // Fallback for demo purposes - Remove in production
      setTimeout(() => {
        if (email === "sarah@example.com" && password === "user1password") {
          const loggedInUser = { ...currentUser, id: "1", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1" };
          const demoToken = "demo-jwt-token-sarah";
          setUser(loggedInUser);
          setUserToken(demoToken);
          setIsAuthenticated(true);
          localStorage.setItem("chatUser", JSON.stringify(loggedInUser));
          localStorage.setItem("userToken", demoToken);
          toast.success("Logged in successfully (Demo mode)");
        } else if (email === "michael@example.com" && password === "user2password") {
          const loggedInUser = { ...currentUser, id: "2", name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=8" };
          const demoToken = "demo-jwt-token-michael";
          setUser(loggedInUser);
          setUserToken(demoToken);
          setIsAuthenticated(true);
          localStorage.setItem("chatUser", JSON.stringify(loggedInUser));
          localStorage.setItem("userToken", demoToken);
          toast.success("Logged in successfully (Demo mode)");
        } else {
          toast.error("Invalid credentials");
        }
      }, 1000);
      
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // API Integration: Register new user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      const { user: userData, token } = data;

      setUser(userData);
      setUserToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("chatUser", JSON.stringify(userData));
      localStorage.setItem("userToken", token);
      toast.success("Account created successfully!");
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : "Registration failed");
      
      // Fallback for demo purposes - Remove in production
      setTimeout(() => {
        const userId = `user-${Date.now()}`;
        const newUser = { 
          ...currentUser, 
          id: userId, 
          name: name,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` 
        };
        const demoToken = `demo-jwt-token-${userId}`;
        
        setUser(newUser);
        setUserToken(demoToken);
        setIsAuthenticated(true);
        localStorage.setItem("chatUser", JSON.stringify(newUser));
        localStorage.setItem("userToken", demoToken);
        toast.success("Account created successfully! (Demo mode)");
      }, 1500);
      
      return true;
    }
  };

  const logout = async () => {
    try {
      // API Integration: Logout user
      if (userToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setUserToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("chatUser");
      localStorage.removeItem("userToken");
      toast("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser: user, isAuthenticated, userToken, login, logout, signup }}>
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
