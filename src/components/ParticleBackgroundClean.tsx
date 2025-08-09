'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Particle system parameters
  const PARTICLE_COUNT = 120;
  const MOUSE_INFLUENCE_RADIUS = 150;
  const RETURN_FORCE = 0.02;
  const MOUSE_FORCE = 0.3;
  const DAMPING = 0.95;

  // Handle window resize
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      // Create particles that form code symbols
      const createParticles = (width: number, height: number): Particle[] => {
        const particles: Particle[] = [];
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Create particles for various code symbols
        const symbols = [
          // Left angle bracket <
          { x: centerX - 200, y: centerY - 60 },
          { x: centerX - 180, y: centerY - 40 },
          { x: centerX - 160, y: centerY - 20 },
          { x: centerX - 140, y: centerY },
          { x: centerX - 160, y: centerY + 20 },
          { x: centerX - 180, y: centerY + 40 },
          { x: centerX - 200, y: centerY + 60 },
          
          // Forward slash /
          { x: centerX - 80, y: centerY - 80 },
          { x: centerX - 60, y: centerY - 60 },
          { x: centerX - 40, y: centerY - 40 },
          { x: centerX - 20, y: centerY - 20 },
          { x: centerX, y: centerY },
          { x: centerX + 20, y: centerY + 20 },
          { x: centerX + 40, y: centerY + 40 },
          { x: centerX + 60, y: centerY + 60 },
          { x: centerX + 80, y: centerY + 80 },
          
          // Right angle bracket >
          { x: centerX + 140, y: centerY - 60 },
          { x: centerX + 160, y: centerY - 40 },
          { x: centerX + 180, y: centerY - 20 },
          { x: centerX + 200, y: centerY },
          { x: centerX + 180, y: centerY + 20 },
          { x: centerX + 160, y: centerY + 40 },
          { x: centerX + 140, y: centerY + 60 },
        ];

        // Add the main symbol particles
        symbols.forEach((symbol) => {
          particles.push({
            x: symbol.x,
            y: symbol.y,
            targetX: symbol.x,
            targetY: symbol.y,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 2,
            opacity: Math.random() * 0.5 + 0.7,
            color: `rgba(147, 197, 253, ${Math.random() * 0.3 + 0.7})`,
          });
        });

        // Add random floating particles
        const remainingParticles = PARTICLE_COUNT - particles.length;
        for (let i = 0; i < remainingParticles; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            targetX: Math.random() * width,
            targetY: Math.random() * height,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5 + 1,
            opacity: Math.random() * 0.3 + 0.2,
            color: `rgba(156, 163, 175, ${Math.random() * 0.3 + 0.2})`,
          });
        }

        return particles;
      };

      setParticles(createParticles(dimensions.width, dimensions.height));
    }
  }, [dimensions, PARTICLE_COUNT]);

  useEffect(() => {
    if (particles.length === 0) return;

    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const updateParticles = (particles: Particle[], mouse: MousePosition) => {
        return particles.map((particle) => {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_INFLUENCE_RADIUS && distance > 0) {
            const force = (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * MOUSE_FORCE;
            particle.vy -= Math.sin(angle) * force * MOUSE_FORCE;
          }

          const returnX = (particle.targetX - particle.x) * RETURN_FORCE;
          const returnY = (particle.targetY - particle.y) * RETURN_FORCE;
          particle.vx += returnX;
          particle.vy += returnY;

          particle.vx *= DAMPING;
          particle.vy *= DAMPING;

          particle.x += particle.vx;
          particle.y += particle.vy;

          const movement = Math.abs(particle.vx) + Math.abs(particle.vy);
          particle.opacity = Math.min(1, particle.opacity + movement * 0.1);

          return particle;
        });
      };

      const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const opacity = (120 - distance) / 120 * 0.1;
              ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        particles.forEach((particle) => {
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      };

      setParticles((prevParticles) => {
        const updatedParticles = updateParticles(prevParticles, mousePosition);
        drawParticles(ctx, updatedParticles);
        return updatedParticles;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length, mousePosition, dimensions.width, dimensions.height, MOUSE_INFLUENCE_RADIUS, RETURN_FORCE, MOUSE_FORCE, DAMPING]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;
