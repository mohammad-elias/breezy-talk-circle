
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavBar } from "@/components/NavBar";
import { MessageCircle, Users, Zap, Shield, Globe, Smartphone, Star, CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar variant="landing" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Powerful Features for Modern Communication
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the features that make our chat app the perfect choice for staying connected
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <MessageCircle className="h-12 w-12 text-chat-primary" />
              <h3 className="text-xl font-semibold">Real-time Messaging</h3>
              <p className="text-gray-600">Send and receive messages instantly with our lightning-fast messaging system.</p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <Users className="h-12 w-12 text-chat-primary" />
              <h3 className="text-xl font-semibold">Group Chats</h3>
              <p className="text-gray-600">Create groups and connect with multiple people at once for work or fun.</p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <Shield className="h-12 w-12 text-chat-primary" />
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-gray-600">Your conversations are protected with end-to-end encryption.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="bg-chat-primary hover:bg-chat-secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
