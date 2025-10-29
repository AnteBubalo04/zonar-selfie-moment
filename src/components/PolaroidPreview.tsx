import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { PolaroidData } from "@/types";

interface PolaroidPreviewProps {
  data: PolaroidData;
  onComplete: () => void;
}

export const PolaroidPreview = ({ data, onComplete }: PolaroidPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalImageRef = useRef<string>("");

  useEffect(() => {
    generatePolaroid();
  }, []);

  const generatePolaroid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (vertical polaroid format)
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // Background (pearl white)
    ctx.fillStyle = '#F7F5F2';
    ctx.fillRect(0, 0, width, height);

    // Add subtle texture
    ctx.fillStyle = 'rgba(167, 133, 63, 0.03)';
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Photos section (3 photos stacked vertically)
    const photoMargin = 80;
    const photoWidth = width - (photoMargin * 2);
    const photoHeight = 400;
    const photoSpacing = 60;
    const startY = 180;

    // Load and draw images
    const imagePromises = data.images.slice(0, 3).map((src, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const currentY = startY + (index * (photoHeight + photoSpacing));
          
          ctx.save();
          
          // Photo shadow
          ctx.shadowColor = 'rgba(167, 133, 63, 0.3)';
          ctx.shadowBlur = 30;
          ctx.shadowOffsetY = 15;
          
          // Draw photo with rounded corners
          const radius = 20;
          ctx.beginPath();
          ctx.moveTo(photoMargin + radius, currentY);
          ctx.lineTo(photoMargin + photoWidth - radius, currentY);
          ctx.quadraticCurveTo(photoMargin + photoWidth, currentY, photoMargin + photoWidth, currentY + radius);
          ctx.lineTo(photoMargin + photoWidth, currentY + photoHeight - radius);
          ctx.quadraticCurveTo(photoMargin + photoWidth, currentY + photoHeight, photoMargin + photoWidth - radius, currentY + photoHeight);
          ctx.lineTo(photoMargin + radius, currentY + photoHeight);
          ctx.quadraticCurveTo(photoMargin, currentY + photoHeight, photoMargin, currentY + photoHeight - radius);
          ctx.lineTo(photoMargin, currentY + radius);
          ctx.quadraticCurveTo(photoMargin, currentY, photoMargin + radius, currentY);
          ctx.closePath();
          ctx.clip();
          
          // Calculate aspect ratio fit
          const imgAspect = img.width / img.height;
          const photoAspect = photoWidth / photoHeight;
          
          let drawWidth, drawHeight, offsetX, offsetY;
          
          if (imgAspect > photoAspect) {
            drawHeight = photoHeight;
            drawWidth = photoHeight * imgAspect;
            offsetX = photoMargin - (drawWidth - photoWidth) / 2;
            offsetY = currentY;
          } else {
            drawWidth = photoWidth;
            drawHeight = photoWidth / imgAspect;
            offsetX = photoMargin;
            offsetY = currentY - (drawHeight - photoHeight) / 2;
          }
          
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          
          ctx.restore();
          
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      // Brand bar at bottom
      const brandBarY = height - 200;
      
      // Gold gradient border
      const borderGradient = ctx.createLinearGradient(0, brandBarY - 5, 0, brandBarY);
      borderGradient.addColorStop(0, 'rgba(167, 133, 63, 0.6)');
      borderGradient.addColorStop(1, 'rgba(167, 133, 63, 0.2)');
      ctx.fillStyle = borderGradient;
      ctx.fillRect(0, brandBarY - 5, width, 5);
      
      // Brand bar background
      const gradient = ctx.createLinearGradient(0, brandBarY, 0, brandBarY + 200);
      gradient.addColorStop(0, 'rgba(167, 133, 63, 0.08)');
      gradient.addColorStop(1, 'rgba(167, 133, 63, 0.03)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, brandBarY, width, 200);

      // Brand text
      ctx.fillStyle = '#A7853F';
      ctx.font = 'bold 64px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('ZONAR', width / 2, brandBarY + 75);
      
      ctx.font = '32px "Inter", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('ZAGREB', width / 2, brandBarY + 115);

      // Watermark
      ctx.font = '22px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(167, 133, 63, 0.5)';
      ctx.fillText('#ZonarMoments', width / 2, brandBarY + 160);

      // Save final image
      finalImageRef.current = canvas.toDataURL('image/png', 0.95);
    });
  };

  const handleShare = () => {
    // Simulate share
    if (navigator.share && finalImageRef.current) {
      fetch(finalImageRef.current)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'zonar-moment.png', { type: 'image/png' });
          navigator.share({
            files: [file],
            title: 'Zonar Moments',
            text: 'Moj trenutak u @zonarhotel #ZonarMoments',
          });
        });
    }
  };

  const handleDownload = () => {
    if (finalImageRef.current) {
      const link = document.createElement('a');
      link.download = 'zonar-lift-selfie.png';
      link.href = finalImageRef.current;
      link.click();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center p-8">
      <div className="w-full max-w-xl text-center space-y-8">
        {/* Title */}
        <h1 className="font-display text-6xl font-bold text-primary animate-bounce-in">
          YOUR LIFTIE!
        </h1>

        {/* Polaroid Preview with slide-in animation */}
        <div className="relative animate-slide-in-up">
          <canvas
            ref={canvasRef}
            className="w-full rounded-3xl shadow-[var(--shadow-gold)] border-4 border-primary/20"
          />
        </div>

        {/* Bottom message */}
        <div className="space-y-2 animate-fade-in">
          <p className="text-pearl text-2xl font-semibold">
            CHECK YOUR WHATSAPP/EMAIL
          </p>
          <p className="text-muted-foreground">
            Sent to: {data.guest.phone || data.guest.email}
          </p>
        </div>
      </div>
    </div>
  );
};
