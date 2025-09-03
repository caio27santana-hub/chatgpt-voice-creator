import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const PersonalityQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Como você prefere passar seu tempo livre?",
      options: [
        "Lendo um livro em casa",
        "Saindo com amigos",
        "Praticando esportes",
        "Assistindo filmes/séries"
      ]
    },
    {
      id: 2,
      question: "Qual tipo de atividade mais te energiza?",
      options: [
        "Atividades criativas (arte, música, escrita)",
        "Atividades sociais e networking",
        "Atividades físicas e aventuras",
        "Aprender coisas novas"
      ]
    },
    {
      id: 3,
      question: "Como você lida com situações stressantes?",
      options: [
        "Procuro ficar sozinho para pensar",
        "Converso com outras pessoas",
        "Faço exercícios físicos",
        "Busco distrações como jogos ou hobbies"
      ]
    },
    {
      id: 4,
      question: "Qual é seu hobby ideal para um fim de semana?",
      options: [
        "Jardinagem ou artesanato",
        "Organizar eventos ou reuniões",
        "Hiking ou esportes radicais",
        "Programar ou resolver quebra-cabeças"
      ]
    },
    {
      id: 5,
      question: "Como você prefere aprender coisas novas?",
      options: [
        "Estudando sozinho com livros/vídeos",
        "Em grupos de estudo ou workshops",
        "Através da prática e experiência",
        "Pesquisando e experimentando online"
      ]
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getPersonalityResult = () => {
    const answerValues = Object.values(answers);
    
    if (answerValues.filter(a => a.includes("sozinho") || a.includes("livros") || a.includes("casa")).length >= 2) {
      return {
        type: "Introvertido Reflexivo",
        description: "Você gosta de momentos de tranquilidade e reflexão. Aprecia atividades que permitam explorar seus pensamentos e criatividade em um ambiente calmo."
      };
    } else if (answerValues.filter(a => a.includes("amigos") || a.includes("social") || a.includes("pessoas")).length >= 2) {
      return {
        type: "Extrovertido Social",
        description: "Você se energiza através das interações sociais e gosta de estar cercado por pessoas. Atividades em grupo são sua paixão."
      };
    } else if (answerValues.filter(a => a.includes("esportes") || a.includes("físic") || a.includes("aventura")).length >= 2) {
      return {
        type: "Aventureiro Ativo",
        description: "Você tem uma natureza ativa e aventureira. Gosta de desafios físicos e experiências que testam seus limites."
      };
    } else {
      return {
        type: "Curioso Intelectual",
        description: "Você tem uma mente inquisitiva e gosta de explorar novas ideias e conceitos. Aprendizado e descoberta são suas paixões."
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const result = getPersonalityResult();
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Brain className="w-8 h-8 text-primary" />
              Seu Resultado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-primary/10 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-primary mb-4">{result.type}</h2>
              <p className="text-lg text-muted-foreground">{result.description}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>
                Refazer Quiz
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate("/")} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-center">
            Quiz de Personalidade & Hobbies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">
              {questions[currentQuestion].question}
            </h2>
          </div>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={answers[currentQuestion] === option ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Próxima"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityQuiz;