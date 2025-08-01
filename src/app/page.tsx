"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  Atom,
  Users,
  Target,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  Zap,
  Heart,
  Star,
  Menu,
  X,
  Home,
  Info,
  Package,
  MessageCircle,
  ChevronUp,
  Lightbulb,
  FileText,
  Monitor,
} from "lucide-react";
import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

// Interfaces e Types
interface SidebarItem {
  id?: string;
  label: string;
  icon: ReactNode;
  url?: string;
}

interface Benefit {
  icon: ReactNode;
  text: string;
}

interface VisibilityState {
  [key: string]: boolean;
}

type SectionId = "hero" | "intro" | "benefits" | "contact";

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efeito para observar seções visíveis
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));

          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("[id]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebarItems: SidebarItem[] = [
    { id: "hero", label: "Início", icon: <Home className="w-5 h-5" /> },
    { id: "intro", label: "Sobre Nós", icon: <Info className="w-5 h-5" /> },
    {
      url: "/nossos-kits",
      label: "Nossos Kits",
      icon: <Package className="w-5 h-5" />,
    },
    {
      url: "/nossos-produtos",
      label: "Produtos",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      url: "/materiais",
      label: "Materiais",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      url: "/demonstracoes",
      label: "Demonstrações",
      icon: <Monitor className="w-5 h-5" />,
    },
    { id: "benefits", label: "Benefícios", icon: <Star className="w-5 h-5" /> },
    {
      id: "contact",
      label: "Contato",
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  const benefits: Benefit[] = [
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

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setSidebarOpen(false);
    }
  };

  const handleSidebarToggle = (): void => {
    setSidebarOpen((prev) => !prev);
  };

  const handleOverlayClick = (): void => {
    setSidebarOpen(false);
  };

  const openWhatsApp = (): void => {
    try {
      window.open("https://wa.me/85984372867", "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Erro ao abrir WhatsApp:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-800/95 backdrop-blur-md shadow-2xl z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 lg:translate-x-0 lg:w-64`}
        aria-label="Menu de navegação lateral"
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fotoquantum
              </span>
            </div>
            <button
              onClick={handleSidebarToggle}
              className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Fechar menu lateral"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-6" aria-label="Navegação principal">
          <ul className="space-y-2">
            {sidebarItems.map((item: SidebarItem) => (
              <li key={item.id || item.url}>
                {item.id ? (
                  <button
                    onClick={() => scrollToSection(item.id!)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`}
                    aria-label={`Navegar para ${item.label}`}
                    aria-current={
                      activeSection === item.id ? "page" : undefined
                    }
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ) : (
                  <a
                    href={item.url}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                    aria-label={`Ir para ${item.label}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* WhatsApp Floating Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        onClick={openWhatsApp}
        aria-label="Entrar em contato via WhatsApp"
      >
        <MessageCircle size={32} />
      </button>

      {/* Scroll to Top Button */}
      <button
        className={`fixed bottom-24 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mb-2 ${
          showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <ChevronUp size={32} />
      </button>

      {/* Main Content */}
      <main className="lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-slate-900/90 backdrop-blur-sm fixed  top-0 right-0 left-0 z-40 border-b border-slate-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={handleSidebarToggle}
                className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Abrir menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="lg:hidden flex items-center space-x-3">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                  <Atom className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Fotoquantum
                </span>
              </div>

              <nav
                className="hidden md:flex space-x-8 ml-auto"
                aria-label="Navegação secundária"
              >
                {sidebarItems
                  .filter((item) => item.id)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id!)}
                      className={`transition-colors font-medium ${
                        activeSection === item.id
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                    >
                      {item.label}
                    </button>
                  ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible.hero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src="/LogoFotoQuantum_branco.png"
                  alt="Logo Fotoquantum"
                  className="mx-auto h-20 w-auto relative z-10"
                />
              </div>
              <h1
                id="hero-heading"
                className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              >
                <Typewriter
                  text="Explore a Física Quântica"
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
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Kits educacionais revolucionários que tornam os fenômenos
                quânticos tangíveis e compreensíveis para estudantes e
                professores.
              </p>
              <a
                href="/nossos-kits"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
                aria-label="Ver nossos kits"
              >
                Descobrir Kits
              </a>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section
          id="intro"
          className="py-20 bg-slate-800/30"
          aria-labelledby="intro-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible.intro
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <h2
                  id="intro-heading"
                  className="text-4xl font-bold text-white mb-6"
                >
                  Apresentação da Empresa
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Somos uma empresa dedicada à criação de{" "}
                  <strong className="text-blue-400">
                    kits educacionais interativos voltados para o ensino de
                    Física
                  </strong>
                  , com foco em tornar o aprendizado mais acessível, prático e
                  significativo para estudantes do ensino fundamental e médio.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Desenvolvemos soluções que transformam conceitos abstratos em
                  experiências visuais e táteis, facilitando a compreensão por
                  meio da experimentação.
                </p>
              </div>
              <div
                className={`transition-all duration-1000 delay-400 ${
                  isVisible.intro
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white">
                  <Atom className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                  <p className="text-lg leading-relaxed">
                    <strong>Tornar a Física mais simples e clara</strong>,
                    desmistificando conteúdos que costumam parecer complexos e
                    distantes da realidade dos alunos. Acreditamos que, ao
                    aproximar a teoria da prática, despertamos o interesse e
                    promovemos um aprendizado mais eficiente e duradouro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section
          id="benefits"
          className="py-20 bg-slate-800/30"
          aria-labelledby="benefits-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="benefits-heading"
                className="text-4xl font-bold text-white mb-4"
              >
                Benefícios para sua Instituição
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Veja como nossos kits podem transformar o ensino em sua escola
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit: Benefit, index: number) => (
                <div
                  key={index}
                  className={`transition-all duration-700 delay-${
                    index * 150
                  } ${
                    isVisible.benefits
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                >
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl hover:from-indigo-900/40 hover:to-purple-900/40 transition-all duration-300">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg text-white flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <p className="text-gray-300 font-medium">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps & Contact */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible.contact
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 id="contact-heading" className="text-4xl font-bold mb-6">
                Próximos Passos
              </h2>
              <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
                Estamos à disposição para agendar uma apresentação demonstrativa
                dos nossos kits, discutir as necessidades da sua instituição e
                elaborar um orçamento personalizado.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-8 h-8 mx-auto mb-4" />
                  <p className="font-medium mb-2">Email</p>
                  <a
                    href="mailto:contato@Fotoquantum.com.br"
                    className="text-indigo-100 hover:underline"
                    aria-label="Enviar email para contato@Fotoquantum.com.br"
                  >
                    contato@Fotoquantum.com.br
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-8 h-8 mx-auto mb-4" />
                  <p className="font-medium mb-2">Telefone</p>
                  <a
                    href="tel:+5585984372867"
                    className="text-indigo-100 hover:underline"
                    aria-label="Ligar para (85) 98437-2867"
                  >
                    (85) 98437-2867
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                  <Globe className="w-8 h-8 mx-auto mb-4" />
                  <p className="font-medium mb-2">Website</p>
                  <a
                    href="https://www.fotoquantum.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-100 hover:underline"
                    aria-label="Visitar www.fotoquantum.com.br"
                  >
                    www.fotoquantum.com.br
                  </a>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-2 hover:scale-105"
                aria-label="Solicitar demonstração dos kits"
              >
                <span>Solicitar Demonstração</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12" aria-label="Rodapé">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fotoquantum
              </span>
            </div>
            <p className="text-gray-400">
              Transformando o ensino de Física através da experimentação prática
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AboutPage;
