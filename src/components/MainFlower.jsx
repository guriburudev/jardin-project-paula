import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function MainFlower({ isUnlocked, openedCount, totalCount }) {
  useEffect(() => {
    if (isUnlocked) {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.38 },
        colors: ['#00f0ff', '#38bdf8', '#e0f2fe', '#0284c7', '#22d3ee']
      });
    }
  }, [isUnlocked]);

  const outerAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
  const progressRatio = openedCount / totalCount;

  return (
    <div className="flex flex-col items-center justify-center relative z-10 w-full">
      <div className="relative w-44 h-44 sm:w-64 sm:h-64 flex items-center justify-center">
        
        {/* Aura Tron: Neón Cian Profundo */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/40 via-[#00f0ff]/30 to-blue-600/25 blur-2xl sm:blur-3xl pointer-events-none"
          animate={{
            scale: isUnlocked ? [1, 1.35, 1] : [0.85, 1.12, 0.85],
            opacity: isUnlocked ? [0.85, 1, 0.85] : [0.25 + progressRatio * 0.35, 0.55 + progressRatio * 0.35, 0.25 + progressRatio * 0.35],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Anillo de cuadrícula / Circuito rotatorio Tron */}
        <motion.div
          className="absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-[#00f0ff]/40 pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          style={{ borderStyle: 'dashed', borderWidth: '1.5px' }}
          animate={{ rotate: 360, scale: isUnlocked ? [1, 1.06, 1] : 1 }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <svg
          className="w-full h-full relative z-10"
          style={{
            filter: isUnlocked 
              ? 'drop-shadow(0 0 26px rgba(0,240,255,0.85)) drop-shadow(0 0 8px rgba(255,255,255,0.9))' 
              : 'drop-shadow(0 0 14px rgba(6,182,212,0.4))'
          }}
          viewBox="0 0 200 200"
        >
          <defs>
            {/* Núcleo Tron: Fusión Blanca / Cian Láser */}
            <radialGradient id="tronCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#e0f2fe" />
              <stop offset="60%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>

            {/* Estado inactivo: Circuito apagado */}
            <radialGradient id="dormantTronGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="60%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>

            {/* Pétalos exteriores: Cian Eléctrico -> Azul Glaciar -> Azul Oscuro Cyber */}
            <linearGradient id="tronOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="35%" stopColor="#00f0ff" />
              <stop offset="75%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>

            {/* Pétalos interiores: Resplandor Cian Neón */}
            <linearGradient id="tronInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>
          </defs>

          {/* Pétalos exteriores */}
          {outerAngles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const distance = isUnlocked ? 46 : 8 + progressRatio * 14;
            const cx = 100 + distance * Math.cos(rad);
            const cy = 100 + distance * Math.sin(rad);

            return (
              <motion.circle
                key={`outer-${i}`}
                animate={{
                  cx,
                  cy,
                  r: isUnlocked ? 27 : 5 + progressRatio * 10,
                  opacity: isUnlocked ? 0.94 : 0.2 + progressRatio * 0.45
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 16,
                  delay: isUnlocked ? i * 0.03 : 0
                }}
                fill="url(#tronOuterGrad)"
              />
            );
          })}

          {/* Pétalos interiores */}
          {innerAngles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const distance = isUnlocked ? 30 : 5 + progressRatio * 10;
            const cx = 100 + distance * Math.cos(rad);
            const cy = 100 + distance * Math.sin(rad);

            return (
              <motion.circle
                key={`inner-${i}`}
                animate={{
                  cx,
                  cy,
                  r: isUnlocked ? 19 : 3 + progressRatio * 8,
                  opacity: isUnlocked ? 0.98 : 0.25 + progressRatio * 0.45
                }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 15,
                  delay: isUnlocked ? 0.12 + (i * 0.02) : 0
                }}
                fill="url(#tronInnerGrad)"
              />
            );
          })}

          {/* Núcleo Central de Energía */}
          <motion.circle
            cx="100"
            cy="100"
            animate={{
              r: isUnlocked ? 21 : 14 + progressRatio * 4,
              scale: isUnlocked ? [1, 1.1, 1] : 1,
              fill: isUnlocked ? "url(#tronCoreGrad)" : progressRatio > 0 ? "#0284c7" : "url(#dormantTronGrad)"
            }}
            transition={{
              scale: {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              },
              r: { duration: 0.5 },
              fill: { duration: 0.5 }
            }}
          />

          {/* Punto de sobreexposición blanca en el centro */}
          <motion.circle
            cx="100"
            cy="100"
            r={isUnlocked ? "6.5" : "4"}
            fill="#ffffff"
            animate={{
              opacity: isUnlocked ? [0.8, 1, 0.8] : [0.35, 0.85, 0.35],
              scale: isUnlocked ? [1, 1.35, 1] : 1
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  );
}