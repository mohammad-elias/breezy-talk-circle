
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { users } from "@/data/sampleData";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";

export function TestCredentials() {
  const testUsers = [
    {
      name: users[0].name,
      id: users[0].id,
      password: "user1password"
    },
    {
      name: users[1].name,
      id: users[1].id,
      password: "user2password"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64">
      <Alert className="bg-white shadow-lg border-chat-primary">
        <AlertTitle className="text-chat-primary flex justify-between items-center">
          Test Credentials
          <Button 
            variant="outline" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={() => document.getElementById('test-credentials')?.classList.toggle('hidden')}
          >
            -
          </Button>
        </AlertTitle>
        <AlertDescription id="test-credentials" className="mt-2">
          <div className="space-y-2">
            {testUsers.map((user, index) => (
              <div key={index} className="text-xs border rounded p-2 bg-gray-50">
                <div className="font-medium">{user.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span>ID: {user.id}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0" 
                    onClick={() => copyToClipboard(user.id)}
                  >
                    <Copy size={12} />
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Password: {user.password}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0" 
                    onClick={() => copyToClipboard(user.password)}
                  >
                    <Copy size={12} />
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-2">
              Open two browser windows to test real-time functionality
            </p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
