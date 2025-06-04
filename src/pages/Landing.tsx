
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavBar } from "@/components/NavBar";
import { MessageCircle, Users, Zap, Shield, Globe, Smartphone, Star, CheckCircle } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-light to-white">
      {/* Navigation */}
      <NavBar variant="landing" />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Connect & Chat
                <span className="text-chat-primary block">Seamlessly</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience real-time messaging with friends, family, and colleagues. 
                Join conversations, create groups, and stay connected wherever you are.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-chat-primary hover:bg-chat-secondary text-lg px-8 py-6 w-full sm:w-auto">
                  Start Chatting Now
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-chat-primary text-chat-primary hover:bg-chat-primary hover:text-white text-lg px-8 py-6 w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No setup required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Secure messaging</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="People chatting and connecting"
                className="rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chat-online rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">1.2k+ Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="text-center">
            <div className="text-3xl font-bold text-chat-primary mb-2">10k+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chat-primary mb-2">50k+</div>
            <div className="text-gray-600">Messages Sent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chat-primary mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chat-primary mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Chat App?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technology and designed for seamless communication, 
              our platform offers everything you need to stay connected.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Secure & Private</h3>
                <p className="text-gray-600">
                  Your conversations are protected with end-to-end encryption and privacy controls.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Lightning Fast</h3>
                <p className="text-gray-600">
                  Optimized for speed with instant message delivery and smooth performance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Cross-Platform</h3>
                <p className="text-gray-600">
                  Access your chats from any device - web, mobile, or desktop applications.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-chat-accent rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-chat-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Mobile Ready</h3>
                <p className="text-gray-600">
                  Fully responsive design that works perfectly on all mobile devices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who love our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "This chat app has revolutionized how our team communicates. It's fast, reliable, and super easy to use!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Project Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Love the group chat features! Staying connected with friends and family has never been easier."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Michael Chen</div>
                    <div className="text-sm text-gray-500">Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "The security features give me peace of mind. I can chat freely knowing my messages are protected."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Emma Davis</div>
                    <div className="text-sm text-gray-500">Business Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-chat-primary rounded-2xl py-16 px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Chatting?
          </h2>
          <p className="text-chat-light text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already connecting and sharing moments together. 
            Create your account today and start your first conversation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-chat-primary hover:bg-gray-100 px-8 py-6 text-lg w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-chat-primary px-8 py-6 text-lg w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="h-8 w-8 text-chat-primary" />
                <span className="text-xl font-bold">ChatApp</span>
              </div>
              <p className="text-gray-400">
                Connecting people through seamless communication.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ChatApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
