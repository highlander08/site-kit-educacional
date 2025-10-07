/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BackToHome } from "@/components/BackToHome";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, Download, FileText, Video } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

// Sample materials data (can be passed as props)
const materials = [
  {
    id: 1,
    name: "Guia do Professor: Andamento",
    type: "PDF",
    size: "2.5 MB",
    icon: FileText,
    url: "/downloads/corpo-negro.pdf",
    category: "Professor",
  },
  {
    id: 2,
    name: "Guia do Estudante: Andamento",
    type: "PDF",
    size: "1.8 MB",
    icon: BookOpen,
    url: "/downloads/corpo-negro.pdf",
    category: "Estudante",
  },
];

const MaterialsSection = () => {
  const [filter, setFilter] = useState("Todos");
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    // Filter materials based on category
    if (filter === "Todos") {
      setFilteredMaterials(materials);
    } else {
      setFilteredMaterials(
        materials.filter((material) => material.category === filter)
      );
    }
  }, [filter]);

  const filterButtons = ["Todos", "Professor", "Estudante"];

  const playVideo = (url: string) => {
    setSelectedVideo(url);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };
  const router = useRouter();

  return (
    <section
      id="materials"
      className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800 relative"
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
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <Typewriter
              text="Materiais de Apoio"
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
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Recursos completos e organizados para professores e alunos,
            projetados para facilitar o aprendizado e ensino.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-2 flex-wrap gap-2">
          {filterButtons.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700/50 text-gray-300 hover:bg-slate-700"
              }`}
              aria-pressed={filter === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <AnimatePresence>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-xl h-64 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material, index) => {
                const Icon = material.icon;
                return (
                  <motion.div
                    key={material.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-blue-500/20 p-4 rounded-full mb-4 group-hover:bg-blue-500/30 transition-colors">
                          <Icon className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {material.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {material.type} • {material.size}
                        </p>
                        {material.type === "MP4" ? (
                          <button
                            onClick={() => playVideo(material.url)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            aria-label={`Reproduzir ${material.name}`}
                          >
                            <Video size={16} />
                            <span>Assistir</span>
                          </button>
                        ) : (
                          <a
                            href={material.url}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            aria-label={`Baixar ${material.name}`}
                            download
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-4xl bg-slate-900 rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors z-10"
                  aria-label="Fechar vídeo"
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
                  <video
                    className="w-full h-full"
                    src={selectedVideo}
                    controls
                    autoPlay
                    aria-label="Video player"
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Todos os materiais são gratuitos e atualizados regularmente.
        </motion.p>
      </div>
    </section>
  );
};

export default MaterialsSection;
