/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BackToHome } from "@/components/BackToHome";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  FileText,
  Video,
  Presentation,
  BookOpen,
  GraduationCap,
  Atom,
  Zap,
  Sun,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

// Estrutura de dados dos temas (fácil de expandir)
const temasData = {
  corpoNegro: {
    id: "corpoNegro",
    nome: "Corpo Negro",
    descricao: "Estudo da radiação do corpo negro e a crise da física clássica",
    cor: "bg-orange-500",
    corHover: "hover:bg-orange-600",
    corLight: "bg-orange-100",
    corTexto: "text-orange-600",
    icone: Sun,
    materiais: {
      pdf: {
        titulo: "Guia do Professor - Corpo Negro",
        descricao:
          "Guia do professor para o tema Corpo Negro. Inclui experimentos de Planck e Wien.",
        url: "/guia-professor-corpo-negro.pdf",
        tamanho: "2.8 MB",
      },
      video: {
        titulo: "Vídeo: Radiação do Corpo Negro",
        descricao:
          "Vídeo explicativo sobre como ensinar o conteúdo de Corpo Negro",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/thumbnails/corpo-negro.jpg",
      },
      slides: {
        titulo: "Slides - Corpo Negro",
        descricao: "Material visual referente ao tema Corpo Negro",
        urlPpt: "/downloads/slides-corpo-negro.pptx",
        urlPdf: "/downloads/slides-corpo-negro.pdf",
      },
      materialAluno: {
        titulo: "Material do Aluno - Corpo Negro",
        descricao:
          "Apostila completa com teoria, exercícios e experimentos sobre radiação do corpo negro",
        url: "/Corpo_Negro_Estudante.pdf",
        tamanho: "1.5 MB",
      },
    },
  },
  saltoQuantico: {
    id: "saltoQuantico",
    nome: "Salto Quântico",
    descricao: "Transições eletrônicas e quantização da energia",
    cor: "bg-purple-500",
    corHover: "hover:bg-purple-600",
    corLight: "bg-purple-100",
    corTexto: "text-purple-600",
    icone: Zap,
    materiais: {
      pdf: {
        titulo: "Guia do Professor - Salto Quântico",
        descricao:
          "Guia do professor para o tema Salto Quântico. Explicações sobre níveis de energia.",
        url: "/downloads/guia-professor-salto-quantico.pdf",
        tamanho: "2.4 MB",
      },
      video: {
        titulo: "Vídeo: Salto Quântico",
        descricao:
          "Vídeo explicativo sobre como ensinar o conteúdo de Salto Quântico",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/thumbnails/salto-quantico.jpg",
      },
      slides: {
        titulo: "Slides - Salto Quântico",
        descricao: "Material visual referente ao tema Salto Quântico",
        urlPpt: "/downloads/slides-salto-quantico.pptx",
        urlPdf: "/downloads/slides-salto-quantico.pdf",
      },
      materialAluno: {
        titulo: "Material do Aluno - Salto Quântico",
        descricao:
          "Apostila completa com teoria dos níveis de energia, exercícios e aplicações",
        url: "/downloads/material-aluno-salto-quantico.pdf",
        tamanho: "1.3 MB",
      },
    },
  },
  efeitoFotoeletrico: {
    id: "efeitoFotoeletrico",
    nome: "Efeito Fotoelétrico",
    descricao:
      "Emissão de elétrons por metais quando iluminados e a explicação de Einstein",
    cor: "bg-green-500",
    corHover: "hover:bg-green-600",
    corLight: "bg-green-100",
    corTexto: "text-green-600",
    icone: Atom,
    materiais: {
      pdf: {
        titulo: "Guia do Professor - Efeito Fotoelétrico",
        descricao:
          "Guia do professor para o tema Efeito Fotoelétrico. Explicações sobre fótons e função trabalho.",
        url: "/Fotoelétrico.pdf",
        tamanho: "2.6 MB",
      },
      video: {
        titulo: "Vídeo: Efeito Fotoelétrico",
        descricao:
          "Vídeo explicativo sobre como ensinar o Efeito Fotoelétrico e o Prêmio Nobel de Einstein",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/thumbnails/efeito-fotoeletrico.jpg",
      },
      slides: {
        titulo: "Slides - Efeito Fotoelétrico",
        descricao: "Material visual referente ao tema Efeito Fotoelétrico",
        urlPpt: "/downloads/slides-efeito-fotoeletrico.pptx",
        urlPdf: "/downloads/slides-efeito-fotoeletrico.pdf",
      },
      materialAluno: {
        titulo: "Material do Aluno - Efeito Fotoelétrico",
        descricao:
          "Apostila completa com teoria quântica da luz, exercícios e experimentos",
        url: "Fotoelétrico_Aluno.pdf",
        tamanho: "1.4 MB",
      },
    },
  },
};

