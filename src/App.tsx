import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UsersList from "./pages/UsersList";
import ChatsList from "./pages/ChatsList";
import ChatView from "./pages/ChatView";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import NewChat from "./pages/NewChat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PasswordReset from "./pages/PasswordReset";

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/chats" replace /> : <Landing />
      } />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/chats" replace /> : <Login />
      } />
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/chats" replace /> : <Signup />
      } />
      <Route path="/password-reset" element={
        isAuthenticated ? <Navigate to="/chats" replace /> : <PasswordReset />
      } />
      
      {/* Protected routes */}
      <Route path="/index" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/chats" element={
        <ProtectedRoute>
          <ChatsList />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <UsersList />
        </ProtectedRoute>
      } />
      <Route path="/chat/:chatId" element={
        <ProtectedRoute>
          <ChatView />
        </ProtectedRoute>
      } />
      <Route path="/groups" element={
        <ProtectedRoute>
          <Groups />
        </ProtectedRoute>
      } />
      <Route path="/create-group" element={
        <ProtectedRoute>
          <CreateGroup />
        </ProtectedRoute>
      } />
      <Route path="/new-chat" element={
        <ProtectedRoute>
          <NewChat />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Create QueryClient inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
