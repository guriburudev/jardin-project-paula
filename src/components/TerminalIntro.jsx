import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';

const LOGS = [
  "Inicializando entorno seguro...",
  "Verificando destinatario: Paula... [OK]",
  "Analizando historial: Pasó bastante tiempo... [CONFIRMADO]",
  "Evaluando hipótesis: Te dejo la duda de por qué armé esto.",
  "Nivel de intriga: El justo y necesario.",
  "Sistema listo para ejecución."
];

export default function TerminalIntro({ onStart }) {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= LOGS.length) {
      setIsFinished(true);
      return;
    }

    const targetLine = LOGS[currentLineIndex];
    let charIndex = 0;
    let typeInterval = null;

    const startTypingTimeout = setTimeout(() => {
      typeInterval = setInterval(() => {
        charIndex++;
        setCurrentText(targetLine.slice(0, charIndex));

        if (charIndex >= targetLine.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCompletedLines((prev) => [...prev, targetLine]);
            setCurrentText("");
            setCurrentLineIndex((prev) => prev + 1);
          }, 350);
        }
      }, 25);
    }, 200);

    return () => {
      clearTimeout(startTypingTimeout);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [currentLineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto p-4 relative z-20"
    >
      <div className="rounded-2xl bg-[#020b0a]/95 border border-emerald-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-left">
        
        {/* Barra superior */}
        <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/40 border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-300/80 font-medium">diagnostico_reconexion.sh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/50" />
          </div>
        </div>

        {/* Cuerpo de la consola */}
        <div className="p-5 space-y-2 min-h-[220px] text-xs sm:text-sm text-emerald-300/90 leading-relaxed">
          {completedLines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="text-emerald-500 select-none font-bold">➜</span>
              <span>{line}</span>
            </div>
          ))}

          {/* Línea actual en tipeo */}
          {!isFinished && (
            <div className="flex items-start gap-2.5 text-emerald-200">
              <span className="text-emerald-500 select-none font-bold">➜</span>
              <span>
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-emerald-400 align-middle ml-1"
                />
              </span>
            </div>
          )}
        </div>

        {/* Botón de desbloqueo */}
        <div className="p-4 bg-emerald-950/20 border-t border-emerald-500/10 flex justify-end">
          <motion.button
            onClick={onStart}
            disabled={!isFinished}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isFinished ? 1 : 0.3,
              y: isFinished ? 0 : 10,
              scale: isFinished ? [1, 1.02, 1] : 1
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 2, repeat: isFinished ? Infinity : 0, ease: "easeInOut" }
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg ${
              isFinished
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-emerald-500/25 hover:brightness-110 active:scale-95 cursor-pointer"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <span>Ejecutar experiencia</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}