"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "./Logo";
import ProgressBar from "./ProgressBar";
import QuizOption from "./QuizOption";
import ProtocolLoader from "./ProtocolLoader";
import Countdown from "./Countdown";
import BonusCard from "./BonusCard";

function VTurbPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Avoid double init
    if (container.querySelector("vturb-smartplayer")) return;

    // Create the custom element in real DOM
    const player = document.createElement("vturb-smartplayer");
    player.id = "vid-68fda7c738d7cd51cf68c89a";
    player.style.display = "block";
    player.style.margin = "0 auto";
    player.style.width = "100%";
    player.style.maxWidth = "400px";
    container.appendChild(player);

    // Load the player script (only once)
    if (!document.getElementById("vturb-player-script")) {
      const s = document.createElement("script");
      s.id = "vturb-player-script";
      s.src =
        "https://scripts.converteai.net/8bd1f3e2-3951-434d-9919-f64436108dcd/players/68fda7c738d7cd51cf68c89a/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return <div ref={containerRef} />;
}

function ScrollArrow() {
  return (
    <div className="flex flex-col items-center py-8 animate-fadeIn">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Role para baixo
      </p>
      <div className="animate-bounce">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

const questions = [
  {
    question: "Quando foi o término entre vocês?",
    options: [
      "Faz menos de 1 semana.",
      "Entre 1 e 4 semanas.",
      "Entre 1 e 3 meses.",
      "Mais de 3 meses.",
    ],
  },
  {
    question: "Vocês ainda têm algum tipo de contato hoje em dia?",
    options: [
      "Sim, conversamos de vez em quando.",
      "Ela fala comigo, mas é fria e distante.",
      "Só responde por educação.",
      "Não, ela me bloqueou em tudo.",
    ],
  },
  {
    question: "O que mais dói em você desde o término?",
    options: [
      "Solidão forte.",
      "Culpa e remorso.",
      "Ansiedade e medo do futuro.",
      "Imaginar que ela já tá ficando com outro cara.",
    ],
  },
  {
    question:
      "Se ela realmente se apaixonar por outro cara, o que aconteceria com você?",
    options: [
      "Eu perderia completamente o chão.",
      "Ficaria mal, mas tentaria seguir em frente.",
      "Tentaria reconquistar de qualquer jeito.",
      "Fingiria que não ligo, mas morreria por dentro.",
    ],
  },
  {
    question:
      "Quanto tempo você acha que ainda tem antes dela te esquecer de vez?",
    options: [
      "Poucos dias — sinto que já estou sendo substituído.",
      "Algumas semanas — ainda dá pra agir.",
      "Uns meses — acho que ela ainda sente algo.",
      "Não sei, mas tenho medo de descobrir.",
    ],
  },
];

const bonuses = [
  {
    icon: "✅",
    title: "Checklist Anti-Rejeição",
    oldPrice: "147,00",
    description:
      "Evite esses 7 erros da reconquista e aumente suas chances de voltar com ela ainda essa semana em 8x transformando cada um deles numa vantagem.",
  },
  {
    icon: "💬",
    title: "Código do Ciúme Instantâneo",
    oldPrice: "107,00",
    description:
      "Use essa frase na sua primeira conversa com ela e faça ela sentir um ciúme visceral de você — ao ponto dela lutar pela sua atenção e correr atrás de você.",
  },
  {
    icon: "💌",
    title: "A Carta Proibida de Último Recurso",
    oldPrice: "997,00",
    description:
      "Envie essa mensagem para ela HOJE e veja ela desbloquear você nas redes sociais e parar de agir com frieza, implorando pela sua atenção.",
  },
  {
    icon: "🔍",
    title: "O Dossiê do Rival Descartável",
    oldPrice: "297,00",
    description:
      "Se ela estiver ficando com outro cara, use essa técnica e transforme isso numa vantagem desleal para fazê-la esquecê-lo e voltar com você mais rápido.",
  },
  {
    icon: "💜",
    title: "Manual da Reativação das Emoções Ocultas",
    oldPrice: "197,00",
    description:
      "Use esses 5 gatilhos invisíveis para fazer a sua ex sentir todo aquele tesão do começo do relacionamento — mesmo que ela jure que te odeia.",
  },
];

const testimonials = [
  {
    text: '"Fala mano só passando pra avisar q hj deu tudo certo 🫡 Pela primeira vez consegui falar com ela sem travar kkkk"',
    name: "Aluno do Código",
  },
  {
    text: '"Usei exatamente oq tu falou no módulo de conexão verbal... Reconquistei minha mina mas leve benefício em outras áreas da minha vida. Gratidão mano 🙏🔥"',
    name: "Aluno do Código",
  },
  {
    text: '"Hoje tô 100% independente dela, tô mais focado em mim do q nunca. Aquele corte consciente foi oq me ajudou. Parei de ficar no vácuo emocional e ela veio atrás."',
    name: "Aluno do Código",
  },
  {
    text: '"A técnica do loop do equilíbrio salvou dmais 🙏 Mandou ontem e já tá falando da gente ter uma conversa 😊"',
    name: "Aluno do Código",
  },
  {
    text: '"Tu acredita que a minha ex tá querendo volta 😅 Fui aplicar esse lance de presença magnética e ela até qm não pedi kkkkkk"',
    name: "Aluno do Código",
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(5).fill(null)
  );
  const [unlockedUntil, setUnlockedUntil] = useState(0);
  // 0 = hero visible, 1 = q1 unlocked, ... 5 = q5 unlocked,
  // 6 = result, 7 = engage1, 8 = engage2, 9 = loading, 10 = sales
  const [protocolDone, setProtocolDone] = useState(false);
  const [salesActive, setSalesActive] = useState(false);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pendingScroll = useRef<number | null>(null);

  // Watch for new refs being set after render, then scroll
  useEffect(() => {
    if (pendingScroll.current === null) return;
    const target = pendingScroll.current;

    // Poll until the element exists (max ~1s)
    let attempts = 0;
    const interval = setInterval(() => {
      const el = sectionRefs.current[target];
      attempts++;
      if (el) {
        clearInterval(interval);
        pendingScroll.current = null;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts > 20) {
        clearInterval(interval);
        pendingScroll.current = null;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [unlockedUntil]);

  function unlock(level: number) {
    if (level > unlockedUntil) {
      pendingScroll.current = level;
      setUnlockedUntil(level);
      // Mark as visible immediately so it doesn't stay invisible
      setVisible((prev) => new Set([...prev, level]));
    }
  }

  function selectAnswer(questionIdx: number, optionIdx: number) {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx;
    setAnswers(newAnswers);
    setTimeout(() => unlock(questionIdx + 2), 500);
  }

  const handleProtocolComplete = useCallback(() => {
    setProtocolDone(true);
  }, []);

  // Fade-in on scroll observer
  const [visible, setVisible] = useState<Set<number>>(new Set([0]));
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-section"));
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [unlockedUntil]);

  function sectionClass(idx: number) {
    return `transition-all duration-700 ${
      visible.has(idx)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`;
  }

  return (
    <>
      <ProgressBar />

      <div className="max-w-lg mx-auto px-5 pb-8">
        {/* ===== 0: HERO ===== */}
        <div
          ref={(el) => { sectionRefs.current[0] = el; }}
          data-section="0"
          className={`pt-6 pb-12 ${sectionClass(0)}`}
        >
          <Logo className="pb-4" />

          <div className="text-center mb-8">
            <h1 className="text-[1.6rem] font-extrabold text-gray-900 leading-tight mb-3">
              Descubra como fazer sua ex sentir sua falta{" "}
              <span className="text-red-600">em 60 segundos</span>
            </h1>
            <div className="w-12 h-1 bg-red-500 rounded-full mx-auto mt-4 mb-6" />

            <Image
              src="/img/whatsapp-hero.webp"
              alt="Mensagem no WhatsApp"
              width={400}
              height={320}
              priority
              className="rounded-xl shadow-lg mx-auto mb-6"
            />
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              <strong className="text-gray-900">
                Use essa mensagem psicológica e ela vai te procurar.
              </strong>{" "}
              Não importa se você traiu ela, se ela te bloqueou ou se ela está
              com outro cara agora.
            </p>
            <p className="text-base text-gray-600">
              Clique abaixo para fazer o teste e{" "}
              <strong className="text-gray-900">
                desbloquear essa mensagem.
              </strong>
            </p>
          </div>

          <div className="bg-green-50/70 border border-green-100 rounded-2xl p-5 mb-8 space-y-4">
            {[
              "Além dessa mensagem você receberá um protocolo personalizado de reconquista.",
              "Descobrirá qual é o erro que faz 93% dos homens perder a ex pra sempre e como evitá-lo.",
              "E também descobrirá o atalho sujo para trazê-la de volta já nas próximas 48 horas.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">
                  ✅
                </span>
                <span className="text-[0.95rem] text-gray-700 leading-relaxed">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => unlock(1)}
            className="w-full py-4 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-red-200 cursor-pointer uppercase tracking-wide"
          >
            Quero reconquistar minha ex!
          </button>

          {unlockedUntil >= 1 && <ScrollArrow />}
        </div>

        {/* ===== 1–5: QUIZ QUESTIONS ===== */}
        {questions.map((q, qIdx) =>
          unlockedUntil >= qIdx + 1 ? (
            <div
              key={qIdx}
              ref={(el) => { sectionRefs.current[qIdx + 1] = el; }}
              data-section={qIdx + 1}
              className={`py-10 border-t border-gray-100 ${sectionClass(qIdx + 1)}`}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  Pergunta {qIdx + 1} de 5
                </span>
              </div>
              <h2 className="text-[1.35rem] font-bold text-gray-900 leading-snug mb-6">
                {q.question}
              </h2>
              <div className="space-y-3">
                {q.options.map((opt, oIdx) => (
                  <QuizOption
                    key={oIdx}
                    text={opt}
                    selected={answers[qIdx] === oIdx}
                    onClick={() => selectAnswer(qIdx, oIdx)}
                    index={oIdx}
                  />
                ))}
              </div>
              {answers[qIdx] !== null && (
                <>
                  <div className="flex justify-center mt-6 animate-fadeIn">
                    <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                      ✅ Resposta registrada
                    </span>
                  </div>
                  <ScrollArrow />
                </>
              )}
            </div>
          ) : null
        )}

        {/* ===== 6: RESULT ===== */}
        {unlockedUntil >= 6 && (
          <div
            ref={(el) => { sectionRefs.current[6] = el; }}
            data-section="6"
            className={`py-10 border-t border-gray-100 ${sectionClass(6)}`}
          >
            {/* Alert */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center mb-8">
              <span className="text-2xl">⚠️</span>
              <p className="text-sm font-bold text-amber-800 mt-1">
                ATENÇÃO: Não saia dessa página!
              </p>
            </div>

            {/* Percentage */}
            <div className="text-center mb-10">
              <p className="text-base font-bold text-gray-900 mb-2">
                Suas chances de voltar com sua ex
              </p>
              <p className="text-sm font-semibold text-red-600 italic mb-3">
                SÃO DE APENAS
              </p>
              <div className="text-6xl font-black text-red-600 mb-3 animate-bounceIn">
                12%
              </div>
              <p className="text-[0.95rem] text-gray-600">
                — <em className="text-red-600 font-semibold">isso é crítico</em>{" "}
                — mas ao seguir esse protocolo você pode{" "}
                <strong>GARANTIR que ela volte</strong>
              </p>
            </div>

            <div className="w-16 h-0.5 bg-gray-200 rounded mx-auto mb-10" />

            {/* Story */}
            <div className="space-y-4 text-[0.95rem] text-gray-600 leading-relaxed">
              <p className="text-lg font-bold text-gray-900">Fala, irmão!</p>
              <p>
                Meu nome é{" "}
                <strong className="text-gray-900">Lucas Krausche</strong>.
              </p>
              <p>E, eu sei exatamente o que você está passando.</p>
              <p>Te digo isso porque eu já estive do outro lado.</p>
              <p>
                Eu era apaixonado por uma mulher... mas, com o passar do tempo, o
                relacionamento foi caindo na rotina.
              </p>
              <p>
                Eu trabalhava demais, esquecia dos pequenos detalhes que faziam
                ela sorrir... e, sem perceber, fui magoando aos poucos a mulher
                que eu mais amava.
              </p>
              <p>
                Até que, um dia,{" "}
                <strong className="text-gray-900">ela terminou comigo.</strong>
              </p>
              <p>
                Naquele momento, parecia que o meu mundo tinha desabado.
              </p>
              <p>
                Foi aí que começou o meu verdadeiro inferno emocional:
              </p>
              <p>
                Eu ligava sem parar, mandava mensagem atrás de mensagem, ficava
                online o tempo todo só pra ver se ela tinha visualizado minhas
                mensagens...
              </p>

              <Image
                src="/img/whatsapp-ligacoes.webp"
                alt="Ligações perdidas no WhatsApp"
                width={400}
                height={700}
                className="rounded-xl shadow-lg mx-auto my-4 w-full max-w-[300px]"
              />
              <p>
                O pior que quando ela postava um story,{" "}
                <span className="text-red-600 font-semibold">
                  eu imaginava logo que estava saindo com outro.
                </span>{" "}
                E isso me destruía por dentro e me deixava em crises e ansiedade.
              </p>
              <p>
                <strong className="text-gray-900">E o pior...</strong> Era
                quando eu estava bloqueado.
              </p>
              <p>
                Eu vivia naquela angústia sem fim, me perguntando a cada minuto:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-500 italic">
                <li>&quot;Será que ela ainda sente minha falta?&quot;</li>
                <li>&quot;Será que já me trocou por outro?&quot;</li>
                <li>
                  &quot;Será que eu ligo? Será que eu mando mensagem?&quot;
                </li>
              </ol>
              <p>
                E a verdade é que...{" "}
                <span className="text-red-600 font-semibold">
                  quanto mais eu corria atrás, mais ela se afastava.
                </span>
              </p>
              <p>
                Foi só então que eu percebi:{" "}
                <strong className="text-gray-900">
                  O problema não era ela. O verdadeiro problema era eu não
                  entender a mente feminina.
                </strong>
              </p>
              <p>
                Eu não sabia como funcionava o{" "}
                <span className="text-blue-600 font-semibold">
                  desejo de uma mulher
                </span>
                ... e, por isso, eu fazia exatamente o oposto do que despertaria
                vontade de voltar nela.
              </p>
              <p>
                Mas ao invés de aceitar a derrota, eu decidi transformar essa dor
                em combustível.
              </p>
              <p>
                Eu mergulhei de cabeça nos estudos, fui atrás de respostas,
                conversei com muitos especialistas e descobri algo que mudou não
                só a minha vida, mas a de milhares de outras pessoas com quem eu
                já compartilhei esse segredo oculto...
              </p>
              <p>
                <span className="text-red-600 font-semibold">
                  Quanto mais você é disponível para uma mulher, mais ela se
                  afasta...
                </span>
              </p>
              <p>
                Porém, em apenas{" "}
                <strong className="text-gray-900">3 etapas</strong>, você
                consegue fazer qualquer mulher comer nas suas mãos outra vez e se
                arrepender de ter terminado contigo{" "}
                <strong className="text-gray-900">
                  (Mesmo que você tenha feito uma besteira muito grande).
                </strong>
              </p>
              <p>
                Ao longo dos últimos anos, eu me formei em{" "}
                <strong className="text-gray-900">Psicanálise</strong>, e hoje
                sou{" "}
                <strong className="text-gray-900">
                  Psicanalista Clínico especializado em relacionamentos e
                  comportamento humano.
                </strong>
              </p>

              <Image
                src="/img/lucas-evento.webp"
                alt="Lucas Krausche em evento"
                width={600}
                height={340}
                className="rounded-xl shadow-lg w-full my-4"
              />

              <p>
                Desde que comecei a compartilhar conteúdos sobre relacionamento,{" "}
                <span className="text-blue-600 font-semibold">
                  conquistei quase 2 milhões de seguidores em todas minhas redes
                  sociais.
                </span>
              </p>

              <Image
                src="/img/instagram.webp"
                alt="Perfil Instagram Lucas Krausche"
                width={500}
                height={120}
                className="rounded-xl shadow-lg w-full my-4"
              />

              <p>
                E aquela mulher que havia me deixado, depois que eu apliquei
                exatamente o mesmo{" "}
                <span className="text-red-600 font-semibold">
                  truque de 3 etapas
                </span>{" "}
                que eu vou te revelar neste plano, hoje é{" "}
                <strong className="text-gray-900">minha noiva.</strong>
              </p>

              <Image
                src="/img/lucas-noiva.webp"
                alt="Lucas Krausche e sua noiva"
                width={400}
                height={600}
                className="rounded-xl shadow-lg mx-auto my-4 w-full max-w-[320px]"
              />

              <p>
                E o melhor... Eu fundei o{" "}
                <span className="text-blue-600 font-semibold">
                  Clube das Deusas de Alto Valor
                </span>
                , um método exclusivo que ensina mulheres a curar traumas
                profundos para terem relacionamentos saudáveis. Hoje o Clube
                conta com mais de{" "}
                <strong className="text-gray-900">2.800 alunas.</strong>
              </p>

              <Image
                src="/img/clube-deusas.webp"
                alt="Clube das Deusas de Alto Valor"
                width={600}
                height={600}
                className="rounded-xl shadow-lg w-full my-4"
              />
              <p>
                Mas isso me deu acesso a{" "}
                <strong className="text-gray-900">TODOS</strong> os segredos
                mais ocultos da mente feminina... Segredos que agora eu vou te
                revelar para que a sua ex volte a sentir sua falta, se arrependa
                de ter te deixado e queira correr atrás de você ainda essa
                semana.
              </p>
            </div>

            <button
              onClick={() => unlock(7)}
              className="w-full mt-10 py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-200 cursor-pointer uppercase tracking-wide"
            >
              Continuar Plano!
            </button>

            {unlockedUntil >= 7 && <ScrollArrow />}
          </div>
        )}

        {/* ===== 7: ENGAGE 1 ===== */}
        {unlockedUntil >= 7 && (
          <div
            ref={(el) => { sectionRefs.current[7] = el; }}
            data-section="7"
            className={`py-10 border-t border-gray-100 ${sectionClass(7)}`}
          >
            <h2 className="text-[1.35rem] font-bold text-gray-900 text-center leading-snug mb-8">
              Você gostaria que, além da mensagem de 3 palavras, eu te mostrasse
              como fazer o cérebro dela sentir saudade e voltar correndo pra
              você, mesmo que ela esteja com outro?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Sim, quero fazer ela sentir minha falta.",
                "Sim, se for direto e prático.",
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => unlock(8)}
                  className="p-4 rounded-2xl border-2 border-red-100 bg-red-50 hover:border-red-400 hover:bg-red-100 active:scale-[0.97] transition-all text-[0.95rem] font-semibold text-gray-800 cursor-pointer text-center"
                >
                  {text}
                </button>
              ))}
            </div>

            {unlockedUntil >= 8 && <ScrollArrow />}
          </div>
        )}

        {/* ===== 8: ENGAGE 2 ===== */}
        {unlockedUntil >= 8 && (
          <div
            ref={(el) => { sectionRefs.current[8] = el; }}
            data-section="8"
            className={`py-10 border-t border-gray-100 ${sectionClass(8)}`}
          >
            <h2 className="text-[1.35rem] font-bold text-gray-900 text-center leading-snug mb-8">
              Se existisse um vídeo curto de 60 segundos mostrando o passo a
              passo exato para fazer sua ex voltar nas próximas 48 horas, você se
              comprometeria a assistir esse vídeo até o final?
            </h2>
            <div className="space-y-3">
              {[
                "Sim, quero assistir agora.",
                "Sim, quero assistir e aplicar hoje.",
                "Sim, mas quero entender cada detalhe.",
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => unlock(9)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-red-200 hover:bg-red-50/30 active:scale-[0.97] transition-all text-left cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  <span className="text-[0.95rem] font-medium text-gray-700">
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            {unlockedUntil >= 9 && <ScrollArrow />}
          </div>
        )}

        {/* ===== 9: LOADING ===== */}
        {unlockedUntil >= 9 && (
          <div
            ref={(el) => { sectionRefs.current[9] = el; }}
            data-section="9"
            className={`py-10 border-t border-gray-100 ${sectionClass(9)}`}
          >
            {/* VTurb Video Player */}
            <div className="mb-8">
              <VTurbPlayer />
            </div>

            <ProtocolLoader
              active={unlockedUntil >= 9}
              onComplete={handleProtocolComplete}
            />

            {protocolDone && (
              <button
                onClick={() => {
                  setSalesActive(true);
                  unlock(10);
                }}
                className="w-full mt-8 py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-200 cursor-pointer uppercase tracking-wide animate-fadeInUp"
              >
                Clique aqui para RECONQUISTAR sua ex!
              </button>
            )}
          </div>
        )}

        {/* ===== 10: SALES ===== */}
        {unlockedUntil >= 10 && (
          <div
            ref={(el) => { sectionRefs.current[10] = el; }}
            data-section="10"
            className={`py-10 border-t border-gray-100 ${sectionClass(10)}`}
          >
            {/* ---- GUARANTEE ---- */}
            <div className="text-center mb-6">
              <p className="text-[0.95rem] text-gray-600 mb-1">
                Ao garantir seu acesso ao{" "}
                <strong className="text-gray-900">CÓDIGO DA RECONQUISTA</strong>{" "}
                você recebe uma
              </p>
              <h3 className="text-xl font-extrabold text-gray-900">
                GARANTIA INQUEBRÁVEL{" "}
                <span className="font-normal">de 90 dias</span>{" "}
                <span className="text-red-600">+5 PRESENTES!</span>
              </h3>
            </div>

            <div className="space-y-4 text-[0.95rem] text-gray-600 leading-relaxed mb-8">
              <p>Eu sei exatamente o que está passando pela sua cabeça agora.</p>
              <p>&quot;E se eu comprar e nada acontecer?&quot;</p>
              <p>&quot;E se ela não voltar?&quot;</p>
              <p>&quot;E se for só mais uma promessa vazia na internet?&quot;</p>
              <p>
                É por isso que eu decidi fazer algo que nenhum outro especialista
                em relacionamentos tem coragem de fazer: te dar uma{" "}
                <strong className="text-gray-900">
                  garantia de 90 dias
                </strong>
                , sem pegadinhas e sem letra miúda.
              </p>
              <p>Funciona assim:</p>
              <p>
                Você entra pro{" "}
                <strong className="text-gray-900">Código da Reconquista</strong>{" "}
                hoje...
              </p>
              <p>
                Aplica o que eu ensino, envia as mensagens, segue o protocolo
                passo a passo...
              </p>
              <p>
                E se em até 90 dias sua ex{" "}
                <strong className="text-gray-900">não voltar pra você</strong>,
                eu devolvo cada centavo do seu investimento.
              </p>
              <p>Sem perguntas, sem burocracia, sem letras miúdas.</p>
              <p>Se não funcionar pra você, você não paga nada.</p>
              <p>Simples assim.</p>
              <p>Eu faço isso porque sei o que eu entrego.</p>
              <p>
                E porque já vi esse mesmo método transformar{" "}
                <strong className="text-gray-900">homens destruídos:</strong>
              </p>
              <p>
                Em{" "}
                <strong className="text-gray-900">
                  caras que reconquistaram o respeito, o desejo e o amor da
                  mulher que mais amavam.
                </strong>
              </p>
              <p>
                Então, você não tá investindo em &quot;mais um curso&quot;.
              </p>
              <p>
                Você está investindo em{" "}
                <strong className="text-gray-900">
                  uma segunda chance de reescrever a história da sua vida
                  amorosa.
                </strong>
              </p>
              <p>
                E eu confio tanto nesse método que boto meu nome e minha
                reputação em jogo pra provar isso.
              </p>
              <p>Então, agora é contigo.</p>
              <p>
                Você pode continuar rolando a tela, fingindo que vai pensar mais
                um pouco...
              </p>
              <p>
                Ou pode{" "}
                <strong className="text-gray-900">
                  clicar no botão abaixo...
                </strong>
              </p>
              <p>
                E começar agora o processo que vai trazer a sua ex de volta pra
                sua vida.
              </p>
            </div>

            {/* Choice */}
            <p className="text-center font-bold text-base text-gray-900 mb-4">
              A escolha é simples:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex gap-3 items-start p-4 bg-red-50 rounded-xl">
                <span className="text-lg">💔</span>
                <p className="text-[0.95rem] text-gray-700">
                  Ficar preso nos 12% e perder ela pra sempre.
                </p>
              </div>
              <div className="flex gap-3 items-start p-4 bg-green-50 rounded-xl">
                <span className="text-lg">❤️</span>
                <p className="text-[0.95rem] text-gray-700">
                  Ou agir agora e usar o mesmo protocolo que já reconectou mais
                  de 30 mil casais.
                </p>
              </div>
            </div>

            <p className="text-center text-[0.95rem] text-gray-600 mb-4">
              Clique aqui e garanta seu acesso ao{" "}
              <strong className="text-gray-900">
                Código da Reconquista com 90 dias de garantia
              </strong>{" "}
              👈
            </p>

            <a
              href="https://pay.kiwify.com.br/2yjxPKj"
              className="block w-full py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-200 text-center uppercase tracking-wide"
            >
              Clique aqui para RECONQUISTAR sua ex!
            </a>

            {/* ---- +5 BONUSES ---- */}
            <div className="mt-12">
              <p className="text-center font-extrabold text-lg text-gray-900 mb-1">
                E se você agir agora, eu vou te entregar{" "}
                <span className="text-red-600">+5</span>
              </p>
              <p className="text-center font-extrabold text-xl text-gray-900 mb-8">
                presentes especiais, olha só!
              </p>

              <div className="space-y-4">
                {bonuses.map((bonus, i) => (
                  <BonusCard key={i} {...bonus} index={i} />
                ))}
              </div>
            </div>

            <p className="text-center text-red-600 font-semibold text-sm mt-8 mb-2">
              Esses bônus especiais ficarão disponíveis por somente{" "}
              <strong className="underline">15 minutos!</strong>
            </p>
            <p className="text-center text-[0.95rem] text-gray-600 mb-4">
              Clique aqui para garanti-los agora com o{" "}
              <strong className="text-gray-900">Código da Reconquista!</strong>
            </p>

            <a
              href="https://pay.kiwify.com.br/2yjxPKj"
              className="block w-full py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-200 text-center uppercase tracking-wide"
            >
              Clique aqui para RECONQUISTAR sua ex!
            </a>

            {/* ---- TIMER ---- */}
            <Countdown active={salesActive} />

            {/* ---- TESTIMONIALS ---- */}
            <div className="mt-6">
              <p className="text-center text-base text-gray-900 mb-2">
                Esses caras estavam{" "}
                <strong>no mesmo barco que você</strong>, mas olha só o que
                aconteceu depois que eles usaram o
              </p>
              <p className="text-center text-xl font-extrabold text-gray-900 mb-8">
                CÓDIGO DA RECONQUISTA 👊🏼👊🏼
              </p>

              <div className="space-y-4">
                {[1, 2, 4, 6, 7].map((n) => (
                  <Image
                    key={n}
                    src={`/img/depoimento-${n}.webp`}
                    alt={`Depoimento de aluno ${n}`}
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-lg w-full"
                  />
                ))}
              </div>
            </div>

            {/* ---- VIP ACCESS TEXT ---- */}
            <div className="mt-10 space-y-4 text-[0.95rem] text-gray-600 leading-relaxed text-center">
              <p>
                E pra acelerar ainda mais os resultados da sua reconquista...
                você vai receber{" "}
                <strong className="text-gray-900">
                  acessos VIPs a bônus estratégicos
                </strong>
                , criados pra destravar reações quase que imediatas na mente
                dela...
              </p>
              <p>
                São técnicas tão diretas que, em média, em até 48h os alunos
                relatam mensagens, reações nos stories e até a ex puxando papo
                do nada. Como aconteceu com esse meu aluno aqui, veja só:
              </p>
            </div>

            {/* ---- VEJA AS MENSAGENS DELA ---- */}
            <div className="mt-6">
              <Image
                src="/img/mensagens-dela.webp"
                alt="Veja as mensagens dela"
                width={500}
                height={600}
                className="rounded-2xl shadow-lg w-full"
              />
            </div>

            {/* ---- GIFT BOX + BONUS EXTRAS (DARK) ---- */}
            <div className="mt-10 text-center">
              <Image
                src="/img/gift-box.webp"
                alt="Presente"
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
              <p className="text-[0.95rem] text-gray-600 mb-1">
                E isso é apenas o começo,{" "}
                <strong className="text-gray-900">
                  PORQUE COMO VOCÊ CHEGOU ATÉ AQUI
                </strong>
                , eu resolvi conversar com minha equipe e te entregar
              </p>
              <p className="text-red-600 font-extrabold text-base mb-6">
                +2 PRESENTES AINDA MAIS EXCLUSIVOS agora!
              </p>
              <div className="space-y-4">
                <Image
                  src="/img/bonus-lives.webp"
                  alt="Bônus Lives Semanais"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-lg w-full"
                />
                <Image
                  src="/img/bonus-comunidade.webp"
                  alt="Bônus Comunidade Desenrolado"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>

            {/* ---- "A MELHOR PARTE" SECTION ---- */}
            <div className="mt-10 space-y-4 text-[0.95rem] text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">
                  E aqui está a melhor parte:
                </strong>
              </p>
              <p>
                Esses caras estavam exatamente onde você está agora.
              </p>
              <div className="space-y-2">
                <p>➡️ Bloqueados no WhatsApp.</p>
                <p>➡️ Ignorados.</p>
                <p>
                  ➡️ Cheios de arrependimento, dúvidas e medo de nunca mais ter
                  uma chance.
                </p>
              </div>
              <p>
                <strong className="text-gray-900">Mas decidiram agir.</strong>
              </p>
              <p>E quando aplicaram o protocolo, o jogo virou.</p>
              <p>Hoje, são eles que recebem mensagem primeiro.</p>
              <p>São eles que fazem a ex sentir saudade de novo.</p>
              <p>
                São eles que escolheram se queriam voltar — ou se era tarde
                demais pra ela.
              </p>
              <p>E tudo começou com uma única decisão:</p>
              <p>
                Desbloquear o poder de reprogramar o cérebro da ex com o{" "}
                <strong className="text-gray-900">
                  Código da Reconquista
                </strong>
                .
              </p>
              <p>
                E você pode tomar essa mesma decisão apertando o botão abaixo:
              </p>
            </div>

            <a
              href="https://pay.kiwify.com.br/2yjxPKj"
              className="block w-full mt-6 py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-200 text-center uppercase tracking-wide"
            >
              Clique aqui para RECONQUISTAR sua ex!
            </a>

            {/* ---- FINAL CTA ---- */}
            <div className="mt-10 space-y-4 text-[0.95rem] text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">E olha...</strong> você não
                está aqui por acaso.
              </p>
              <p>
                Você está aqui porque sabe que sua ex não te enxerga mais como
                antes.
              </p>
              <p>E agora você só tem duas opções:</p>
              <div className="flex gap-3 items-start">
                <span className="text-red-500">❌</span>
                <p>
                  Continuar mandando mensagens aleatórias, vendo ela correr pros
                  braços de outro.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-500">✅</span>
                <p>
                  Ou aplicar mensagens cirúrgicas do protocolo, que fazem ela
                  querer se comprometer de novo.
                </p>
              </div>
              <p>
                O{" "}
                <strong className="text-gray-900">
                  Código da Reconquista
                </strong>{" "}
                te entrega exatamente:
              </p>
              <p>
                👆 O que dizer, quando dizer e como manter a mente dela viciada
                em você.
              </p>
              <p>Clique no botão abaixo.</p>
              <p>Desbloqueie seu acesso agora.</p>
              <p className="font-bold text-gray-900">
                E assuma o seu lugar — no centro dos pensamentos dela.
              </p>
            </div>

            <a
              href="https://pay.kiwify.com.br/2yjxPKj"
              className="block w-full mt-8 mb-4 py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-200 text-center uppercase tracking-wide"
            >
              Clique aqui para RECONQUISTAR sua ex!
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 text-center py-6 px-4 mt-4">
        <p className="text-xs text-gray-400 mb-1">
          &copy; Lucas Krausche &copy;2026
        </p>
        <p className="text-xs text-gray-400 mb-1">
          Todos os direitos reservados
        </p>
        <p className="text-xs text-gray-400 mb-1">
          CNPJ: 40.805.521/0001-30
        </p>
        <p className="text-xs text-gray-400">
          DESENROLADO MARKETING E COMUNICACAO LTDA
        </p>
      </footer>
    </>
  );
}
