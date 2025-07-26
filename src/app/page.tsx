/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, Download, Play, Menu, X, BookOpen, Lightbulb, Video, Mail, Home, Info, FileText, Monitor, Phone, ExternalLink, MessageCircle, ChevronUp } from 'lucide-react';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Mostrar o botão quando o usuário rolar para baixo
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Função para rolar para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Dados dos kits educacionais
  const kits = [
    {
      id: 1,
      title: "Kit Corpo Negro",
      description: "Simula a radiação do corpo negro e permite estudar a distribuição espectral da energia térmica.",
      phenomenon: "Demonstra como objetos aquecidos emitem radiação eletromagnética em diferentes frequências, fundamental para compreender a física quântica.",
      image: "data:image/jpeg;base64,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",
      features: ["Controle de temperatura", "Medição espectral", "Interface digital"]
    },
    {
      id: 2,
      title: "Kit Efeito Fotoelétrico",
      description: "Demonstra o efeito fotoelétrico descoberto por Einstein, mostrando a natureza quântica da luz.",
      phenomenon: "Ilustra como a luz pode ejetar elétrons de uma superfície metálica, comprovando a natureza corpuscular da radiação.",
      image: "data:image/jpeg;base64,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",
      features: ["Fontes de luz variáveis", "Detector de elétrons", "Medição de energia"]
    }
  ];

  // Materiais de apoio
  const materials = [
    { name: "Manual do Aluno", type: "PDF", size: "2.5 MB", icon: BookOpen },
    { name: "Manual do Professor", type: "PDF", size: "4.1 MB", icon: Lightbulb },
    { name: "Roteiros de Atividades", type: "PDF", size: "1.8 MB", icon: FileText }
  ];

  // Vídeos demonstrativos
  const videos = [
    { 
      title: "Demonstração: Kit Corpo Negro", 
      duration: "12:34", 
      youtubeId: "I9WG6IWpc20",
      thumbnail: "https://img.youtube.com/vi/I9WG6IWpc20/maxresdefault.jpg"
    },
    { 
      title: "Tutorial: Efeito Fotoelétrico", 
      duration: "08:45", 
      youtubeId: "I9WG6IWpc20",
      thumbnail: "https://img.youtube.com/vi/I9WG6IWpc20/maxresdefault.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % kits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + kits.length) % kits.length);
  };

  const scrollToSection = (sectionId: any) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const playVideo = (videoId: any) => {
    setPlayingVideo(videoId);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/85984372867', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-x-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800/95 backdrop-blur-sm transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            {[
              { id: 'inicio', label: 'Início', icon: Home },
              { id: 'kits', label: 'Sobre os Kits', icon: Lightbulb },
              { id: 'materiais', label: 'Materiais de Apoio', icon: FileText },
              { id: 'demonstracoes', label: 'Demonstrações', icon: Monitor },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* WhatsApp Floating Button */}
      <div 
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110"
        onClick={openWhatsApp}
      >
        <MessageCircle size={32} />
      </div>

      {/* Scroll to Top Button */}
      <div 
        className={`fixed bottom-24 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110 mb-2 ${
          showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
      >
        <ChevronUp size={32}  />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-blue-400 transition-colors z-50 relative"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white"> Kits Educacionais Quânticos</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="inicio" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <Lightbulb size={80} className="mx-auto text-yellow-400 relative z-10" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Explore a
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> Física Quântica</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Kits educacionais revolucionários que tornam os fenômenos quânticos tangíveis e compreensíveis para estudantes e professores.
            </p>
            <button
              onClick={() => scrollToSection('kits')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Descobrir Kits
            </button>
          </div>
        </section>

        {/* Sobre os Kits Section */}
        <section id="kits" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Nossos Kits Educacionais</h2>
              <p className="text-xl text-gray-300">Tecnologia de ponta para ensinar física quântica</p>
            </div>

            {/* Kit Details */}
            <div className="mb-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">{kits[currentSlide].title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{kits[currentSlide].description}</p>
                  <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
                    <h4 className="text-blue-400 font-semibold mb-2">Fenômeno Simulado:</h4>
                    <p className="text-gray-300">{kits[currentSlide].phenomenon}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-3">Características:</h4>
                    <ul className="space-y-2">
                      {kits[currentSlide].features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <ChevronRight size={16} className="text-blue-400 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-2xl">
                    <img
                      src={kits[currentSlide].image}
                      alt={kits[currentSlide].title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevSlide}
                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex space-x-2">
                {kits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-blue-500' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Materiais de Apoio Section */}
        <section id="materiais" className="py-20 px-4 bg-slate-800/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Materiais de Apoio</h2>
              <p className="text-xl text-gray-300">Recursos completos para professores e alunos</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-500/20 p-4 rounded-full mb-4 group-hover:bg-blue-500/30 transition-colors">
                      <material.icon size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{material.name}</h3>
                    {/* <p className="text-gray-400 text-sm mb-4">{material.type} • {material.size}</p> */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demonstrações Section */}
        <section id="demonstracoes" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Demonstrações</h2>
              <p className="text-xl text-gray-300">Veja os kits em funcionamento</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => playVideo(video.youtubeId)}
                    >
                      <div className="bg-red-600 p-4 rounded-full hover:bg-red-700 transition-colors">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute top-2 right-2">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                    <button
                      onClick={() => playVideo(video.youtubeId)}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1 transition-colors"
                    >
                      <Play size={14} />
                      <span>Assistir agora</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-slate-700">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400">© 2025 Kits Educacionais Quânticos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;