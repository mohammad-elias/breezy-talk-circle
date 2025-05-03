
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to chats page
    navigate("/chats");
  }, [navigate]);
  
  return <div>Redirecting to chats...</div>;
};

export default Index;
