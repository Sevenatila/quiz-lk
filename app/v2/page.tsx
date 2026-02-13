'use client';

import { useState, useEffect } from 'react';

const questions = [
  {
    question: "Como é a conversa de vocês no WhatsApp hoje?",
    options: [
      { text: "Ele responde rápido e puxa assunto.", points: 3 },
      { text: "Demora horas pra responder e é seco.", points: 1 },
      { text: "Só responde o básico (monossílabico).", points: 0 },
      { text: "Me deixa no vácuo frequentemente.", points: 0 }
    ]
  },
  {
    question: "Quando o assunto é 'compromisso sério', o que ele diz?",
    options: [
      { text: "Fala abertamente sobre namoro/futuro.", points: 3 },
      { text: "Foge do assunto ou diz que 'não está pronto'.", points: 0 },
      { text: "Diz que gosta de deixar rolar sem rótulos.", points: 1 },
      { text: "Nunca tocamos nesse assunto.", points: 0 }
    ]
  },
  {
    question: "Ele demonstra ciúmes quando você fala com outros caras?",
    options: [
      { text: "Sim, fica claramente incomodado.", points: 2 },
      { text: "Finge que não se importa, mas percebo que incomoda.", points: 3 },
      { text: "Não demonstra nenhum tipo de ciúmes.", points: 0 },
      { text: "Ainda incentiva eu a ficar com outros.", points: 0 }
    ]
  },
  {
    question: "Como ele age quando vocês estão juntos pessoalmente?",
    options: [
      { text: "Carinhoso, atencioso e presente.", points: 3 },
      { text: "Legal, mas sempre mexendo no celular.", points: 1 },
      { text: "Parece distante ou desinteressado.", points: 0 },
      { text: "Só busca intimidade física.", points: 0 }
    ]
  },
  {
    question: "Ele faz planos para vocês no futuro?",
    options: [
      { text: "Sempre sugere coisas pra fazermos juntos.", points: 3 },
      { text: "Às vezes menciona algo, mas nada concreto.", points: 2 },
      { text: "Só fala de planos imediatos (hoje/semana).", points: 1 },
      { text: "Nunca menciona planos futuros.", points: 0 }
    ]
  },
  {
    question: "Qual foi a última vez que ele te chamou pra sair?",
    options: [
      { text: "Esta semana.", points: 3 },
      { text: "Semana passada.", points: 2 },
      { text: "Faz mais de um mês.", points: 1 },
      { text: "Ele nunca me chama, sempre sou eu.", points: 0 }
    ]
  },
  {
    question: "Como ele reage quando você não responde rápido?",
    options: [
      { text: "Manda várias mensagens ou liga.", points: 3 },
      { text: "Pergunta se está tudo bem.", points: 2 },
      { text: "Espera pacientemente eu responder.", points: 1 },
      { text: "Nem percebe ou não se importa.", points: 0 }
    ]
  },
  {
    question: "Ele te apresentou para amigos/família?",
    options: [
      { text: "Sim, já me apresentou para todos.", points: 3 },
      { text: "Apenas para alguns amigos próximos.", points: 2 },
      { text: "Só conheci por acaso em algum encontro.", points: 1 },
      { text: "Nunca me apresentou para ninguém.", points: 0 }
    ]
  }
];

export default function QuizV2() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number, points: number) => {
    setSelectedOption(optionIndex);

    setTimeout(() => {
      setScore(score + points);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const getResult = () => {
    if (score >= 18) {
      return {
        title: "Análise Concluída: Ele está interessado!",
        subtitle: "Identificamos sinais claros de que ele quer algo sério com você.",
        emoji: "💕"
      };
    } else if (score >= 12) {
      return {
        title: "Análise Concluída: Interesse moderado.",
        subtitle: "Ele demonstra interesse, mas ainda há barreiras. Veja como superar.",
        emoji: "💭"
      };
    } else {
      return {
        title: "Análise Concluída: O interesse dele está caindo.",
        subtitle: "Identificamos 3 erros de comunicação que estão afastando ele. Veja como reverter agora.",
        emoji: "⚠️"
      };
    }
  };

  const handleCTA = () => {
    // Redirecionar para VSL
    window.location.href = 'https://player.vimeo.com/video/SEU_VIDEO_ID';
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/img/whatsapp-hero.webp')`,
            filter: 'blur(8px) brightness(0.3)',
            transform: 'scale(1.1)'
          }}
        />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Card Principal */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
              <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
                Por que ele se afastou de repente?
              </h1>

              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                Faça este teste de 45 segundos e descubra a barreira invisível que está impedindo ele de se conectar com você hoje.
              </p>

              <button
                onClick={() => setShowWelcome(false)}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Começar Análise →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const result = getResult();

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/img/whatsapp-hero.webp')`,
            filter: 'blur(8px) brightness(0.3)',
            transform: 'scale(1.1)'
          }}
        />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Card de Resultado */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center shadow-2xl animate-fadeInUp">
              <div className="text-6xl mb-6">{result.emoji}</div>

              <h2 className="text-2xl font-bold text-pink-300 mb-4 leading-tight">
                {result.title}
              </h2>

              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                {result.subtitle}
              </p>

              <button
                onClick={handleCTA}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
              >
                VER O PROTOCOLO COMPLETO
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/img/whatsapp-hero.webp')`,
          filter: 'blur(8px) brightness(0.3)',
          transform: 'scale(1.1)'
        }}
      />

      {/* Progress Bar */}
      <div className="relative z-20 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pergunta */}
      <div className="relative z-10 flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="max-w-md w-full">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
            <h2 className="text-xl font-bold text-white mb-8 text-center leading-tight">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index, option.points)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
                    selectedOption === index
                      ? 'bg-gradient-to-r from-red-600/20 to-pink-600/20 border-pink-500 text-white'
                      : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/20 hover:border-white/40'
                  } ${selectedOption !== null ? 'cursor-not-allowed' : 'hover:scale-102 cursor-pointer'}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}