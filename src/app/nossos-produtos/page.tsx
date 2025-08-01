"use client";

import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Typewriter = dynamic(() => import("react-typewriter-effect"), {
  ssr: false,
});

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  price?: string;
  image: string;
  icon: React.ReactNode;
  category: string;
  popular?: boolean;
}

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Produtos ajustados às categorias solicitadas
  const products: Product[] = [
    {
      id: "2",
      title: "KIt Educacional: Eletromagnetismo",
      description:
        "Conjunto para estudo aprofundado de eletricidade e magnetismo",
      features: [
        "8 experimentos sequenciais",
        "Abordagem investigativa",
        "Contexto histórico e aplicações",
        "Material para 30 alunos",
        "Avaliações formativas",
      ],
      price: "R$ 1.299,90",
      image: "corpo-negro.png",
      icon: <LightningIcon />,
      category: "projetos",
    },
    {
      id: "4",
      title: "Treinamento de Professores",
      description: "Capacitação no uso dos kits experimentais em sala de aula",
      features: [
        "16 horas de formação",
        "Presencial ou remoto",
        "Certificado válido",
        "Material de apoio",
        "Demonstrações práticas",
      ],
      price: "R$ 1.799,90",
      image: "corpo-negro.png",
      icon: <TrainingIcon />,
      category: "treinamentos",
      popular: true,
    },
    {
      id: "5",
      title: "Coleção de Materiais Didáticos",
      description: "Conteúdo complementar com linguagem acessível para alunos",
      features: [
        "5 volumes impressos",
        "Atividades de aprendizagem ativa",
        "Problemas contextualizados",
        "Resolução comentada",
        "Acesso à versão digital",
      ],
      price: "R$ 349,90",
      image: "corpo-negro.png",
      icon: <BookIcon />,
      category: "material",
    },
    {
      id: "6",
      title: "KIt Educacional: Óptica Moderna",
      description:
        "Investigação dos fenômenos ópticos com abordagem contemporânea",
      features: [
        "6 experimentos com lasers",
        "Aplicações tecnológicas",
        "Roteiros de investigação",
        "Material para demonstrações",
        "Sugestões de avaliação",
      ],
      price: "R$ 1.099,90",
      image: "corpo-negro.png",
      icon: <LightIcon />,
      category: "projetos",
    },
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "projetos", name: "Kits Educacionais" },
    { id: "treinamentos", name: "Treinamentos" },
    { id: "material", name: "Material Didático" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const router = useRouter();
  return (
    <>
      <Head>
        <title>Nossos Produtos | Física Interativa</title>
        <meta
          name="description"
          content="Soluções para ensino de física com Kits Educacionais, treinamentos e materiais didáticos"
        />
      </Head>

      <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Voltar para página inicial"
          >
            <ArrowLeft className="w-4 h-4" />
            Página Inicial
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              id="hero-heading"
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <Typewriter
                text="Nossas Soluções"
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
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conheça nossos produtos desenvolvidos para transformar o ensino de
              Física
            </p>
          </motion.div>

          {/* Filtros por categoria */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Grid de Produtos */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-700 hover:border-blue-500/50 h-full flex flex-col cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* {product.popular && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full z-10">
                        POPULAR
                      </div>
                    )} */}

                    <div className="h-48 bg-slate-700 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/20 flex items-center justify-center text-gray-400">
                        <img src={product.image} alt="" />
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4">
                          {product.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {product.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 mb-4 flex-1">
                        {product.description}
                      </p>

                      <div className="mt-auto">
                        {product.price && (
                          <div className="text-2xl font-bold text-white mb-4">
                            {product.price}
                          </div>
                        )}

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                          Saiba Mais
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Modal de Detalhes do Produto */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    className="absolute top-4 right-4 bg-slate-700/50 hover:bg-slate-700 rounded-full p-2 z-10"
                    onClick={() => setSelectedProduct(null)}
                  >
                    <XIcon />
                  </button>

                  <div className="grid md:grid-cols-2">
                    <div className="h-64 md:h-full bg-slate-700 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/20 flex items-center justify-center text-gray-400">
                        [Imagem detalhada: {selectedProduct.title}]
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center text-white mr-4">
                          {selectedProduct.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          {selectedProduct.title}
                        </h2>
                      </div>

                      <p className="text-gray-300 mb-6">
                        {selectedProduct.description}
                      </p>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Benefícios Incluídos:
                        </h3>
                        <ul className="space-y-2">
                          {selectedProduct.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start text-gray-300"
                            >
                              <div className="text-green-500 mr-2 mt-1 flex-shrink-0">
                                <CheckIcon />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        {selectedProduct.price && (
                          <div className="text-3xl font-bold text-white">
                            {selectedProduct.price}
                          </div>
                        )}

                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex-1">
                          Solicitar Orçamento
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

// Componentes de ícone personalizados
const LightningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const LightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const TrainingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ProductsPage;
