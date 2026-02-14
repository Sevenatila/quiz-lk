"use client";

import { useEffect, useState } from "react";

const steps = [
  "Gerando a mensagem exata que fura qualquer bloqueio e desperta saudade mesmo no silêncio",
  "Criando o gatilho oculto que faz ela duvidar da decisão de te deixar",
  "Gerando o texto perfeito pra reverter o desprezo e fazê-la procurar sua resposta",
  "Criando o efeito dominó que destrói o novo relacionamento e traz o foco de volta pra você",
  "Gerando a sequência proibida de mensagens que reabre a conversa sem parecer carência",
  "Criando a virada psicológica que muda completamente a forma como ela te enxerga",
  "Gerando Protocolo Personalizado!",
];

export default function ProtocolLoader({
  active,
  startDelay = 0,
  onComplete,
}: {
  active: boolean;
  startDelay?: number;
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState<number[]>(
    new Array(steps.length).fill(0)
  );
  const [done, setDone] = useState(false);
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (startDelay > 0) {
      // Iniciar carregamento imediatamente mas distribuir ao longo do delay
      setCurrentStep(0);

      // Completar após o delay total
      const delayTimer = setTimeout(() => {
        setDelayComplete(true);
      }, startDelay);

      return () => clearTimeout(delayTimer);
    } else {
      // Sem delay, iniciar imediatamente
      setDelayComplete(true);
      setCurrentStep(0);
    }
  }, [active, startDelay]);

  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;

    // Calcular duração baseada no delay total
    const totalDuration = startDelay > 0 ? startDelay : 15000; // 7min 12seg ou 15seg default
    const stepDuration = totalDuration / steps.length;
    const duration = stepDuration;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setStepProgress((prev) => {
        const next = [...prev];
        next[currentStep] = progress;
        return next;
      });

      if (progress >= 100) {
        clearInterval(timer);
        if (currentStep < steps.length - 1) {
          setTimeout(() => setCurrentStep(currentStep + 1), 200);
        } else {
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 500);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-8">
        <p className="text-red-600 font-semibold text-sm mb-1">
          Aguarde, estamos criando o seu
        </p>
        <h3 className="text-lg font-bold text-gray-900">
          Protocolo Personalizado de Reconquista...
        </h3>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${
              i <= currentStep ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="flex items-start gap-3 mb-2">
              <span
                className={`text-lg transition-all duration-300 ${
                  stepProgress[i] >= 100
                    ? "text-green-500 scale-110"
                    : "text-gray-300"
                }`}
              >
                {stepProgress[i] >= 100 ? "✅" : "⬜"}
              </span>
              <span className="text-sm text-gray-600 leading-snug flex-1">
                {step}
              </span>
              <span className="text-xs font-bold text-red-600 min-w-[36px] text-right tabular-nums">
                {Math.round(stepProgress[i])}%
              </span>
            </div>
            <div className="ml-9 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100 ease-linear"
                style={{
                  width: `${stepProgress[i]}%`,
                  background:
                    stepProgress[i] >= 100
                      ? "#22c55e"
                      : "linear-gradient(90deg, #f59e0b, #ef4444)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {done && delayComplete && (
        <div className="mt-8 text-center animate-bounceIn">
          <div className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-200 rounded-2xl px-6 py-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="text-green-700 font-extrabold text-lg">
                Protocolo Gerado!
              </p>
              <p className="text-green-600 text-sm">Resgate agora...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
