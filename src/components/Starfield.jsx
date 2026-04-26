import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = 400;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          o: Math.random()
        });
      }
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const draw = () => {
      ctx.fillStyle = '#05050a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Speed depends on scroll velocity or position
      const speed = 2 + (scrollRef.current * 0.05); 

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const k = 128 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * 3;
          const opacity = 1 - star.z / canvas.width;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();

          // Star trails for time travel effect
          if (speed > 10) {
            ctx.strokeStyle = `rgba(0, 210, 255, ${opacity * 0.3})`;
            ctx.lineWidth = size / 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(star.x * (128 / (star.z + speed * 2)) + centerX, star.y * (128 / (star.z + speed * 2)) + centerY);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Starfield;
