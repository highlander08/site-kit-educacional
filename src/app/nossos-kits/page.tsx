"use client";
import { BackToHome } from "@/components/BackToHome";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Target,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

interface Kit {
  id: number;
  title: string;
  description: string;
  phenomenon: string;
  features: string[];
  video: string;
  rotate?: boolean;
  benefits: {
    icon: React.ReactNode;
    text: string;
  }[];
}

const KitsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  const kits: Kit[] = [
    {
      id: 1,
      title: "Kit Corpo Negro",
      description:
        "Simula a radiação do corpo negro e permite estudar a distribuição espectral da energia térmica.",
      phenomenon:
        "Demonstra como objetos aquecidos emitem radiação eletromagnética em diferentes frequências, fundamental para compreender a física quântica.",
      features: [
        "Potenciometro para Controle de temperatura digital",
        "Display para Interface gráfica intuitiva",
        "Materiais didáticos completos",
        "Botões para interatividade",
        "fitas de leds luminescentes",
      ],
      video:
        "https://res.cloudinary.com/raystyle/video/upload/new1-corpo-negro_godjga.mp4",
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
        "leds para simulação do efeito fotoelétrico",
        "display para visualização do efeito",
        "placa fotovoltaica para demonstração prática",
        "botões para interação",
      ],
      video:
        "https://res.cloudinary.com/raystyle/video/upload/new3-efeito-foto_ra711r.mp4",
      rotate: true,
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
    {
      id: 3,
      title: "Kit Salto Quântico",
      description: "Explora transições energéticas em átomos.",
      phenomenon: "Mostra como elétrons saltam entre níveis de energia.",
      features: [
        "Botões para controle de transições",
        "led ultravioletas para simular excitação atômica",
        "display para visualização de níveis de energia",
        "Roteiros práticos",
      ],
      video:
        "https://res.cloudinary.com/raystyle/video/upload/new2-salto-quantico_tuheif.mp4",
      benefits: [
        {
          icon: <Zap className="w-5 h-5 text-yellow-400" />,
          text: "Visualização clara",
        },
        {
          icon: <Target className="w-5 h-5 text-blue-400" />,
          text: "Didática moderna",
        },
        {
          icon: <Heart className="w-5 h-5 text-red-400" />,
          text: "Aprendizado envolvente",
        },
      ],
    },
  ];

  const changeSlide = (index: number) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setCurrentSlide(index);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }, 200);
  };

  const nextSlide = () => changeSlide((currentSlide + 1) % kits.length);

  const prevSlide = () =>
    changeSlide((currentSlide - 1 + kits.length) % kits.length);

  return (
    <section
      id="kits"
      className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900 relative"
    >
      <div className="absolute top-6 left-6 z-10">
        <BackToHome />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <Typewriter
              text="Nossos Kits Educacionais"
              typeSpeed={50}
              cursorColor="#a855f7"
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

        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* VIDEO */}
            <div className="relative min-h-[400px] bg-black">
              <video
                ref={videoRef}
                key={kits[currentSlide].video}
                src={kits[currentSlide].video}
                className={`w-full h-full ${
                  kits[currentSlide].rotate
                    ? "object-contain rotate-180"
                    : "object-cover"
                }`}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>

            {/* CONTEÚDO */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                {kits[currentSlide].title}
              </h3>

              <p className="text-gray-300 mb-6">
                {kits[currentSlide].description}
              </p>

              <h4 className="text-xl font-semibold text-white mb-2">
                Fenômeno Estudado
              </h4>
              <p className="text-gray-300 mb-6">
                {kits[currentSlide].phenomenon}
              </p>

              <h4 className="text-xl font-semibold text-white mb-2">
                Componentes
              </h4>
              <ul className="mb-6 space-y-1">
                {kits[currentSlide].features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-center">
                    <ChevronRight size={16} className="mr-2 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h4 className="text-xl font-semibold text-white mb-2">
                Benefícios Pedagógicos
              </h4>
              <div className="space-y-2">
                {kits[currentSlide].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="mr-2">{benefit.icon}</div>
                    {benefit.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTROLES */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-700 p-3 rounded-full"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-700 p-3 rounded-full"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* INDICADORES */}
        <div className="flex justify-center mt-6 space-x-2">
          {kits.map((_, index) => (
            <button
              key={index}
              aria-label={`Ir para slide ${index + 1}`}
              onClick={() => changeSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitsSection;
