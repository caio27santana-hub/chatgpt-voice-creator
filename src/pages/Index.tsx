import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Chat Bot IA</h1>
          <p className="text-xl text-muted-foreground">Converse com nossa inteligência artificial</p>
        </div>
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
