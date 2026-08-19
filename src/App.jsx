import React, { useState, useEffect, useRef } from 'react';
import SmallFlower from './components/SmallFlower';
import MainFlower from './components/MainFlower';
import GardenCanvas from './components/GardenCanvas';
import TerminalIntro from './components/TerminalIntro';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';

const FLOWERS_DATA = [
  { id: 1, text: "A veces el tiempo pone las cosas en perspectiva ✨" },
  { id: 2, text: "Hay recuerdos que vuelven solos cuando menos te lo esperás." },
  { id: 3, text: "Hacés que cualquier día común se sienta más especial ✨" },
  { id: 4, text: "Dicen que las mejores casualidades nunca son tan casuales 🌿" },
];

export default function App() {
  const [view, setView] = useState('intro');
  const [openedFlowers, setOpenedFlowers] = useState([]);
  const bottomRef = useRef(null);

  const handleOpenFlower = (id) => {
    if (!openedFlowers.includes(id)) {
      setOpenedFlowers((prev) => [...prev, id]);
    }
  };

  const isAllUnlocked = openedFlowers.length >= FLOWERS_DATA.length;
  // Detecta si alguna flor superior está abierta
  const isTopActive = openedFlowers.includes(2) || openedFlowers.includes(3);

  useEffect(() => {
    if (isAllUnlocked && view === 'garden') {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300);
    }
  }, [isAllUnlocked, view]);

  const flowerPositions = [
    { left: "14%", top: "42%" },
    { left: "30%", top: "18%" },
    { left: "70%", top: "18%" },
    { left: "86%", top: "42%" },
  ];

  const vinePaths = [
    { startX: 126, startY: 252, ctrl1X: 210, ctrl1Y: 330, ctrl2X: 320, ctrl2Y: 280, endX: 450, endY: 235 },
    { startX: 270, startY: 108, ctrl1X: 300, ctrl1Y: 170, ctrl2X: 370, ctrl2Y: 210, endX: 450, endY: 235 },
    { startX: 630, startY: 108, ctrl1X: 600, ctrl1Y: 170, ctrl2X: 530, ctrl2Y: 210, endX: 450, endY: 235 },
    { startX: 774, startY: 252, ctrl1X: 690, ctrl1Y: 330, ctrl2X: 580, ctrl2Y: 280, endX: 450, endY: 235 },
  ];

  const phone = "5493875218635";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent("Acepto el misterio... me dejaste con la intriga y me encantó el jardín.")}`;

  return (
    <main className="min-h-screen w-full bg-[#03090a] text-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-x-hidden select-none">
      
      <GardenCanvas />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-emerald-950/40 via-teal-950/15 to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {view === 'intro' ? (
          <div key="intro" className="w-full flex-1 flex items-center justify-center">
            <TerminalIntro onStart={() => setView('garden')} />
          </div>
        ) : (
          <motion.div
            key="garden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-4xl flex flex-col items-center justify-center py-2"
          >
            {/* Header Reactivo: se desplaza hacia arriba si se abren flores superiores */}
          {/* Header Reactivo con mayor desplazamiento vertical */}
          {/* Header más grande y elevado */}
          <motion.header
            animate={{
              y: isTopActive ? -56 : -14,
              scale: isTopActive ? 0.94 : 1,
              opacity: isTopActive ? 0.9 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center max-w-lg pt-0 mb-0"
          >
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-[11px] uppercase tracking-widest text-emerald-300 font-mono mb-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.2)]"
            >
              REGALO PARA PAULA
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-2xl sm:text-4xl font-normal text-slate-50 tracking-tight drop-shadow-[0_2px_14px_rgba(255,255,255,0.25)]"
            >
              Despierta el jardín
            </motion.h1>

            {/* Barra de progreso */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <div className="w-32 sm:w-40 h-2 bg-slate-900/90 rounded-full overflow-hidden border border-slate-700/60 p-[1px] shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(openedFlowers.length / FLOWERS_DATA.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-xs sm:text-sm font-mono text-emerald-300 font-semibold drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]">
                {openedFlowers.length}/{FLOWERS_DATA.length}
              </span>
            </div>
          </motion.header>

            {/* Escenario Central */}
            <section className="relative z-10 w-full flex flex-col items-center justify-center my-0 min-h-[300px] sm:min-h-[390px]">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 900 600"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="vineGlowActive" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#2dd4bf" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="vineGlowInactive" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1e293b" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <ellipse cx="450" cy="235" rx="230" ry="160" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="5 8" opacity="0.18" />
                <ellipse cx="450" cy="235" rx="145" ry="100" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="3 6" opacity="0.12" />

                {vinePaths.map((p, idx) => {
                  const isActive = openedFlowers.includes(FLOWERS_DATA[idx].id);

                  return (
                    <g key={idx}>
                      <motion.path
                        d={`M ${p.startX} ${p.startY} C ${p.ctrl1X} ${p.ctrl1Y}, ${p.ctrl2X} ${p.ctrl2Y}, ${p.endX} ${p.endY}`}
                        fill="none"
                        stroke={isActive ? "url(#vineGlowActive)" : "url(#vineGlowInactive)"}
                        strokeWidth={isActive ? "2.5" : "1.2"}
                        strokeLinecap="round"
                        animate={{ opacity: isActive ? [0.65, 0.95, 0.65] : [0.15, 0.3, 0.15] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {isActive && (
                        <motion.circle
                          r="3.5"
                          fill="#a7f3d0"
                          animate={{
                            cx: [p.startX, (p.startX + p.endX) / 2, p.endX],
                            cy: [p.startY, (p.ctrl1Y + p.ctrl2Y) / 2, p.endY],
                            opacity: [0, 0.9, 0]
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.35
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="relative z-20 flex flex-col items-center w-full px-2">
                <MainFlower
                  isUnlocked={isAllUnlocked}
                  openedCount={openedFlowers.length}
                  totalCount={FLOWERS_DATA.length}
                />
              </div>

              {FLOWERS_DATA.map((flower, idx) => (
                <div
                  key={flower.id}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: flowerPositions[idx].left,
                    top: flowerPositions[idx].top,
                  }}
                >
                  <SmallFlower
                    id={flower.id}
                    index={idx}
                    text={flower.text}
                    isOpen={openedFlowers.includes(flower.id)}
                    onOpen={handleOpenFlower}
                  />
                </div>
              ))}
            </section>

            {/* Footer / Tarjeta Final */}
            <footer ref={bottomRef} className="relative z-20 w-full flex flex-col items-center pb-2 px-3 min-h-[120px] justify-start -mt-2 sm:-mt-4">
              {isAllUnlocked ? (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center w-full max-w-[310px] sm:max-w-md px-4 py-3.5 sm:px-6 sm:py-5 rounded-2xl sm:rounded-3xl bg-slate-900/95 border border-emerald-500/40 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.75)]"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-medium mb-1.5">
                    <Sparkles className="w-3 h-3" /> Jardín florecido ✨
                  </div>
                  
                  <h3 className="text-sm sm:text-2xl font-medium text-white tracking-tight mb-1">
                    Hay cosas que no se dicen por mensaje...
                  </h3>
                  <p className="text-[11px] sm:text-sm text-slate-300 leading-relaxed mb-3 font-light">
                    Y hay presencias que tienen esa magia de quedarse dando vueltas en la cabeza. Podría intentar explicártelo por acá, pero prefiero dejarte la duda y ver si te animás a averiguarlo.
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all group"
                  >
                    <MessageCircle className="w-4 h-4 transition-transform group-hover:rotate-12" /> Acepto el misterio ✨
                  </a>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-[11px] sm:text-xs text-emerald-300/80 tracking-wide font-light py-2 text-center"
                >
                  ✦ Toca los brotes florales para despertar el jardín ✦
                </motion.p>
              )}
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}