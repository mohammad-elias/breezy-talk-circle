import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavBar } from "@/components/NavBar";
import { MessageCircle, Search, HelpCircle, Users, Shield, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const helpCategories = [
    {
      icon: MessageCircle,
      title: "Getting Started",
      description: "Learn the basics of GossipGo",
      articles: [
        "How to create an account",
        "Setting up your profile",
        "Sending your first message",
        "Understanding the interface"
      ]
    },
    {
      icon: Users,
      title: "Connections & Groups",
      description: "Managing your contacts and groups",
      articles: [
        "How to connect with users",
        "Creating and managing groups",
        "Managing connection requests",
        "Finding friends on GossipGo"
      ]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Keeping your account secure",
      articles: [
        "Privacy settings",
        "Blocking users",
        "Reporting inappropriate content",
        "Two-factor authentication"
      ]
    },
    {
      icon: Settings,
      title: "Settings & Preferences",
      description: "Customize your experience",
      articles: [
        "Notification settings",
        "Theme preferences",
        "Language options",
        "Account management"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I start a new chat?",
      answer: "To start a new chat, go to your chat list and click the 'New Chat' button. You can then search for users you're connected with or create a group chat."
    },
    {
      question: "Can I delete messages?",
      answer: "Yes, you can delete messages for yourself or for everyone in the chat. Long press on a message to see the delete options."
    },
    {
      question: "How do I change my notification settings?",
      answer: "Go to Settings > Notifications to customize when and how you receive notifications for messages, connection requests, and other activities."
    },
    {
      question: "Is GossipGo free to use?",
      answer: "Yes, GossipGo is completely free to use. All core features including messaging, groups, and connections are available at no cost."
    },
    {
      question: "How do I report a user?",
      answer: "If you encounter inappropriate behavior, you can report a user by going to their profile and selecting 'Report User' from the menu options."
    }
  ];

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-light to-white">
      <NavBar variant="landing" />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions and learn how to make the most of GossipGo
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-chat-accent rounded-full flex items-center justify-center mb-3">
                    <category.icon className="h-6 w-6 text-chat-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="text-sm text-chat-primary hover:underline cursor-pointer">
                        {article}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-chat-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button 
              className="bg-chat-primary hover:bg-chat-secondary"
              onClick={handleContactSupport}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
