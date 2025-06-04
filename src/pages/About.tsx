
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavBar } from "@/components/NavBar";
import { MessageCircle, Users, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar variant="landing" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About ChatApp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to bring people closer together through seamless communication
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              ChatApp was founded with a simple vision: to make communication effortless and enjoyable for everyone. 
              We believe that staying connected with friends, family, and colleagues should be simple, secure, and fun.
            </p>
            <p className="text-gray-600">
              Our team of passionate developers and designers work tirelessly to create the best messaging experience possible.
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <MessageCircle className="h-12 w-12 text-chat-primary mx-auto" />
              <h3 className="text-xl font-semibold">10M+ Messages</h3>
              <p className="text-gray-600">Sent daily by our users worldwide</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <Users className="h-12 w-12 text-chat-primary mx-auto" />
              <h3 className="text-xl font-semibold">500K+ Users</h3>
              <p className="text-gray-600">Trust us with their conversations</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <Heart className="h-12 w-12 text-chat-primary mx-auto" />
              <h3 className="text-xl font-semibold">99% Satisfaction</h3>
              <p className="text-gray-600">User satisfaction rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8">Ready to be part of something amazing?</p>
          <Link to="/signup">
            <Button size="lg" className="bg-chat-primary hover:bg-chat-secondary">
              Start Chatting Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
