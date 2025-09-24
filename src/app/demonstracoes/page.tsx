/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BackToHome } from "@/components/BackToHome";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

// Vídeos locais da pasta public/downloads/
const videos = [
  {
    id: 1,
    title: "Demonstração do Kit Corpo Negro",
    thumbnail: "/downloads/im.jpg", // Thumbnail local
    videoUrl: "/downloads/video.mp4", // Vídeo local
    duration: "3:45",
  },
  {
    id: 2,
    title: "Demonstração do Kit Fotoeletrico",
    thumbnail: "/downloads/im.jpg", // Thumbnail local
    videoUrl: "/downloads/video.mp4", // Vídeo local
    duration: "5:12",
  },
  {
    id: 3,
    title: "Tutorial de Montagem",
    thumbnail: "/downloads/im.jpg", // Thumbnail local
    videoUrl: "/downloads/video.mp4", // Vídeo local
    duration: "4:30",
  },
];

const DemosSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const playVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const router = useRouter();

  return (
    <section
      id="demos"
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
              text="Demonstrações "
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
            Explore nossos kits em ação através de vídeos interativos e
            tutoriais detalhados.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <AnimatePresence>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-xl h-64 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={`Thumbnail de ${video.title}`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback para thumbnail caso não exista
                          (e.target as HTMLImageElement).src =
                            "/placeholder-thumbnail.jpg";
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => playVideo(video.videoUrl)}
                        aria-label={`Reproduzir ${video.title}`}
                      >
                        <div className="bg-red-600 p-4 rounded-full hover:bg-red-700 transition-colors">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {video.title}
                      </h3>
                      <button
                        onClick={() => playVideo(video.videoUrl)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1 transition-colors"
                      >
                        <Play size={14} />
                        <span>Assistir agora</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
          Novos vídeos são adicionados semanalmente. Fique ligado!
        </motion.p>
      </div>
    </section>
  );
};

export default DemosSection;
