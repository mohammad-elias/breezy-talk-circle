
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Zap } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-light to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-8 w-8 text-chat-primary" />
            <span className="text-2xl font-bold text-gray-800">ChatApp</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-chat-primary hover:bg-chat-secondary">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Connect & Chat
                <span className="text-chat-primary block">Seamlessly</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience real-time messaging with friends, family, and colleagues. 
                Join conversations, create groups, and stay connected wherever you are.
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/signup">
                <Button size="lg" className="bg-chat-primary hover:bg-chat-secondary text-lg px-8 py-6">
                  Start Chatting Now
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-chat-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="People chatting and connecting"
                className="rounded-2xl shadow-2xl w-full max-w-md"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chat-online rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Chat App?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Real-time Messaging</h3>
                <p className="text-gray-600">
                  Send and receive messages instantly with our lightning-fast messaging system.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Group Chats</h3>
                <p className="text-gray-600">
                  Create groups and connect with multiple people at once for work or fun.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Fast & Secure</h3>
                <p className="text-gray-600">
                  Enjoy secure conversations with end-to-end encryption and blazing fast performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-chat-primary rounded-2xl py-16 px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Chatting?
          </h2>
          <p className="text-chat-light text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already connecting and sharing moments together. 
            Create your account today and start your first conversation.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-chat-primary hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-chat-primary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
