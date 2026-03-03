// "use client";

// import { BackToHome } from "@/components/BackToHome";
// import { motion } from "framer-motion";
// import Head from "next/head";

// interface EducationLink {
//   name: string;
//   description?: string;
//   url: string;
//   bannerEmoji: string;
//   bannerColor: string;
//   teoria: string;
// }

// const EducationLinksPage = () => {
//   const educationLinks: EducationLink[] = [
//     {
//       name: "Teoria do Salto Quântico",
//       description:
//         "Exploração completa da teoria do salto quântico na física quântica - transições discretas entre níveis de energia",
//       url: "https://s-ruddy-five.vercel.app/",
//       bannerEmoji: "⚡",
//       bannerColor: "from-purple-600 to-blue-600",
//       teoria: "Salto Quântico",
//     },
//     {
//       name: "Gato de Schrödinger",
//       description:
//         "Paradoxo quântico do gato que está vivo e morto simultaneamente - superposição de estados",
//       url: "https://gatov2.vercel.app/",
//       bannerEmoji: "🐱",
//       bannerColor: "from-orange-600 to-red-600",
//       teoria: "Superposição Quântica",
//     },
//     {
//       name: "Experimento da Dupla Fenda",
//       description:
//         "O famoso experimento que demonstra a natureza dual onda-partícula da matéria",
//       url: "https://dupla-fenda.vercel.app/",
//       bannerEmoji: "🔬",
//       bannerColor: "from-green-600 to-teal-600",
//       teoria: "Dualidade Onda-Partícula",
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>Plataformas de Ensino Quântico</title>
//         <meta
//           name="description"
//           content="Ferramentas de apoio ao ensino quântico - Teoria do Salto Quântico, Gato de Schrödinger e Dupla Fenda"
//         />
//       </Head>

//       <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
//         <div className="absolute top-6 left-6 z-10">
//           <BackToHome />
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Cabeçalho */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-block p-4 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-full mb-4 shadow-lg shadow-purple-600/30">
//               <span className="text-5xl">⚛️</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Plataformas de Ensino
//             </h1>
//             <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium mb-2">
//               Ferramentas de apoio ao ensino quântico
//             </p>
//             <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//               Explorando os mistérios da física quântica através de recursos
//               interativos
//             </p>
//           </motion.div>

//           {/* Grid de Cards - 3 teorias principais */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="grid md:grid-cols-3 gap-6"
//           >
//             {educationLinks.map((link, index) => (
//               <motion.a
//                 key={index}
//                 href={link.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * index }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="block bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
//               >
//                 {/* Banner com gradiente e emoji */}
//                 <div
//                   className={`h-40 bg-gradient-to-r ${link.bannerColor} relative overflow-hidden`}
//                 >
//                   {/* Padrão de ondas quânticas */}
//                   <div className="absolute inset-0 opacity-20">
//                     <div className="absolute bottom-0 left-0 w-full h-8 bg-white/10 transform -skew-y-3"></div>
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
//                   </div>

//                   {/* Emoji centralizado */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-7xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-2xl">
//                       {link.bannerEmoji}
//                     </span>
//                   </div>

//                   {/* Tag da teoria */}
//                   <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-xs text-white font-medium">
//                       {link.teoria}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Conteúdo do card */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
//                     {link.name}
//                   </h3>

//                   {link.description && (
//                     <p className="text-sm text-gray-400 mb-4">
//                       {link.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-500">
//                       {new URL(link.url).hostname.replace("www.", "")}
//                     </span>

//                     <span className="inline-flex items-center text-sm text-blue-400 font-medium">
//                       Acessar recurso
//                       <svg
//                         className="w-4 h-4 ml-1"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </span>
//                   </div>
//                 </div>
//               </motion.a>
//             ))}
//           </motion.div>

//           {/* Rodapé com citação quântica */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-center mt-16 pt-8 border-t border-slate-700"
//           >
//             <p className="text-gray-400 italic mb-3 text-lg">
//               "A coisa mais incompreensível sobre o universo é que ele é
//               compreensível."
//               <span className="block text-gray-500 text-sm mt-2">
//                 — Albert Einstein
//               </span>
//             </p>
//             <p className="text-gray-500 text-sm flex items-center justify-center gap-3 mt-6">
//               <span>⚛️</span>
//               <span>
//                 Todos os links abrem em nova aba • Explorando o mundo quântico
//               </span>
//               <span>⚛️</span>
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EducationLinksPage;
