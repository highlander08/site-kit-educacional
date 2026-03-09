"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BackToHome } from "@/components/BackToHome";

export default function KitsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Mouse parallax subtle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((clientX - centerX) / 40);
      mouseY.set((clientY - centerY) / 40);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const kits = [
    {
      id: 1,
      title: "Kit Corpo Negro",
      image: "/cn.jpeg", // Placeholder - troque pela sua foto real
    },
    {
      id: 2,
      title: "Kit Efeito Fotoelétrico",
      image: "/fe.jpeg", // Placeholder próximo de demonstração quântica
    },
    {
      id: 3,
      title: "Kit Salto Quântico",
      image: "/sq.jpeg", // Placeholder de kit óptico/física
    },
  ];

  const currentKit = kits[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % kits.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + kits.length) % kits.length);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden relative">
      {/* Fundo parallax + lighting volumétrica */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: yBackground, opacity: opacityHero }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#7C3AED]/5" />
        <motion.div
          className="absolute top-[15%] left-[10%] w-[800px] h-[800px] bg-[#38BDF8]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-[1000px] h-[1000px] bg-[#7C3AED]/8 rounded-full blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </motion.div>

      {/* Mouse reactive subtle glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(56,189,248,0.08) 0%, transparent 40%)`,
        }}
      />

      {/* Header flutuante */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-full px-10 py-5 flex items-center gap-8 text-sm font-medium"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <BackToHome />
        <div className="h-6 w-px bg-gray-300/50" />
        <span className="text-[#2563EB] font-semibold">Nossos Kits</span>
      </motion.header>

      <main className="relative pt-32 pb-24">
        {/* Hero Title */}
        <section className="text-center mb-24 px-6">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] mb-6"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              Nossos Kits
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#475569] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Experiências quânticas tangíveis para a sala de aula.
          </motion.p>
        </section>

        {/* Carousel simplificado: só título + imagem */}
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="text-center">
              <motion.h3
                key={currentKit.title}
                className="text-4xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20, backgroundPosition: "0% 0" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundPosition: ["0% 0", "100% 0", "0% 0"], // Loop: vai e volta
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { duration: 0.8 },
                  backgroundPosition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #2563EB 0%, #7C3AED 30%, #ffffff 50%, #7C3AED 70%, #2563EB 100%)",
                  backgroundSize: "200% 100%",
                }}
              >
                {currentKit.title}
              </motion.h3>

              <motion.div
                className="overflow-hidden rounded-2xl shadow-xl max-w-3xl mx-auto"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={currentKit.image}
                  alt={currentKit.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>

            {/* Controles */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
              <motion.button
                onClick={prevSlide}
                className="p-4 bg-white/80 backdrop-blur-lg rounded-full border border-white/40 shadow-lg hover:bg-white/90 transition-all"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-7 h-7 text-[#2563EB]" />
              </motion.button>

              <div className="flex gap-3">
                {kits.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      i === currentSlide
                        ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] scale-125 shadow-lg"
                        : "bg-gray-300/60 hover:bg-gray-400/80"
                    }`}
                    whileHover={{ scale: i === currentSlide ? 1.3 : 1.4 }}
                    aria-label={`Ir para kit ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="p-4 bg-white/80 backdrop-blur-lg rounded-full border border-white/40 shadow-lg hover:bg-white/90 transition-all"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Próximo"
              >
                <ChevronRight className="w-7 h-7 text-[#2563EB]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Estilo global */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 10s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}
