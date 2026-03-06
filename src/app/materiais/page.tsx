/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BackToHome } from "@/components/BackToHome";
import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  BookOpen,
  Cat,
  Download,
  ExternalLink,
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

interface Material {
  titulo: string;
  descricao: string;
  url: string;
}

interface Tema {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  corHover: string;
  icone: any;
  materiais: {
    pdfProfessor: Material;
    pdfAluno: Material;
    video: Material;
  };
}

const temasData: Record<string, Tema> = {
  corpoNegro: {
    id: "corpoNegro",
    nome: "Corpo Negro",
    descricao: "Radiação do corpo negro e o nascimento da física quântica",
    cor: "bg-orange-500",
    corHover: "hover:bg-orange-600",
    icone: Sun,
    materiais: {
      pdfProfessor: {
        titulo: "Guia do Professor – Corpo Negro",
        descricao:
          "Orientações detalhadas, roteiro de aula, sugestões pedagógicas e gabarito comentado.",
        url: "/guia-professor-corpo-negro.pdf",
      },
      pdfAluno: {
        titulo: "Apostila do Aluno – Corpo Negro",
        descricao:
          "Teoria resumida, exemplos resolvidos, exercícios progressivos e questões contextualizadas.",
        url: "/Corpo_Negro_Estudante.pdf",
      },
      video: {
        titulo: "Vídeo Explicativo – Corpo Negro",
        descricao:
          "Animação e explicação passo a passo da curva de Planck e da quantização da energia.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // ← substitua pelo link real
      },
    },
  },

  saltoQuantico: {
    id: "saltoQuantico",
    nome: "Salto Quântico",
    descricao: "Transições eletrônicas e emissão/absorção de fótons",
    cor: "bg-purple-500",
    corHover: "hover:bg-purple-600",
    icone: Zap,
    materiais: {
      pdfProfessor: {
        titulo: "Guia do Professor – Salto Quântico",
        descricao:
          "Plano de aula, explicação conceitual, atividades práticas e respostas comentadas.",
        url: "/Salto_Quântico.pdf",
      },
      pdfAluno: {
        titulo: "Apostila do Aluno – Salto Quântico",
        descricao:
          "Conteúdo teórico claro, diagramas de níveis de energia e exercícios resolvidos + propostos.",
        url: "/Salto_Quântico_Aluno.pdf",
      },
      video: {
        titulo: "Vídeo Explicativo – Salto Quântico",
        descricao:
          "Demonstração visual das transições eletrônicas e da origem das linhas espectrais.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    },
  },

  efeitoFotoeletrico: {
    id: "efeitoFotoeletrico",
    nome: "Efeito Fotoelétrico",
    descricao: "Emissão de elétrons pela luz e o quantum de energia",
    cor: "bg-green-500",
    corHover: "hover:bg-green-600",
    icone: Atom,
    materiais: {
      pdfProfessor: {
        titulo: "Guia do Professor – Efeito Fotoelétrico",
        descricao:
          "Roteiro completo, experimentos sugeridos, derivações e questões para discussão em sala.",
        url: "/Fotoelétrico.pdf",
      },
      pdfAluno: {
        titulo: "Apostila do Aluno – Efeito Fotoelétrico",
        descricao:
          "Explicação passo a passo, gráficos interativos sugeridos e banco de exercícios.",
        url: "/Fotoelétrico_Aluno.pdf",
      },
      video: {
        titulo: "Vídeo Explicativo – Efeito Fotoelétrico",
        descricao:
          "Animação do fenômeno + explicação da equação de Einstein e do quantum de luz.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    },
  },
};

const temasLista = Object.values(temasData);

const simulacoes = [
  {
    nome: "Salto Quântico",
    descricao: "Explore transições eletrônicas.",
    url: "https://s-ruddy-five.vercel.app/",
    icone: Zap,
  },
  {
    nome: "Gato de Schrödinger",
    descricao: "Experimento mental famoso.",
    url: "https://gatov2.vercel.app/",
    icone: Cat,
  },
  {
    nome: "Dupla Fenda",
    descricao: "Interferência quântica.",
    url: "https://dupla-fenda.vercel.app/",
    icone: Split,
  },
];

export default function MaterialPage() {
  const [temaAtivo, setTemaAtivo] = useState<Tema>(temasLista[0]);
  const [reloadKey, setReloadKey] = useState(0);

  function handleTemaChange(tema: Tema) {
    setTemaAtivo(tema);
    setReloadKey((prev) => prev + 1);
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="absolute top-6 left-6">
        <BackToHome />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            <Typewriter
              text="Material de Apoio"
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

          <p className="text-gray-700 text-lg md:text-xl">
            Recursos completos para professores e alunos de Física Quântica
          </p>
        </div>

        {/* TEMAS */}
        <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-12">
          {temasLista.map((tema) => {
            const Icon = tema.icone;
            return (
              <button
                key={tema.id}
                onClick={() => handleTemaChange(tema)}
                className={`px-6 py-3 rounded-full text-white font-medium flex items-center gap-2.5 shadow-md ${tema.cor} ${tema.corHover} transition-all duration-200`}
              >
                <Icon size={20} />
                {tema.nome}
              </button>
            );
          })}
        </div>

        {/* CONTEÚDO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={reloadKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {/* PDF PROFESSOR */}
            <CardDownload
              icon={BookOpen}
              titulo={temaAtivo.materiais.pdfProfessor.titulo}
              descricao={temaAtivo.materiais.pdfProfessor.descricao}
              url={temaAtivo.materiais.pdfProfessor.url}
              cor="bg-indigo-600 hover:bg-indigo-700"
            />

            {/* PDF ALUNO */}
            <CardDownload
              icon={FileText}
              titulo={temaAtivo.materiais.pdfAluno.titulo}
              descricao={temaAtivo.materiais.pdfAluno.descricao}
              url={temaAtivo.materiais.pdfAluno.url}
              cor="bg-emerald-600 hover:bg-emerald-700"
            />

            {/* VIDEO – agora ocupa mais espaço em telas maiores */}
            <div className="bg-white p-7 rounded-2xl shadow-lg border border-gray-100 col-span-full md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <Video className="text-indigo-600" size={32} strokeWidth={2} />
                <h3 className="text-2xl font-bold text-gray-900">
                  {temaAtivo.materiais.video.titulo}
                </h3>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {temaAtivo.materiais.video.descricao}
              </p>

              <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                <iframe
                  title={temaAtivo.materiais.video.titulo}
                  className="w-full h-full"
                  src={temaAtivo.materiais.video.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SIMULAÇÕES */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            Simulações Interativas
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {simulacoes.map((sim, index) => {
              const Icon = sim.icone;

              return (
                <motion.a
                  key={index}
                  href={sim.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      className="text-violet-600"
                      size={32}
                      strokeWidth={2}
                    />
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                      {sim.nome}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-5">{sim.descricao}</p>

                  <span className="inline-flex items-center gap-2 text-violet-600 font-medium group-hover:text-violet-800">
                    Abrir simulação
                    <ExternalLink size={18} />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CardDownloadProps {
  icon: any;
  titulo: string;
  descricao: string;
  url: string;
  cor: string;
}

function CardDownload({
  icon: Icon,
  titulo,
  descricao,
  url,
  cor,
}: CardDownloadProps) {
  return (
    <motion.div
      className="bg-white p-7 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <Icon size={32} className="mb-5 text-indigo-600" strokeWidth={2.2} />

      <h3 className="text-2xl font-bold mb-3 text-gray-900 leading-tight">
        {titulo}
      </h3>

      <p className="text-gray-700 mb-7 leading-relaxed min-h-[4.5rem]">
        {descricao}
      </p>

      <a
        href={url}
        download
        className={`${cor} text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 font-medium shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-200 w-full sm:w-auto`}
      >
        <Download size={20} />
        Baixar material
      </a>
    </motion.div>
  );
}
