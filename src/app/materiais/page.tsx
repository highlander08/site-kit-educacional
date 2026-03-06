/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BackToHome } from "@/components/BackToHome";
import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  BookOpen,
  Cat,
  Download,
  FileText,
  Split,
  Sun,
  Video,
  Zap,
} from "lucide-react";

import dynamic from "next/dynamic";
import { useState } from "react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

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
        descricao: "Guia do professor sobre radiação do corpo negro.",
        url: "/guia-professor-corpo-negro.pdf",
        tamanho: "2.8 MB",
      },

      video: {
        titulo: "Vídeo Corpo Negro",
        descricao: "Explicação didática sobre corpo negro",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        titulo: "Guia Professor - Salto Quântico",
        descricao: "Explicação sobre níveis de energia",
        url: "/Salto_Quântico.pdf",
        tamanho: "2.4 MB",
      },

      video: {
        titulo: "Vídeo Salto Quântico",
        descricao: "Explicação de transições eletrônicas",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        titulo: "Guia Professor - Efeito Fotoelétrico",
        descricao: "Explicação sobre fótons",
        url: "/Fotoelétrico.pdf",
        tamanho: "2.6 MB",
      },

      video: {
        titulo: "Vídeo Efeito Fotoelétrico",
        descricao: "Explicação do efeito fotoelétrico",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    },
  },
};

const temasLista = Object.values(temasData);

export default function TeacherSupportPage() {
  const [temaAtivo, setTemaAtivo] = useState(temasLista[0]);
  const [secaoAtiva, setSecaoAtiva] = useState<"professor" | "aluno">(
    "professor"
  );
  const [reloadKey, setReloadKey] = useState(0);

  function handleTemaChange(tema: any) {
    if (tema.id === temaAtivo.id) return;

    setTemaAtivo(tema);

    setReloadKey((prev) => prev + 1);
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="absolute top-6 left-6">
        <BackToHome />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Header */}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            <Typewriter
              text="Material de Apoio"
              typeSpeed={40}
              cursorColor="#6366f1"
            />
          </h1>

          <p className="text-gray-600 text-lg">
            Material para professores e alunos de física quântica
          </p>
        </div>

        {/* Seleção de Tema */}

        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {temasLista.map((tema) => {
            const Icon = tema.icone;

            return (
              <button
                key={tema.id}
                onClick={() => handleTemaChange(tema)}
                className={`
                px-6 py-3 rounded-full text-white flex items-center gap-2
                ${tema.cor} ${tema.corHover}
                ${
                  temaAtivo.id === tema.id
                    ? "ring-4 ring-offset-2 " + tema.cor.replace("bg", "ring")
                    : ""
                }
                `}
              >
                <Icon size={18} />

                {tema.nome}
              </button>
            );
          })}
        </div>

        {/* Seção */}

        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-full shadow">
            <button
              onClick={() => setSecaoAtiva("professor")}
              className={`px-6 py-2 rounded-full ${
                secaoAtiva === "professor"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Professor
            </button>

            <button
              onClick={() => setSecaoAtiva("aluno")}
              className={`px-6 py-2 rounded-full ${
                secaoAtiva === "aluno"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Aluno
            </button>
          </div>
        </div>

        {/* Conteúdo */}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${temaAtivo.id}-${reloadKey}-${secaoAtiva}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* PDF */}

            <div className="bg-white p-8 rounded-xl shadow">
              <FileText className="mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                {temaAtivo.materiais.pdf.titulo}
              </h3>

              <p className="text-gray-600 mb-4">
                {temaAtivo.materiais.pdf.descricao}
              </p>

              <a
                href={temaAtivo.materiais.pdf.url}
                download
                className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Download size={18} />
                Baixar PDF
              </a>
            </div>

            {/* VIDEO */}

            <div className="bg-white p-8 rounded-xl shadow">
              <Video className="mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                {temaAtivo.materiais.video.titulo}
              </h3>

              <p className="text-gray-600 mb-4">
                {temaAtivo.materiais.video.descricao}
              </p>

              <div className="aspect-video">
                <iframe
                  key={temaAtivo.id}
                  className="w-full h-full rounded"
                  src={temaAtivo.materiais.video.url}
                  title={temaAtivo.materiais.video.titulo}
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
