import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Quiz de Personalidade</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Descubra mais sobre sua personalidade e hobbies através do nosso quiz interativo
          </p>
          <Button 
            onClick={() => navigate("/quiz")}
            className="flex items-center gap-2 mx-auto"
            size="lg"
          >
            <Brain className="w-5 h-5" />
            Começar Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
