import React, { useEffect, useRef } from 'react';

export default function GardenCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000, isActive: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 85 partículas ambientales orgánicas
    const particles = Array.from({ length: 85 }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: depth > 0.8 ? Math.random() * 2 + 1.2 : Math.random() * 1.4 + 0.6,
        speedX: (Math.random() - 0.5) * (0.18 + depth * 0.2),
        speedY: (Math.random() - 0.5) * 0.22 - (0.08 + depth * 0.15),
        alpha: depth > 0.8 ? Math.random() * 0.4 + 0.25 : Math.random() * 0.25 + 0.1,
        pulseSpeed: Math.random() * 0.018 + 0.008,
        angle: Math.random() * Math.PI * 2,
        depth,
        color: Math.random() > 0.6
          ? { r: 52, g: 211, b: 153 } // Esmeralda
          : Math.random() > 0.3
          ? { r: 45, g: 212, b: 191 } // Menta / Turquesa
          : { r: 253, g: 224, b: 71 }  // Polvillo dorado
      };
    });

    const drawBackgroundFoliage = (time) => {
      ctx.save();
      const ambientGlow = ctx.createRadialGradient(
        width / 2, height * 0.45, 40,
        width / 2, height * 0.45, width * 0.55
      );
      ambientGlow.addColorStop(0, 'rgba(16, 185, 129, 0.07)');
      ambientGlow.addColorStop(0.5, 'rgba(13, 148, 136, 0.025)');
      ambientGlow.addColorStop(1, 'rgba(3, 9, 10, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      const drawLeafCluster = (baseX, baseY, scaleX, scaleY, angleOffset) => {
        ctx.save();
        ctx.translate(baseX, baseY);
        ctx.scale(scaleX, scaleY);
        for (let i = 0; i < 4; i++) {
          const sway = Math.sin(time * 0.0012 + i) * 0.04;
          ctx.save();
          ctx.rotate((-0.4 + i * 0.25 + sway) + angleOffset);
          ctx.beginPath();
          ctx.ellipse(0, -90 - i * 15, 22 + i * 4, 90 + i * 15, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 78, 59, ${0.035 + i * 0.012})`;
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.06 + i * 0.015})`;
          ctx.lineWidth = 1.2;
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        ctx.restore();
      };

      drawLeafCluster(width * 0.06, height * 0.98, 1, 1, 0.2);
      drawLeafCluster(width * 0.94, height * 0.98, -1, 1, 0.2);

      const groundGrad = ctx.createLinearGradient(0, height, 0, height - 160);
      groundGrad.addColorStop(0, 'rgba(4, 47, 46, 0.18)');
      groundGrad.addColorStop(0.5, 'rgba(15, 118, 110, 0.06)');
      groundGrad.addColorStop(1, 'rgba(3, 9, 10, 0)');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, height - 160, width, 160);
      ctx.restore();
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      drawBackgroundFoliage(time);

      particles.forEach((p, idx) => {
        p.angle += p.pulseSpeed;
        p.x += p.speedX + Math.sin(p.angle) * (0.15 + p.depth * 0.2);
        p.y += p.speedY;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        let radius = p.baseRadius;
        let dynamicAlpha = Math.max(0.08, Math.min(0.75, p.alpha + Math.sin(p.angle) * 0.15));
        let glowBlur = p.depth > 0.6 ? 8 : 4;

        // Si el cursor/touch pasa cerca, la partícula se ilumina
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const proximity = 1 - dist / 130;
            radius *= 1 + proximity * 0.6;
            dynamicAlpha = Math.min(1, dynamicAlpha + proximity * 0.5);
            glowBlur += proximity * 12;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${dynamicAlpha})`;
        ctx.shadowBlur = glowBlur;
        ctx.shadowColor = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;
        ctx.fill();

        // Conexiones de luz entre partículas cercanas
        if (p.depth > 0.45) {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.depth > 0.45) {
              const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
              if (dist < 85) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(45, 212, 191, ${0.08 * (1 - dist / 85) * dynamicAlpha})`;
                ctx.lineWidth = 0.65;
                ctx.stroke();
              }
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}