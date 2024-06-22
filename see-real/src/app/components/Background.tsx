import React, { useEffect, useRef, ReactNode } from 'react';

interface NierInspiredBackgroundProps {
  children: ReactNode;
}

const NierInspiredBackground: React.FC<NierInspiredBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const nextX = x + size * Math.cos(angle);
        const nextY = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(nextX, nextY);
        else ctx.lineTo(nextX, nextY);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set line style
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Draw hexagon pattern
      const size = 30;
      const rows = Math.ceil(canvas.height / (size * 1.5)) + 1;
      const cols = Math.ceil(canvas.width / (size * Math.sqrt(3))) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * size * Math.sqrt(3) + (row % 2 === 0 ? 0 : size * Math.sqrt(3) / 2);
          const y = row * size * 1.5;
          drawHexagon(x, y, size);
        }
      }

      // Glitch effect
      if (Math.random() < 0.05) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 20 + 10,
          Math.random() * 20 + 10
        );
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#2c2c2c] text-[#e0e0e0] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default NierInspiredBackground;