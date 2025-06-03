
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export function TestCredentials() {
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);

  const credentials = [
    { email: "sarah@example.com", password: "user1password", name: "Sarah Johnson" },
    { email: "michael@example.com", password: "user2password", name: "Michael Chen" }
  ];

  const handleCopyCredentials = (email: string, password: string, index: number) => {
    navigator.clipboard.writeText(`Email: ${email}\nPassword: ${password}`);
    
    if (index === 0) {
      setIsCopied1(true);
      setTimeout(() => setIsCopied1(false), 2000);
    } else {
      setIsCopied2(true);
      setTimeout(() => setIsCopied2(false), 2000);
    }
    
    toast.success("Credentials copied to clipboard");
  };

  return (
    <Card className="p-3 border border-gray-200 max-w-xs bg-white shadow-md">
      <div className="text-sm font-medium mb-2">Test Credentials</div>
      
      {credentials.map((cred, index) => (
        <div key={cred.email} className="mb-2 text-xs border-b pb-2 last:border-b-0 last:pb-0 last:mb-0">
          <div className="font-medium">{cred.name}</div>
          <div>Email: <span className="font-mono bg-gray-100 px-1">{cred.email}</span></div>
          <div>Password: <span className="font-mono bg-gray-100 px-1">{cred.password}</span></div>
          <Button 
            variant="outline"
            size="sm"
            className="mt-1 h-7 text-xs w-full"
            onClick={() => handleCopyCredentials(cred.email, cred.password, index)}
          >
            {index === 0 && isCopied1 || index === 1 && isCopied2 ? (
              <>
                <CheckIcon className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <CopyIcon className="h-3 w-3 mr-1" />
                Copy credentials
              </>
            )}
          </Button>
        </div>
      ))}
      
      <div className="text-xs text-gray-500 mt-2">
        Or <a href="/signup" className="text-chat-primary">sign up</a> to create your own account
      </div>
    </Card>
  );
}