// Lista de temas para os botões
const temasLista = Object.values(temasData);

const TeacherSupportPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [temaAtivo, setTemaAtivo] = useState(temasData.corpoNegro); // Tema padrão
  const [isLoading, setIsLoading] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<"professor" | "aluno">(
    "professor"
  );

  const playVideo = (url: string) => {
    setSelectedVideo(url);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleTemaChange = (tema: typeof temasData.corpoNegro) => {
    setIsLoading(true);
    setTemaAtivo(tema);

    // Simula um pequeno carregamento para transição suave
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 relative">
      {/* Botão Voltar */}
      <div className="absolute top-6 left-6 z-10">
        <BackToHome />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <Typewriter
              text="Apoio ao Professor – Física Quântica"
              typeSpeed={40}
              cursorColor="#6366f1"
              hideCursorAfterText={true}
              textStyle={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Material completo para orientar sua aula de maneira clara e rápida
          </p>
        </motion.div>

        {/* Bloco 1 – Resumo da Aula */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-indigo-500"
        >
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Resumo da Aula
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Esta aula apresenta os conceitos fundamentais da Física
                Quântica. Atualmente explorando:{" "}
                <span className={`font-semibold ${temaAtivo.corTexto}`}>
                  {temaAtivo.nome}
                </span>
                .{temaAtivo.descricao && ` ${temaAtivo.descricao}`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Seletor de Temas */}
        <div className="mb-12">
          <p className="text-center text-gray-600 mb-4 text-lg">
            Selecione o tema da aula:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {temasLista.map((tema) => {
              const Icon = tema.icone;
              return (
                <motion.button
                  key={tema.id}
                  onClick={() => handleTemaChange(tema)}
                  className={`
                    px-6 py-3 rounded-full font-medium text-white
                    transition-all duration-300 transform flex items-center gap-2
                    ${tema.cor} ${tema.corHover}
                    ${
                      temaAtivo.id === tema.id
                        ? "ring-4 ring-offset-2 ring-opacity-50 " +
                          tema.cor.replace("bg-", "ring-")
                        : "opacity-80 hover:opacity-100"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  {tema.nome}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Seletor de Seção (Professor/Aluno) */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-md inline-flex">
            <button
              onClick={() => setSecaoAtiva("professor")}
              className={`
                px-8 py-3 rounded-full font-medium text-lg transition-all duration-300
                ${
                  secaoAtiva === "professor"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              Material do Professor
            </button>
            <button
              onClick={() => setSecaoAtiva("aluno")}
              className={`
                px-8 py-3 rounded-full font-medium text-lg transition-all duration-300
                ${
                  secaoAtiva === "aluno"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              Material do Aluno
            </button>
          </div>
        </div>

        {/* Grid de Cards Dinâmicos */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Skeleton loading
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[...Array(secaoAtiva === "professor" ? 2 : 3)].map(
                (_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-8 animate-pulse"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                )
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`${secaoAtiva}-${temaAtivo.id}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
                exit: { opacity: 0 },
              }}
              className={
                secaoAtiva === "professor"
                  ? "grid md:grid-cols-2 lg:grid-cols-2 gap-8"
                  : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              }
            >
              {secaoAtiva === "professor" ? (
                // Cards do Professor (apenas PDF e Vídeo - Slides removido)
                <>
                  {/* Card 1 – PDF do Professor */}
                  <motion.div
                    key={`pdf-${temaAtivo.id}`}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="p-8">
                      <div
                        className={`${temaAtivo.corLight} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                      >
                        <FileText className={`w-8 h-8 ${temaAtivo.corTexto}`} />
                      </div>

                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                        {temaAtivo.materiais.pdf.titulo}
                      </h3>

                      <p className="text-gray-600 mb-6">
                        {temaAtivo.materiais.pdf.descricao}
                      </p>

                      <a
                        href={temaAtivo.materiais.pdf.url}
                        className={`inline-flex items-center justify-center w-full ${temaAtivo.cor} ${temaAtivo.corHover} text-white font-medium py-3 px-6 rounded-xl transition-colors gap-2`}
                        download
                      >
                        <Download size={20} />
                        Baixar PDF ({temaAtivo.materiais.pdf.tamanho})
                      </a>
                    </div>
                  </motion.div>

                  {/* Card 2 – Vídeo do Professor */}
                  <motion.div
                    key={`video-${temaAtivo.id}`}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="p-8">
                      <div
                        className={`${temaAtivo.corLight} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                      >
                        <Video className={`w-8 h-8 ${temaAtivo.corTexto}`} />
                      </div>

                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                        Vídeo de Apoio ao Professor
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {temaAtivo.materiais.video.descricao}
                      </p>

                      {/* Player de vídeo embutido */}
                      <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
                        <iframe
                          className="w-full h-full"
                          src={temaAtivo.materiais.video.url}
                          title={temaAtivo.materiais.video.titulo}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <button
                        onClick={() => playVideo(temaAtivo.materiais.video.url)}
                        className={`inline-flex items-center justify-center w-full ${temaAtivo.cor} ${temaAtivo.corHover} text-white font-medium py-3 px-6 rounded-xl transition-colors gap-2`}
                      >
                        <Video size={20} />
                        Assistir Vídeo
                      </button>
                    </div>
                  </motion.div>
                </>
              ) : (
                // Cards do Aluno (TODOS os temas disponíveis)
                <>
                  {temasLista.map((tema) => {
                    const Icon = tema.icone;
                    return (
                      <motion.div
                        key={`aluno-${tema.id}`}
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                      >
                        <div className="p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div
                              className={`${tema.corLight} w-16 h-16 rounded-2xl flex items-center justify-center`}
                            >
                              <Icon className={`w-8 h-8 ${tema.corTexto}`} />
                            </div>
                            <div>
                              <span
                                className={`text-sm font-medium ${tema.corTexto}`}
                              >
                                Material do Aluno
                              </span>
                              <h3 className="text-xl font-semibold text-gray-800">
                                {tema.materiais.materialAluno.titulo}
                              </h3>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-6">
                            {tema.materiais.materialAluno.descricao}
                          </p>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <BookOpen size={16} />
                              <span>
                                24 páginas • 15 exercícios • 3 experimentos
                              </span>
                            </div>
                          </div>

                          <a
                            href={tema.materiais.materialAluno.url}
                            className={`flex items-center justify-center w-full ${tema.cor} ${tema.corHover} text-white font-medium py-3 px-6 rounded-xl transition-colors gap-2`}
                            download
                          >
                            <Download size={20} />
                            Baixar Material (
                            {tema.materiais.materialAluno.tamanho})
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informações adicionais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>Materiais atualizados regularmente • Download gratuito</p>
        </motion.div>
      </div>

      {/* Modal de Vídeo */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Fechar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full"
                  src={selectedVideo}
                  title="Vídeo de apoio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeacherSupportPage;
