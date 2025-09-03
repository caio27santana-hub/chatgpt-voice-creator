import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou seu assistente de IA. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: inputValue }
      });

      if (error) {
        throw error;
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'Desculpe, não consegui processar sua mensagem.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Chat Bot IA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 mb-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <Bot className="w-6 h-6 text-primary mt-1" />
              )}
              <div
                className={`rounded-lg p-3 max-w-xs ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {message.sender === 'user' && (
                <User className="w-6 h-6 text-muted-foreground mt-1" />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-2 mb-4">
              <Bot className="w-6 h-6 text-primary mt-1" />
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm">Digitando...</p>
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="flex gap-2 p-4 border-t">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;