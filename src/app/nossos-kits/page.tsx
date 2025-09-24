"use client";
import { BackToHome } from "@/components/BackToHome";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Target,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

interface Kit {
  id: number;
  title: string;
  description: string;
  phenomenon: string;
  features: string[];
  image: string;
  benefits: {
    icon: React.ReactNode;
    text: string;
  }[];
}

const KitsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const kits: Kit[] = [
    {
      id: 1,
      title: "Kit Corpo Negro",
      description:
        "Simula a radiação do corpo negro e permite estudar a distribuição espectral da energia térmica.",
      phenomenon:
        "Demonstra como objetos aquecidos emitem radiação eletromagnética em diferentes frequências, fundamental para compreender a física quântica.",
      features: [
        "Controle de temperatura digital",
        "Interface gráfica intuitiva",
        "Materiais didáticos completos",
      ],
      image: "/corpo-negro.png", // Substitua pela imagem real
      benefits: [
        {
          icon: <Zap className="w-5 h-5 text-yellow-400" />,
          text: "Demonstração clara da lei de Planck",
        },
        {
          icon: <Target className="w-5 h-5 text-blue-400" />,
          text: "Alinhado com a BNCC para ensino médio",
        },
        {
          icon: <Star className="w-5 h-5 text-purple-400" />,
          text: "Experimentos replicáveis em sala de aula",
        },
      ],
    },
    {
      id: 2,
      title: "Kit Efeito Fotoelétrico",
      description:
        "Demonstra o efeito fotoelétrico descoberto por Einstein, mostrando a natureza quântica da luz.",
      phenomenon:
        "Ilustra como a luz pode ejetar elétrons de uma superfície metálica, comprovando a natureza corpuscular da radiação.",
      features: [
        "Fontes de luz com diferentes frequências",
        "Detector de elétrons de alta sensibilidade",
        "Medidor de energia cinética",
        "Placas metálicas intercambiáveis",
        "Roteiros de atividades práticas",
      ],
      image: "efeito.png", // Substitua pela imagem real
      benefits: [
        {
          icon: <Zap className="w-5 h-5 text-yellow-400" />,
          text: "Comprovação experimental da teoria quântica",
        },
        {
          icon: <Target className="w-5 h-5 text-blue-400" />,
          text: "Excelente para introduzir conceitos de física moderna",
        },
        {
          icon: <Heart className="w-5 h-5 text-red-400" />,
          text: "Engaja estudantes com experimentos hands-on",
        },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % kits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + kits.length) % kits.length);
  };

  const router = useRouter();

  return (
    <section
      id="kits"
      className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900 relative"
    >
      <div className="absolute top-6 left-6 z-10">
        {/* <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Voltar para página inicial"
        >
          <ArrowLeft className="w-4 h-4" />
          Página Inicial
        </button> */}
        <BackToHome />
      </div>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="hero-heading"
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <Typewriter
              text="Nossos Kits Educacionais"
              typeSpeed={50}
              cursorColor="#a855f7" // Cor roxa para combinar com o gradiente
              hideCursorAfterText={true}
              textStyle={{
                background: "linear-gradient(to right, #60a5fa, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tecnologia de ponta para ensinar física quântica de forma prática e
            envolvente
          </p>
        </div>

        {/* Kit Details */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700 shadow-2xl ">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Imagem do Kit */}
            <div className="relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <img
                src={kits[currentSlide].image}
                alt={kits[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Conteúdo do Kit */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {kits[currentSlide].title}
                  </h3>
                  <p className="text-blue-300 font-medium">
                    Física Quântica Experimental
                  </p>
                </div>
                <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  Kit {currentSlide + 1}/{kits.length}
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6">
                {kits[currentSlide].description}
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 w-2 h-2 rounded-full mr-2"></span>
                  Fenômeno Estudado
                </h4>
                <p className="text-gray-300 pl-4">
                  {kits[currentSlide].phenomenon}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 w-2 h-2 rounded-full mr-2"></span>
                  Componentes Principais
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {kits[currentSlide].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <ChevronRight
                        className="text-blue-400 mr-2 mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 w-2 h-2 rounded-full mr-2"></span>
                  Benefícios Pedagógicos
                </h4>
                <div className="space-y-3">
                  {kits[currentSlide].benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-slate-700/50 p-3 rounded-lg"
                    >
                      <div className="bg-slate-600/50 p-1 rounded-full mr-3">
                        {benefit.icon}
                      </div>
                      <p className="text-gray-300">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controles do Carrossel */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-700/80 hover:bg-slate-600 text-white p-3 rounded-full shadow-lg transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-700/80 hover:bg-slate-600 text-white p-3 rounded-full shadow-lg transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-8 space-x-2">
          {kits.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-500" : "bg-slate-600"
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitsSection;
