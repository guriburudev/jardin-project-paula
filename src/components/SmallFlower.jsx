import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWER_THEMES = {
  1: {
    petalStops: ['#f472b6', '#ec4899', '#db2777'],
    centerStops: ['#fdf2f8', '#f472b6', '#be185d'],
    glowColor: 'rgba(236, 72, 153, 0.65)',
    borderGlow: 'border-pink-400/50',
    auraBg: 'bg-pink-500/20',
  },
  2: {
    petalStops: ['#38bdf8', '#06b6d4', '#0891b2'],
    centerStops: ['#ecfeff', '#22d3ee', '#0e7490'],
    glowColor: 'rgba(6, 182, 212, 0.65)',
    borderGlow: 'border-cyan-400/50',
    auraBg: 'bg-cyan-500/20',
  },
  3: {
    petalStops: ['#fde047', '#f59e0b', '#d97706'],
    centerStops: ['#fefce8', '#fbbf24', '#b45309'],
    glowColor: 'rgba(245, 158, 11, 0.65)',
    borderGlow: 'border-amber-400/50',
    auraBg: 'bg-amber-500/20',
  },
  4: {
    petalStops: ['#c084fc', '#a855f7', '#7e22ce'],
    centerStops: ['#faf5ff', '#c084fc', '#6b21a8'],
    glowColor: 'rgba(168, 85, 247, 0.65)',
    borderGlow: 'border-purple-400/50',
    auraBg: 'bg-purple-500/20',
  },
};

export default function SmallFlower({ id, text, isOpen, onOpen, index }) {
  const petals = [0, 60, 120, 180, 240, 300];
  const theme = FLOWER_THEMES[id] || FLOWER_THEMES[1];

  const handleClick = () => {
    if (!isOpen) {
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(35);
      }
      onOpen(id);
    }
  };

    const getTooltipPosition = () => {
    switch (index) {
        case 0: // Flor Rosa (lateral izq) -> abajo hacia el centro
        return "top-[105%] left-0 sm:left-auto sm:right-[115%] sm:top-1/2 sm:-translate-y-1/2";
        case 1: // Flor Celeste (sup izq) -> arriba a la izquierda (despeja el centro)
        return "bottom-[105%] right-[20%] sm:right-auto sm:left-1/2 sm:-translate-x-1/2";
        case 2: // Flor Dorada (sup der) -> arriba a la derecha (despeja el centro)
        return "bottom-[105%] left-[20%] sm:left-auto sm:left-1/2 sm:-translate-x-1/2";
        case 3: // Flor Violeta (lateral der) -> abajo hacia el centro
        return "top-[105%] right-0 sm:right-auto sm:left-[115%] sm:top-1/2 sm:-translate-y-1/2";
        default:
        return "top-[105%] left-1/2 -translate-x-1/2";
    }
    };

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Botón Flor */}
      <motion.div
        className="relative w-16 h-16 sm:w-24 sm:h-24 cursor-pointer flex items-center justify-center outline-none"
        whileHover={{ scale: 1.12, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: isOpen ? [-2, 3, -2] : [-3, 3, -3] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleClick}
      >
        <motion.div
          className={`absolute -inset-2 rounded-full ${theme.auraBg} blur-xl pointer-events-none`}
          animate={{
            scale: isOpen ? [1.1, 1.4, 1.1] : [0.8, 1.1, 0.8],
            opacity: isOpen ? [0.6, 0.9, 0.6] : [0.2, 0.45, 0.2]
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          className="w-full h-full relative z-10"
          style={{ filter: `drop-shadow(0 0 14px ${theme.glowColor}) drop-shadow(0 0 4px ${theme.glowColor})` }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id={`petalGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.petalStops[0]} />
              <stop offset="50%" stopColor={theme.petalStops[1]} />
              <stop offset="100%" stopColor={theme.petalStops[2]} />
            </linearGradient>
            
            <radialGradient id={`centerGrad-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={theme.centerStops[0]} />
              <stop offset="60%" stopColor={theme.centerStops[1]} />
              <stop offset="100%" stopColor={theme.centerStops[2]} />
            </radialGradient>

            <linearGradient id={`budGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>

          {petals.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const distance = isOpen ? 22 : 5;
            const cx = 50 + distance * Math.cos(rad);
            const cy = 50 + distance * Math.sin(rad);

            return (
              <motion.circle
                key={i}
                animate={{
                  cx,
                  cy,
                  r: isOpen ? 13 : 5,
                  opacity: isOpen ? 0.96 : 0.45
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 14,
                  delay: isOpen ? i * 0.03 : 0
                }}
                fill={`url(#petalGrad-${id})`}
              />
            );
          })}

          <motion.g
            animate={{
              opacity: isOpen ? 0 : 0.85,
              scale: isOpen ? 0.4 : 1
            }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "50px 50px" }}
          >
            <motion.ellipse
              cx="42"
              cy="54"
              rx="5"
              ry="10"
              fill="#047857"
              transform="rotate(-25 42 54)"
              animate={{ rotate: [-25, -20, -25] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="58"
              cy="54"
              rx="5"
              ry="10"
              fill="#047857"
              transform="rotate(25 58 54)"
              animate={{ rotate: [25, 20, 25] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          <motion.circle
            cx="50"
            cy="50"
            animate={{
              r: isOpen ? 10 : 8.5,
              fill: isOpen ? `url(#centerGrad-${id})` : `url(#budGrad-${id})`
            }}
            transition={{ duration: 0.35 }}
          />

          <motion.circle
            cx="50"
            cy="50"
            r="3.5"
            fill="#ffffff"
            animate={{
              opacity: isOpen ? [0.6, 1, 0.6] : [0.35, 0.9, 0.35],
              scale: isOpen ? [1, 1.25, 1] : [0.85, 1.15, 0.85]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {!isOpen && (
          <motion.div
            className={`absolute inset-1 rounded-full border ${theme.borderGlow} pointer-events-none`}
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* Cartel Flotante */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`absolute z-30 px-2.5 py-1.5 bg-slate-900/95 border ${theme.borderGlow} rounded-xl text-[10px] sm:text-xs text-slate-100 text-center w-[105px] sm:w-[135px] shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md leading-tight pointer-events-none ${getTooltipPosition()}`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}