import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">IA Assistant</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Converse com nossa inteligência artificial ou descubra sua personalidade
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              onClick={() => navigate("/quiz")}
              className="flex items-center gap-2"
              size="lg"
            >
              <Brain className="w-5 h-5" />
              Quiz de Personalidade
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Chat com IA
            </h2>
          </div>
        </div>
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
