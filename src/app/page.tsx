"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Atom,
  ChevronUp,
  Heart,
  Instagram,
  Phone,
  Star,
  Target,
  Zap,
  Menu,
  X,
  Lightbulb,
  Users,
  TestTube,
  Rocket,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const AboutPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Início", id: "hero" },
    { label: "Sobre", id: "sobre" },
    { label: "Benefícios", id: "benefícios" },
    { label: "Contato", id: "contato" },
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      text: "Aumento do engajamento dos alunos nas aulas de Ciências e Física",
    },
    {
      icon: <Target className="w-6 h-6" />,
      text: "Aprendizado por experimentação, promovendo a interdisciplinaridade",
    },
    {
      icon: <Star className="w-6 h-6" />,
      text: "Valorização do corpo docente com ferramentas inovadoras",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      text: "Fortalecimento da imagem da escola como promotora de educação moderna",
    },
  ];

  const earlyStageHighlights = [
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Em desenvolvimento avançado",
      desc: "Kits finalizados com materiais acessíveis, seguros e prontos para o dia a dia da sala de aula.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Conceitos quânticos simplificados",
      desc: "Transformando temas complexos em experimentos visuais, táteis e fáceis de entender.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Alinhado à realidade brasileira",
      desc: "Desenhado para escolas públicas e privadas, sem necessidade de laboratório caro.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Pronto para os primeiros testes",
      desc: "Buscamos escolas parceiras para validar e aprimorar juntos o impacto real.",
    },
  ];

  const words = [
    "Física Quântica",
    "Educação Científica",
    "Simulações Interativas",
    "Experimentos Educacionais",
    "Tecnologia para Aprender",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden">
      {/* Header Glassmorphism */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#0F172A] p-2 rounded-lg">
              <img
                src="/LogoFotoQuantum_branco.png"
                alt="Logo Fotoquantum"
                className="h-10 md:h-12 w-auto"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-lg font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#38BDF8] group-hover:w-full group-hover:left-0 transition-all duration-400 origin-center" />
              </button>
            ))}
            <a href="/materiais" className="relative text-lg font-medium group">
              Materiais
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#38BDF8] group-hover:w-full group-hover:left-0 transition-all duration-400 origin-center" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-20 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-4 text-lg font-medium hover:bg-blue-50 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/materiais"
                className="block py-3 px-4 text-lg font-medium hover:bg-blue-50 rounded-xl transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Materiais
              </a>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Scroll to Top */}
      <motion.button
        className={`fixed bottom-8 right-8 z-50 bg-[#2563EB] text-white p-4 rounded-full shadow-2xl hover:bg-[#1e40af] transition-colors ${
          showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp size={28} />
      </motion.button>

      <main className="pt-20">
        {/* Hero - Cinematográfico */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/ft.jpg')] bg-cover bg-center opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#7C3AED]/10" />

            <motion.div
              className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-[#38BDF8]/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-[#7C3AED]/15 rounded-full blur-3xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <img
                src="/LogoFotoQuantum_branco.png"
                alt="Logo Fotoquantum"
                className="mx-auto h-28 md:h-36 w-auto mb-10 drop-shadow-2xl"
              />

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent bg-[length:200%] animate-gradient"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </h1>

              <motion.p
                className="text-xl md:text-2xl text-[#475569] max-w-3xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Kits educacionais que tornam a física quântica tangível, prática
                e fascinante.
              </motion.p>

              <motion.a
                href="/nossos-kits"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-10 py-5 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Descobrir Kits</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-7 h-12 border-2 border-[#475569]/40 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-[#2563EB] rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Sobre */}
        <section
          id="sobre"
          className="relative py-32 bg-[#E2E8F0]/70 overflow-hidden"
        >
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-20 left-10 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-3xl" />
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-10">
                  Apresentação da{" "}
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                    Empresa
                  </span>
                </h2>
                <p className="text-lg leading-relaxed text-[#475569] mb-8">
                  Somos especializados na criação de kits educacionais
                  interativos para o ensino de Física, com foco em tornar o
                  aprendizado mais acessível, prático e memorável para alunos do
                  ensino fundamental e médio.
                </p>
                <p className="text-lg leading-relaxed text-[#475569]">
                  Transformamos conceitos abstratos em experiências concretas,
                  visuais e táteis — promovendo a experimentação como ponte
                  entre teoria e realidade.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/30 to-[#7C3AED]/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-white/30 shadow-2xl">
                  <Atom className="w-20 h-20 text-[#2563EB] mb-8 opacity-90" />
                  <h3 className="text-4xl font-bold mb-6">Nossa Missão</h3>
                  <p className="text-lg leading-relaxed text-[#475569]">
                    <strong className="text-[#2563EB]">
                      Simplificar e desmistificar a Física
                    </strong>{" "}
                    — aproximando teoria e prática para despertar curiosidade,
                    melhorar a retenção e transformar a forma como os alunos
                    enxergam a ciência.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nova seção ajustada: Estamos Construindo... */}
        <section className="py-24 bg-gradient-to-br from-white to-[#E0F2FE]/50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Estamos Construindo o{" "}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  Futuro da Educação Científica
                </span>
              </h2>
              <p className="text-xl text-[#475569] max-w-3xl mx-auto">
                Os kits Fotoquantum estão em constante crescimento. Projetados
                para facilitar a experimentação prática, eles tornam conceitos
                complexos acessíveis e envolventes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {earlyStageHighlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  whileHover={{ scale: 1.05, y: -6 }}
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-lg text-center group"
                >
                  <div className="bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:from-[#2563EB]/20 group-hover:to-[#7C3AED]/20 transition-all">
                    {React.cloneElement(item.icon, {
                      className: "text-[#2563EB]",
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="text-[#475569] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA sutil no final da seção */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <p className="text-lg text-[#475569] mb-6">
                Interessado em ser um dos primeiros a testar e moldar esses
                kits?
              </p>
              <motion.a
                href="#contato"
                className="inline-flex items-center gap-3 bg-[#2563EB] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-[#1e40af] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Quero participar dos testes
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="benefícios" className="relative py-32 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Benefícios para sua{" "}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  Instituição
                </span>
              </h2>
              <p className="text-xl text-[#475569] max-w-3xl mx-auto">
                Veja como nossos kits podem revolucionar o ensino de ciências na
                sua escola
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/85 backdrop-blur-lg p-8 rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all">
                    <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-4 rounded-xl text-white inline-block mb-6">
                      {benefit.icon}
                    </div>
                    <p className="text-lg font-medium text-[#0F172A]">
                      {benefit.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section
          id="contato"
          className="relative py-32 overflow-hidden text-white"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
            animate={{
              backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "400% 400%" }}
          />

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-10">
                Próximos Passos
              </h2>
              <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-16 opacity-95">
                Agende uma demonstração personalizada dos nossos kits, converse
                sobre as necessidades da sua escola e receba um orçamento sob
                medida.
              </p>

              <div className="grid md:grid-cols-2 gap-10 mb-16">
                <motion.a
                  href="https://www.instagram.com/fotoquantumkits/"
                  target="_blank"
                  className="group"
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="bg-white/15 backdrop-blur-xl p-10 rounded-3xl border border-white/20 hover:bg-white/25 transition-all">
                    <Instagram className="w-16 h-16 mx-auto mb-6" />
                    <p className="text-2xl font-semibold mb-2">Instagram</p>
                    <p className="text-white/90">@fotoquantumkits</p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+5585988072122"
                  className="group"
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="bg-white/15 backdrop-blur-xl p-10 rounded-3xl border border-white/20 hover:bg-white/25 transition-all">
                    <Phone className="w-16 h-16 mx-auto mb-6" />
                    <p className="text-2xl font-semibold mb-2">Telefone</p>
                    <p className="text-white/90">(85) 98807-2122</p>
                  </div>
                </motion.a>
              </div>

              <motion.button
                onClick={() => scrollToSection("contato")}
                className="bg-white text-[#2563EB] px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-100 transition-all inline-flex items-center gap-3 shadow-xl"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                Solicitar Demonstração
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0F172A] text-white/90 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-3 rounded-xl">
                  <Atom className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  Fotoquantum
                </span>
              </div>
              <p className="text-gray-400">
                Transformando o ensino de Física através da experimentação
                prática e envolvente
              </p>
            </div>
          </div>
        </footer>
      </main>

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
          animation: gradient 8s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
